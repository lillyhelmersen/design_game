// Log
var log = {
    id: 0,
    name: "log",
    itemType: "NO",
    image: "img/log.svg",
    itemPoint: {
        x: 28,
        y: 37,
    },
    itemPlace: {x:-1,y:-1,},
  };

// Firewood
var firewood = {
    id: 1,
    name: "firewood",
    itemType: "NO",
    image:"img/firewood.svg",
    itemPoint: {
        x: 15,
        y: 22,
    },
    itemPlace: {x:-1,y:-1,},
  };

// Flint
var flint = {
    id: 2,
    name: "flint",
    itemType: "NO",
    image:"img/flint.svg",
    itemPoint: {
        x: 36,
        y: 19,
    },
    itemPlace: {x:-1,y:-1,},
  };

// Stone
var stone = {
    id: 3,
    name: "stone",
    itemType: "NO",
    image:"img/stone.svg",
    itemPoint: {
        x: 14,
        y: 7,
    },
    itemPlace: {x:-1,y:-1,},
  };

// Apple
var apple = {
    id: 4,
    name: "apple",
    itemType: "NO",
    image:"img/apple.svg",
    itemPoint: {
        x: 15,
        y: 16,
    },
  };

// Brick
var brick = {
    id: 5,
    name: "brick",
    itemType: "NO",
    image:"img/brick.svg",
    itemPoint: {
        x: 14,
        y: 7,
    },
    itemPlace: {x:-1,y:-1,},
  };

// Wheat
var wheat = {
    id: 6,
    name: "wheat",
    itemType: "NO",
    image:"img/wheat.svg",
    itemPoint: {
        x: 38,
        y: 12,
    },
    itemPlace: {x:-1,y:-1,},
  };

// Diamond
var diamond = {
    id: 7,
    name: "diamond",
    itemType: "NO",
    image:"img/diamond.svg",
    itemPoint: {
        x: 36,
        y: 5,
    },
    itemPlace: {x:-1,y:-1,},
  };

var possibleItems = [log, firewood, flint, stone, apple, brick, wheat, diamond];

function returnItems() {
    return possibleItems;
};

function getDiamond() {
    return diamond;
};

//console.log(returnItems());
//console.log(possibleItems);
//console.log(log);
