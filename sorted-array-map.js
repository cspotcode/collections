"use strict";

var Shim = require("./shim");
var ShimObject = require("./shim-object");
var ShimFunction = require("./shim-function");
var SortedArraySet = require("./sorted-array-set");
var GenericCollection = require("./generic-collection");
var GenericMap = require("./generic-map");
var PropertyChanges = require("./listen/property-changes");

module.exports = SortedArrayMap;

function SortedArrayMap(values, equals, compare, getDefault) {
    if (!(this instanceof SortedArrayMap)) {
        return new SortedArrayMap(values, equals, compare, getDefault);
    }
    equals = equals || ShimObject.equals;
    compare = compare || ShimObject.compare;
    getDefault = getDefault || ShimFunction.noop;
    this.contentEquals = equals;
    this.contentCompare = compare;
    this.getDefault = getDefault;
    this.store = new SortedArraySet(
        null,
        function keysEqual(a, b) {
            return equals(a.key, b.key);
        },
        function compareKeys(a, b) {
            return compare(a.key, b.key);
        }
    );
    this.length = 0;
    this.addEach(values);
}

// hack so require("sorted-array-map").SortedArrayMap will work in MontageJS
SortedArrayMap.SortedArrayMap = SortedArrayMap;

ShimObject.addEach(SortedArrayMap.prototype, GenericCollection.prototype);
ShimObject.addEach(SortedArrayMap.prototype, GenericMap.prototype);
ShimObject.addEach(SortedArrayMap.prototype, PropertyChanges.prototype);

SortedArrayMap.prototype.isSorted = true;

SortedArrayMap.prototype.constructClone = function (values) {
    return new this.constructor(
        values,
        this.contentEquals,
        this.contentCompare,
        this.getDefault
    );
};

