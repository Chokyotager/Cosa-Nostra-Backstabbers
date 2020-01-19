module.exports = async function (game) {
  // Open up simple chats

  var config = game.config;
  var client = game.client;

  var guild = client.guilds.find(x => x.id === config["server-id"]);

  // Should only be set once
  var player = guild.roles.find(x => x.name === config["permissions"]["player"]);

  var post_perms = config["base-perms"]["post"];

  await setPermissions([game.getMainChannel()], player, post_perms);

};

async function setPermissions (channels, role, permissions) {
  for (var i = 0; i < channels.length; i++) {

    if (channels[i] === null) {
      continue;
    };

    await channels[i].overwritePermissions(role, permissions);

  };
};
