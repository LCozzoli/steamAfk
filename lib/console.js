var scribe  = require('scribe-js')({
    createDefaultConsole : false
});

var console = scribe.console({

    console : {
        colors     : 'white',
        tagsColors : 'red',
        timeColors : ['grey', 'underline'],
        dateColors : ['gray', 'bgMagenta'],
        fileColors : 'white',
        lineColors : ['yellow', 'inverse'],
        alwaysLocation : false
    },
    createBasic : false

});

console.addLogger('info', null, {
    defaultTags : [{msg : 'Info', colors: 'cyan'}]
});

console.addLogger('success', null, {
    defaultTags : [{msg : 'Success', colors: 'green'}]
});

console.addLogger('error', null, {
    defaultTags : [{msg : 'Error', colors: 'red'}]
});

function Logger() {

    return {

        error: function (op, message) {
            if (!message)
                console.time().error(op);
            else 
                console.time().tag(op).error(message);
        },
        
        success: function (op, message) {
            if (!message)
                console.time().success(op);
            else 
                console.time().tag(op).success(message);
        },
        
        log: function (op, message) {
            if (!message)
                console.time().info(op);
            else 
                console.time().tag(op).info(message);
        }

    };

}

module.exports = Logger;
