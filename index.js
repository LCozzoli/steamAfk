const AFK = require('./lib');
const accounts = require('./accounts');

accounts.forEach(account => {
    new AFK(account);
});