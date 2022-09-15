import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import MongoUser from '../mongo/MongoUser';
import User from '../types/User';

const userQuery = {
    description: "Search for a user by it's ID",
    type: User,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'ID of the user',
        },
    },
    resolve: async (obj: any, arg: any, context: any) => {
        if (!context.logged) {
            throw Error('User not logged');
        }
        const res = await MongoUser.findById(arg.id).exec();
        console.log(res)
        return res;
    },
};

export default userQuery;
