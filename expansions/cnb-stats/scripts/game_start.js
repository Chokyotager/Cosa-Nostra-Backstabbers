var fs = require("fs");
var lcn = require("../../../source/lcn.js");

var stats_directory = process.directories.data + "stats.tsv";
var stats_config = JSON.parse(fs.readFileSync(__dirname + "/../config.json"));

module.exports = function (game) {

  // Track stats
  var players = game.players;
  var guild = game.getGuild();

  if (!fs.existsSync(stats_directory)) {
    var stats = new Array();
  } else {
    var stats = fs.readFileSync(stats_directory, "utf8").split("\n").map(x => x.split("\t")).filter(x => x.length > 1);
  };

  for (var i = 0; i < stats.length; i++) {
    stats[i][2] = parseFloat(stats[i][2]);
    // Calculate decay
    stats[i][2] *= stats_config["decay"];
  };

  // Check players
  player_loop:
  for (var i = 0; i < players.length; i++) {

    var member = players[i].getGuildMember();

    // ID, common name, games played
    for (var j = 0; j < stats.length; j++) {

      if (stats[j][0] === member.id) {
          stats[j][2] += players.length / 3;
          continue player_loop;
      };

    };

    // Add new entry
    stats.push([member.id, member.user.username + "#" + member.user.discriminator, 1]);

  };

  fs.writeFileSync(stats_directory, stats.map(x => x.join("\t")).join("\n"));

  if (stats_config["award-roles"]["enabled"]) {

    for (i = 0; i < stats_config["award-roles"]["roles"].length; i++) {

      var gift_role = stats_config["award-roles"]["roles"][i];

      var role = guild.roles.find(x => x.name === gift_role["role"]);

      stats.sort(function (a, b) {
        return b[2] - a[2];
      });

      var gifted = new Array();

      for (var j = 0; j < stats.length; j++) {

        if (gifted.length >= gift_role["give-to"]) {
          break;
        };

        var member = guild.members.find(x => x.id === stats[j][0]);

        if (!member) {
          continue;
        };

        // Give role
        if (member.roles.find(x => x.id === role.id)) {
          gifted.push(member.id);
          continue;
        };

        // Assign role
        member.addRole(role);
        gifted.push(member.id);

      };

      // Remove roles from all that previously have it
      var remove_from = guild.members.filter(x => !gifted.includes(x.id) && x.roles.some(y => y.id === role.id)).array();
      for (var j = 0; j < remove_from.length; j++) {

        remove_from[j].removeRole(role);

      };

    };

  };

};
