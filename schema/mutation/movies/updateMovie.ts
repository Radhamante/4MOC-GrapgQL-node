import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import bookGenre from '../../enum/bookGenre';
import MongoLibrary from '../../mongo/MongoLibrary';
import GraphQLDate from '../../scalars/date';
import Movie from '../../types/Movie';
import MongoMovie from '../../mongo/MongoMovie';
import movieGenre from '../../enum/movieGenre';

const updateMovieMutation = mutationWithClientMutationId({
    name: 'updateMovie',
    description: 'update a movie',
    inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        date: { type: GraphQLDate },
        idLibrary: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        genre: { type: new GraphQLList(new GraphQLList(movieGenre)) },
    },
    outputFields: {
        movie: { type: Movie },
    },
    mutateAndGetPayload: async (input, context: any) => {
        if (!context.logged) {
            throw Error('User not logged');
        }
        if (!context.user.isAdmin) {
            return null;
        }
        const session = await MongoMovie.startSession();
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
            const updatedMovie = await MongoMovie.findByIdAndUpdate(input.id, {
                $set: { ...input, library },
            }).exec();
            console.log('-------- createdBook --------');
            console.log(updatedMovie);

            return { book: updatedMovie };
        } catch (error) {
            console.log(error);
        }
        await session.commitTransaction();
        session.endSession();
        return null;
    },
});

export default updateMovieMutation;
