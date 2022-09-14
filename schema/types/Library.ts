import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import Address from './Address';
import Book from './Book';

export default new GraphQLObjectType({
    name: 'Library',
    fields: () => {
        return {
            id: { type: GraphQLID, resolve: (obj) => obj._id.toString()},
            name: { type: GraphQLString },
            address: { type: Address },
            books: { type: new GraphQLList(Book) },
        };
    },
});
