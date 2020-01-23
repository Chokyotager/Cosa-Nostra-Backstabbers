var roles = {
  "1": ["vanilla_townie"],
  "2": ["vanilla_townie", "vanilla_townie"],
  "3": ["vanilla_townie", "vanilla_townie", "mafioso"],
  "4": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "mafioso"],
  "5": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "mafioso"],
  "6": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "mafioso", "godfather"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Test";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "The test game.";
module.exports.PLAYER_LIMITS = [1, 1];
