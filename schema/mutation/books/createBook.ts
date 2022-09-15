import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import bookGenre from '../../enum/bookGenre';
import MongoBook from '../../mongo/MongoBook';
import MongoLibrary from '../../mongo/MongoLibrary';
import Book from '../../types/Book';
import GraphQLDate from '../../scalars/date';
import MongoUser from '../../mongo/MongoUser';
import MongoAdress from '../../mongo/MongoAdress';
import MongoHistory from '../../mongo/MongoHistory';
import MongoMovie from '../../mongo/MongoMovie';

const createBookMutation = mutationWithClientMutationId({
    name: 'createBook',
    description: 'Create a book',
    inputFields: {
        isbn: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: GraphQLString },
        date: { type: new GraphQLNonNull(GraphQLDate) },
        idLibrary: { type: new GraphQLNonNull(GraphQLString) },
        imageUrl: { type: GraphQLString },
        genre: { type: new GraphQLNonNull(new GraphQLList(bookGenre)) },
    },
    outputFields: {
        book: { type: Book },
    },
    mutateAndGetPayload: async (input, context: any) => {
        if (!context.logged) {
            throw Error("User not logged")
        }
        if (!context.user.isAdmin) {
            return null
        }
        const session = await MongoBook.startSession();
        session.startTransaction();
        try {
            const library = await MongoLibrary.findById(input.idLibrary);
            console.log('--------- library --------');
            console.log(library);
            const createdBook = await MongoBook.create({
                ...input,
                borrower: null,
                library: library,
            });
            console.log('-------- createdBook --------');
            console.log(createdBook);
            await MongoLibrary.findByIdAndUpdate(input.idLibrary, {
                $push: { books: createdBook },
            });
            return { book: createdBook };
        } catch (error) {
            console.log(error);
        }
        await session.commitTransaction();
        session.endSession();
        return null;
    },
});

export default createBookMutation;
