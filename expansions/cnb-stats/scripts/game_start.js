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
    stats[i][2] = parseInt(stats[i][2]);
  };

  // Check players
  player_loop:
  for (var i = 0; i < players.length; i++) {

    var member = players[i].getGuildMember();

    // ID, common name, games played
    for (var j = 0; j < stats.length; j++) {

      if (stats[j][0] === member.id) {
          stats[j][2]++;
          continue player_loop;
      };

    };

    // Add new entry
    stats.push([member.id, member.user.username + "#" + member.user.discriminator, 1]);

  };

  fs.writeFileSync(stats_directory, stats.map(x => x.join("\t")).join("\n"));

  if (stats_config["alpha-role"]["enabled"]) {

    var role = guild.roles.find(x => x.name === stats_config["alpha-role"]["role"]);

    stats.sort(function (a, b) {
      return b[2] - a[2];
    });

    var gifted = new Array();

    for (var i = 0; i < stats.length; i++) {

      if (gifted.length >= stats_config["alpha-role"]["give-to"]) {
        break;
      };

      var member = guild.members.find(x => x.id === stats[i][0]);

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
    for (var i = 0; i < remove_from.length; i++) {

      remove_from[i].removeRole(role);

    };

  };

};
