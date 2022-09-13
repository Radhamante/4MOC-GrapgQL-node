import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import userGender from '../enum/userGender';
import Book from './Book';
import History from './History';

export default new GraphQLObjectType({
    name: 'User',
    fields: () => {
        return {
            id: { type: GraphQLID! },
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString },
            books_borrowed: { type: new GraphQLList(Book)! },
            isAdmin: { type: GraphQLBoolean! },
            gender: { type: userGender! },
            historys: { type: new GraphQLList(History)! },
        };
    },
});
