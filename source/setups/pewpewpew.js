var roles = {
   "3": ["vigilante", "serial_killer", "vanilla_townie"],
   "4": ["vigilante", "vanilla_townie", "vanilla_townie", "serial_killer"],
   "5": ["vanilla_townie", "vigilante", "one_shot_driver", "vanilla_townie", "serial_killer"],
   "6": ["one_shot_dayshooter", "one_shot_driver", "vanilla_townie", "vanilla_townie", "vigilante", "serial_killer"],
   "7": ["one_shot_dayshooter", "vanilla_townie", "vanilla_townie", "jester", "one_shot_driver", "vigilante", "serial_killer"],
   "8": ["one_shot_dayshooter", "vanilla_townie", "vanilla_townie", "vanilla_townie", "jester", "one_shot_driver",  "vigilante", "serial_killer"],
   "9": ["one_shot_dayshooter", "one_shot_driver", "vanilla_townie", "vanilla_townie", "godfather", "mafioso", "vigilante", "serial_killer", "doctor"],
   "10": ["one_shot_dayshooter", "one_shot_driver", "vanilla_townie", "vanilla_townie", "godfather", "amnesiac", "mafioso", "vigilante", "serial_killer", "doctor"],
   "11": ["one_shot_dayshooter", "one_shot_driver", "vanilla_townie", "vanilla_townie", "vanilla_townie", "amnesiac", "godfather", "vigilante", "serial_killer", "doctor", "mafioso"],
   "12": ["one_shot_dayshooter", "one_shot_driver", "vanilla_townie", "vanilla_townie", "vanilla_townie", "amnesiac", "jester", "godfather", "vigilante", "serial_killer", "doctor", "mafioso"],
   "13": ["one_shot_dayshooter", "one_shot_driver", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "amnesiac", "jester", "mafioso", "vigilante", "serial_killer", "doctor", "godfather"],
   "14": ["one_shot_dayshooter", "one_shot_driver", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "amnesiac", "jester", "amnesiac", "vigilante", "serial_killer", "doctor", "godfather", "mafioso"],
   "15": ["one_shot_dayshooter", "one_shot_driver", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "amnesiac", "joker", "amnesiac", "vigilante", "serial_killer", "doctor", "mafioso", "godfather", "jailkeeper"],
   "16": ["one_shot_dayshooter", "one_shot_driver", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "amnesiac", "joker", "amnesiac", "vigilante", "serial_killer", "doctor", "godfather", "mafioso", "jailkeeper", "alien"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Pewpewpew!";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "A chaotic game of dayshooters and anarchy.";
module.exports.AUTHORS = ["Thy-xin", "Jared"];
module.exports.PLAYER_LIMITS = [3, 16];
