import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import userGender from '../../enum/userGender';
import MongoUser from '../../mongo/MongoUser';
import GraphQLEmail from '../../scalars/email';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../../env';
import User from '../../types/User';

const registerMutation = mutationWithClientMutationId({
    name: 'register',
    description: 'register',
    inputFields: {
        name: { type: new GraphQLNonNull(GraphQLString)! },
        email: { type: new GraphQLNonNull(GraphQLEmail) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        gender: { type: new GraphQLNonNull(userGender) },
    },
    outputFields: {
        token: { type: GraphQLString },
        user: { type: User },
    },
    mutateAndGetPayload: async (input) => {
        const session = await MongoUser.startSession();
        session.startTransaction();
        try {
            const createdUser = await MongoUser.create({
                ...input,
                password: await bcrypt.hash(input.password, 10),
                historys: [],
                booksBorrowed: [],
                isAdmin: false,
            });
            console.log(createdUser);
            // return json web token
            return {
                token: jwt.sign(
                    { id: createdUser.id, email: createdUser.email },
                    JWT_SECRET_KEY,
                    { expiresIn: '1y' }
                ),
                user: createdUser,
            };
        } catch (error) {
            console.log(error);
        }
        await session.commitTransaction();
        session.endSession();
    },
});

export default registerMutation;
