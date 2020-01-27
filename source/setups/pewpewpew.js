var roles = {
  "3": ["vigilante", "serial_killer", "vigilante"],
  "4": ["vigilante", "vanilla_townie", "vanilla_townie", "serial_killer"],
  "5": ["one_shot_dayshooter", "vigilante", "vanilla_townie", "vanilla_townie", "serial_killer"],
  "6": ["one_shot_dayshooter", "one_shot_driver", "vanilla_townie", "vanilla_townie", "vigilante", "serial_killer"],
  "7": ["one_shot_dayshooter", "vanilla_townie", "vanilla_townie", "one_shot_driver", "survivor", "vigilante", "serial_killer"],
  "8": ["one_shot_dayshooter", "vanilla_townie", "vanilla_townie", "vanilla_townie", "jester", "one_shot_driver",  "vigilante", "serial_killer"],
  "9": ["one_shot_dayshooter", "vanilla_townie", "vanilla_townie", "vanilla_townie", "jester", "one_shot_driver", "vigilante", "serial_killer", "doctor"],
  "10": ["one_shot_dayshooter", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "jester", "one_shot_driver", "vigilante", "serial_killer", "doctor"],
  "11": ["one_shot_dayshooter", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "jester", "one_shot_driver", "vigilante", "serial_killer", "doctor", "amnesiac"],
  "12": ["one_shot_dayshooter", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "jester", "one_shot_driver", "vigilante", "serial_killer", "doctor", "amnesiac"],
  "13": ["one_shot_dayshooter", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "jester", "one_shot_driver", "vigilante", "serial_killer", "doctor", "amnesiac"],
  "14": ["one_shot_dayshooter", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "jester", "one_shot_driver", "vigilante", "serial_killer", "doctor", "amnesiac", "amnesiac"],
  "15": ["one_shot_dayshooter", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "jester", "one_shot_driver", "vigilante", "serial_killer", "doctor", "amnesiac", "amnesiac", "jailkeeper"],
  "16": ["one_shot_dayshooter", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "vanilla_townie", "jester", "one_shot_driver", "vigilante", "serial_killer", "doctor", "amnesiac", "amnesiac", "jailkeeper", "alien"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Pewpewpew!";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "A chaotic game of dayshooters and anarchy.";
module.exports.AUTHORS = ["Thy-xin"];
module.exports.PLAYER_LIMITS = [3, 16];
