// Post when a lynch on someone is reached

var texts = require("./text/texts.js");
var format = require("./__formatter.js");

module.exports = async function (game) {

  var config = game.config;
  var client = game.client;

  var main_channel = game.getMainChannel();

  var message = texts.nolynch_reached;

  message = message.replace(new RegExp("{;votes}", "g"), game.getNoLynchVotesRequired());

  await main_channel.send(message);

};
