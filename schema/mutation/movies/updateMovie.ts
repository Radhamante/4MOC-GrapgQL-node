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
        id: { type: new GraphQLNonNull(GraphQLString), description: "Id of the movie to update" },
        title: { type: GraphQLString, description: "Movie's title" },
        author: { type: GraphQLString, description: "Movie's author" },
        date: { type: GraphQLDate, description: "Movie's date" },
        idLibrary: { type: GraphQLString, description: "Movie's library" },
        imageUrl: { type: GraphQLString, description: "Movie's imageUrl" },
        genre: {
            type: new GraphQLList(new GraphQLList(movieGenre)),
            description: "Movie's genre",
        },
    },
    outputFields: {
        movie: { type: Movie, description: "Updated movie" },
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

            return { movie: updatedMovie };
        } catch (error) {
            console.log(error);
        }
        await session.commitTransaction();
        session.endSession();
        return null;
    },
});

export default updateMovieMutation;
