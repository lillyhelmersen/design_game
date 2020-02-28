/*Downloaded from https://www.codeseek.co/Jastor11/p5js-character-moving-on-screen-dpEQqJ */
//30/50
wi = 700;
hi = 700;

//Game

var tilesize = 70;
var viewSize = 10;
var mapDrawCoo = {x:0,y:0,};

//item
var possibleItems = [];//The posible items
var itemOnbord = []; //all the items that are placed in the world
var itemOnView = [];
//Game bord
var island = new Array();//contains tiles
var islandMatrix = [
  "00000000000000000000000000000000000000000000000000",
  "00000000000000000000000000000000000011111100000000",
  "00000000000000000000000001111111111111111100000000",
  "00000000000111111111111111111111111111111100000000",
  "00000001111111111111111111111111111111111000000000",
  "00000000111111111111111111111111111111111111000000",
  "00000011111111111111111111111111111111111111111000",
  "00000011111111111111111111111111111111111111100000",
  "00001111111111111111111111111111111111111111100000",
  "00001111111111111111111111111111111111111111100000",
  "00011111111111111111111111111111111111111111100000",
  "00011111111111111111111111111111111111111100000000",
  "00000111111111111111111111111111111111111000000000",
  "00001011111111111111111111111111111111111000000000",
  "00001011111111111111111111111111111111111000000000",
  "00001011111111111111111111111111111111111000000000",
  "00001011111111111111111111111111111111111000000000",
  "00001011111111111111111111111111111111111000000000",
  "00001011111111111111111111111111111111111000000000",
  "00001011111111111111111111111111111111111000000000",
  "00001011111111111111111111111111111111111000000000",
  "00001011111111111111111111111111111111111000000000",
  "00001011111111111111111111111111111111111000000000",
  "00001011111111111111111111111111111111111000000000",
  "00000011111111111111111111111111111111111110000000",
  "00000001111111111111111111111111111111111111100000",
  "00000000111111111111111111111111111111111111100000",
  "00000000011111111111111111111111111111111111111000",
  "00000000011111111111111111111111111111111111111000",
  "00000000011111111111111111111111111111111111111000",
  "00000000011111111111111111111111111111111111111000",
  "00000000111111111111111111111111111111111111100000",
  "00000000111111111111111111111111111111111111100000",
  "00000011011111111111111111111111111111111111100000",
  "00000000000011111111111111111111111111111111100000",
  "00000000000011111111111111111111111111110000000000",
  "00000000000001111111111111111111111111111000000000",
  "00000000000000000011111111111111100000010000000000",
  "00000000000000000000000000000000000000000000000000",
  "00000000000000000000000000000000000000000000000000"
];
var cooMaxX = islandMatrix[0].length;
var cooMaxY = islandMatrix.length;
var waterInview = [];
var islandImages;

//Cordinat in array
var point = {
  x: -1,
  y: -1,
};
//Plase on canvas
var place = {
  x: -1,
  y: -1,
};

//Item
var item = {
  id: 0,
  name: "NO",
  itemType: "NO",
  image:"NO",
  itemPoint: point,
  itemPlace: place,
};
//tile
var tile = {
  id: 0,
  tileType: "NO",
  image: "NO",
  cord: point,
  placeCanvas: place,
  //tileItem: item,
  //eddg: false,
};
//Player
var player = {
  name: "NO",
  image: "NO",
  coordinate: {
    x: 8,
    y: 8,
  },
  placeCanvas: {
    x: wi-100,
    y: hi-100,
  },
  inventory: [],//List of items payer has
  isClowsToItem: false,
  clowsestItem: null,
  noGo: {
    down: false,
    up: false,
    right: false,
    left: false,
  },
};

/*console.log(player.inventory)

console.log(player.inventory[0].image)
var inventoryItem = document.createElement("img");
inventoryItem.setAttribute("src", player.inventory[0].image);
console.log(inventoryItem)

document.getElementById("items-list").appendChild(inventoryItem);
function getDiamond() {

  return possibleItems[possibleItems.length];
};*/

//Elipse
var xpos = player.placeCanvas.x;
var ypos = player.placeCanvas.y;
var targetX;
var targetY;
var speed = 3;//100;//3
var easing = 0.05;

let characterImg;
let tileImgs = [];

function preload() {

  characterImg = loadImage('img/character.svg');
  appleImg = loadImage('img/apple.svg');
  brickImg = loadImage('img/brick.svg');
  diamondImg = loadImage('img/diamond.svg');
  firewoodImg = loadImage('img/firewood.svg');
  flintImg = loadImage('img/flint.svg');
  logImg = loadImage('img/log.svg');
  pedastalImg = loadImage('img/pedastal.svg');
  stoneImg = loadImage('img/stone.svg');
  wheatImg = loadImage('img/wheat.svg');

  //lode images //2000 imag usaly
  for (var i = 1; i < 0; i++) {
    //console.log(tileImgs.length);
    var tileImgTemp = loadImage("img/tile-imgs/island_"+ i + ".jpg");
    append(tileImgs, tileImgTemp);
  }

  //console.log(tileImgs);

}
function setup() {//
  var board = createCanvas(wi, hi);
  board.parent("board-container");
  frameRate(60);
  background(0);
  collideDebug(true);
  noStroke();
  island = readMatrix();
  possibleItems = returnPosibelItems();
  itemOnbord = makeItemsForMap();
  placeImages();
  /*Test for drawing item take away when items are added
  itemOnbord.push({
    id: 0,
    name: "NO",
    itemType: "NO",
    image:"NO",
    itemPoint: {x:9,y:9},
    itemPlace: place,
  });//Test end*/
  drawView();
  itemInVeiw();
}
function draw() {//Calls everything that needs to be drawn
  isKeyDown();
  drawView();
  drawItems();
  drawPlayer();
  playerClowsToItem();
  drawItemPickupSymbol();


  /*image(tileImg1, 0, 0, 70, 70);
  image(tileImg2, 70, 0, 70, 70); */


  /*for (var k = 1; k < 20; k++) {
    for (i = 0; i < island.length; i++){
      for (j = 0; j < island[i].length; j++){
          image(tileImgs[k], i*70, 0, 70, 70);
      }
  }
}*/
}

function drawPlayer(){//Draws the player in the view

  /*//Elips
  noStroke();
  fill('#A42B2A');
  //ellipseMode(CENTER);
  //ellipse(xpos, ypos, 25, 25);
  */
  image(characterImg, xpos, ypos,tilesize,tilesize);
  noFill();
  stroke(0);
  rect(xpos, ypos,tilesize,tilesize);
  player.placeCanvas.x = xpos;
  player.placeCanvas.y = ypos;

  isNextMap(xpos,ypos);//To si if plyer is at the edgj
  hitWater();

}
function drawView(){//Draws tiles on the canwas and asigns them cordinats
  //console.log("Draw viwa");
  var water = island[0][0];//A water tile 0,0
  var startCord = player.coordinate;
  var viewChuncCoo = mapDrawCoo;
  var drawXat = 0;
  var drawYat = 0;//tilesize
  waterInview = [];

  for(i = viewChuncCoo.y; i < viewChuncCoo.y+viewSize; i++){
    drawXat = 0;
    for (j = viewChuncCoo.x; j < viewChuncCoo.x+viewSize; j++){
      // console.log("x: " + i + " y: " + j);
      if(i < 0 || j < 0 || i > cooMaxX || j > cooMaxY){
        drawTile(water,drawXat,drawYat);
      } else if (island[i][j].id == 1){
        drawTile(island[i][j],drawXat,drawYat);
        island[i][j].placeCanvas = {x:drawXat,y:drawYat};
      } else if (island[i][j].id == 0){
        drawTile(island[i][j],drawXat,drawYat);
        island[i][j].placeCanvas = {x:drawXat,y:drawYat};
        waterInview.push(island[i][j]);
      }
      drawXat += tilesize;
    }
    drawYat += tilesize;
  }
}
function drawItems(){//Draws the item and asigns it a place that is in the view
  //print("in drawItems: itemOnView.length: " + itemOnView.length);
  for (i = 0; i < itemOnView.length; i++){
    drawItem(itemOnView[i]);
  }
}
function drawTile(tempTile, x, y){//Draws a tile
  //console.log("Draw tile id: " + id + " at x: " +x + " y: " +y);
  //print("temp tile: " + tempTile);
  id = tempTile.id;
  cooX = tempTile.cord.x;
  cooY = tempTile.cord.y;

  if(islandImages[cooX][cooY] != null){
    image(islandImages[cooX][cooY], x, y, tilesize, tilesize);
  }else{
    stroke(0);
    switch(id){
      case 0:
      fill('#048ABF');
      break;
      case 1:
      fill('#84D991');
      break;
      default:
      // code block
      console.log("There was aonce a blog but no more in draw tile");
    }
    square(x, y, tilesize);
  }
  // console.log(image(tileImgs[i], x, y, 70, 70) + "testinggg");
  // for (var i=0; i<5; i++) {
  // image(tileImgs[i], x, y, 70, 70);
  // }
}
function drawItem(itemToDraw){//Draws the items image
  fill('#BA7035');
  //print("item at x: " + itemToDraw.itemPlace.x + " y: " + itemToDraw.itemPlace.y);
  var tampX = itemToDraw.itemPlace.x;
  var tampY = itemToDraw.itemPlace.y;
  var imag = itemToDraw.image;
  //print("tampX: " +tampX+" tampY: "+tampY+"imag: " + imag);

  if(itemToDraw.image != null && itemToDraw.image != "NO"){
    image(itemToDraw.image, tampX, tampY, tilesize, tilesize);
  } else {
    square(tampX+20, tampX+20, 30);
  }
}
function drawItemPickupSymbol(){
  if(player.isClowsToItem == true){
    fill('#fffff');
    ellipseMode(CENTER);
    ellipse(xpos+15, ypos-15, 10, 10);
  }
}

//Events?
function playerClowsToItem(){
  player.isClowsToItem = false;

  var px = player.placeCanvas.x;
  var py = player.placeCanvas.y;

  for (i = 0; i < itemOnView.length; i++){

    var itemX = itemOnView[i].itemPlace.x;// + tilesize/2;
    var itemY = itemOnView[i].itemPlace.y;//+ tilesize/2;
    var distans = dist(px,py,itemX,itemY);//Givs distans between

    if (distans < tilesize/2){
      player.isClowsToItem = true;
      player.clowsestItem = itemOnView[i];
      //console.log("I am clos to item");
    }
  }
}
function pickUpItem(){
  if(player.isClowsToItem){
    var pickItem = player.clowsestItem;
    print("pick up item s'il vous plais")
    addItemToInventory(pickItem);
    deleteItem(pickItem);
    console.log( player.inventory);
    inventoryCreate();
  }
}
function hitWater(){
  player.noGo.down = false;
  player.noGo.up = false;
  player.noGo.left = false;
  player.noGo.right = false;
  //waterInview[]
  //if player hit wal no more move speed = 0
  var srink = 0;
  var px = player.placeCanvas.x;
  var py = player.placeCanvas.y;
  var pxRight = px + tilesize;
  var pyBottom = py + tilesize;

  for (i = 0; i < waterInview.length; i++){
    var wx = waterInview[i].placeCanvas.x;
    var wy = waterInview[i].placeCanvas.y;
    var topLeft = {x:wx+srink,y:wy+srink};
    var topRight = {x:wx + tilesize-srink,y:wy+srink};
    var bottomLeft = {x:wx+srink,y:wy+tilesize-srink};
    var bottomRight = {x:wx+tilesize-srink,y:wy+tilesize-srink};

//Hits tile top
    var hitTop = collidePointLine(px, pyBottom, topLeft.x, topLeft.y, topRight.x, topRight.y);
    var hitDown = collidePointLine(px, py, bottomLeft.x, bottomLeft.y, bottomRight.x, bottomRight.y);
    var hitLeft = collidePointLine(px, py, topRight.x, topRight.y, bottomRight.x, bottomRight.y);
    var hitRight = collidePointLine(px, py, topLeft.x, topLeft.y, bottomLeft.x, bottomLeft.y);
    if(hitTop){player.noGo.up = true;print("hit up");}
    if(hitDown){player.noGo.down = true;print("hit down");}
    if(hitRight){player.noGo.right = true;print("hit right");}
    if(hitLeft){player.noGo.left = true;print("hit left");}

  }
}

//Delaing with items
function deleteItem(deleteItem){//Takes away the picked up item form world
  /*print("deleteItem.itemPoint: " + deleteItem.itemPoint);
  print("itemOnbord[i].itemPoint: " + itemOnbord[0].itemPoint.x);
  print("itemOnView[i].itemPoint: " + itemOnView[0].itemPoint.x);*/

  for (i = 0; i < itemOnbord.length; i++){
    if(itemOnbord[i].itemPoint == deleteItem.itemPoint){
      itemOnbord.splice(i, 1);
    }
  }
  //print("itemOnView.length: "+itemOnView.length);
  for (i = 0; i < itemOnView.length; i++){
    //print("i: " + i + "item: " + itemOnView[i]);
    if(itemOnView[i].itemPoint.x == deleteItem.itemPoint.x){
      if(itemOnView[i].itemPoint.y == deleteItem.itemPoint.y){
        itemOnView.splice(i, 1);
      }
    }
  }
}
function addItemToInventory(pickItem){//Adds item to inventory
  player.inventory.push(pickItem);
}
function makeItemsForMap(){
  let allItems = [];

  for (i = 0; i < island.length; i++){
      for (j = 0; j < island[i].length; j++){

          if (island[i][j].id == 1) {
            if(random(100) < 10) {
              // Pick random item from list
              //var spawnedItem = possibleItems[Math.floor(Math.random() * possibleItems.length)];
              var tempPoint = {x:i,y:j};
              var spawnedItemTemp = random(possibleItems);
              var spawnedItem = Object.assign({}, spawnedItemTemp);
              allItems.push(spawnedItem);
              allItems[allItems.length-1].itemPoint = tempPoint;
              // Clone new object
              // Assign spawned item's new point
              //spawnedItem.itemPoint = tempPoint;

              //console.log("Adding item: i " + i, " j: " + j);
              //console.log(spawnedItem);
              //console.log("Adding item: i " + i, " j: " + j);
              //console.log("X. " + spawnedItem.itemPoint.x);
              //console.log("Y. " + spawnedItem.itemPoint.y);
              /*
              spawnedItem.itemPoint.x = i;
              spawnedItem.itemPoint.y = j;
              */

              // Creates new array
              //append(allItems, spawnedItem);
            }
          }
        }
  }
  //console.log(allItems);
  return allItems;
}
function returnPosibelItems() {
  // **** ITEMS *****
  // Log
  var log = {
    id: 0,
    name: "log",
    itemType: "NO",
    image: logImg,
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
      image: firewoodImg,
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
      image: flintImg,
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
      image: stoneImg,
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
      image: appleImg,
      itemPoint: {
          x: 15,
          y: 16,
      },
      itemPlace: {x:-1,y:-1,},
    };
  // Brick
  var brick = {
      id: 5,
      name: "brick",
      itemType: "NO",
      image: brickImg,
      itemPoint: {
          x: 14,
          y: 7,
      },
      itemPlace: {x:-1,y:-1,},
    };
    // Wheat
  var wheat = {
    id: 6,
    name: wheatImg,
    itemType: "NO",
    image: wheatImg,
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
    image: diamondImg,
    itemPoint: {
        x: 36,
        y: 5,
    },
    itemPlace: {x:-1,y:-1,},
  };

  var possibleItemsTemp = [log, firewood, flint, stone, apple, brick, wheat, diamond];
  return possibleItemsTemp;
};

//veiw shidft \
function placeImages(){
  islandImages = []
  for(i = 0; i < island[0].length; i++){
    islandImages[i] = [];
  }
  //tileImgs
  var count = 0;
  for(i = 0; i < island.length; i++){
    for (j = 0; j < island[0].length; j++){
    //  print("Image: " + tileImgs[count] + " in i: " + i + " j: " + j);
      islandImages[i][j] = tileImgs[count];

      count++;
    }
  }
}
function isNextMap(x,y){//When plye hits the side change paramiters for view
  var xPlus = mapDrawCoo.x+viewSize;
  var xMinus = mapDrawCoo.x-viewSize;
  var yPlus = mapDrawCoo.y+viewSize;
  var yMinus = mapDrawCoo.y-viewSize;

  if(x > wi){
    //next map right
    xpos = 0;
    mapDrawCoo.x = mapDrawCoo.x+viewSize;
    itemInVeiw();
    //console.log("I hitt the riht\n mapDrawCoo.x: " + xPlus);
  } else if(x < 0){
    xpos = wi;
    mapDrawCoo.x = mapDrawCoo.x-viewSize;
    itemInVeiw();
    //next map left
  } else if(y > hi){
    ypos = 0;
    mapDrawCoo.y = mapDrawCoo.y+viewSize;
    itemInVeiw();
    //next map down
  } else if(y < 0){
    ypos = hi;
    mapDrawCoo.y = mapDrawCoo.y-viewSize;
    itemInVeiw();
    //next map up
  }


}
function itemInVeiw(){//Calculets what item shuld be drawn and asign place in view
  //print("function itemInVeiw()");
  itemOnView = [];
  //print("itemOnbord.length: " + itemOnbord.length);
  for (i = 0; i < itemOnbord.length; i++){
    //print("itemOnbord[i].itemPoint.x: " + itemOnbord[i].itemPoint.x );
    //print("itemOnbord[i].itemPoint.y: " + itemOnbord[i].itemPoint.y );

    if(itemOnbord[i].itemPoint.x > mapDrawCoo.x && itemOnbord[i].itemPoint.x < mapDrawCoo.x+viewSize){
      if(itemOnbord[i].itemPoint.y > mapDrawCoo.y && itemOnbord[i].itemPoint.y < mapDrawCoo.y+viewSize){
        //Assigning place in view to item
        var tempX = itemOnbord[i].itemPoint.x;
        var tempY = itemOnbord[i].itemPoint.y;
        var tempPlace = island[tempX][tempY].placeCanvas;
        //console.log("tempPlace.x " + island[tempX][tempY].placeCanvas.x);
        itemOnbord[i].itemPlace.x = tempPlace.x;
        itemOnbord[i].itemPlace.y = tempPlace.y;

        //item print("added a item");
        //Adds item to list of items in view
        itemOnView.push(itemOnbord[i]);
      }
    }
  }
  //console.log(itemOnView);
}
//KESY
function isKeyDown() {//Cheks if a key is held
  if (keyIsDown(DOWN_ARROW)) {
    //targetY = ypos + speed;
    if(!player.noGo.up){
      ypos += speed;
    }
  }
  if (keyIsDown(UP_ARROW)){
    //targetY = ypos - speed;
    if(!player.noGo.down){
      ypos -= speed;
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    //targetX = xpos - speed;
    if(!player.noGo.left){
      xpos -= speed;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    //targetX = xpos + speed;
    if(!player.noGo.right){
      xpos += speed;
    }
  }
}
//Read island model//
function readMatrix(){//Reds islandMatrix and adds tiles to island[]
  var rowLength = islandMatrix[0].length;

  var tempIland =  new Array(islandMatrix.length);
  console.log(row);
  for (var i = 0; i < islandMatrix.length; i++) {
    tempIland[i] = new Array(rowLength);
  }

  for ( i = 0; i < islandMatrix.length; i++) {

     for ( j = 0; j < rowLength; j++) {
       //parse each character to do something depending on the value
          var row = islandMatrix[i];
          //console.log(row.charAt(j));
                 switch (row.charAt(j)) {

                   case '0':
                     tempIland[i][j] = {
                         id: 0,
                         tileType: "NO",
                         image: "NO",
                         placeCanvas: place,
                         cord: {
                           x: i,
                           y: j,
                         },
                         tileItem: "NO",
                       };
                       // console.log(tile);
                       //island.push(tile);
                     //create water tile
                           break;
                   case '1':
                     tempIland[i][j] = {
                         id: 1,
                         tileType: "NO",
                         image: "NO",
                         placeCanvas: place,
                         cord: {
                           x: i,
                           y: j,
                         },
                         tileItem: "NO",
                       };
                       //create land tile
                       // island.push(tile);
                           break;
                   // case '2':
                         //create other tile
                           // break;
                   }
    }
  }
    //console.log(tempIland);
    return tempIland;
}

//Keypresed
function keyTyped(){
  if(key === ' '){
    pickUpItem();
  }
}
function inventoryCreate() {
    //loop through player inventory to see if items exist
  for (i = 0; i < player.inventory.length; i++){
    var inventoryItem = document.createElement("img");
    inventoryItem.setAttribute("src", player.inventory[i].image);
    document.getElementById("item-box").appendChild(inventoryItem);
  }

}

// function keyPressed(){
//   drawView();
//   if (keyCode == DOWN_ARROW){
//     targetY = ypos + speed;
//   }
//   if (keyCode == UP_ARROW){
//     targetY = ypos - speed;
//   }
//   if (keyCode == LEFT_ARROW) {
//     targetX = xpos - speed;
//   }
//   if (keyCode == RIGHT_ARROW) {
//     targetX = xpos + speed;
//   }
// }
