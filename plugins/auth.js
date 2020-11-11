const fp = require("fastify-plugin");
const Boom = require('@hapi/boom');
const axios = require('axios').default;

module.exports = fp(async function (fastify, opts, done) {
    fastify.decorate("authenticate", async function (request, reply) {
        try {
            let {url, method} = request.context.config;
            console.log(request.context.config);
            const token = request.headers.authorization;
            let checkRBAC_API = await axios.post(`${process.env.AUTH_SEVER}/routes/check-permissions`, {
                endpoint: url.split('?')[0]+'clients',
                method: method
            }, {
                headers: { 'Authorization': `${token}` }
            });
            let checkRBAC = checkRBAC_API.data.data
            request.state = {
                user: checkRBAC.user
            }
            if (!checkRBAC.allow) {
                reply.code(403);
                throw Boom.forbidden(`You can't do this`);
            }
        } catch (err) {
            throw Boom.boomify(err, {statusCode: 403});
        }
    });
});