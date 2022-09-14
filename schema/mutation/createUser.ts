import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { book1 } from '../../fakeDB/fake';
import bookGenre from '../enum/bookGenre';
import Library from '../types/Library';
import MongoBook from '../mongo/MongoBook';
import MongoLibrary from '../mongo/MongoLibrary';
import MongoUser from '../mongo/MongoUser';
import userGender from '../enum/userGender';
import User from '../types/User';

const createUserMutation = mutationWithClientMutationId({
    name: 'createUser',
    description: 'Create a user',
    inputFields: {
        name: { type: GraphQLString! },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        gender: { type: userGender },
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
