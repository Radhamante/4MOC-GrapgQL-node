import { GraphQLObjectType } from "graphql";
import bookQuery from "../queries/book";
import booksQuery from "../queries/books";
import librarysQuery from "../queries/librarys";
import searchQuery from "../queries/search";


export default new GraphQLObjectType({
    name: 'Query',
    fields: {
        search: searchQuery,
        books: booksQuery,
        book: bookQuery,
        librarys: librarysQuery,
    },
});
