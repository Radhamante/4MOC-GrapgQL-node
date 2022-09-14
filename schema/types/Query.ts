import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLInputObjectType,
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

const filterInput = new GraphQLInputObjectType({
    name: "filter",
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
    }
})

export default new GraphQLObjectType({
    name: 'Query',
    fields: {
        books: {
            type: new GraphQLList(Book),
            args: {
                filter: {
                    type: filterInput,
                    description: "Filter values",
                },
                query: {
                    type: GraphQLString,
                    description: 'search query (work on title, author)',
                },
            },
            resolve: (obj, arg) => {
                if (arg.query) {
                    // Recherche dans le tableau, les valeur où le title ou le author egale a la valeur de query
                    return [book1, book2, book3]
                        .reduce<any>((bookList, book) => {
                            if (
                                book.title.includes(arg.query) ||
                                book.author.includes(arg.query)
                            ) {
                                bookList.push(book);
                            }
                            return bookList;
                        }, [])
                        .slice(arg.filter.start, arg.filter.count < 100 ? arg.filter.count : 100);
                }
                return [book1, book2, book3].slice(arg.filter.start, arg.filter.count < 100 ? arg.filter.count : 100);
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
            resolve: (obj, arg) => {
                return [book1, book2, book3].find((b) => b.id == arg.id);
            },
        },
        librarys: {
            type: new GraphQLList(Library),
            resolve: () => {
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
            resolve: () => {
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
