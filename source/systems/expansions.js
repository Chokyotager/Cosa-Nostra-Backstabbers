var auxils = require("./auxils.js");
var config = auxils.config_handler();

var fs = require("fs");

var expansions_dir = __dirname + "/../../expansions/";
var expansions = getExpansions(config.playing.expansions);

module.exports = expansions;

function getExpansions (identifiers, scanned=new Array()) {

  var ret = new Array();

  for (var i = 0; i < identifiers.length; i++) {

    var identifier = identifiers[i].toLowerCase();

    if (identifier === "lcn") {
      throw new Error("Cannot have an expansion named \"lcn\"!");
    };

    if (scanned.some(x => x.identifier === identifier)) {
      // To prevent scanning twice
      return new Array();
    };

    var directory = expansions_dir + identifier;

    var is_directory = fs.lstatSync(directory).isDirectory();

    if (!is_directory) {
      throw new Error("Expansion directory " + directory + " does not exist.");
    };

    // Read information JSON
    var expansion = JSON.parse(fs.readFileSync(directory + "/expansion.json"));

    ret = ret.concat(getExpansions(expansion.dependencies, ret));

    // Add custom commands
    var command_types = attemptReaddir(directory + "/commands");
    var commands = new Object();

    for (var j = 0; j < command_types.length; j++) {

      var sub_directory = directory + "/commands/" + command_types[j];

      if (!commands[command_types[j]]) {
        commands[command_types[j]] = new Array();
      };

      commands[command_types[j]] = commands[command_types[j]].concat(attemptReaddir(sub_directory));

    };

    // Add information
    ret.push({identifier: identifier,
              expansion: expansion,
              additions: {
                assets: attemptReaddir(directory + "/assets"),
                roles: attemptReaddir(directory + "/roles"),
                flavours: attemptReaddir(directory + "/flavours"),
                role_win_conditions: attemptReaddir(directory + "/role_win_conditions"),
                attributes: attemptReaddir(directory + "/attributes"),
                commands: commands
              },
              scripts: {

                // Handles configuration on LOAD
                start: attemptRequiring(directory + "/scripts/start.js"),

                // Runs script when a game is primed
                game_prime: attemptRequiring(directory + "/scripts/game_primed.js"),

                // Runs script when a game is started
                game_start: attemptRequiring(directory + "/scripts/game_start.js"),

                // Runs script BEFORE a prime (usually to determine setup, return config)
                game_assign: attemptRequiring(directory + "/scripts/game_assign.js"),

                // Runs script on initialisation of the game object (same as prime, but before Mafia chat creation)
                game_init: attemptRequiring(directory + "/scripts/game_init.js"),

                // Runs script every cycle
                cycle: attemptRequiring(directory + "/scripts/cycle.js")

              }});

  };

  return ret;

};

function attemptReaddir (directory) {

  if (!fs.existsSync(directory)) {
    return new Array();
  };

  return fs.readdirSync(directory);

};

function attemptRequiring (directory) {
  var available = fs.existsSync(directory);

  if (available) {
    return require(directory);
  } else {
    return undefined;
  };

};
