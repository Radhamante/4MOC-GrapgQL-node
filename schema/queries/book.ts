import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import MongoBook from '../mongo/MongoBook';
import Book from '../types/Book';

const bookQuery = {
    description: "Search for a book by it's ID",
    type: Book,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'ID of the book',
        },
    },
    resolve: async (obj: any, arg: any, context: any) => {
        if (!context.logged) {
            throw Error('User not logged');
        }
        const resBook: any = await MongoBook.findById(arg.id).exec();
        if (resBook) {
            resBook.userCanBorrow = true;
        }
        return resBook;
    },
};

export default bookQuery;
