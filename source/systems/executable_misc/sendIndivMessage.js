module.exports = async function (game, identifier, message) {

  var client = game.client;
  var config = game.config;

  var guild = client.guilds.get(config["server-id"]);

  var role = game.getPlayerByIdentifier(identifier);

  await role.getPrivateChannel().send(message);

};
