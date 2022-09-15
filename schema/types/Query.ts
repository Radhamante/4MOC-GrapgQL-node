import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLUnionType,
    GraphQLNonNull,
} from 'graphql';
import Address from './Address';
import Book from './Book';
import Library from './Library';
import User from './User';
import History from './History';
import Movie from './Movie';
import SearchResult from '../unions/SearchResult';
import MongoBook from '../mongo/MongoBook';
import MongoLibrary from '../mongo/MongoLibrary';
import MongoUser from '../mongo/MongoUser';
import books from '../queries/books';
import filterInput from '../inputs/filterInput';
import searchQuery from '../queries/search';
import libraryQuery from '../queries/library';

export default new GraphQLObjectType({
    name: 'Query',
    fields: {
        books: books,
        book: {
            type: Book,
            description: "Get one book by it's ID",
            args: {
                id: {
                    type: GraphQLID,
                    description: 'book ID',
                },
            },
            resolve: async (obj, arg) => {
                const session = await MongoBook.startSession();
                session.startTransaction();
                try {
                    const res = await MongoBook.find({});
                    console.log(res[0]._id.toString());
                } catch (error) {}
                await session.commitTransaction();
                session.endSession();
                return null
            },
        },
        search: searchQuery,
        librarys: libraryQuery,
        users: {
            type: new GraphQLList(User),
            resolve: async () => {
                const res: Array<any> = await MongoUser.find({});
                console.log(res);
                return res;
            },
        },
        history: {
            type: new GraphQLList(History),
            resolve: () => {
                return [];
            },
        },
    },
});
