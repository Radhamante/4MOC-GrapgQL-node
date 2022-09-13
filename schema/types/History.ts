import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
    name: 'History',
    fields: () => {
        const Book = require('./Book').default;
        const User = require('./User').default;
        return {
            id: { type: GraphQLID! },
            book: { type: Book! },
            borrower: { type: User! },
            startDate: { type: GraphQLString! },
            endDate: { type: GraphQLString },
        };
    },
});
