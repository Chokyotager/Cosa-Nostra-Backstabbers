module.exports = async function (message, params, config) {

  var guild = message.guild;

  await guild.fetchMembers();
  members = guild.members.array();

  var role = guild.roles.find(x => x.name === config["permissions"]["player"]);

  for (var i = 0; i < members.length; i++) {

    var member = members[i];

    if (member.roles.some(x => x.id === role.id)) {
      member.removeRole(role);
    };

  };

  await message.channel.send(":ok: Reset all player roles.");

};
