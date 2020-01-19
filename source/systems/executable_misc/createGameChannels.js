module.exports = async function (game) {

  var config = game.config;
  var client = game.client;
  var guild = game.getGuild();

  var lobby_category = guild.channels.find(x => x.name === config["channels"]["category"]);

  // Remove old channels
  await deleteIfAvailable(config["channels"]["game-channel"]);
  await deleteIfAvailable(config["channels"]["log-channel"]);

  var game_channel = await guild.createChannel(config["channels"]["game-channel"], {type: "text", parent: lobby_category});
  var log_channel = await guild.createChannel(config["channels"]["log-channel"], {type: "text", parent: lobby_category});

  return [game_channel, log_channel];

  async function deleteIfAvailable (channel_name) {

    var channels = lobby_category.children.filter(x => x.name === channel_name).array();

    for (var i = 0; i < channels.length; i++) {

      await channels[i].delete();

    };

  };

};
