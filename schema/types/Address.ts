import {
    GraphQLFloat,
    GraphQLID,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
    name: 'Address',
    fields: () => {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID),
                resolve: (obj) => obj._id.toString(),
            },
            long: { type: new GraphQLNonNull(GraphQLFloat) },
            lat: { type: new GraphQLNonNull(GraphQLFloat) },
            name: { type: new GraphQLNonNull(GraphQLString) },
        };
    },
});
