"use strict";

function setup(module) {
    var ret = {
        notify: function() {
            ret.notified = true;
            ret.callbacks.forEach(function(cb) {
                cb(ret.module.exports);
            });
        },
        module: module,
        callbacks: [],
        notified: false,
        getIfCircular: getIfCircular
    };
    module.exports.addModuleReferenceCallback = function(cb) {
        if(ret.notified)
            notify(cb);
        else
            ret.callbacks.push(cb);
    };
    module.exports.isNotFinalExports = isNotFinalExports;
    return ret;
}

var isNotFinalExports = {};

function getIfCircular(otherExports, callback) {
    if(otherExports.isNotFinalExports === isNotFinalExports)
        otherExports.addModuleReferenceCallback(callback);
    else
        callback(otherExports);
};

module.exports = setup.setup = setup;
module.exports.getIfCircular = getIfCircular;
