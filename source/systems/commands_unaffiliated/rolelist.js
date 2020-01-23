var Setup = require("../game_templates/Setup.js");
var auxils = require("../auxils.js");
var executable = require("../executable.js");

module.exports = async function (message, params, config) {

  // Check if specific rolelist specified
  if (params.length > 0) {

    // Run the sampling
    var setup = new Setup();
    var best_match = setup.getSetupMatch(params[0]);

    if (best_match.score < 0.7) {

      await message.channel.send(":x: I cannot find that setup!");
      return null;

    };

    setup.setSetup(best_match.identifier);

    // Determine game
    var setup_name = setup.setup.NAME;
    var sample_text = setup.setup.VARIABLE ? " (sample) " : new String();

    if (params.length > 1) {

      var limit = parseInt(params[1]);

      if (isNaN(limit)) {
        await message.channel.send(":x: Wrong syntax! Please use `" + config["command-prefix"] + "rolelist <gamemode> [players]` instead!");
        return null;
      };

      if (setup.PLAYER_LIMITS[0] > limit || setup.PLAYER_LIMITS[1] < limit) {
        await message.channel.send(":x: The setup **" + setup_name + "** can only hold **" + setup.PLAYER_LIMITS[0] + "** - **" + setup.PLAYER_LIMITS[1] + "** player" + auxils.vocab("s", setup.PLAYER_LIMITS[1]) + "!");
        return null;
      };

      var output = setup.evaluateRange(limit, limit);

    } else {

      var output = setup.evaluateRange();
      
    };

    await message.channel.send(":clipboard: Role list for gamemode **" + setup_name + "**" + sample_text + "\n```ini\n" + evaluateRolelist(output) + "```");
    return null;

  };

  if (process.game) {

    var game = process.game;
    var setup = game.setup;

    // Determine game
    var setup_name = setup.setup.NAME;
    var sample_text = setup.setup.VARIABLE ? " (sample) " : new String();

    // Redefine config
    var config = game.config;
    var players = game.players.length;

    var output = setup.evaluateRange(players, players);

    await message.channel.send(":clipboard: Role list for current game [**" + setup_name + "**]" + sample_text + "\n```ini\n" + evaluateRolelist(output) + "```");
    return null;

  };

  if (process.lobby) {

    // Determine game
    var setup = process.lobby.setup;
    var setup_name = setup.setup.NAME;
    var sample_text = setup.setup.VARIABLE ? " (sample) " : new String();
    var output = setup.evaluateRange();

    await message.channel.send(":clipboard: Role list for gamemode **" + setup_name + "**" + sample_text + ":\n```ini\n" + evaluateRolelist(output) + "```");
    return null;

  };

  await message.channel.send(":x: Wrong syntax! Please use `" + config["command-prefix"] + "rolelist <gamemode> [players]` instead!");
  return null;

};

function evaluateRolelist (output) {

  var ret = new String();
  var keys = Object.keys(output);

  // Evaluate role list
  for (i = 0; i < keys.length; i++) {

    var entry = output[keys[i]];

    var roles = new Array();

    for (var j = 0; j < entry.roles.length; j++) {

      var identifier = entry.roles[j];
      var current_role = roles.find(x => x.identifier === identifier);

      if (!current_role) {

        roles.push({identifier: identifier, count: 1, role: executable.roles.getRole(entry.roles[j])})

      } else {

        current_role.count++;

      };

    };

    roles.sort(function (a, b) {
      return b.count - a.count;
    });

    if (keys.length === 1) {

      var alignments = new Array();

      // Find all alignments
      for (var j = 0; j < roles.length; j++) {

        if (!alignments.includes(cpl(roles[i].role.alignment))) {
          alignments.push(cpl(roles[i].role.alignment));
        };

      };

      alignments.sort();

      for (var j = 0; j < alignments.length; j++) {
        ret += "[" + alignments[j] + "] " + roles.filter(x => alignments[j] === cpl(x.role.alignment)).map(x => (x.count > 1 ? x.count + "x " : "") + cpl(x.role["role-name"])).join(", ") + "\n\n";

      };

    } else {
      ret += "[" + keys[i] + "] " + roles.map(x => (x.count > 1 ? x.count + "x " : "") + cpl(x.role["role-name"])).join(", ") + "\n\n";
    };

  };

  return ret;


};

function cpl (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
