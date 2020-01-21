var roles = {
  "3": ["vanilla_townie", "doctor","mafioso"],
  "4": ["vanilla_townie", "vanilla_townie", "doctor", "mafioso"],
  "5": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "mafioso"],
  "6": ["vanilla_townie", "vanilla_townie", "sheriff", "jailkeeper", "mafioso", "mafioso"],
  "7": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "doctor", "consort", "mafioso"],
  "8": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "doctor", "consort", "mafioso"],
  "9" :["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "doctor", "consort", "mafioso"],
  "10": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "doctor", "escort", "consort", "mafioso", "serial_killer"],
  "11": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "doctor", "escort", "mafioso", "serial_killer"],
  "12": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "tracker", "sheriff", "doctor", "escort", "consort", "consigliere", "mafioso", "serial_killer"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Default";
module.exports.INFO = "The default game.";
module.exports.PLAYER_LIMITS = [3, 13];
