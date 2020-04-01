var auxils = require("../systems/auxils.js");

var roles = {
  "3": ["vanilla_townie", "vanilla_townie", "alien"],
  "4": ["vanilla_townie", "vanilla_townie", "alien", "mafioso"],
  "5": ["vanilla_townie", "vanilla_townie", "alien", "mafioso", "$VARIABLE$"],
  "6": ["vanilla_townie", "vanilla_townie", "sheriff", "alien", "mafioso", "$VARIABLE$"],
  "7": ["vanilla_townie", "vanilla_townie", "sheriff", "alien", "mafioso", "$VARIABLE$", "$VARIABLE$"],
  "7": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "alien", "mafioso", "$VARIABLE$", "$VARIABLE$"],
  "8": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "alien", "mafioso", "serial_killer", "$VARIABLE$", "$VARIABLE$"],
  "9": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "alien", "mafioso", "serial_killer", "$VARIABLE$", "$VARIABLE$", "$VARIABLE$"],
  "10": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "alien", "mafioso", "serial_killer", "$VARIABLE$", "$VARIABLE$", "$VARIABLE$"],
  "11": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "alien", "godfather", "serial_killer", "$VARIABLE$", "$VARIABLE$", "$VARIABLE$"],
  "12": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vigilante", "sheriff", "alien", "godfather", "serial_killer", "$VARIABLE$", "$VARIABLE$", "$VARIABLE$"],
  "13": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vigilante", "sheriff", "alien", "godfather", "serial_killer", "$VARIABLE$", "$VARIABLE$", "$VARIABLE$", "$VARIABLE$"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];

  var jailer_roles = ["jailkeeper", "detainer", "alien"];

  for (var i = 0; i < load_roles.length; i++) {

    if (load_roles[i] === "$VARIABLE$") {
      load_roles[i] = auxils.choice(jailer_roles);
    };

  };

  return [load_roles, game_parameters];

};

module.exports.NAME = "Arrested";
module.exports.VARIABLE_SETUP = true;
module.exports.INFO = "You have been arrested! Roles are rotatory.";
module.exports.AUTHORS = ["ChocoParrot"];
module.exports.PLAYER_LIMITS = [3, 13];
