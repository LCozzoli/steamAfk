const totp = require('steam-totp');
const SteamUser = require('steam-user');
const SteamClient = require('steam-client');

function Bot(console)
{
    class steamBot 
    {
        constructor(infos)
        {
            this.infos = infos;
            this.logged = false;
            let steamClient = new SteamClient.CMClient();
            this.user = new SteamUser(stClient);
            this.infos.proxy && steamClient.setHttpProxy(this.infos.proxy);
            this.events();
            this.funcs = [];
        }

        on(name, func)
        {
            this.funcs[elem] = func;
        }

        call(name, data)
        {
            this.funcs[elem] && this.funcs[elem](data);
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
        }

    }
    return steamBot;
}

module.exports = Bot;