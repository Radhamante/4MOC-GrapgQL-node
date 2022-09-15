import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import userGender from '../enum/userGender';
import MongoBook from '../mongo/MongoBook';
import MongoHistory from '../mongo/MongoHistory';
import Book from './Book';
import History from './History';

export default new GraphQLObjectType({
    name: 'User',
    fields: () => {
        return {
            id: { type: GraphQLID, resolve: (obj) => obj._id.toString() },
            name: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
            booksBorrowed: {
                type: new GraphQLNonNull(new GraphQLList(Book)),
                resolve: async (obj) => {
                    const book = await MongoBook.find({
                        borrower: obj._id,
                    });
                    return book;
                },
            },
            isAdmin: { type: new GraphQLNonNull(GraphQLBoolean) },
            gender: { type: new GraphQLNonNull(userGender) },
            historys: {
                type: new GraphQLNonNull(new GraphQLList(History)),
                resolve: async (obj) => {
                    const histos = await MongoHistory.find({
                        borrower: obj._id,
                    });
                    console.log(histos);
                    return histos;
                },
            },
        };
    },
});
