var roles = {
  "3": ["vigilante", "serial_killer", "vigilante"],
  "4": ["vigilante", "vigilante", "vanilla_townie", "serial_killer"],
  "5": ["one_shot_dayshooter", "vigilante", "vigilante", "vanilla_townie", "serial_killer"],
  "6": ["one_shot_dayshooter", "one_shot_driver", "vanilla_townie", "doctor", "vigilante", "serial_killer"],
  "7": ["doctor", "one_shot_driver", "vanilla_townie", "survivor", "one_shot_dayshooter", "vigilante", "serial_killer"],
  "8": ["doctor", "one_shot_driver", "vanilla_townie", "jester", "vanilla_townie", "one_shot_dayshooter", "vigilante", "serial_killer"],
  "9": ["doctor", "one_shot_driver", "vanilla_townie", "jester", "vanilla_townie", "one_shot_dayshooter", "vigilante", "serial_killer", "jailkeeper"],
  "10": ["doctor", "one_shot_driver", "vanilla_townie", "jester", "vanilla_townie", "one_shot_dayshooter", "vigilante", "serial_killer", "jailkeeper","assassin"],
  "11": ["doctor", "one_shot_driver", "vanilla_townie", "vanilla_townie", "jester", "vanilla_townie", "one_shot_dayshooter", "vigilante", "serial_killer", "jailkeeper","assassin"],
  "12": ["doctor", "one_shot_driver", "vanilla_townie", "vanilla_townie", "doctor", "jester", "vanilla_townie", "one_shot_dayshooter", "vigilante", "serial_killer", "jailkeeper","assassin"],
  "13": ["doctor", "one_shot_driver", "vanilla_townie", "vanilla_townie", "survivor", "doctor", "jester", "vanilla_townie", "one_shot_dayshooter", "vigilante", "serial_killer", "jailkeeper", "assassin"],
  "14": ["doctor", "one_shot_driver", "vanilla_townie", "vanilla_townie", "survivor", "doctor", "jester", "vanilla_townie", "one_shot_dayshooter", "one_shot_dayshooter", "vigilante", "serial_killer", "jailkeeper", "assassin"],
  "15": ["doctor", "one_shot_driver", "vanilla_townie", "vanilla_townie", "survivor", "doctor", "jester", "vanilla_townie", "one_shot_dayshooter", "one_shot_dayshooter", "vigilante", "serial_killer", "jailkeeper", "assassin", "mafioso"],
  "16": ["doctor", "one_shot_driver", "vanilla_townie", "vanilla_townie", "survivor", "doctor", "jester", "vanilla_townie", "one_shot_dayshooter", "one_shot_dayshooter", "vigilante", "serial_killer", "jailkeeper", "assassin", "mafioso", "amnesiac"]
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
