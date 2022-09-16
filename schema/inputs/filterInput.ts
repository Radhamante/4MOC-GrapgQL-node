import { GraphQLInputObjectType, GraphQLInt } from 'graphql';

const filterInput = new GraphQLInputObjectType({
    name: 'filter',
    description: "Pagination values",
    fields: {
        start: {
            type: GraphQLInt,
            defaultValue: 0,
            description: 'Number of the first element',
        },
        count: {
            type: GraphQLInt,
            defaultValue: 20,
            description: 'Number of element needed after start',
        },
    },
});

export default filterInput;
