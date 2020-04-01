var roles = {
  "3": ["lookout", "compulsive_visitor", "plaguebearer"],
  "4": ["lookout", "compulsive_visitor", "compulsive_visitor", "serial_killer"],
  "5": ["lookout", "alien", "compulsive_visitor", "survivor", "serial_killer"],
  "6": ["lookout", "alien", "compulsive_visitor", "survivor", "serial_killer", "tracker"],
  "7": ["lookout", "alien", "compulsive_visitor", "survivor", "joker", "serial_killer", "tracker"],
  "8": ["lookout", "alien", "compulsive_visitor", "survivor", "joker", "serial_killer", "tracker", "escort"],
  "9" :["lookout", "alien", "compulsive_visitor", "survivor", "joker", "serial_killer", "tracker", "escort", "cupid"],
  "10": ["lookout", "alien", "compulsive_visitor", "compulsive_visitor", "survivor", "joker", "tracker", "serial_killer", "escort", "cupid"],
  "11": ["lookout", "alien", "compulsive_visitor", "compulsive_visitor", "survivor", "joker", "tracker", "serial_killer", "escort", "cupid", "plaguebearer"],
  "12": ["lookout", "alien", "compulsive_visitor", "compulsive_visitor", "survivor", "joker", "tracker", "serial_killer", "escort", "cupid", "plaguebearer", "jack_of_all_trades"],
  "13": ["lookout", "alien", "compulsive_visitor", "compulsive_visitor", "survivor", "blood_wrought", "joker", "tracker", "serial_killer", "escort", "cupid", "plaguebearer", "jack_of_all_trades"],
  "14": ["lookout", "alien", "compulsive_visitor", "compulsive_visitor", "survivor", "blood_wrought", "joker", "tracker", "serial_killer", "escort", "cupid", "plaguebearer", "jack_of_all_trades", "amnesiac"],
  "15": ["lookout", "alien", "compulsive_visitor", "compulsive_visitor", "survivor", "blood_wrought", "joker", "tracker", "serial_killer", "escort", "cupid", "plaguebearer", "jack_of_all_trades", "joker", "veteran"],
  "16": ["lookout", "alien", "compulsive_visitor", "compulsive_visitor", "survivor", "blood_wrought", "joker", "tracker", "serial_killer", "escort", "cupid", "plaguebearer", "jack_of_all_trades", "joker", "veteran", "survivor"]
};


module.exports = function (players) {

  var game_parameters = new Object();

  var load_roles = roles[players.length.toString()];
  return [load_roles, game_parameters];

};

module.exports.NAME = "Attenborough";
module.exports.VARIABLE_SETUP = false;
module.exports.INFO = "With greatest respect to naturalist Sir David Attenborough.";
module.exports.AUTHORS = ["Thy-xin"];
module.exports.PLAYER_LIMITS = [3, 16];
