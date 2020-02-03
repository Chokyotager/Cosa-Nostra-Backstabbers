var roles = {
  "4": ["vanilla_townie", "vanilla_townie", "lookout", "mafioso"],
  "5": ["vanilla_townie", "vanilla_townie", "compulsive_visitor", "lookout", "mafioso"],
  "6": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "compulsive_visitor", "lookout", "mafioso"],
  "7": ["vanilla_townie", "vanilla_townie", "compulsive_visitor", "lookout", "watcher", "mafioso", "detainer"],
  "8": ["vanilla_townie", "vanilla_townie", "compulsive_visitor", "compulsive_visitor", "lookout", "watcher", "mafioso", "detainer"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Lying in Wait";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "Spying is always a great hobby.";
module.exports.AUTHORS = ["JurgenVW"];
module.exports.PLAYER_LIMITS = [3, 8];
