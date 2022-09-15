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
import Movie from '../../types/Movie';
import MongoMovie from '../../mongo/MongoMovie';

const createMovieMutation = mutationWithClientMutationId({
    name: 'createMovie',
    description: 'Create a movie',
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
        movie: { type: Movie },
    },
    mutateAndGetPayload: async (input) => {
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
            console.log('-------- createdBook --------');
            console.log(createdMovie);

            return { book: createdMovie };
        } catch (error) {
            console.log(error);
        }
        await session.commitTransaction();
        session.endSession();
        return null;
    },
});

export default createMovieMutation;
