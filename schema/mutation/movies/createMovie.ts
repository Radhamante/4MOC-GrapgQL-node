import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import MongoLibrary from '../../mongo/MongoLibrary';
import GraphQLDate from '../../scalars/date';
import Movie from '../../types/Movie';
import MongoMovie from '../../mongo/MongoMovie';
import movieGenre from '../../enum/movieGenre';

const createMovieMutation = mutationWithClientMutationId({
    name: 'createMovie',
    description: 'Create a movie',
    inputFields: {
        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Movie's title",
        },
        author: { type: GraphQLString, description: "Movie's author" },
        date: {
            type: new GraphQLNonNull(GraphQLDate),
            description: "Movie's date",
        },
        idLibrary: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Movie's library id",
        },
        imageUrl: { type: GraphQLString, description: "Movie's imageUrl" },
        genre: {
            type: new GraphQLNonNull(new GraphQLList(movieGenre)),
            description: "Movie's genre",
        },
    },
    outputFields: {
        movie: { type: Movie, description: 'Created movie' },
    },
    mutateAndGetPayload: async (input, context: any) => {
        if (!context.logged) {
            throw Error('User not logged');
        }
        if (!context.user.isAdmin) {
            return null;
        }
        console.log('test');
        const session = await MongoMovie.startSession();
        session.startTransaction();
        try {
            const library = await MongoLibrary.findById(
                input.idLibrary,
                'address'
            );
            console.log('--------- library --------');
            console.log(library);
            const createdMovie = await MongoMovie.create({
                ...input,
                borrower: null,
                library: library,
            });
            console.log('-------- createdMovie --------');
            console.log(createdMovie);

            return { movie: createdMovie };
        } catch (error) {
            console.log(error);
        }
        await session.commitTransaction();
        session.endSession();
        return null;
    },
});

export default createMovieMutation;
