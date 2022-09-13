import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
    name: 'bookGenre',
    description: 'The possible genre for a book',
    values: {
        THRILLER: {
            value: 'THRILLER',
        },
        SF: {
            value: 'SF',
        },
        ROMAN: {
            value: 'ROMAN',
        },
        FANTASTIC: {
            value: 'FANTASTIC',
        },
        POLAR: {
            value: 'POLAR',
        },
        POETRY: {
            value: 'POETRY',
        },
        NOVEL: {
            value: 'NOVEL',
        },
        SCHOLAR: {
            value: 'SCHOLAR',
        },
        BD: {
            value: 'BD',
        },
        MANGA: {
            value: 'MANGA',
        },
        KIDS: {
            value: 'KIDS',
        },
        TALE: {
            value: 'TALE',
        },
        ESSAY: {
            value: 'ESSAY',
        },
        ROMANCE: {
            value: 'ROMANCE',
        },
        ADVENTURE: {
            value: 'ADVENTURE',
        },
    },
});
