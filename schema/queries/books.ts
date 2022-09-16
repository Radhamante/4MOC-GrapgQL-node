import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import filterArg from '../args/filter';
import MongoBook from '../mongo/MongoBook';
import Book from '../types/Book';

const booksQuery = {
    type: new GraphQLNonNull(new GraphQLList(Book)),
    args: {
        filter: filterArg,
        query: {
            type: GraphQLString,
            description: 'Filter on the title of the book',
        },
    },
    resolve: async (obj: any, arg: any, context: any) => {
        if (!context.logged) {
            throw Error('User not logged');
        }
        const resBooks: Array<any> = await MongoBook.find(
            arg.query ? { title: { $regex: arg.query, $options: 'i' } } : {}
        )
            .skip(arg.filter.start)
            .limit(arg.filter.count < 100 ? arg.filter.count : 100);
        resBooks.forEach((book) => (book.userCanBorrow = true));
        return resBooks;
    },
};

export default booksQuery;
