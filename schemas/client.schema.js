const tags = ['Client'];

const bodyJsonSchema = {
  properties: {
      firstName: {
          type: 'string'
      },
      lastName: {
          type: 'string'
      },
      email: {
          type: 'string'
      },
      phone: {
          type: 'string'
      },
      telegram: {
          type: 'string'
      },
      whatsapp: {
          type: 'string'
      },
      radiusToken: {
          type: 'string'
      },
      photo: {
          createPhoto: true
      }
  },
  required: [
      'firstName',
      'lastName',
      'email',
      'phone',
      'telegram',
      'whatsapp'
  ]
}

const filter = {
    limit: {
        type: 'string'
    },
    skip: {
        type: 'string'
    }
}
const queryStringJsonSchema = {
    type: 'object',
    properties: {
        populate: { type: 'string' },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        radiusToken: {
            type: 'string'
        },
        ...filter
    }
}
const paramsJsonSchema = {
    type: 'object',
    properties: {
        _id: {
            type: 'string',
            pattern: '^[0-9a-fA-F]{24}$'
        }
    },
    required: ['_id']
}
// const headersJsonSchema
const find = {

    tags: tags,

    querystring: queryStringJsonSchema,

    // headers: headersJsonSchema
}
const findOne = {
    tags: tags,

    params: paramsJsonSchema,

    // headers: headersJsonSchema
}
const create = {
    consumes: ['multipart/form-data'],

    tags: tags,

    body: bodyJsonSchema,

    // headers: headersJsonSchema
}

const update = {
    consumes: ['multipart/form-data'],

    tags: tags,

    body: {
        properties: {
            firstName: {
                type: 'string'
            },
            lastName: {
                type: 'string'
            },
            email: {
                type: 'string'
            },
            phone: {
                type: 'string'
            },
            telegram: {
                type: 'string'
            },
            whatsapp: {
                type: 'string'
            },
            radiusToken: {
                type: 'string'
            },
            photo: {
                updatePhoto: true
            }
        },
        required: [
            'firstName',
            'lastName',
            'email',
            'phone',
            'telegram',
            'whatsapp'
        ]
    },

    params: paramsJsonSchema,

    // headers: headersJsonSchema
}

const destroy = {
    tags: tags,

    params: paramsJsonSchema,

    // headers: headersJsonSchema
}

module.exports = {
    find,
    findOne,
    create,
    update,
    destroy
}