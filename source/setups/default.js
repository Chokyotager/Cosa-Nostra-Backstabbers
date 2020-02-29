var roles = {
  "3": ["vanilla_townie", "doctor","mafioso"],
  "4": ["vanilla_townie", "vanilla_townie", "doctor", "mafioso"],
  "5": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "mafioso"],
  "6": ["vanilla_townie", "vanilla_townie", "sheriff", "jailkeeper", "caporegime", "mafioso"],
  "7": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "oracle", "consort", "mafioso"],
  "8": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "doctor", "consort", "mafioso"],
  "9" :["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "doctor", "consort", "one_shot_strongman"],
  "10": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "doctor", "escort", "consort", "mafioso", "serial_killer"],
  "11": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "doctor", "escort", "consort", "mafioso", "serial_killer"],
  "12": ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "sheriff", "doctor", "escort", "consort","one_shot_Strongman", "serial_killer"],
  "13" : ["vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie","vanilla_townie", "vanilla_townie", "sheriff", "doctor", "escort", "one_shot_Strongman", "Consort", "Serial_killer"],
  "14" : ["consort", "one_shot_strongman", "mafioso", "serial_killer", "sheriff", "doctor", "escort", "jailkeeper", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie"],
  "15" : ["consort", "one_shot_strongman", "consigliere", "sheriff", "doctor", "escort", "jailkeeper", "one_shot_Vigilante", "serial_killer", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie"],
  "16" : ["consort", "one_shot_strongman", "consigliere", "serial_killer", "sheriff", "doctor", "escort", "jailkeeper", "one_shot_vigilante", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie"]
};


module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Default";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "The default game.";
module.exports.AUTHORS = ["Jared", "ChocoParrot"];
module.exports.PLAYER_LIMITS = [3, 16];
