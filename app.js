'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const fastifyJWT = require('fastify-jwt');

module.exports = async function (fastify, opts) {  
  fastify.register(fastifyJWT, {
    secret: process.env.JWT_SECRET
  });
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })
  fastify.register(require('fastify-multipart'), {
    addToBody: true
  });
  
  fastify.register(require('fastify-swagger'), {
    swagger: {
      info: {
        title: 'CLIENT API',
        description: 'CLIENT API documentation API',
        version: '0.1.0'
      },
      tags: [
        { name: 'Client', description: 'Client related end-points' },
        { name: 'Subscription', description: 'Subscription related end-points' }
      ],  
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      },
      security: [
        {
          "apiKey": []
        }
      ]
    },  
    exposeRoute: true,
    routePrefix: '/documentations'
  });
  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
  
}
