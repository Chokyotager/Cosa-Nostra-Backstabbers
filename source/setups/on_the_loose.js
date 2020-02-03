var roles = {
  "3": ["vanilla_townie", "doctor", "serial_killer"],
  "4": ["vanilla_townie", "vanilla_townie", "doctor", "serial_killer"],
  "5": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "serial_killer", "oracle"],
  "6": ["vanilla_townie", "vanilla_townie", "doctor", "doctor", "one-shot_strongman", "serial_killer"],
  "7": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "doctor", "escort", "mafioso", "serial_killer"],
  "8": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "doctor", "escort", "vanilla_townie", "1-shot_strongman", "serial_killer"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "On the Loose!";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "A psychopathic serial killer is on the loose! What do you do?";
module.exports.AUTHORS = ["VoidMist", "Jared"];
module.exports.PLAYER_LIMITS = [3, 8];
