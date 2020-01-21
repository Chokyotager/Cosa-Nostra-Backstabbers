var setups = require("../setups.js");
var auxils = require("../auxils.js");

module.exports = async function (message, params, config) {

  var identifiers = Object.keys(setups);

  var names = new Array();

  for (var i = 0; i < identifiers.length; i++) {

    var setup = setups[identifiers[i]];

    names.push("`" + setup.NAME + "`");

  };

  await message.channel.send(":video_game: **Available gamemodes**:\n\n" + names.join(", ") + "");

};
