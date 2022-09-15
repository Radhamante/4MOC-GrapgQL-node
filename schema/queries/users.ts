import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import filterArg from '../args/filter';
import MongoUser from '../mongo/MongoUser';
import Users from '../types/User';

const usersQuery = {
    type: new GraphQLNonNull(new GraphQLList(Users)),
    args: {
        filter: filterArg,
        query: {
            type: GraphQLString,
            description: 'Filter on the name of the users',
        },
    },
    resolve: async (obj: any, arg: any, context: any) => {
        if (!context.logged) {
            throw Error('User not logged');
        }
        const res: Array<any> = await MongoUser.find(
            arg.query ? { title: { $regex: arg.query, $options: 'i' } } : {}
        )
            .skip(arg.filter.start)
            .limit(arg.filter.count < 100 ? arg.filter.count : 100);
        return res;
    },
};

export default usersQuery;
