/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.routes = {

  // Resources endPoints

  '/api/info': {
    controller: 'InfoController',
    action: 'index'
  },

  '/swagger/doc': {
    cors: {
      origin: '*',
      methods: 'GET,OPTIONS,HEAD'
    },
    controller: 'SwaggerController',
    action: 'doc'
  }
}
