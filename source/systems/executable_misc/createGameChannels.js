var createPrivateChannel = require("./createPrivateChannel.js");

module.exports = async function (game) {

  var config = game.config;
  var client = game.client;
  var guild = game.getGuild();

  var lobby_category = guild.channels.find(x => x.name === config["channels"]["category"]);

  var player_role = guild.roles.find(x => x.name === config["permissions"]["player"]);

  // Remove old channels in the category
  var child_channels = lobby_category.children.array();

  var deletions = new Array();

  for (var i = 0; i < child_channels.length; i++) {
    deletions.push(child_channels[i].delete());
  };

  await Promise.all(deletions);

  await createPrivateChannel(game, config["channels"]["game-channel"], {id: player_role.id, deny: ["SEND_MESSAGES"]});
  await createPrivateChannel(game, config["channels"]["log-channel"], {id: player_role.id, deny: ["VIEW_CHANNEL"]});

  // Create Mafia channel (if applicable)
  if (config["game"]["mafia"]["has-chat"]) {

    mafia_channel = await createPrivateChannel(game, config["game"]["mafia"]["chat-name"], {id: player_role.id, deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]}, "mafia");

    var mafia = game.findAll(x => x.see_mafia_chat === true);

    for (var i = 0; i < mafia.length; i++) {

      var member = mafia[i].getGuildMember();
      if (!member) {
        continue;
      };

      if (mafia[i].isAlive()) {
        await mafia_channel.overwritePermissions(member, {"READ_MESSAGES": true});
      };
    };

  };

};
