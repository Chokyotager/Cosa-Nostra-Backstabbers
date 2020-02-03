var roles = {
  "3": ["vanilla_townie", "vanilla_townie", "mafioso"],
  "4": ["vanilla_townie", "vanilla_townie", "mailman", "mafioso"],
  "5": ["vanilla_townie", "vanilla_townie", "mailman", "mafioso", "traitor"],
  "6": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "mailman", "mafioso", "traitor"],
  "7": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "mailman", "godfather", "mafioso", "traitor"],
  "8": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "mailman", "mailman", "godfather", "mafioso", "traitor"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Classic Plus";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "The well-loved classic with a slight twist.";
module.exports.AUTHORS = ["JurgenVW"];
module.exports.PLAYER_LIMITS = [3, 8];
