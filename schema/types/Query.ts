import { GraphQLObjectType } from 'graphql';
import bookQuery from '../queries/book';
import booksQuery from '../queries/books';
import libraryQuery from '../queries/library';
import librarysQuery from '../queries/librarys';
import movieQuery from '../queries/movie';
import moviesQuery from '../queries/movies';
import searchQuery from '../queries/search';
import userQuery from '../queries/user';
import usersQuery from '../queries/users';

export default new GraphQLObjectType({
    name: 'Query',
    fields: {
        search: searchQuery,
        books: booksQuery,
        book: bookQuery,
        librarys: librarysQuery,
        library: libraryQuery,
        movies: moviesQuery,
        movie: movieQuery,
        users: usersQuery,
        user: userQuery,
    },
});
