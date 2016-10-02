var fs = require("fs");


function MapUtil() {


}

/**
 * Given a JSON graph, builds a rooms map where keys are rooms id and values are rooms properties
 *
 * Example of json graph:
 *
 * {
 *  "rooms": [
 *      { "id": 1, "name": "Hallway", "north": 2, objects: [] }
 *      { "id": 2, "name": "Dining Room", "south": 1, "west": 3, "east": 4, objects: [] }
 *      { "id": 3, "name": "Kitchen", "east": 2, objects: [{"name": "Knife"}] }
 *      { "id": 4, "name": "Sun Room", "west": 2, objects: [{"name": "Potted Plant"}] }
 *  ]
 *
 * }
 *
 * @param graph
 * @return {}
 */
MapUtil.prototype.loadRoomsMap = function (graph) {

    var roomsMap = {};

    graph.rooms.forEach(function (aRoom) {
        roomsMap[aRoom.id] = aRoom;
    })

    return roomsMap;

};

/**
 *
 * @param mapFile
 * @return {{}}
 */
MapUtil.prototype.loadRoomsMapFromFile = function (mapFile) {

    var mapAsJson = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
    var roomsMap = {};

    mapAsJson.rooms.forEach(function (aRoom) {
        roomsMap[aRoom.id] = aRoom;
    })

    return roomsMap;

};



module.exports = new MapUtil();