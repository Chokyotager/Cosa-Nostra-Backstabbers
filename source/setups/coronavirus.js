var roles = {
  "6": ["compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "pyromaniac", "plaguebearer"],
  "7": ["compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "mafioso", "plaguebearer"],
  "8": ["doctor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "mafioso", "plaguebearer"],
  "9": ["jailkeeper", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "mafioso", "plaguebearer"],
  "10": ["vanilla_townie", "jailkeeper", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "mafioso", "plaguebearer"],
  "11": ["vanilla_townie", "jailkeeper", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "godfather", "mafioso", "plaguebearer"],
  "12": ["lookout", "tracker", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "nightwatcher", "mafioso", "plaguebearer"],
  "13": ["lookout", "tracker", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "nightwatcher", "mafioso", "plaguebearer"],
  "14": ["lookout", "tracker", "doctor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "nightwatcher", "mafioso", "plaguebearer"],
  "15": ["lookout", "tracker", "doctor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "nightwatcher", "mafioso", "plaguebearer", "alien"],
  "16": ["lookout", "tracker", "tracker", "doctor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "nightwatcher", "mafioso", "plaguebearer", "alien"],
  "17": ["lookout", "tracker", "tracker", "doctor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "nightwatcher", "mafioso", "plaguebearer", "alien", "arsonist"],
  "18": ["lookout", "tracker", "tracker", "doctor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "nightwatcher", "mafioso", "plaguebearer", "plaguebearer", "alien", "arsonist"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Coronavirus";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "Outbreak! Outbreak! What do you do?";
module.exports.AUTHORS = ["ChocoParrot"];
module.exports.PLAYER_LIMITS = [6, 18];
