module.exports = async function (game) {

  if (game.channels.mafia !== undefined) {

    var channel = game.getChannel("mafia");

    var mafia = game.findAll(x => x.see_mafia_chat === true);

    for (var i = 0; i < mafia.length; i++) {

      var member = mafia[i].getGuildMember();
      if (!member) {
        continue;
      };

      if (mafia[i].isAlive()) {
        await channel.overwritePermissions(member, {"SEND_MESSAGES": false, "READ_MESSAGES": true});
      };
    };

  };

};
