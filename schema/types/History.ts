import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import MongoBook from '../mongo/MongoBook';
import MongoUser from '../mongo/MongoUser';

export default new GraphQLObjectType({
    name: 'History',
    fields: () => {
        const Book = require('./Book').default;
        const User = require('./User').default;
        return {
            id: { type: GraphQLID, resolve: (obj) => obj._id.toString() },
            book: {
                type: Book,
                resolve: async (obj) => {
                    return await MongoBook.findById(obj.book).exec();
                },
            },
            borrower: {
                type: User,
                resolve: async (obj) => {
                    return await MongoUser.findById(obj.borrower).exec();
                },
            },
            startDate: { type: GraphQLString },
            endDate: { type: GraphQLString },
        };
    },
});
