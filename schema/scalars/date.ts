import { GraphQLScalarType, Kind } from 'graphql';

const GraphQLDate = new GraphQLScalarType({
    name: 'DateTime',
    description: 'The ISO 8601 date format.',
    parseValue(value: any) {
        // Let's transform an ISO String into a JS Date.
        return new Date(value);
    },
    serialize(value: any) {
        // Let's transform a JS Date into an ISO String.
        return value;
    },
    parseLiteral(ast: any) {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value);
        }
        return null;
    },
});

export default GraphQLDate;
