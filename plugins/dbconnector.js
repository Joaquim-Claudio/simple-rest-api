import fastifyPlugin from "fastify-plugin";
import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const client = new pg.Client({
    host: process.env.DB_HOST,
    port: 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'example'
})

async function dbconnector(fastify, options) {
    console.log('Starting database server connection.');
    try{

        await client.connect();
        console.log('Database connected successfully.');
        fastify.decorate('db', {client});

    } catch(err) {
        console.log(err);
    }
}

export default fastifyPlugin(dbconnector);