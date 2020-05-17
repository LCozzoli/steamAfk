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
            this.user.setOption('promptSteamGuardCode', false);
            this.infos.proxy && steamClient.setHttpProxy(this.infos.proxy);
            this.events();
            this.funcs = [];
        }

        login()
        {
            this.user.logOn({
                accountName: this.infos.details.username,
                password: this.infos.details.password,
                loginKey: this.loginKey,
                logonID: this.id,
                twoFactorCode: totp.generateAuthCode(this.infos.details.shared),
                rememberPassword: true
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
                this.call('disconnect');
            });

            this.user.on('error', (err) => {
                this.call('disconnect');
                if (err.message == "LoggedInElsewhere")
                {
                    console.error(`Bot ${this.id}`, `Account in use, retrying in 5m..`);
                    setTimeout(() => {
                        this.login();
                    }, 5 * 60000);
                }
                else
                {
                    console.error(err);
                    setTimeout(() => {
                        this.login();
                    }, 60000);
                }
                    
            });

            this.user.on('loginKey', (key) => {
                this.loginKey = key;
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