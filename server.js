const Hapi   = require('hapi');
//Hapi plugins
const Boom   = require('boom');
const Joi    = require('joi');

//DB configs
const pgp    = require('pg-promise')();
/**********************************************************************/
//TODO -> Don't forget to tell pgp your pg config
/**********************************************************************/
const db          = pgp(`postgres://Warren@localhost:5432/workshop`);
//Models
const trackModule = require('./models/track');
//APIs
const SC          = require('./models/soundcloud');

//Server configs
const server = new Hapi.Server();
server.connection({
    port: 3001,
    host: 'localhost'
});


/*
    Search
 */

 /**********************************************************************/
 //TODO -> Let's implement search route here
 /**********************************************************************/
 server.route({
     method: 'GET',
     path: '/search',
     handler: (request, reply) => {
         const {q} = request.query;
         SC.searchTracks(q, (err, result) => {
             if (err) return Boom.badImplementation(err);
             reply(result);
         });
     },
     config: {
         validate: {
             query: {
                 q : Joi.string().required().allow('').allow(null),
             }
         }
     }
 });





/*
    Track
 */

 server.route({
     method: 'POST',
     path: '/track',
     handler: (request, reply) => {
         const track = request.payload;
         trackModule.insertTrack(db, track, (err, result) => {
             if (err) return reply(Boom.badImplementation(err));
             reply(result);
         });
     },
     config: {
         validate: {
             payload: {
                 id       : Joi.number().integer().required(),
                 detail   : Joi.object().required(),
                 comment  : Joi.string().required().allow('').allow(null),
             }
         }
     }
 });

server.route({
    method: 'GET',
    path: '/track',
    handler: (request, reply) => {
        const {filter} = request.query;
        trackModule.getTracks(db, filter, (err, result) => {
            if (err) return reply(Boom.badImplementation(err));
            reply(result);
        });
    },
    config: {
        validate: {
            query: {
                filter: Joi.string().valid('all', 'commented', 'nocomment').required(),
            }
        }
    }
});

server.route({
    method: 'PUT',
    path: '/track',
    handler: (request, reply) => {
        const track = request.payload;
        trackModule.updateTrack(db, track, (err, result) => {
            if (err) return reply(Boom.badImplementation(err));
            reply(result);
        });
    },
    config: {
        validate: {
            payload: {
                id       : Joi.number().integer().required(),
                detail   : Joi.object().required(),
                comment  : Joi.string().required().allow('').allow(null),
            }
        }
    }
});

/**********************************************************************/
//TODO -> Let's implement delete track route here
/**********************************************************************/
server.route({
    method: 'DELETE',
    path: '/track',
    handler: (request, reply) => {
        const track = request.payload;
        trackModule.removeTrack(db, track, (err, result) => {
            if (err) return reply(Boom.badImplementation(err));
            reply(result);
        });
    },
    config: {
        validate: {
            payload: {
                id       : Joi.number().integer().required(),
                detail   : Joi.object().required(),
                comment  : Joi.string().required().allow('').allow(null),
            }
        }
    }
});


server.start(err => {
    if (err) throw err;
    console.log(`Server running at ${server.info.uri}`);
});
