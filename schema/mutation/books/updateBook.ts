import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import bookGenre from '../../enum/bookGenre';
import MongoBook from '../../mongo/MongoBook';
import MongoLibrary from '../../mongo/MongoLibrary';
import Book from '../../types/Book';
import GraphQLDate from '../../scalars/date';

const updateBookMutation = mutationWithClientMutationId({
    name: 'updateBook',
    description: 'update a book',
    inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        isbn: { type: GraphQLString },
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        date: { type: GraphQLDate },
        idLibrary: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        genre: { type: new GraphQLList(new GraphQLList(bookGenre))! },
    },
    outputFields: {
        book: { type: Book },
    },
    mutateAndGetPayload: async (input) => {
        const session = await MongoBook.startSession();
        session.startTransaction();
        try {
            let library;
            if (input.idLibrary) {
                library = await MongoLibrary.findById(
                    input.idLibrary,
                    'address'
                );
                console.log('--------- library --------');
                console.log(library);
            }
            const updatedBook = await MongoBook.findByIdAndUpdate(input.id, {
                $set: { ...input, library },
            }).exec();
            console.log('-------- createdBook --------');
            console.log(updatedBook);

            return { book: updatedBook };
        } catch (error) {
            console.log(error);
        }
        await session.commitTransaction();
        session.endSession();
        return null;
    },
});

export default updateBookMutation;
