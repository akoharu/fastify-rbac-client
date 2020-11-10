'use strict'

// Read the .env file.
require('dotenv').config()

// Require the framework
const Fastify = require('fastify')

let logger = {
  prettyPrint: true,
}
if (process.env.NODE_ENV == 'production') {
  logger = false
}
function ajvPlugin(ajv, options) {
  ajv.addKeyword('createPhoto', {
    compile: (schema, parent, it) => {
      parent.type = 'file'
      delete parent.isFileType
      return () => true
    },
  })
  ajv.addKeyword('updatePhoto', {
    compile: (schema, parent, it) => {
      parent.type = 'file'
      delete parent.isFileType
      return () => true
    },
  })

  return ajv
}

// Instantiate Fastify with some config
const app = Fastify({
  logger: logger,
  pluginTimeout: 10000,
  ajv: { plugins: [ajvPlugin] } 
})

// Register your application as a normal plugin.
app.register(require('fastify-cors'), { origin: '*' });
app.register(require('./app.js'))

// Start listening.
app.listen(process.env.PORT || 1337, '0.0.0.0', (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
