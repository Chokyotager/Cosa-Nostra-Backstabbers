var var roles = {
  "4": ["vanilla_townie", "vanilla_townie", "one_shot_dayshooter", "mafioso"],
  "5": ["vanilla_townie", "vanilla_townie", "one_shot_dayshooter", "mafioso", "mafioso"],
  "6": ["vanilla_townie", "vanilla_townie", "one_shot_dayshooter", "mafioso", "mafioso", "social_engineer"],
  "7": ["vanilla_townie", "vanilla_townie", "one_shot_dayshooter", "one_shot_dayshooter", "mafioso", "mafioso", "social_engineer"],
  "8": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "one_shot_dayshooter", "one_shot_dayshooter", "mafioso", "mafioso", "social_engineer"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Dayshootin'";
module.exports.INFO = "The default game.";
module.exports.PLAYER_LIMITS = [3, 8];
