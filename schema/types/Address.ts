import {
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
    name: 'Address',
    fields: () => {
        return {
            long: { type: GraphQLFloat! },
            lat: { type: GraphQLFloat! },
            name: { type: GraphQLString },
        };
    },
});
