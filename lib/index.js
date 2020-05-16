const totp = require('steam-totp');
const SteamUser = require('steam-user');
const console = require('./console')();
const steamBot = require('./steam')(console);

class AFK extends steamBot
{
    constructor(infos)
    {
        super(infos);
        this.bind();
    }

    bind()
    {
        this.on('logged', () => {
            console.success('Logged!');
        })
    }
}

module.exports = AFK;