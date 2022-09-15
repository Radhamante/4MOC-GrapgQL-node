import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import MongoMovie from '../../mongo/MongoMovie';
import Movie from '../../types/Movie';

const deleteMovieMutation = mutationWithClientMutationId({
    name: 'deleteMovie',
    description: 'delete a movie',
    inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
    },
    outputFields: {
        movie: { type: Movie },
    },
    mutateAndGetPayload: async (input) => {
        const session = await MongoMovie.startSession();
        session.startTransaction();
        try {
            const deletedMovie = await MongoMovie.findByIdAndDelete(
                input.id
            ).exec();

            return { book: deletedMovie };
        } catch (error) {
            console.log(error);
        }
        await session.commitTransaction();
        session.endSession();
        return null;
    },
});

export default deleteMovieMutation;
