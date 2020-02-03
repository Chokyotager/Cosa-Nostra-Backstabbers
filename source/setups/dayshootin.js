var roles = {
   "3": ["vanilla_townie", "mafioso", "one_shot_dayshooter"],
   "4": ["one_shot_dayshooter", "serial_killer", "one_shot_dayshooter", "mafioso"],
   "5": ["vanilla_townie", "vanilla_townie", "one_shot_dayshooter", "mafioso", "traitor"],
   "6": ["vanilla_townie", "vanilla_townie", "one_shot_dayshooter", "mafioso", "godfather", "vanilla_townier"],
   "7": ["vanilla_townie", "vanilla_townie", "one_shot_dayshooter", "one_shot_dayshooter", "mafioso", "godfather", "vanilla_townie"],
   "8": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "one_shot_dayshooter", "one_shot_dayshooter", "mafioso", "godfather", "vanilla_townie"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Dayshootin'";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "When everyone is a shooter.";
module.exports.AUTHORS = ["VoidMist", "Jared"];
module.exports.PLAYER_LIMITS = [4, 8];
