import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import filterArg from '../args/filter';
import bookGenre from '../enum/bookGenre';
import MongoHistory from '../mongo/MongoHistory';
import MongoLibrary from '../mongo/MongoLibrary';
import MongoUser from '../mongo/MongoUser';
import idResolver from '../resolvers/id';
import GraphQLDate from '../scalars/date';

export default new GraphQLObjectType({
    name: 'Book',
    fields: () => {
        const User = require('./User').default;
        const Library = require('./Library').default;
        const History = require('./History').default;
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID),
                resolve: idResolver,
            },
            isbn: { type: new GraphQLNonNull(GraphQLString) },
            title: { type: new GraphQLNonNull(GraphQLString) },
            author: { type: GraphQLString },
            date: { type: new GraphQLNonNull(GraphQLDate) },
            library: {
                type: new GraphQLNonNull(Library),
                resolve: async (obj) => {
                    return await MongoLibrary.findById(obj.library).exec();
                },
            },
            imageUrl: { type: GraphQLString },
            genre: { type: new GraphQLNonNull(new GraphQLList(bookGenre)) },
            // From Borrowable
            userCanBorrow: {
                type: new GraphQLNonNull(GraphQLBoolean),
                description: 'User have write to borrow this',
            },
            borrower: {
                type: User,
                description: 'User that currently borrow this',
                resolve: async (obj) => {
                    return await MongoUser.findById(obj.borrower).exec();
                },
            },
            history: {
                type: new GraphQLNonNull(new GraphQLList(History)),
                description: 'List of all previous borrows',
                args: {
                    filter: filterArg,
                },
                resolve: async (obj, arg: any) => {
                    const histos: Array<any> = await MongoHistory.find({
                        book: obj._id,
                    })
                        .skip(arg.filter.start)
                        .limit(arg.filter.count < 100 ? arg.filter.count : 100);
                    return histos;
                },
            },
        };
    },
});
