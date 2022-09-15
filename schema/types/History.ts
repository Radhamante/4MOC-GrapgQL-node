import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import MongoBook from '../mongo/MongoBook';
import MongoUser from '../mongo/MongoUser';
import idResolver from '../resolvers/id';
import GraphQLDate from '../scalars/date';

export default new GraphQLObjectType({
    name: 'History',
    fields: () => {
        const Book = require('./Book').default;
        const User = require('./User').default;
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID),
                resolve: idResolver,
            },
            book: {
                type: new GraphQLNonNull(Book),
                resolve: async (obj) => {
                    return await MongoBook.findById(obj.book).exec();
                },
            },
            borrower: {
                type: new GraphQLNonNull(User),
                resolve: async (obj) => {
                    return await MongoUser.findById(obj.borrower).exec();
                },
            },
            startDate: { type: new GraphQLNonNull(GraphQLDate) },
            endDate: { type: GraphQLDate },
        };
    },
});
