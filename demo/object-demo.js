
require("../shim-object");

ShimObject.forEach({a: 10, b: 20}, function (value, key) {
    console.log(key + ": " + value);
});

