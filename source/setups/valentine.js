var roles = {
  "3": ["cupid", "cupid", "mafioso"],
  "4": ["cupid", "cupid", "mafioso", "vanilla_townie"],
  "5": ["cupid", "cupid", "mafioso", "vanilla_townie", "vanilla_townie"],
  "6": ["cupid", "cupid", "mafioso", "vanilla_townie", "vanilla_townie", "godfather"],
  "7": ["cupid", "cupid", "mafioso", "vanilla_townie", "vanilla_townie", "godfather", "one_shot_vigilante"],
  "8": ["cupid", "cupid", "mafioso", "vanilla_townie", "vanilla_townie", "godfather", "one_shot_vigilante","vanilla_townie"],
  "9": ["cupid", "cupid", "mafioso", "vanilla_townie", "vanilla_townie", "godfather", "one_shot_vigilante", "vanilla_townie", "jester"],
  "10": ["cupid", "cupid", "cupid", "mafioso", "vanilla_townie", "vanilla_townie", "godfather", "one_shot_vigilante", "vanilla_townie", "jester", "survivor"],
  "11": ["cupid", "cupid", "cupid", "mafioso", "vanilla_townie", "vanilla_townie", "godfather", "one_shot_vigilante", "vanilla_townie", "jester", "survivor", "amnesiac"],
  "12": ["cupid", "cupid", "cupid", "mafioso", "vanilla_townie", "vanilla_townie", "godfather", "one_shot_vigilante", "vanilla_townie", "vanilla_townie", "jester", "survivor", "amnesiac"],
  "13": ["cupid", "cupid", "cupid", "mafioso", "vanilla_townie", "vanilla_townie", "godfather", "one_shot_vigilante", "vanilla_townie", "vanilla_townie", "jester", "survivor", "amnesiac", "amnesiac"],
  "14": ["cupid", "cupid", "cupid", "mafioso", "vanilla_townie", "vanilla_townie", "godfather", "one_shot_vigilante", "vanilla_townie", "vanilla_townie", "vanilla_townie", "jester", "survivor", "amnesiac", "amnesiac"],
  "15": ["cupid", "cupid", "cupid", "cupid", "mafioso", "vanilla_townie", "vanilla_townie", "godfather", "one_shot_vigilante", "vanilla_townie", "vanilla_townie", "vanilla_townie", "jester", "survivor", "amnesiac", "amnesiac"],
  "16": ["cupid", "cupid", "cupid", "cupid", "mafioso", "vanilla_townie", "vanilla_townie", "godfather", "one_shot_vigilante", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "jester", "survivor", "amnesiac", "amnesiac"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Valentine";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "When everyone is matched by unwanted matchmakers.";
module.exports.AUTHORS = ["Thy-xin"];
module.exports.PLAYER_LIMITS = [3, 16];
