const AFK = require('./lib');
const accounts = require('./cfg');

accounts.forEach((account, id) => {
    new AFK(account, ++id);
});
