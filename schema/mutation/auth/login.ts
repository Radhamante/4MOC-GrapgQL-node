import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import MongoUser from '../../mongo/MongoUser';
import GraphQLEmail from '../../scalars/email';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../../env';

const loginMutation = mutationWithClientMutationId({
    name: 'login',
    description: 'login',
    inputFields: {
        email: { type: new GraphQLNonNull(GraphQLEmail) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    },
    outputFields: {
        token: { type: GraphQLString },
    },
    mutateAndGetPayload: async (input) => {
        const session = await MongoUser.startSession();
        session.startTransaction();
        try {
            const user = await MongoUser.findOne({ email: input.email }).exec();

            if (!user) {
                throw new Error('No user with that email');
            }

            const valid = await bcrypt.compare(input.password, user.password);

            if (!valid) {
                throw new Error('Incorrect password');
            }
            // return json web token
            return {
                token: jwt.sign(
                    { id: user.id, email: user.email },
                    JWT_SECRET_KEY,
                    { expiresIn: '1d' }
                ),
            };
        } catch (error) {
            console.log(error);
        }
        await session.commitTransaction();
        session.endSession();
    },
});

export default loginMutation;
