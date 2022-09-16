import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import MongoBook from '../../mongo/MongoBook';
import Book from '../../types/Book';

const deleteBookMutation = mutationWithClientMutationId({
    name: 'deleteBook',
    description: 'delete a book',
    inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
    },
    outputFields: {
        book: { type: Book },
    },
    mutateAndGetPayload: async (input, context: any) => {
        if (!context.logged) {
            throw Error('User not logged');
        }
        if (!context.user.isAdmin) {
            return null;
        }
        const session = await MongoBook.startSession();
        session.startTransaction();
        try {
            const deletedBook = await MongoBook.findByIdAndDelete(
                input.id
            ).exec();

            return { book: deletedBook };
        } catch (error) {
            console.log(error);
        }
        await session.commitTransaction();
        session.endSession();
        return null;
    },
});

export default deleteBookMutation;
