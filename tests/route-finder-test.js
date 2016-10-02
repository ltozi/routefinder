// tests/part1/cart-summary-test.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai



var maputils = require('../utils/index');
var RouteFinder = require('../puzzle/route-finder');
var fs = require("fs");
var graph = JSON.parse(fs.readFileSync('../room-map.json', 'utf8'));

var roomsMap;

describe('Testing route finder', function() {

    before(function () {
        roomsMap = maputils.loadRoomsMap(graph);
    })

    it('Should load map from a json graph source', function() {

        var router = new RouteFinder(roomsMap);

        expect(router).to.exist;
        expect(router.graph).to.exist;

    });

    it('Should find object inside room', function() {


        var router = new RouteFinder(roomsMap);

        var itemsToCollect = ['Knife', 'Potted Plant'];

        var aRoom = {
            id: 1,
            name: 'Room A',
            objects: [{name: 'Fork'}, {name: 'Potted Plant'}]
        };
        var founds = router.inspectRoom(aRoom, itemsToCollect);

        expect(founds).to.exist;
        expect(founds).to.be.instanceOf(Array);

        console.log(JSON.stringify(founds));
        expect(founds.length).to.equal(1);
    });


    it('Should collect objects as requested', function() {

        var router = new RouteFinder(roomsMap);
        var startinPoint = 2;
        var itemsToCollect = ['Knife', 'Potted Plant'];

        var founds = router.findItems(startinPoint, itemsToCollect);
        expect(founds).to.exist;
        expect(founds).to.be.instanceOf(Array);
        expect(founds.length).to.equal(itemsToCollect.length);
    });


    it('Should collect objects as requested starting from a different point', function() {

        var router = new RouteFinder(roomsMap);
        var startinPoint = 1;
        var itemsToCollect = ['Knife', 'Potted Plant'];

        var founds = router.findItems(startinPoint, itemsToCollect);
        expect(founds).to.exist;
        expect(founds).to.be.instanceOf(Array);
        expect(founds.length).to.equal(itemsToCollect.length);
    });


    it('Should find nothing because no items exist inside graph', function() {

        var router = new RouteFinder(roomsMap);
        var startinPoint = 2;
        var itemsToCollect = ['NoItem1', 'NoItem2'];

        var founds = router.findItems(startinPoint, itemsToCollect);
        expect(founds).to.exist;
        expect(founds).to.be.instanceOf(Array);
        expect(founds.length).to.equal(0);
    });



    it('Should fail due to wrong starting point', function() {

        var router = new RouteFinder(roomsMap);
        var wrongStartingPoint = 300;
        var itemsToCollect = ['Knife', 'Plant'];

        try {
            router.findItems(wrongStartingPoint, itemsToCollect);
        }
        catch (e) {
            expect(e).to.exist;
        }
    });
});