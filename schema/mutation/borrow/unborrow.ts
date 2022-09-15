import { mutationWithClientMutationId } from 'graphql-relay';
import MongoUser from '../../mongo/MongoUser';

const unborrowMutation = mutationWithClientMutationId({
    name: 'unborrow',
    description: 'unborrow a book by a user',
    inputFields: {
    },
    outputFields: {
    },
    mutateAndGetPayload: async (input) => {
        const session = await MongoUser.startSession();
        session.startTransaction();
        try {
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
