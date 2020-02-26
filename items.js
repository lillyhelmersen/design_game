// Log
var log = {
    id: 0,
    name: "log",
    itemType: "NO",
    image: "img/log.svg",
    itemPlace: {
        x: 28,
        y: 37,
    },
  };

// Firewood
var firewood = {
    id: 1,
    name: "firewood",
    itemType: "NO",
    image:"img/firewood.svg",
    itemPlace: {
        x: 15,
        y: 22,
    },
  };

// Flint
var flint = {
    id: 2,
    name: "flint",
    itemType: "NO",
    image:"img/flint.svg",
    itemPlace: {
        x: 36,
        y: 19,
    },
  };

// Stone
var stone = {
    id: 3,
    name: "stone",
    itemType: "NO",
    image:"img/stone.svg",
    itemPlace: {
        x: 14,
        y: 7,
    },
  };

// Apple
var apple = {
    id: 4,
    name: "apple",
    itemType: "NO",
    image:"img/apple.svg",
    itemPlace: {
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
    itemPlace: {
        x: 14,
        y: 7,
    },
  };

// Wheat
var wheat = {
    id: 6,
    name: "wheat",
    itemType: "NO",
    image:"img/wheat.svg",
    itemPlace: {
        x: 38,
        y: 12,
    },
  };

// Diamond
var diamond = {
    id: 7,
    name: "diamond",
    itemType: "NO",
    image:"img/diamond.svg",
    itemPlace: {
        x: 36,
        y: 5,
    },
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