var roles = {
  "3": ["vanilla_townie", "doctor", "serial_killer"],
  "4": ["vanilla_townie", "vanilla_townie", "doctor", "serial_killer"],
  "5": ["vanilla_townie", "vanilla_townie", "doctor", "serial_killer", "oracle"],
  "6": ["vanilla_townie", "vanilla_townie", "doctor", "doctor", "mafioso", "serial_killer"],
  "7": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "doctor", "escort", "mafioso", "serial_killer"],
  "8": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "doctor", "escort", "oracle", "mafioso", "serial_killer"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "On the Loose!";
module.exports.INFO = "The default game.";
module.exports.PLAYER_LIMITS = [3, 8];
