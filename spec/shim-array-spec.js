
var ShimArray = require("../shim-array");

describe("Array", function () {

    describe("clone", function () {

        it("clones", function () {
            expect(ShimArray.from([1]).clone()).toEqual([1]);
        });

        it("clones deeply", function () {
            var array = new ShimArray([1], [2], [3], {
                a: 10,
                b: 20,
                c: [1, 2, 3]
            });
            expect(array.clone()).toEqual(array);
        });

        it("clones cycles", function () {
            var array = new ShimArray();
            array[0] = array;
            expect(array.clone()).toEqual(array);
        });

        it("clones sparse arrays", function () {
            var array = new ShimArray();
            array.length = 2;
            expect(array.clone()).toEqual([,,]);
        });

        it("clones sparse arrays quickly", function () {
            var start = Date.now();
            var array = new ShimArray();
            array.length = Math.pow(2, 30);
            array.clone();
            expect(Date.now() - start < 100).toBe(true);
        });

    });

});

