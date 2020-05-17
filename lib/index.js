const console = require('./console')();
const steamBot = require('./steam')(console);
const onDeath = require('death');

class AFK extends steamBot
{
    constructor(infos, id)
    {
        super(infos, id);
        this.games = infos.games;
        this.bind();
        this.login();
        this.totalTime = 0;
    }

    now()
    {
        return Math.floor(Date.now() / 1000);
    }

    format(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return hDisplay + mDisplay + sDisplay; 
    }

    bind()
    {
        this.on('logged', (details) => {
            console.success(`Bot ${this.id}`, `Logged in correctly as ${this.user.accountInfo ? this.user.accountInfo.name : 'unknown'}`);
            this.playGames();
        });

        this.on('disconnect', () => {
            if (this.startTime)
            {
                this.totalTime += this.now() - this.startTime;
                this.startTime = null;
            }
        });

        this.user.on('playingState', (blocked, playingApp) => {
            if (blocked)
                console.error(`Bot ${this.id}`, `User is already playing ${playingApp}`);
            else
            {
                console.success(`Bot ${this.id}`, `Hours boosting started`);
                this.startTime = this.now();
            }  
        });

        onDeath(() => {
            if (this.startTime)
            {
                this.totalTime += this.now() - this.startTime;
                this.startTime = null;
            }
            if (this.totalTime)
                console.success(`Bot ${this.id}`, `Afk'd hours for ${this.format(this.totalTime)}`);
            process.exit();
        });
    }

    playGames()
    {
        console.log(`Bot ${this.id}`, `Starting to afk apps ${this.games}`);
        this.user.gamesPlayed(this.games);
    }
}

module.exports = AFK;