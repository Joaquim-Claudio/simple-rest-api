
const allMovies = {
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                required: ['id', 'title', 'description', 'duration'],
                properties: {
                    id: {type: 'integer'},
                    title: {type: 'string'},
                    description: {type: 'string'},
                    duration: {type: 'integer'}
                }
            }
        }
    }
}

const addMovie = {
    body: {
        type: 'object',
        required: ['title'],
        properties: {
            title: {type: 'string'},
            description: {type: 'string', nullable:true, default:null},
            duration: {type: 'integer', nullable:true, default:0}
        }
    },
    response: {
        201:{
            type:'object',
            properties: {
                created: {type: 'boolean'}
            }
        }
    }
}


const updateMovie = {
    body: {
        type: 'object',
        properties: {
            title: {type: 'string'},
            description: {type: 'string', nullable:true, default:null},
            duration: {type: 'integer', nullable:true, default:0}
        }
    },
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: {type: 'integer'}
        }
    }
}

const deleteMovie = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: {type: 'integer'}
        }
    }
}

export default {allMovies, addMovie, updateMovie, deleteMovie}