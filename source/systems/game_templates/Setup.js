var fs = require("fs");
var auxils = require("../auxils.js");

var def = JSON.parse(fs.readFileSync(__dirname + "/_setup.json"));

module.exports = class {

  constructor () {

    this.setup = def;

  }

  evaluate () {

    this.setup["playing"] = {roles: ["vanilla_townie", "vanilla_townie"]};

    this.setup["playing"]["roles"] = auxils.cryptographicShuffle(this.setup["playing"]["roles"]);

    return this.setup;

  }

}
