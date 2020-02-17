<div align="center">
  <br />
  <p>
    <a href="https://github.com/Chokyotager/Cosa-Nostra-Backstabbers"><img src="/display/CNB_main_banner.png" alt="banner" /></a>
  </p>
  <br />
  <p>
    <a href="https://discord.gg/gDHPQMR"><img src="https://discordapp.com/api/guilds/504239309063323668/embed.png" alt="Discord server" /></a>
  </p>
</div>

## About
**Fast games of Mafia, on Discord itself.** The Cosa Nostra Backstabbers (CNB) bot is heavily based off [La Cosa Nostra]("https://github.com/Chokyotager/La-Cosa-Nostra") (LCN) code-wise. It is able to run LCN expansions, LCN commands, and LCN games. However, unlike LCN, the games are light and meant to last from a few minutes to an hour.


## Installation and configuration using NPM
1. Install the CNB package using `npm install cosa-nostra-backstabbers`.
2. Create a bot-token and a Discord bot (guide [here](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)).
3. Add your bot to the server using this link: `https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID&scope=bot&permissions=8` - swap the `CLIENT_ID` out for the ID of your bot.
4. Copy and paste this code below into a script file in a directory (i.e. `cnb/run.js`):

```js
var cnb = require("cosa-nostra-backstabbers");

var config = {
   "bot-token": "<token>",
   "server-id": "<server ID>"
   // Other configuration parameters as you like
};

var cnbbot = new cnb.Bot(config);
cnbbot.start();
```

3. Run the script.
4. For a more detailed guide and information on installation, as well as configurable fields, [visit our Wiki](https://github.com/Chokyotager/Cosa-Nostra-Backstabbers/wiki).
5. [Join our Discord](https://discord.gg/gDHPQMR) or [ask on the forums](https://chocoparrot.com/forum/) if you require assistance in installation.


## Installation and configuration using bot instance (manual)
Clone or download the bot repository and run it remotely on your server. The minimum Node version for this bot is `10.15.0`.

I strongly recommend using PM2 (http://pm2.keymetrics.io/) as the process manager to keep this bot running smoothly (hopefully) on your server.

You will also need to create a bot user on Discord and add it to your server. I suggest reading this guide: https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token

Dependencies are listed in `package.json`. Other packages used by this module should come pre-installed with Node.

Configure the bot through the `/configuration.json` folder and create appropriate channels.

Launch `bot.js` from Node once you are ready.


## Expansion packs
Ever since the Foxgloves update, the bot is able to accept *expansion packs*. These are individual folders which can contain custom roles, attributes, banners, flavours and even *entire setups*. They can be copied, pasted, rely on dependencies and shared between users easily, and anyone using the bot can load them.


## Wiki, Guides, and Developers
For a more detailed guide on installation, how to make your own roles and setups, and the lot, **visit our Wiki** at https://github.com/Chokyotager/La-Cosa-Nostra/wiki

We also have a forum dedicated to the LCN/CNB community. If you are a developer wanting to ask some development questions or to share your expansion packs, or if you just want to advertise your LCN/CNB server, go here: https://chocoparrot.com/forum


## Credits
**Authors:** ChocoParrot

**Special thanks:** Lykos, Belungawhale


## Contact
Add me as a friend!

Discord: ChocoParrot#8925

You can also find me on the main LCN/CNB servers.
