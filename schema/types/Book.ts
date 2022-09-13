import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import bookGenre from '../enum/bookGenre';

export default new GraphQLObjectType({
    name: 'Book',
    fields: () => {
        const User = require("./User").default
        const Library = require("./Library").default
        const History = require("./History").default
        return {
            id: { type: GraphQLID! },
            isbn: { type: GraphQLString! },
            title: { type: GraphQLString! },
            author: { type: GraphQLString },
            date: { type: GraphQLString! },
            library: { type: Library },
            borrower: { type: User },
            imageUrl: { type: GraphQLString },
            genre: { type: new GraphQLList(bookGenre)! },
            history: { type: new GraphQLList(History)! },
        };
    },
});
