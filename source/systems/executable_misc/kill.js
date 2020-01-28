var logger = process.logger;

module.exports = async function (game, role) {

  var client = game.client;
  var config = game.config;

  role.kill();

  // Remove alive role
  var guild = client.guilds.get(config["server-id"]);

  var alive_role = guild.roles.find(x => x.name === config["permissions"]["player"]);

  var member = guild.members.get(role.id);

  if (member === undefined) {
    logger.log(3, "Trying to kill undefined user. Debugging?");
    return null;
  };

  member.removeRole(alive_role);

};
