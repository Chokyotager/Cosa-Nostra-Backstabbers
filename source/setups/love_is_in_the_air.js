var roles = {
  "4": ["lover", "lover", "doctor", "mafioso"],
  "5": ["vanilla_townie", "vanilla_townie", "doctor", "cupid", "mafioso"],
  "6": ["lover", "lover", "doctor", "mafioso", "vanilla_townie", "mafioso"],
  "7": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "doctor", "cupid", "mafioso", "mafioso"],
  "8": ["vanilla_townie", "vanilla_townie", "lover", "doctor", "lover", "sheriff", "mafioso", "mafioso"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Love is in the Air";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "A lovey dovey game.";
module.exports.AUTHORS = ["VoidMist"];
module.exports.PLAYER_LIMITS = [4, 8];
