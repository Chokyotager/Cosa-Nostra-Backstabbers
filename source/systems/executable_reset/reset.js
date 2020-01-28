module.exports = async function (client, config) {

  var guild = client.guilds.find(x => x.id === config["server-id"]);

  await guild.fetchMembers();
  members = guild.members.array();

  var role = guild.roles.find(x => x.name === config["permissions"]["player"]);

  for (var i = 0; i < members.length; i++) {

    var member = members[i];

    if (member.roles.some(x => x.id === role.id)) {
      member.removeRole(role);
    };

  };

  var lobby_category = guild.channels.find(x => x.name === config["channels"]["category"]);

  // Remove old channels in the category
  var child_channels = lobby_category.children.array();

  for (var i = 0; i < child_channels.length; i++) {

    await child_channels[i].replacePermissionOverwrites({overwrites: [{id: guild.id, allow: ["READ_MESSAGES", "VIEW_CHANNEL"], deny: ["SEND_MESSAGES", "ADD_REACTIONS"]}]});

  };

  var player_role = guild.roles.find(x => x.name === config["permissions"]["player"]);
  var lobby_channel = guild.channels.find(x => x.name === config["channels"]["lobby"]);

  await lobby_channel.overwritePermissions(guild.id, {"READ_MESSAGES": true});

  delete process.game;
  delete process.lobby;

}
