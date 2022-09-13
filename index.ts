import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import defaultQuery from './queries/defaultQuery';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var app = express();
app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: {
            defaultQuery,
        },
    })
);
app.use('/', (_, res) => {
    res.redirect('/graphql');
});

const MONGO_USER = "admin"
const MONGO_PASSWORD = "admin"
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.wsixukh.mongodb.net/?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
    .connect(uri, options)
    .then(() => {
        app.listen(4000);
        console.log(
            'Running a GraphQL API server at http://localhost:4000/graphql'
        );
    })
    .catch((error: any) => {
        throw error;
    });
