import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import MongoAdress from '../mongo/MongoAdress';
import Address from './Address';
import Book from './Book';

export default new GraphQLObjectType({
    name: 'Library',
    fields: () => {
        return {
            id: { type: GraphQLID, resolve: (obj) => obj._id.toString() },
            name: { type: GraphQLString },
            address: {
                type: Address,
                resolve: async (obj) => {
                    const address = await MongoAdress.findById(obj._id).exec();
                    return address;
                },
            },
            books: { type: new GraphQLList(Book) },
        };
    },
});
