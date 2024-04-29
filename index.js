import Fastify from "fastify";
import dbconnector from "./plugins/dbconnector.js";
import routes from "./plugins/routes.js";
import proccess from 'node:process';

const fastify = Fastify({logger: true});

fastify.register(dbconnector);
fastify.register(routes);


async function start() {
    try{
        await fastify.listen({port:5555});
    } catch (err) {
        fastify.log.error(err);
        proccess.exit(1);
    }
}

start();