
var ShimObject = require("../shim-object");
var Set = require("../set");
var Map = require("../map");

describe("clone", function () {

    it("should deeply clone custom collections", function () {
        var a = Set([Map({a: {}})]);
        var b = ShimObject.clone(a);

        // equal maps are not consistently hashed
        expect(ShimObject.equals(a, b)).toBe(false);
        expect(a.equals(b)).toBe(false);

        expect(a.one()).toNotBe(b.one());
        expect(a.one().equals(b.one())).toBe(true);
        expect(a.one().get('a')).toNotBe(b.one().get('a'));
        expect(a.one().get('a')).toEqual(b.one().get('a'));
    });

});

