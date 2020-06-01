const AFK = require("./lib");
const async = require("async");
const prompt = require("prompt-promise");
const accounts = require("./cfg");

async.eachSeries(
  accounts,
  (account, id, next) => {
    if (!account.details || !account.details.username)
      throw `Missing username for account ${id + 1}`;
    else if (!account.games || !account.games.length)
      throw `Missing games array for account ${id + 1}`;
    else if (account.details && account.details.password) {
      new AFK(account, ++id);
      next();
    } else
      prompt
        .password(`${account.details.username} password: `)
        .then((val) => {
          account.details.password = val;
          new AFK(account, ++id);
          prompt.done();
          next();
        })
        .catch((err) => {
          console.error(err);
          prompt.done();
          next();
        });
  },
  () => {
    prompt.finish();
  }
);
