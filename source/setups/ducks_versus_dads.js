var roles = {
  "3": ["invincible_child", "vanilla_townie", "godfather"],
  "4": ["invincible_child", "vanilla_townie", "vanilla_townie", "godfather"],
  "5": ["invincible_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "godfather"],
  "6": ["invincible_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "godfather", "mafioso"],
  "7": ["invincible_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "godfather", "mafioso"],
  "8": ["invincible_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "godfather", "social_engineer"],
  "9": ["invincible_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "godfather", "social_engineer"],
  "10": ["invincible_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "godfather", "mafioso", "social_engineer"],
  "11": ["invincible_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "godfather", "mafioso", "social_engineer"],
  "12": ["invincible_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "godfather", "mafioso", "social_engineer"],
  "13": ["invincible_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "godfather", "social_engineer", "social_engineer"],
  "14": ["invincible_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "godfather", "social_engineer", "social_engineer"],
  "15": ["invincible_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "godfather", "mafioso", "social_engineer", "social_engineer"],
  "16": ["invincible_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "godfather", "mafioso", "social_engineer", "social_engineer"],
  "17": ["invincible_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "godfather", "mafioso", "social_engineer", "social_engineer"],
  "18": ["invincible_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "godfather", "social_engineer", "social_engineer", "social_engineer"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Ducks vs. Dads";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "Ahem.";
module.exports.AUTHORS = ["ShapeShifted", "ChocoParrot"];
module.exports.PLAYER_LIMITS = [3, 18];
