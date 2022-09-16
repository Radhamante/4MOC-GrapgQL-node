import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
    name: 'movieGenre',
    description: 'Every movie genre',
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
