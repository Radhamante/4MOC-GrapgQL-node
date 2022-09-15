import { GraphQLObjectType } from 'graphql';
import borrowMutation from '../mutation/borrow/borrow';
import createBookMutation from '../mutation/books/createBook';
import createLibraryMutation from '../mutation/librarys/createLibrary';
import createUserMutation from '../mutation/users/createUser';
import deleteBookMutation from '../mutation/books/deleteBook';
import updateBookMutation from '../mutation/books/updateBook';
import unborrowMutation from '../mutation/borrow/unborrow';
import updateLibraryMutation from '../mutation/librarys/updateLibrary';
import deleteLibraryMutation from '../mutation/librarys/deleteLibrary';
import updateUserMutation from '../mutation/users/updateUser';
import deleteUserMutation from '../mutation/users/deleteUser';
import registerMutation from '../mutation/auth/register';
import loginMutation from '../mutation/auth/login';

export default new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createBook: createBookMutation,
        updateBook: updateBookMutation,
        deleteBook: deleteBookMutation,

        createLibrary: createLibraryMutation,
        updateLibrary: updateLibraryMutation,
        deleteLibrary: deleteLibraryMutation,

        createUser: createUserMutation,
        updateUser: updateUserMutation,
        deleteUser: deleteUserMutation,

        borrow: borrowMutation,
        unborrow: unborrowMutation,

        login: loginMutation,
        register: registerMutation,
    },
});
