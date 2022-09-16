import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
    name: 'HumanGender',
    description: 'User gender',
    values: {
        FEMALE: {
            value: 'FEMALE',
        },
        MALE: {
            value: 'MALE',
        },
        OTHER: {
            value: 'OTHER',
        },
    },
});
