import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { book1 } from '../../fakeDB/fake';
import bookGenre from '../enum/bookGenre';
import Library from '../types/Library';
import MongoBook from '../mongo/MongoBook';

const createBookMutation = mutationWithClientMutationId({
    name: 'createBook',
    description: 'Create a book',
    inputFields: {
        isbn: { type: GraphQLString! },
        title: { type: GraphQLString! },
        author: { type: GraphQLString },
        date: { type: GraphQLString! },
        idLibrary: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        genre: { type: new GraphQLList(bookGenre)! },
    },
    outputFields: {
        isbn: { type: GraphQLString! },
        title: { type: GraphQLString! },
        author: { type: GraphQLString },
        date: { type: GraphQLString! },
        library: { type: Library },
        imageUrl: { type: GraphQLString },
        genre: { type: new GraphQLList(bookGenre)! },
    },
    mutateAndGetPayload: async (input) => {
        const session = await MongoBook.startSession();
        session.startTransaction();
        try {
            const fetchedBook = await new MongoBook({
                title: input.title,
                idLibrary: input.idLibrary,
                date: input.date,
                isbn: input.isbn,
                name: 'input.name',
            }).save();
            console.log(fetchedBook);
        } catch (error) {
            console.log(error);
        }
        await session.commitTransaction();
        session.endSession();
        return book1;
    },
});

export default createBookMutation;
