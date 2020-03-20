var roles = {
  "3": ["doctor", "mafioso", "vanilla_townie"],
  "4": ["doctor", "tracker", "mafioso", "vanilla_townie"],
  "5": ["innocent_child", "doctor", "tracker", "mafioso", "vanilla_townie"],
  "6": ["innocent_child", "doctor", "sheriff", "mafioso", "vanilla_townie", "social_engineer"],
  "7": ["innocent_child", "doctor", "sheriff", "tracker", "mafioso", "vanilla_townie", "social_engineer"],
  "8": ["innocent_child", "doctor", "sheriff", "tracker", "mafioso", "vanilla_townie", "social_engineer", "consigliere"],
  "9": ["innocent_child", "doctor", "sheriff", "tracker", "mafioso", "vanilla_townie", "vanilla_townie", "social_engineer", "consigliere"],
  "10": ["innocent_child", "doctor", "sheriff", "tracker", "mafioso", "vanilla_townie", "vanilla_townie", "social_engineer", "consigliere", "consort"],
  "11": ["innocent_child", "doctor", "sheriff", "tracker", "mafioso", "vanilla_townie", "vanilla_townie", "social_engineer", "consigliere", "consort", "one_shot_vigilante"],
  "12": ["innocent_child", "doctor", "sheriff", "tracker", "mafioso", "vanilla_townie", "vanilla_townie", "vanilla_townie", "social_engineer", "consigliere", "consort", "one_shot_vigilante"],
  "13": ["innocent_child", "doctor", "sheriff", "tracker", "mafioso", "vanilla_townie", "vanilla_townie", "vanilla_townie", "social_engineer", "consigliere", "consort", "one_shot_vigilante", "godfather"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "War on Information";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "A game that's highly satirical on its own.";
module.exports.AUTHORS = ["ShapeShifted"];
module.exports.PLAYER_LIMITS = [3, 13];
