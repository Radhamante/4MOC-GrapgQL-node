import { GraphQLObjectType, GraphQLUnionType } from 'graphql';
import Book from '../types/Book';
import Library from '../types/Library';
import Movie from '../types/Movie';
import User from '../types/User';

export default new GraphQLUnionType({
    name: 'SearchResultUnion',
    types: () => [Book, Movie, Library, User],
    resolveType: (obj) => {
        // return obj
        if (obj.isbn) {
            return "Book";
        }
        if (obj.books) {
            return "Library";
        }
        if (obj.isAdmin) {
            return "User";
        }
        return "Movie";
    },
});
