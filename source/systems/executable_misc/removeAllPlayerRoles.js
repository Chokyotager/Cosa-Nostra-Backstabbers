module.exports = async function (guild, config) {

  await guild.fetchMembers();
  members = guild.members.array();

  var role = guild.roles.find(x => x.name === config["permissions"]["player"]);

  for (var i = 0; i < members.length; i++) {

    var member = members[i];

    if (member.roles.some(x => x.id === role.id)) {
      member.removeRole(role);
    };

  };

};
