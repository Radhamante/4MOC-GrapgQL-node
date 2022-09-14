import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import movieGenre from '../enum/movieGenre';
import Borrowable from '../interfaces/Borrowable';

export default new GraphQLObjectType({
    name: 'Movie',
    interfaces: () => [Borrowable],
    fields: () => {
        const User = require('./User').default;
        const Library = require('./Library').default;
        const History = require('./History').default;
        return {
            id: { type: GraphQLID, resolve: (obj) => obj._id.toString() },
            title: { type: GraphQLString },
            author: { type: GraphQLString },
            date: { type: GraphQLString },
            library: { type: Library },
            imageUrl: { type: GraphQLString },
            genre: { type: new GraphQLList(movieGenre) },
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
