import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import filterArg from '../args/filter';
import userGender from '../enum/userGender';
import MongoBook from '../mongo/MongoBook';
import MongoHistory from '../mongo/MongoHistory';
import idResolver from '../resolvers/id';
import Book from './Book';
import History from './History';

export default new GraphQLObjectType({
    name: 'User',
    fields: () => {
        return {
            id: { type: GraphQLID, resolve: idResolver },
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
                args: {
                    filter: filterArg,
                },
                resolve: async (obj, arg) => {
                    const histos = await MongoHistory.find({
                        borrower: obj._id,
                    })
                        .skip(arg.filter.start)
                        .limit(arg.filter.count < 100 ? arg.filter.count : 100);
                    return histos;
                },
            },
        };
    },
});
