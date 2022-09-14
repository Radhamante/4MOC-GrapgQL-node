import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
    name: 'movieGenre',
    description: 'The possible genre for a movie',
    values: {
        THRILLER: {
            value: 'THRILLER',
        },
        SF: {
            value: 'SF',
        },
        FANTASTIC: {
            value: 'FANTASTIC',
        },
        POLAR: {
            value: 'POLAR',
        },
        SCHOLAR: {
            value: 'SCHOLAR',
        },
        ANIM: {
            value: 'ANIM',
        },
        ROMANCE: {
            value: 'ROMANCE',
        },
        ADVENTURE: {
            value: 'ADVENTURE',
        },
    },
});
