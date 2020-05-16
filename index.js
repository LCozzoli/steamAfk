const AFK = require('./lib');
const accounts = require('./accounts');

accounts.forEach((account, id) => {
    new AFK(account, id);
});