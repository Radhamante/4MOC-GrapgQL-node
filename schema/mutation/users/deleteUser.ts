import { mutationWithClientMutationId } from 'graphql-relay';
import MongoUser from '../../mongo/MongoUser';

const deleteUserMutation = mutationWithClientMutationId({
    name: 'deleteUser',
    description: 'delete a user',
    inputFields: {},
    outputFields: {},
    mutateAndGetPayload: async (input) => {
        const session = await MongoUser.startSession();
        session.startTransaction();
        try {
        } catch (error) {
            console.log(error);
        }
        await session.commitTransaction();
        session.endSession();
        return null;
    },
});

export default deleteUserMutation;
