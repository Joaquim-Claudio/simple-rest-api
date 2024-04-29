import schemas from "../schemas/movie.js";


async function routes(fastify, options) {
    const client = fastify.db.client;


    fastify.get('/movies', {schema: schemas.allMovies}, async (request, reply) => {
        try {

            const {rows} = await client.query('SELECT * FROM movie ORDER BY id');
            reply.status(200).send(rows);

        } catch (err) {
            throw new Error(err);
        }
    })


    fastify.post('/movies', {schema: schemas.addMovie}, async (request, reply) => {
        
        const {title, description, duration} = request.body;
        
        const query = {
            text: 'INSERT INTO movie(title, description, duration) '+
                  'VALUES($1, $2, $3) RETURNING*',
            values: [title, description, duration]
        }

        try {

            const {rows} = await client.query(query);
            reply.status(201).send(rows);

        } catch (err) {
            throw new Error(err);
        }
    })

    fastify.put('/movies/:id', {schema: schemas.updateMovie}, async (request, reply) => {
        const id = request.params.id;
        const {title, description, duration} = request.body;

        const query = {
            text: 'UPDATE movie '+
                  'SET title=COALESCE($1, title), description=COALESCE($2, description), duration=COALESCE($3, duration) '+
                  'WHERE id=$4 RETURNING*',
            values: [title, description, duration, id]
        }

        try {

            const {rows} = await client.query(query);
            reply.status(200).send(rows);

        } catch (err) {
            throw new Error(err);
        }
    })


    fastify.delete('/movies/:id', {schema: schemas.deleteMovie}, async (request, reply) => {

        const query = {
            text: 'DELETE FROM movie '+
                  'WHERE id=$1 RETURNING*',
            values: [request.params.id]
        }

        try{

            const {rows} = await client.query(query);
            reply.status(200).send(rows);

        } catch (err) {
            throw new Error(err);
        }
    })
}

export default routes;