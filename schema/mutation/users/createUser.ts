import {
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import MongoUser from '../../mongo/MongoUser';
import userGender from '../../enum/userGender';
import User from '../../types/User';
import GraphQLEmail from '../../scalars/email';

const createUserMutation = mutationWithClientMutationId({
    name: 'createUser',
    description: 'Create a user',
    inputFields: {
        name: { type: new GraphQLNonNull(GraphQLString)! },
        email: { type: new GraphQLNonNull(GraphQLEmail) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        gender: { type: new GraphQLNonNull(userGender) },
    },
    outputFields: {
        user: { type: User },
    },
    mutateAndGetPayload: async (input) => {
        const session = await MongoUser.startSession();
        session.startTransaction();
        try {
            const createdUser = await MongoUser.create({
                ...input,
                historys: [],
                booksBorrowed: [],
                isAdmin: false,
            });
            console.log(createdUser);
            return { user: createdUser };
        } catch (error) {
            console.log(error);
        }
        await session.commitTransaction();
        session.endSession();
        return null;
    },
});

export default createUserMutation;
