import {
    GraphQLFloat,
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
    name: 'Address',
    fields: () => {
        return {
            id: { type: GraphQLID, resolve: (obj) => obj._id.toString() },
            long: { type: GraphQLFloat },
            lat: { type: GraphQLFloat },
            name: { type: GraphQLString },
        };
    },
});
