import { mutationWithClientMutationId } from 'graphql-relay';
import MongoLibrary from '../../mongo/MongoLibrary';

const updateLibraryMutation = mutationWithClientMutationId({
    name: 'updateLibrary',
    description: 'update a library',
    inputFields: {},
    outputFields: {},
    mutateAndGetPayload: async (input) => {
        const session = await MongoLibrary.startSession();
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

export default updateLibraryMutation;
