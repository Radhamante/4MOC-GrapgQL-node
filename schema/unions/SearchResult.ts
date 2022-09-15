import { GraphQLUnionType } from 'graphql';
import Book from '../types/Book';
import Library from '../types/Library';
import Movie from '../types/Movie';
import User from '../types/User';

const searchResultUnion = new GraphQLUnionType({
    name: 'SearchResultUnion',
    types: () => [Book, Movie, Library, User],
    resolveType: (obj: any) => {
        // if (obj.borrower) {
        //   return Book;
        // }
        // if (obj.books) {
        //   return Library;
        // }
        // if (obj.isAdmin) {
        //   return User;
        // }
        // return Movie;
        return obj
    }
});
export default searchResultUnion
