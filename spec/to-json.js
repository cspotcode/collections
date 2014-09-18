
var ShimObject = require("../shim-object");

module.exports = describeToJson;
function describeToJson(Collection, values) {
    describe("toJSON", function () {
        it("stringifies and parses to a collection with the same data", function () {
            var collection = new Collection(values);
            var stringified = JSON.stringify(collection);

            var newCollection = new Collection(JSON.parse(stringified));

            expect(stringified).toEqual(JSON.stringify(values));

            if (collection.entries) {
                expect(ShimObject.equals(collection.entries(), newCollection.entries())).toEqual(true);
            } else {
                expect(ShimObject.equals(collection.toArray(), newCollection.toArray())).toEqual(true);
            }
        });
    });
}
