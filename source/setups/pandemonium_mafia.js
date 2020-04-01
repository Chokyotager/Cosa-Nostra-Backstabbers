var roles = {
  "3": ["caporegime", "jailkeeper", "vanilla_townie"],
  "4": ["jack_of_all_trades", "jailkeeper", "vanilla_townie", "vanilla_townie"],
  "5": ["jack_of_all_trades", "marshal", "veteran", "vanilla_townie", "vanilla_townie"],
  "6": ["caporegime", "one_shot_strongman", "one_shot_dayshooter", "marksman", "vanilla_townie", "vanilla_townie"],
  "7": ["caporegime", "lawyer", "sheriff", "deputy", "one_shot_dayshooter", "vanilla_townie", "vanilla_townie"],
  "8": ["caporegime", "one_shot_strongman", "jack_of_all_trades", "vigilante", "jailkeeper", "vagrant", "vanilla_townie", "vanilla_townie"],
  "9" :["lawyer", "one_shot_strongman", "jack_of_all_trades", "jailkeeper", "sheriff", "deputy", "vagrant", "vanilla_townie", "vanilla_townie"],
  "10": ["lawyer", "one_shot_strongman", "jack_of_all_trades", "jailkeeper", "sheriff", "deputy", "vagrant", "vanilla_townie", "vanilla_townie", "one_shot_dayshooter"],
  "11": ["lawyer", "one_shot_strongman", "jack_of_all_trades", "jailkeeper", "sheriff", "deputy", "vagrant", "vigilante", "marksman",  "vanilla_townie", "vanilla_townie"],
  "12": ["lawyer", "one_shot_strongman", "caporegime", "jack_of_all_trades", "sheriff", "deputy", "jailkeeper", "vigilante", "marksman",  "vanilla_townie", "vanilla_townie", "one_shot_dayshooter"]
};


module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Pandemonium Mafia";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "A Mafia game of extreme chaos.";
module.exports.AUTHORS = ["Haxala O' Shinji"];
module.exports.PLAYER_LIMITS = [3, 12];
