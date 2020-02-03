var roles = {
  "3": ["innocent_child", "vanilla_townie","mafioso"],
  "4": ["innocent_child", "innocent_child", "vanilla_townie", "mafioso"],
  "5": ["innocent_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "mafioso"],
  "6": ["innocent_child", "doctor", "vanilla_townie", "vanilla_townie", "mafioso", "godfather"],
  "7": ["innocent_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "doctor", "consigliere", "mafioso"],
  "8": ["innocent_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "doctor", "consigliere", "mafioso"],
  "9" :["innocent_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "doctor", "consigliere", "mafioso"],
  "10": ["innocent_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "escort", "doctor", "consigliere", "mafioso", "serial_killer"],
  "11": ["innocent_child", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "escort", "doctor", "consort", "mafioso", "serial_killer"],
  "12": ["innocent_child", "innocent_child","vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "escort", "doctor",, "consigliere", "mafioso", "serial_killer"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Pure and Simple!";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "A game with a confirmed townie at the very start.";
module.exports.AUTHORS = ["SpikedJackson", "Jared"];
module.exports.PLAYER_LIMITS = [3, 12];
