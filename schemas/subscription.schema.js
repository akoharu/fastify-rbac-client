const tags = ['Subscription'];

const bodyJsonSchema = {
    type: 'object',
    properties: {
        client: {
            type: 'string',
            'x-ref': 'Client',
            description: 'Refers to Client',
            pattern: '^[0-9a-fA-F]{24}$'
        },
        startedAt: {
            type: 'string',
            format: 'date-time'
        },
        finishedAt: {
            type: 'string',
            format: 'date-time'
        }
    },
    required: ['client', 'startedAt', 'finishedAt']
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
      client: {
        type: 'string',
        'x-ref': 'Client',
        description: 'Refers to Client',
        pattern: '^[0-9a-fA-F]{24}$'
      },
      populate: { type: 'string' },
      startedAt: { type: 'string', format: 'date-time' },
      finishedAt: { type: 'string', format: 'date-time' },
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
    tags: tags,

    body: bodyJsonSchema,

    // headers: headersJsonSchema
}

const update = {
    tags: tags,

    body: bodyJsonSchema,

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