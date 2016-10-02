var program = require('commander');

var maputils = require('./utils/index');
var RouteFinder = require('./puzzle/route-finder');

program
    .version('0.0.1')
    .usage('Example:  node index -m /file/to/map.json -i "Knife, Potted Plant" -f 2  (Type -h for help)')
    .option('-m, --map', 'Provide a valid JSON containing puzzle map')
    .option('-f, --from', 'A string denoting the starting point id')
    .option('-i, --items', 'Items to collect (separated by spaces)')
    .parse(process.argv);


var mapFile = program.map;
var startFrom = program.from;
var itemsToFind = program.items;

if(!mapFile || !startFrom || !itemsToFind) {
    console.log(program.usage())
    return process.exit(0)
}

mapFile     = program.args[0];
itemsToFind = program.args[1].split(',');
startFrom   = program.args[2];

var graph = maputils.loadRoomsMapFromFile(mapFile);

var router = new RouteFinder(graph)

try {

    var founds = router.findItems(startFrom, itemsToFind);

    if(founds.length == itemsToFind.length) {
        console.log('Congratulations! you have found all your items! Items: ' + JSON.stringify(founds) );
    }
    else if(founds.length > 0 ) {
        console.log('You have found some items: ' + JSON.stringify(founds) );
    }
    else
        console.log('Sorry, no items found');
}
catch(e) {
    console.log(e.message);
}

