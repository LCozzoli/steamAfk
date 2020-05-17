const AFK = require('./lib');
const cluster = require('cluster');
const accounts = require('./cfg');

accounts.forEach((account, id) => {
    new AFK(account, ++id);
});