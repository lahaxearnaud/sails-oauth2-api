/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function(cb) {
  // Create a user
  User.findOne({
    username: 'FN74CTMaHah5hcBM'
  }, function(err, user) {
    sails.log.blank();
    var password = UtilsService.uid(50);
    if (!user) {
      User.create({
        username: 'FN74CTMaHah5hcBM',
        password: password,
        admin: false
      }).exec(function(err, user) {
        if (err) {
          sails.log.error(err.message);
          return;
        }
        sails.log.info("Default user created");
        sails.log.info("- username: " + user.username);
        sails.log.info("- password: " + password);
        sails.log.blank();
      });
    } else {
      sails.log.info('Default user already exists');
      sails.log.info("- username: " + user.username);
      sails.log.info("- password: " + password);
      sails.log.blank();
    }
  });

  // Create an admin user
  User.findOne({
    username: 'TwNkQTAk9j3JwQEu'
  }, function(err, user) {
    sails.log.blank();
    var password = UtilsService.uid(50);
    if (!user) {
      User.create({
        username: 'TwNkQTAk9j3JwQEu',
        password: password,
        // only admin of the application at the moment
        admin: true
      }).exec(function(err, user) {
        if (err) {
          sails.log.error(err.message);
          return;
        }
        sails.log.info("Default admin user created");
        sails.log.info("- username: " + user.username);
        sails.log.info("- password: " + password);
        sails.log.blank();
      });
    } else {
      sails.log.info('Default admin user already exists');
      sails.log.info("- username: " + user.username);
      sails.log.info("- password: " + password);
      sails.log.blank();
    }
  });

  // Create a trusted application
  Client.findOne({
    name: 'ApiClient'
  }, function(err, client) {
    sails.log.blank();
    if (err) {
      sails.log.error(err.message);
    } else {
      if (!client) {
        Client.create({
          name: 'ApiClient'
        }).exec(function(err, client) {
          if (err) {
            sails.log.error(err.message);
          } else {
            sails.log.info("ApiClient created");
            sails.log.info("- client_id: " + client.clientId);
            sails.log.info("- client_secret: " + client.clientSecret);
            sails.log.blank();
          }
        });
      } else {
        sails.log.info('ApiClient already exists');
        sails.log.info("- client_id: " + client.clientId);
        sails.log.info("- client_secret: " + client.clientSecret);
        sails.log.blank();
      }
    }
  });

  cb();
};
