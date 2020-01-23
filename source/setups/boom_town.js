var roles = {
  "3": ["vanilla_townie", "vanilla_townie", "serial_killer"],
  "4": ["vanilla_townie", "vanilla_townie", "pyromaniac", "reactionary"],
  "5": ["vanilla_townie", "vanilla_townie", "sheriff", "pyromaniac", "pyromaniac"],
  "6": ["vanilla_townie", "vanilla_townie", "sheriff", "pyromaniac", "pyrofather", "reactionary"],
  "7": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "pyromaniac", "pyrofather", "reactionary"],
  "8": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "pyromaniac", "pyrofather", "reactionary"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Boom Town!";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "The default game.";
module.exports.PLAYER_LIMITS = [3, 8];
