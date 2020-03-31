var roles = {
  "3": ["blood_wrought", "serial_killer", "one_shot_vigilante"],
  "4": ["blood_wrought", "blood_wrought", "serial_killer", "one_shot_vigilante"],
  "5": ["blood_wrought", "blood_wrought", "serial_killer", "one_shot_vigilante", "jester"],
  "6": ["blood_wrought", "blood_wrought", "blood_wrought", "serial_killer", "vigilante", "jester"],
  "7": ["blood_wrought", "blood_wrought", "blood_wrought", "serial_killer", "vigilante", "jester", "fool"],
  "8": ["blood_wrought", "blood_wrought", "blood_wrought", "serial_killer", "vigilante", "jester", "fool", "arsonist"],
  "9" :["blood_wrought", "blood_wrought", "blood_wrought", "serial_killer", "vigilante", "jester", "fool", "arsonist", "doctor"],
  "10": ["blood_wrought", "blood_wrought", "blood_wrought", "serial_killer", "vigilante", "jester", "fool", "arsonist", "doctor", "one_shot_dayshooter"],
  "11": ["blood_wrought", "blood_wrought", "blood_wrought", "serial_killer", "vigilante", "jester", "jester", "fool", "arsonist", "doctor", "one_shot_dayshooter"],
  "12": ["blood_wrought", "blood_wrought", "blood_wrought", "serial_killer", "vigilante", "jester", "jester", "fool", "arsonist", "doctor", "one_shot_dayshooter", "vanilla_townie"],
  "13": ["blood_wrought", "blood_wrought", "blood_wrought", "serial_killer", "vigilante", "jester", "jester", "fool", "arsonist", "doctor", "one_shot_dayshooter", "vanilla_townie", "amnesiac"],
  "14": ["blood_wrought", "blood_wrought", "blood_wrought", "blood_wrought", "serial_killer", "vigilante", "jester", "jester", "fool", "arsonist", "doctor", "one_shot_dayshooter", "vanilla_townie", "amnesiac"],
  "15": ["blood_wrought", "blood_wrought", "blood_wrought", "blood_wrought", "serial_killer", "vigilante", "jester", "jester", "fool", "arsonist", "doctor", "one_shot_dayshooter", "vanilla_townie", "amnesiac", "plaguebearer"],
  "16": ["blood_wrought", "blood_wrought", "blood_wrought", "blood_wrought", "serial_killer", "vigilante", "jester", "jester", "fool", "arsonist", "doctor", "one_shot_dayshooter", "vanilla_townie", "vanilla_townie", "amnesiac", "plaguebearer"],
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Conundrum";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "Meant to be a more radical Pewpewpew.";
module.exports.AUTHORS = ["Thy-xin"];
module.exports.PLAYER_LIMITS = [3, 16];
