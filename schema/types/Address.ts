import {
    GraphQLFloat,
    GraphQLID,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import idResolver from '../resolvers/id';

export default new GraphQLObjectType({
    name: 'Address',
    description: "An address",
    fields: () => {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID),
                resolve: idResolver,
            },
            long: { type: new GraphQLNonNull(GraphQLFloat) },
            lat: { type: new GraphQLNonNull(GraphQLFloat) },
            name: { type: new GraphQLNonNull(GraphQLString) },
        };
    },
});
