var ShimRegExp = module.exports = {};

/**
    accepts a string; returns the string with regex metacharacters escaped.
    the returned string can safely be used within a regex to match a literal
    string. escaped characters are [, ], {, }, (, ), -, *, +, ?, ., \, ^, $,
    |, #, [comma], and whitespace.
*/
if (!RegExp.escape) {
    var special = /[-[\]{}()*+?.\\^$|,#\s]/g;
    ShimRegExp.escape = function (string) {
        return string.replace(special, "\\$&");
    };
} else {
    ShimRegExp.escape = RegExp.escape;
}

