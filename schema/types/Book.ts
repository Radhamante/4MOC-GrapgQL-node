import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import bookGenre from '../enum/bookGenre';

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
            library: { type: Library },
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
            },
            history: {
                type: new GraphQLList(History),
                description: 'List of all previous borrows',
            },
        };
    },
});
