var auxils = require("./../auxils.js");

module.exports = async function (game, channel_name, permissions, id_name=null) {

  var config = game.config;
  var client = game.client;
  var guild = game.getGuild();

  // Default permissions
  //var default_cnb_permissions = {allow: ["VIEW_CHANNELS", "READ_MESSAGES"], deny: ["SEND_MESSAGES", "ADD_REACTIONS"], id: game.getGuild().id};

  var default_cnb_permissions = [{id: guild.id, deny: ["READ_MESSAGES", "SEND_MESSAGES", "ADD_REACTIONS"]}];

  if (!permissions) {
    permissions = default_cnb_permissions;
  } else {
    permissions = default_cnb_permissions.concat(permissions);
  };

  var lobby_category = guild.channels.find(x => x.name === config["channels"]["category"]);

  var channel = await guild.createChannel(channel_name, {type: "text", parent: lobby_category, permissionOverwrites: permissions});

  if (id_name) {
    game.setChannel(id_name, channel);
  } else {
    game.setChannel(channel_name, channel);
  };

  return channel;

};
