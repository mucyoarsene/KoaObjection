const Knex = require("knex");
const { Model } = require("objection");

const knex = Knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'knexjs'
    }
});

Model.knex(knex);

module.exports = knex;