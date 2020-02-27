/*Downloaded from https://www.codeseek.co/Jastor11/p5js-character-moving-on-screen-dpEQqJ */
//30/50
wi = 700;
hi = 700;
//Game

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


function getDiamond() {
    return diamond;
};


var possibleItems = []; //1 of all the possible items
var tilesize = 70;
var viewSize = 10;
var mapDrawCoo = {x:0,y:0,};
//item
var possibleItems = []; //1 of all the possible items
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
  coordinate: point,
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
  inventory: [getDiamond()],//List of items payer has
  isClowsToItem: false,
  clowsestItem: null,
  noGo: {
    down: false,
    up: false,
    right: false,
    left: false,
  },
};

console.log(player.inventory)
console.log(player.inventory[0].image)
var inventoryItem = document.createElement("img");
inventoryItem.setAttribute("src", player.inventory[0].image);
console.log(inventoryItem)

document.getElementById("items-list").appendChild(inventoryItem);

//Elipse
var xpos = player.placeCanvas.x;
var ypos = player.placeCanvas.y;
var targetX;
var targetY;
var speed = 100;
var easing = 0.05;

function prelode() {

}

function setup() {
  var board = createCanvas(wi, hi);
   board.parent("board-container");
  frameRate(60);
  background(0);
  noStroke();
  island = readMatrix();
//Test for drawing item take away when items are added
  itemOnbord.push({
    id: 0,
    name: "NO",
    itemType: "NO",
    image:"NO",
    itemPoint: {x:9,y:9},
    itemPlace: place,
  });//Test end
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
}

function drawPlayer(){//Draws the player in the view

  noStroke();
  fill('#A42B2A');
  ellipseMode(CENTER);
  ellipse(xpos, ypos, 25, 25);
  player.placeCanvas.x = xpos;
  player.placeCanvas.y = ypos;

  isNextMap(xpos,ypos);//To si if plyer is at the edgj

//Movment of player
var dy = targetY - ypos;
var dx = targetX -xpos;
//hitWater();
//If trys to move wrong way
  if(player.noGo.down && dy > 0){
    dy = 0;
  }
  if(player.noGo.up && dy < 0){
    dy = 0;
  }
  if(player.noGo.right && dx > 0){
    dx = 0;
  }
  if(player.noGo.left && dx < 0){
    dx = 0;
  }
if (abs(dy) > 1) {
  ypos = ypos + dy * easing;
}
  if (abs(dx) > 1) {
    xpos = xpos + dx * easing;
  }
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
        drawTile(0,drawXat,drawYat);
      } else if (island[i][j].id == 1){
        drawTile(1,drawXat,drawYat);
        island[i][j].placeCanvas = {x:drawXat,y:drawYat};
      } else if (island[i][j].id == 0){
        drawTile(0,drawXat,drawYat);
        island[i][j].placeCanvas = {x:drawXat,y:drawYat};
        waterInview.push(island[i][j]);
      }
      drawXat += tilesize;
    }
    drawYat += tilesize;
  }
  /*  player at 7,7
  draw x-6 to x+6
  draw y-6 to y+6
  iff null draw water
  */
}
function drawItems(){//Draws the item and asigns it a place that is in the view
  for (i = 0; i < itemOnView.length; i++){
    drawItem(itemOnView[i]);
  }
}
function drawTile(id, x, y){//Draws a tile
  //console.log("Draw tile id: " + id + " at x: " +x + " y: " +y);
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
function drawItem(itemToDraw){//Draws the items image
  fill('#BA7035');
  square(itemToDraw.itemPlace.x+20, itemToDraw.itemPlace.y+20, 30);
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

    var itemX = itemOnView[i].itemPlace.x + tilesize/2;
    var itemY = itemOnView[i].itemPlace.y+ tilesize/2;
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
  }
}
function hitWater(){
  player.noGo.down = false;
  player.noGo.up = false;
  player.noGo.left = false;
  player.noGo.right = false;

  var px = player.placeCanvas.x - tilesize/2+1;
  var py = player.placeCanvas.y- tilesize/2+1;
  for (i = 0; i < waterInview.length; i++){
    var wx = waterInview[i].placeCanvas.x;
    var wy = waterInview[i].placeCanvas.y;
    hit = collideRectRect(px, py, tilesize, tilesize, wx, wy, tilesize, tilesize);
    if(hit){
      //print("I hit water down");
      //player related to water
      if(px > wx){
        player.noGo.left = true;
      } else {
      }
      /*if(px < wx){player.noGo.right = true;} else {
        if(px > wx){player.noGo.left = true;}
        if(py > wy){player.noGo.up = true;}
        if(py < wy){player.noGo.down = true;}
      }
      if(py > wy){player.noGo.up = true;} else {
        if(px > wx){player.noGo.left = true;}
        if(px < wx){player.noGo.right = true;}
        if(py < wy){player.noGo.down = true;}
      }
      if(py < wy){player.noGo.down = true;} else {
        if(px > wx){player.noGo.left = true;}
        if(px < wx){player.noGo.right = true;}
        if(py > wy){player.noGo.up = true;}
      }*/
      //player.noGo = true;
    }
  }


}

//Delaing with items
function deleteItem(deleteItem){//Takes away the picked up item form world
  for (i = 0; i < itemOnbord.length; i++){
    if(itemOnbord[i].itemPoint == deleteItem.itemPoint){
      itemOnbord.splice(i, 1);
    }
  }
  for (i = 0; itemOnView.length; i++){
    if(itemOnView[i].itemPoint == deleteItem.itemPoint){
      itemOnView.splice(i, 1);
    }
  }
}
function addItemToInventory(pickItem){//Adds item to inventory
  player.inventory.push(pickItem);
}

//veiw shidft \
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
  itemOnView = [];
  for (i = 0; i < itemOnbord.length; i++){
    if(itemOnbord[i].itemPoint.x > mapDrawCoo.x && itemOnbord[i].itemPoint.x < mapDrawCoo.x+viewSize){
      if(itemOnbord[i].itemPoint.y > mapDrawCoo.y && itemOnbord[i].itemPoint.y < mapDrawCoo.y+viewSize){
        //Assigning place in view to item
        var tempX = itemOnbord[i].itemPoint.x;
        var tempY = itemOnbord[i].itemPoint.y;
        var tempPlace = island[tempX][tempY].placeCanvas;
        //console.log("tempPlace.x " + island[tempX][tempY].placeCanvas.x);
        itemOnbord[i].itemPlace.x = tempPlace.x;
        itemOnbord[i].itemPlace.y = tempPlace.y;

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
    targetY = ypos + speed;
  }
  if (keyIsDown(UP_ARROW)){
    targetY = ypos - speed;
  }
  if (keyIsDown(LEFT_ARROW)) {
    targetX = xpos - speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    targetX = xpos + speed;
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
