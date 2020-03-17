var roles = {
  "3": ["serial_killer", "vigilante", "jester"],
  "4": ["serial_killer", "vigilante", "jester", "amnesiac"],
  "5": ["serial_killer", "vigilante", "jester", "amnesiac", "jester"],
  "6": ["serial_killer", "vigilante", "jester", "amnesiac", "jester", "mafioso"],
  "7": ["serial_killer", "vigilante", "jester", "amnesiac", "jester", "mafioso", "amnesiac"],
  "8": ["serial_killer", "vigilante", "jester", "amnesiac", "jester", "mafioso", "amnesiac", "jester"],
  "9": ["serial_killer", "vigilante", "jester", "amnesiac", "jester", "mafioso", "amnesiac", "jester", "amnesiac"],
  "10": ["serial_killer", "vigilante", "jester", "amnesiac", "jester", "mafioso", "amnesiac", "jester", "amnesiac", "jester"],
  "11": ["serial_killer", "vigilante", "jester", "amnesiac", "jester", "mafioso", "amnesiac", "jester", "amnesiac", "jester", "amnesiac"],
  "12": ["serial_killer", "vigilante", "jester", "amnesiac", "jester", "mafioso", "amnesiac", "jester", "amnesiac", "jester", "amnesiac", "jester"],
  "13": ["serial_killer", "vigilante", "jester", "amnesiac", "jester", "mafioso", "amnesiac", "jester", "amnesiac", "jester", "amnesiac", "jester", "amnesiac"],
  "14": ["serial_killer", "vigilante", "jester", "amnesiac", "jester", "mafioso", "amnesiac", "jester", "amnesiac", "jester", "amnesiac", "jester", "amnesiac", "jester"],
  "15": ["serial_killer", "vigilante", "jester", "amnesiac", "jester", "mafioso", "amnesiac", "jester", "amnesiac", "jester", "amnesiac", "jester", "amnesiac", "jester", "amnesiac"],
  "16": ["serial_killer", "vigilante", "jester", "amnesiac", "jester", "mafioso", "amnesiac", "jester", "amnesiac", "jester", "amnesiac", "jester", "amnesiac", "jester", "amnesiac", "jester"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Cut Ties";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "A game of ridiculous jest.";
module.exports.AUTHORS = ["Rubyleafeon2080"];
module.exports.PLAYER_LIMITS = [3, 16];
