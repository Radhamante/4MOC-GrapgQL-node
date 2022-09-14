import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import bookGenre from '../enum/bookGenre';
import MongoHistory from '../mongo/MongoHistory';
import MongoLibrary from '../mongo/MongoLibrary';
import MongoUser from '../mongo/MongoUser';

export default new GraphQLObjectType({
    name: 'Book',
    fields: () => {
        const User = require('./User').default;
        const Library = require('./Library').default;
        const History = require('./History').default;
        return {
            id: { type: GraphQLID, resolve: (obj) => obj._id.toString() },
            isbn: { type: GraphQLString },
            title: { type: GraphQLString },
            author: { type: GraphQLString },
            date: { type: GraphQLString },
            library: {
                type: Library,
                resolve: async (obj) => {
                    return await MongoLibrary.findById(obj.library).exec();
                },
            },
            imageUrl: { type: GraphQLString },
            genre: { type: new GraphQLList(bookGenre) },
            // From Borrowable
            userCanBorrow: {
                type: GraphQLBoolean,
                description: 'User have write to borrow this',
            },
            borrower: {
                description: 'User that currently borrow this',
                type: User,
                resolve: async (obj) => {
                    return await MongoUser.findById(obj.borrower).exec();
                },
            },
            history: {
                type: new GraphQLList(History),
                description: 'List of all previous borrows',
                resolve: async (obj) => {
                    const histos = await MongoHistory.find({
                        book: obj._id,
                    }).exec();
                    console.log(histos);
                    return histos;
                },
            },
        };
    },
});
