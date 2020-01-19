var texts = require("./text/texts.js");

module.exports = function getVoteConfiguration (game) {

  var config = game.config;

  var ret = new Array();
  var lynch_config = config["game"]["lynch"];

  if (game.getLynchesAvailable() > 1) {
    ret.push(texts.lynchtext_available);
  };

  if (!lynch_config["top-voted-lynch"] || game.hammerActive()) {
    if (lynch_config["no-lynch-option"]) {
      ret.push(texts.lynchtext_nolynch);
    } else {
      ret.push(texts.lynchtext_standard);
    };
  } else {
    ret.push(texts.lynchtext_tvl);
  };

  if (game.hammerActive() && !lynch_config["top-voted-lynch"]) {
    ret.push(texts.lynchtext_hammer);
  };

  if (game.hammerActive() && lynch_config["top-voted-lynch"]) {
    ret.push(texts.lynchtext_hammer_tvl);
  };

  if (lynch_config["top-voted-lynch"]) {
    if (lynch_config["tied-random"]) {
      ret.push(texts.lynchtext_maxrandom);
    } else {
      ret.push(texts.lynchtext_maxnolynch);
    };
  };

  return ret.join("\n");

};
