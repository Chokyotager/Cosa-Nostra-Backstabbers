var auxils = require("../auxils.js");

module.exports = async function (message, params, config) {

  var member = message.member;
  var guild = message.client.guilds.find(x => x.id === config["server-id"]);
  var role = guild.roles.find(x => x.name === config["permissions"]["notify"]);

  if (message.member && process.lobby && process.lobby.players.some(x => x.id === message.member.id) && params.length === 0) {

    // Notify
    var online_members = guild.members.filter(x => x.id !== message.member.id && x.roles.some(y => y.id === role.id) && x.user.presence.status !== "offline" && !process.lobby.players.some(y => y.id === x.id)).array();
    var pings = online_members.length > 0 ? auxils.pettyFormat(online_members.map(x => "<@" + x.id + ">")) : "nobody :(";
    await message.channel.send(":exclamation: **" + message.member.displayName + "** is pinging: " + pings);
    return null;

  } else if (params.length < 1) {

    await message.channel.send(":x: Wrong syntax! Try using `" + config["command-prefix"] + "notify <on/off>` instead!");
    return null;

  };

  var has_role = member.roles.some(x => x.id === role.id);

  switch (params[0].toLowerCase()) {

    case "on":
      if (has_role) {
        message.channel.send(":x: You already have the notification role!");
        return null;
      };

      await member.addRole(role);
      await message.channel.send(":exclamation: Successfully added the notification role. Use `" + config["command-prefix"] + "notify off` to remove it.");
      break;

    case "off":
       if (!has_role) {
         message.channel.send(":x: You do not have the notification role!");
         return null;
       };

       await member.removeRole(role);
       await message.channel.send(":exclamation: Successfully removed the notification role. Use `" + config["command-prefix"] + "notify on` to add it again.");
       break;

    default:
      await message.channel.send(":x: Wrong syntax! Try using `" + config["command-prefix"] + "notify <on/off>` instead!");
      return null;

  };

};
