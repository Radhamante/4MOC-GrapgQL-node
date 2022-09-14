import { GraphQLBoolean, GraphQLInterfaceType, GraphQLList } from 'graphql';
import User from '../types/User';
import History from '../types/History';

export default new GraphQLInterfaceType({
    name: 'Borrowable',
    fields: {
        userCanBorrow: {
            type: GraphQLBoolean,
            description: 'User have write to borrow this',
        },
        borrower: {
            description: 'User that currently borrow this',
            type: User,
        },
        history: {
            type: new GraphQLList(History),
            description: 'List of all previous borrows',
        },
    },
});
