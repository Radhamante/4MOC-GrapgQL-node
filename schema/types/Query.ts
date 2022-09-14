import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLUnionType,
} from 'graphql';
import Address from './Address';
import Book from './Book';
import Library from './Library';
import User from './User';
import History from './History';
import {
    address1,
    address2,
    address3,
    book1,
    book2,
    book3,
    library1,
    library2,
    library3,
    user1,
    user2,
    user3,
} from '../../fakeDB/fake';
import Movie from './Movie';
import SearchResult from '../unions/SearchResult';
import MongoBook from '../mongo/MongoBook';
import MongoLibrary from '../mongo/MongoLibrary';
import MongoUser from '../mongo/MongoUser';

const filterInput = new GraphQLInputObjectType({
    name: 'filter',
    fields: {
        start: {
            type: GraphQLInt,
            defaultValue: 0,
            description: 'Number of the first element',
        },
        count: {
            type: GraphQLInt,
            defaultValue: 20,
            description: 'Number of element needed after the first one',
        },
    },
});

export default new GraphQLObjectType({
    name: 'Query',
    fields: {
        books: {
            type: new GraphQLList(Book),
            args: {
                filter: {
                    type: filterInput,
                    description: 'Filter values',
                    defaultValue: {
                        start: 0,
                        count: 20,
                    },
                },
                query: {
                    type: GraphQLString,
                    description: 'search query (work on title, author)',
                },
            },
            resolve: async (obj, arg) => {
                const res: Array<any> = await MongoBook.find({});
                if (arg.query) {
                    // Recherche dans le tableau, les valeur où le title ou le author egale a la valeur de query
                    return res
                        .reduce<any>((bookList, book) => {
                            if (
                                book.title.includes(arg.query) ||
                                book.author.includes(arg.query)
                            ) {
                                bookList.push(book);
                            }
                            return bookList;
                        }, [])
                        .slice(
                            arg.filter.start,
                            arg.filter.count < 100 ? arg.filter.count : 100
                        );
                }
                return res.slice(
                    arg.filter.start,
                    arg.filter.count < 100 ? arg.filter.count : 100
                );
            },
        },
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
                return [book1, book2, book3].find((b) => b.id == arg.id);
            },
        },
        search: {
            type: SearchResult,
            description: 'search for anything',
            args: {
                filter: {
                    type: filterInput,
                    description: 'Filter values',
                },
                query: {
                    type: GraphQLString,
                    description: 'search query (work on title, author)',
                },
            },
            resolve: (obj, arg) => {
                const bookList = [book1, book2, book3];
                const libraryList = [library1, library2, library3];
                const userList = [user1, user2, user3];
                const reduced = <any>[];
                reduced.concat(
                    bookList.reduce<any>((list, element) => {
                        if (
                            element.title.includes(arg.query) ||
                            element.author.includes(arg.query)
                        ) {
                            list.push(element);
                        }
                        return list;
                    }, [])
                );
                reduced.concat(
                    userList.reduce<any>((list, element) => {
                        if (
                            element.name.includes(arg.query) ||
                            element.email.includes(arg.query)
                        ) {
                            list.push(element);
                        }
                        return list;
                    }, [])
                );
                reduced.concat(
                    libraryList.reduce<any>((list, element) => {
                        if (element.name.includes(arg.query)) {
                            list.push(element);
                        }
                        return list;
                    }, [])
                );
                console.log(reduced);
                if (arg.filter) {
                    reduced.slice(
                        arg.filter.start,
                        arg.filter.count < 100 ? arg.filter.count : 100
                    );
                }
            },
        },
        librarys: {
            type: new GraphQLList(Library),
            resolve: async () => {
                const res: Array<any> = await MongoLibrary.find({});
                console.log(res)
                return res
                return [library1, library2, library3];
            },
        },
        address: {
            type: new GraphQLList(Address),
            resolve: () => {
                return [address1, address2, address3];
            },
        },
        users: {
            type: new GraphQLList(User),
            resolve: async () => {
                const res: Array<any> = await MongoUser.find({});
                console.log(res)
                return res
                return [user1, user2, user3];
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
