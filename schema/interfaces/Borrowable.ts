import {
    GraphQLBoolean,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';
import User from '../types/User';
import History from '../types/History';

export default new GraphQLInterfaceType({
    name: 'Borrowable',
    fields: {
        userCanBorrow: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: 'User have right to borrow this',
        },
        borrower: {
            type: User,
            description: 'User that currently borrow this',
        },
        history: {
            type: new GraphQLNonNull(new GraphQLList(History)),
            description: 'List of all previous borrows',
        },
    },
});
