import { GraphQLObjectType } from 'graphql';
import borrowMutation from '../mutation/borrow';
import createBookMutation from '../mutation/createBook';
import createLibraryMutation from '../mutation/createLibrary';
import createUserMutation from '../mutation/createUser';

export default new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createBook: createBookMutation,
        createLibrary: createLibraryMutation,
        createUser: createUserMutation,
        borrow: borrowMutation
    },
});
