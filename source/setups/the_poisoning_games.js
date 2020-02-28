var roles = {
  "3": ["vanilla_townie", "vanilla_townie", "toxicologist"],
  "4": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "toxicologist"],
  "5": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "sentinel_doctor", "toxicologist"],
  "6": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "2-shot_doctor", "toxicologist", "toxicologist"],
  "7": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "2-shot_doctor", "apothecarist", "toxicologist", "toxicologist"],
  "8": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "2-shot_doctor", "apothecarist", "toxicologist", "toxicologist"],
  "9": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "doctor", "apothecarist", "toxicologist", "toxicologist", "janitor"],
  "10": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "doctor", "apothecarist", "toxicologist", "toxicologist", "consort"],
  "11": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "2-shot_doctor", "doctor", "apothecarist", "toxicologist", "toxicologist", "toxicologist"],
  "12": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "doctor", "doctor", "apothecarist", "toxicologist", "toxicologist", "toxicologist", "consort"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "The Poisoning Games";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "A game of poison and death.";
module.exports.AUTHORS = ["Captain Luffy"];
module.exports.PLAYER_LIMITS = [3, 12];
