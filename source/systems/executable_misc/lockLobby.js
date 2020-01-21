module.exports = async function (game) {

  var config = game.config;
  var guild = game.getGuild();

  var player_role = guild.roles.find(x => x.name === config["permissions"]["player"]);
  var lobby_channel = guild.channels.find(x => x.name === config["channels"]["lobby"]);

  if (config["miscellaneous"]["lock-lobby-to-all"]) {
    await lobby_channel.overwritePermissions(guild.id, {"READ_MESSAGES": false});
  } else {
    await lobby_channel.overwritePermissions(player_role, {"READ_MESSAGES": false});
  };

};
