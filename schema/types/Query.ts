import { GraphQLObjectType, GraphQLList } from 'graphql';
import Address from './Address';
import Book from './Book';
import Library from './Library';
import User from './User';
import History from './History';
import { address1, address2, address3, book1, book2, book3, library1, library2, library3, user1, user2, user3 } from '../../fakeDB/fake';

export default new GraphQLObjectType({
    name: 'Query',
    fields: {
        books: {
            type: new GraphQLList(Book),
            resolve: () => {return [book1, book2, book3]}
        },
        librarys: {
            type: new GraphQLList(Library),
            resolve: () => {return [library1, library2, library3]}
        },
        address: {
            type: new GraphQLList(Address),
            resolve: () => {return [address1, address2, address3]}
        },
        users: {
            type: new GraphQLList(User),
            resolve: () => {return [user1, user2, user3]}
        },
        history: {
            type: new GraphQLList(History),
            resolve: () => {return []}
        }
    }
})