var Stack = require('stackjs');
var _ = require('lodash');
var Table = require('cli-table');

// instantiate
var table = new Table({
    head: ['ID', 'ROOM', 'OBJECTS']
    ,colWidths: [5, 20, 50]
});
/**
 * Object that handles logic for solving puzzle
 *
 * @param roomsMap
 * @constructor
 */
function RouteFinder(roomsMap) {
    this.graph = roomsMap;
}

/**
 * This method is based on Depth Search First algorithm to explore all graph
 *
 * @param startingPoint the room to start from
 * @param itemsToFind [] array of things to find
 */
RouteFinder.prototype.findItems = function(startingPoint, itemsToFind) {

    if( ! this.graph[startingPoint]) {
        throw new Error('The room with id ' + startingPoint + ' does not exist inside loaded graph');
    }

    if( ! itemsToFind || itemsToFind.length == 0) {
        throw new Error('A valid list of items to find must be provided but is ' + itemsToFind);
    }

    var stack = [];
    var founds = [];

    var currentRoom = this.graph[startingPoint];

    currentRoom.visited = true;
    //Searching for objects in the first room
    founds = founds.concat(this.inspectRoom(currentRoom, itemsToFind));
    stack.push(currentRoom);

    while( stack.length != 0 ) {

        currentRoom = stack[stack.length-1];

        table.push([currentRoom.id, currentRoom.name, JSON.stringify(currentRoom.objects)]);

        if(itemsToFind.length == founds.length) {
            stack = []; //Cleanup stack
            break;
        }

        var nearbyRooms = this.getNearbyRooms(currentRoom); //stack.peek() element

        var aNearbyRoom = nearbyRooms.shift();

        if( ! aNearbyRoom || aNearbyRoom.visited) {
            stack.pop(); //already visited
        }
        else {
            aNearbyRoom.visited = true;
            founds = founds.concat(this.inspectRoom(aNearbyRoom, itemsToFind)); //Searching for objects in this room
            stack.push(aNearbyRoom);
        }
    }

    console.log(table.toString());
    console.log();

    return founds;
}



/**
 * Given a room, return a list of nearby rooms
 *
 * @param aRoom
 * @return {Array} of room ids
 */
RouteFinder.prototype.getNearbyRooms = function (aRoom) {

    if(aRoom.nearbyRooms)
        return aRoom.nearbyRooms;

    aRoom.nearbyRooms = [];

    if(aRoom.north && ! this.graph[aRoom.north].visited) {
        aRoom.nearbyRooms.push(this.graph[aRoom.north]);
    }if(aRoom.south && ! this.graph[aRoom.south].visited)
        aRoom.nearbyRooms.push(this.graph[aRoom.south]);
    if(aRoom.west && ! this.graph[aRoom.west].visited)
        aRoom.nearbyRooms.push(this.graph[aRoom.west]);
    if(aRoom.east && ! this.graph[aRoom.east].visited)
        aRoom.nearbyRooms.push(this.graph[aRoom.east]);

    return aRoom.nearbyRooms;
}


RouteFinder.prototype.inspectRoom = function (aRoom, itemsToFind) {
    var founds = [];
    aRoom.objects.forEach(function (el) {

        itemsToFind.every(function (iToFind) {
            if(iToFind.indexOf(el.name) != -1)
                founds.push({roomId: aRoom.id, item: el.name});

            return true;
        })

    });

    return founds;
}

module.exports = RouteFinder;