var roles = {
  "3": ["vanilla_townie", "vanilla_townie", "mafioso"],
  "4": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "mafioso"],
  "5": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "mafioso"],
  "6": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "mafioso", "godfather"],
  "7": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "mafioso", "godfather"],
  "8": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "mafioso", "mafioso", "godfather"],
  "9": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "doctor", "mafioso", "mafioso", "godfather"],
  "10": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "doctor", "mafioso", "mafioso", "godfather", "traitor"],
  "11": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "doctor", "mafioso", "mafioso", "godfather", "traitor"],
  "12": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "escort", "doctor", "mafioso", "mafioso", "godfather", "traitor"],
  "13": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "escort", "doctor", "mafioso", "mafioso", "mafioso", "godfather", "traitor"],
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Default";
module.exports.INFO = "The default game.";
module.exports.PLAYER_LIMITS = [3, 13];
