import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import MongoBook from '../../mongo/MongoBook';
import MongoHistory from '../../mongo/MongoHistory';
import MongoUser from '../../mongo/MongoUser';
import History from '../../types/History';

const borrowMutation = mutationWithClientMutationId({
    name: 'borrow',
    description: 'borrow a book by a user',
    inputFields: {
        book: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: new GraphQLNonNull(GraphQLString) },
    },
    outputFields: {
        history: { type: new GraphQLNonNull(History) },
    },
    mutateAndGetPayload: async (input, context: any) => {
        if (!context.logged) {
            throw Error('User not logged');
        }
        const session = await MongoUser.startSession();
        session.startTransaction();
        try {
            const createdHistory = await MongoHistory.create({
                book: input.book,
                borrower: input.user,
                startDate: Date.now(),
                endDate: null,
            });
            console.log(createdHistory);
            const newBorrower = await MongoUser.findByIdAndUpdate(input.user, {
                $push: { booksBorrowed: input.book },
            }).exec();
            console.log(newBorrower);
            const bookBorrowed = await MongoBook.findByIdAndUpdate(input.book, {
                $set: { borrower: input.user },
            }).exec();
            console.log(bookBorrowed);
            return {
                history: createdHistory,
                user: newBorrower,
                book: bookBorrowed,
            };
        } catch (error) {
            console.log('########### error ##########');
            console.log(error);
        }
        await session.commitTransaction();
        session.endSession();
        return null;
    },
});

export default borrowMutation;
