/*Downloaded from https://www.codeseek.co/Jastor11/p5js-character-moving-on-screen-dpEQqJ */
//30/50
wi = 700;
hi = 700;
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
    x: wi/2,
    y: hi/2,
  },
  inventory: [],//List of items payer has
};


//Elipse
var xpos = 100;
var ypos = 100;
var targetX;
var targetY;
var speed = 100;
var easing = 0.05;

function prelode() {

}

function setup() {
  var board = createCanvas(wi + 1, hi + 1);
   board.parent("board-container");
  frameRate(60);
  background(0);
  island = readMatrix();
}
function draw() {
  isKeyDown();
  drawView();
  drawPlayer();
}

function drawPlayer(){
  var startCord = player.coordinate;
  stroke(0);
  ellipseMode(CENTER);
  ellipse(xpos, ypos, 25, 25);
  isNextMap(xpos,ypos);

  var dx = targetX -xpos;
  if (abs(dx) > 1) {
    xpos = xpos + dx * easing;
  }
  var dy = targetY - ypos;
  if (abs(dy) > 1) {
    ypos = ypos + dy * easing;
  }
}
function drawView(){
  //console.log("Draw viwa");
  //var water = island[0][0];//A water tile 0,0
  var startCord = player.coordinate;
  var viewChuncCoo = mapDrawCoo;
  var drawXat = 0;
  var drawYat = 0;//tilesize

  for(i = viewChuncCoo.y; i < viewChuncCoo.y+viewSize; i++){
    drawXat = 0;
    for (j = viewChuncCoo.x; j < viewChuncCoo.x+viewSize; j++){
      //console.log("x: " + i + " y: " + j);
      if(i < 0 || j < 0 || i > cooMaxX || j > cooMaxY){
        drawTile(0,drawXat,drawYat);

      } else if (island[i][j].id == 1){
        drawTile(1,drawXat,drawYat);
        island[i][j].placeCanvas = {x:drawXat,y:drawYat,};

      } else if (island[i][j].id == 0){
        drawTile(0,drawXat,drawYat);
        island[i][j].placeCanvas = {x:drawXat,y:drawYat,};
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
function drawTile(id, x, y){
  //console.log("Draw tile id: " + id + " at x: " +x + " y: " +y);
  switch(id){
    case 0:
    fill(0);
    break;
  case 1:
    fill(200);
    break;
  default:
    // code block
    console.log("There was aonce a blog but no more in draw tile");
  }
  square(x, y, tilesize);
}
//ELIPSES
function drawElipse(){
  stroke(0);
  ellipseMode(CENTER);
  ellipse(xpos, ypos, 25, 25);

  var dx = targetX -xpos;
  if (abs(dx) > 1) {
    xpos = xpos + dx * easing;
  }
  var dy = targetY - ypos;
  if (abs(dy) > 1) {
    ypos = ypos + dy * easing;
  }
  // display xpos variable
  //fill(255);
  //text("xpos = " + xpos, 25, 25);
  //text("ypos = " + ypos, 25, 55);
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
function itemInVeiw(){//Calculets what item shuld be drawn
  for (i = 0; i < itemOnbord.length; i++){
    if(itemOnbord[i].x > mapDrawCoo.x && itemOnbord[i].x < mapDrawCoo.x+viewSize){
      if(itemOnbord[i].y > mapDrawCoo.y && itemOnbord[i].y < mapDrawCoo.y+viewSize){
        itemOnView.puch(itemOnbord[i]);
      }
    }
  }
  //console.log(itemOnView);
}
//KESY
function isKeyDown() {
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
//Read island model//
function readMatrix(){
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
