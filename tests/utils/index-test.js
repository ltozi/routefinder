// tests/part1/cart-summary-test.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai

var maputils = require('../../utils/index');

var graphPayloadOk = {
    "rooms": [
        {"id": 1, "name": "Hallway", "north": 2, objects: []},
        {"id": 2, "name": "Dining Room", "south": 1, "west": 3, "east": 4, objects: []},
        {"id": 3, "name": "Kitchen", "east": 2, objects: [{"name": "Knife"}]},
        {"id": 4, "name": "Sun Room", "west": 2, objects: [{"name": "Potted Plant"}]}
    ]
};


describe('Room map utility test', function() {


    it('Should load map from a json graph source', function() {


        var roomsMap = maputils.loadRoomsMap(graphPayloadOk);

        expect(roomsMap).to.exist;
        expect(roomsMap[1]).to.exist;
        expect(roomsMap[2]).to.exist;
        expect(roomsMap[3]).to.exist;
        expect(roomsMap[4]).to.exist;

    });
});