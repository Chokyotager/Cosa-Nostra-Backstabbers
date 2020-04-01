var roles = {
  "3": ["innocent_child", "godfather", "tracker"],
  "4": ["innocent_child", "Compulsive_visitor", "tracker", "godfather"],
  "5": ["innocent_child", "compulsive_visitor", "compulsive_visitor", "tracker", "godfather"],
  "6": ["innocent_child", "compulsive_visitor", "compulsive_visitor", "tracker", "serial_killer", "godfather"],
  "7": ["innocent_child", "compulsive_visitor", "compulsive_visitor", "tracker", "consigliere", "serial_killer", "godfather"],
  "8": ["innocent_child", "compulsive_visitor", "compulsive_visitor", "tracker", "compulsive_visitor", "serial_killer", "godfather", "consigliere"],
  "9" :["innocent_child", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "serial_killer", "tracker", "godfather", "consigliere"],
  "10": ["innocent_child", "alien", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "tracker", "serial_killer", "escort", "cupid"],
  "11": ["innocent_child", "alien", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "tracker", "serial_killer", "escort", "godfather", "consigliere"],
  "12": ["innocent_child", "alien", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "sheriff", "tracker", "serial_killer", "escort", "doctor", "godfather", "consigliere"],
  "13": ["innocent_child", "alien", "compulsive_visitor", "compulsive_visitor", "compulsive_visitor", "sheriff", "doctor", "tracker", "serial_killer", "godfather", "consigliere", "mafioso", "compulsive_visitor"]
};

module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Power Struggle";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "Did someone say, an echo chamber?";
module.exports.AUTHORS = ["ShapeShifted"];
module.exports.PLAYER_LIMITS = [3, 13];
