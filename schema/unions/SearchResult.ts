import { GraphQLUnionType } from 'graphql';
import Book from '../types/Book';
import Library from '../types/Library';
import Movie from '../types/Movie';
import User from '../types/User';

export default new GraphQLUnionType({
    name: 'Auth',
    types: [Book, Movie, Library, User],
});
