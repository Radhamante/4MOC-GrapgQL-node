import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLList,
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
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString },
            booksBorrowed: {
                type: new GraphQLList(Book),
                resolve: async (obj) => {
                    const book = await MongoBook.find({
                        borrower: obj._id,
                    });
                    return book
                },
            },
            isAdmin: { type: GraphQLBoolean },
            gender: { type: userGender },
            historys: {
                type: new GraphQLList(History),
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
