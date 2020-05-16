const totp = require('steam-totp');
const SteamUser = require('steam-user');
const SteamClient = require('steam-client');

function Bot(console)
{
    class steamBot 
    {
        constructor(infos, id)
        {
            this.id = id;
            this.infos = infos;
            this.logged = false;
            let steamClient = new SteamClient.CMClient();
            this.user = new SteamUser(steamClient);
            this.infos.proxy && steamClient.setHttpProxy(this.infos.proxy);
            this.events();
            this.funcs = [];
        }

        login()
        {
            this.user.logOn({
                accountName: this.infos.details.username,
                password: this.infos.details.password,
                logonID: this.id + 1,
                twoFactorCode: totp.generateAuthCode(this.infos.details.shared)
            });
        }

        on(name, func)
        {
            this.funcs[name] = func;
        }

        call(name, data)
        {
            this.funcs[name] && this.funcs[name](data);
        }

        events()
        {
            this.user.on('disconnected', (err) => {
                err && console.error(err);
                this.logged = false;
            });

            this.user.on('error', (err) => {
                console.error(err);
            });

            this.user.on('connected', (err) => {
                console.error(err);
            });

            this.user.on('loggedOn', (details, parental) => {
                this.logged = true;
                this.call('logged');
            });

            this.user.on('playingState', (blocked, playingApp) => {
                console.log(blocked, playingApp);
            });
        }

    }
    return steamBot;
}

module.exports = Bot;