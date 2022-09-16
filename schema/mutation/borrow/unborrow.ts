import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import History from '../../types/History';
import MongoUser from '../../mongo/MongoUser';
import MongoHistory from '../../mongo/MongoHistory';
import Book from '../../types/Book';
import User from '../../types/User';
import MongoBook from '../../mongo/MongoBook';

const unborrowMutation = mutationWithClientMutationId({
    name: 'unborrow',
    description: 'unborrow a book by a user',
    inputFields: {
        book: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: new GraphQLNonNull(GraphQLString) },
    },
    outputFields: {
        history: { type: new GraphQLNonNull(History) },
        book: { type: new GraphQLNonNull(Book) },
        user: { type: new GraphQLNonNull(User) },
    },
    mutateAndGetPayload: async (input, context: any) => {
        if (!context.logged) {
            throw Error('User not logged');
        }
        const session = await MongoUser.startSession();
        session.startTransaction();
        try {
            const historyToUpdate = await MongoHistory.findOneAndUpdate({book:input.book, user:input.user, endDate:null}, {
                $set: { endDate: Date.now() },
            }).exec();
            // const updatedHistory = await MongoHistory.updateOne({
            //     endDate: Date.now(),
            // });
            const updatedBook = await MongoBook.findByIdAndUpdate( input.book,{
                $set: { borrower: null},
            }).exec();
            const updateUser = await MongoUser.findByIdAndUpdate( input.user,{
                $pull: {booksBorrowed: input.book},
            }).exec();
            return {history: historyToUpdate, book: updatedBook, user: updateUser}
        } catch (error) {
            console.log('########### error ##########');
            console.log(error);
        }
    
        await session.commitTransaction();
        session.endSession();
        return null;
    },
});

export default unborrowMutation;
