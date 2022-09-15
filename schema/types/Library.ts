import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import MongoAdress from '../mongo/MongoAdress';
import booksQuery from '../queries/books';
import idResolver from '../resolvers/id';
import Address from './Address';

export default new GraphQLObjectType({
    name: 'Library',
    fields: () => {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID),
                resolve: idResolver,
            },
            name: { type: new GraphQLNonNull(GraphQLString) },
            address: {
                type: new GraphQLNonNull(Address),
                resolve: async (obj) => {
                    const address = await MongoAdress.findById(
                        obj.address
                    ).exec();
                    return address;
                },
            },
            books: booksQuery,
        };
    },
});
