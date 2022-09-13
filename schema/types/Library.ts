import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import Address from './Address';
import Book from './Book';

export default new GraphQLObjectType({
    name: 'Library',
    fields: () => {
        return {
            id: { type: GraphQLID! },
            name: { type: GraphQLString! },
            address: { type: Address! },
            books: { type: new GraphQLList(Book)! },
        };
    },
});
