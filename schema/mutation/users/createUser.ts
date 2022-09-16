import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import MongoUser from '../../mongo/MongoUser';
import userGender from '../../enum/userGender';
import User from '../../types/User';
import GraphQLEmail from '../../scalars/email';
import bcrypt from 'bcrypt';

const createUserMutation = mutationWithClientMutationId({
    name: 'createUser',
    description: 'Create a user',
    inputFields: {
        name: { type: new GraphQLNonNull(GraphQLString)! },
        email: { type: new GraphQLNonNull(GraphQLEmail) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        gender: { type: new GraphQLNonNull(userGender) },
        isAdmin: { type: new GraphQLNonNull(GraphQLBoolean) },
    },
    outputFields: {
        user: { type: User },
    },
    mutateAndGetPayload: async (input, context: any) => {
        if (!context.logged) {
            throw Error('User not logged');
        }
        if (!context.user.isAdmin) {
            return null;
        }
        const session = await MongoUser.startSession();
        session.startTransaction();
        try {
            const createdUser = await MongoUser.create({
                ...input,
                password: await bcrypt.hash(input.password, 10),
                historys: [],
                booksBorrowed: [],
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
