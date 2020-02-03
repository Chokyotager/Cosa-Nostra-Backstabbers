var roles = {
  "4": ["vanilla_townie", "vanilla_townie", "escort", "mafioso"],
  "5": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "escort", "mafioso"],
  "6": ["compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "escort", "mafioso", "plaguebearer"],
  "7": ["compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "escort", "escort", "mafioso", "plaguebearer"],
  "8": ["compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "escort", "escort", "mafioso", "plaguebearer", "consort"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Naughty Nights";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "... I don't know what to say";
module.exports.AUTHORS = ["JurgenVW"];
module.exports.PLAYER_LIMITS = [4, 8];
