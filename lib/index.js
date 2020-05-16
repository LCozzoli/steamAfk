//const console = require('./console')();
const steamBot = require('./steam')(console);

class AFK extends steamBot
{
    constructor(infos, id)
    {
        super(infos, id);
        this.games = infos.games;
        this.bind();
        this.login();
    }

    bind()
    {
        this.on('logged', () => {
            console.log('Logged in');
            this.playGames();
        });
    }

    playGames()
    {
        this.user.gamesPlayed(this.games);
    }
}

module.exports = AFK;