import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import movieGenre from '../enum/movieGenre';
import Borrowable from '../interfaces/Borrowable';
import idResolver from '../resolvers/id';

export default new GraphQLObjectType({
    name: 'Movie',
    description: "A movie",
    interfaces: () => [Borrowable],
    fields: () => {
        const User = require('./User').default;
        const Library = require('./Library').default;
        const History = require('./History').default;
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID),
                resolve: idResolver,
            },
            title: { type: new GraphQLNonNull(GraphQLString) },
            author: { type: GraphQLString },
            date: { type: new GraphQLNonNull(GraphQLString) },
            library: { type: new GraphQLNonNull(Library) },
            imageUrl: { type: GraphQLString },
            genre: { type: new GraphQLNonNull(new GraphQLList(movieGenre)) },
            // From Borrowable
            userCanBorrow: {
                type: GraphQLBoolean,
                description: 'User have write to borrow this',
            },
            borrower: {
                type: User,
                description: 'User that currently borrow this',
            },
            history: {
                type: new GraphQLNonNull(new GraphQLList(History)),
                description: 'List of all previous borrows',
            },
        };
    },
});
