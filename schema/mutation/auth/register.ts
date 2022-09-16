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
    description: 'Register a new account',
    inputFields: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'New user name',
        },
        email: {
            type: new GraphQLNonNull(GraphQLEmail),
            description: 'New user email',
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'New user password',
        },
        gender: {
            type: new GraphQLNonNull(userGender),
            description: 'New user gender',
        },
    },
    outputFields: {
        token: {
            type: GraphQLString,
            description: "JWT token to save in 'autorization' header",
        },
        user: { type: User, description: 'Created user' },
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
