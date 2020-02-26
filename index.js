/*Downloaded from https://www.codeseek.co/Jastor11/p5js-character-moving-on-screen-dpEQqJ */
//30/50
//Game
var posibelItems = [];//1 of alle the posible items
var tilesize = 50;
var viewSize = 6;
//Game bord

var island = [[]];//contains tiles
var itemOnbord = []; //all the items that are placed in the world
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
  "00011111111111111111111111111111111111111111100000",
  "00011111111111111111111111111111111111111111100000",
  "00011111111111111111111111111111111111111111100000",
  "00011111111111111111111111111111111111111111100000",
  "00011111111111111111111111111111111111111100000000",
  "00000111111111111111111111111111111111111000000000",
  "00001011111111111111111111111111111111111000000000",
  "00000011111111111111111111111111111111111110000000",
  "00000001111111111111111111111111111111111111100000",
  "00000000111111111111111111111111111111111111100000",
  "00000000011111111111111111111111111111111111111000",
  "00000000011111111111111111111111111111111111111000",
  "00000000111111111111111111111111111111111111100000",
  "00000000111111111111111111111111111111111111100000",
  "00000011011111111111111111111111111111111111100000",
  "00000000000011111111111111111111111111111111100000",
  "00000000000011111111111111111111111111110000000000",
  "00000000000001111111111111111111111111111000000000",
  "00000000000000000000000000000000000000010000000000"
];

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
    x: 20,
    y: 20,
  },
  placeCanvas: place,
  inventory: [],//List of items payer has
};


//Elipse
var xpos = 100;
var ypos = 100;
var targetX;
var targetY;
var speed = 50;
var easing = 0.05;

function prelode() {

}

function setup() {
  createCanvas(400, 400);
  background(0);
  island = readMatrix();
  drawView();
}

function draw() {
  background(100);
  drawElipse();
}
function drawPlayer(){
  var playerCoo = player.coordinate;

}
function drawView(){
  console.log("Draw viwa");
  var water = island[0][0];//A water tile 0,0
  var playerCoo = player.coordinate;
  var drawXat = 0;
  var drawYat = 0;//tilesize

  for(i = playerCoo.y-viewSize; i < playerCoo.y+viewSize; i++){
    for (j = playerCoo.x-viewSize; j < playerCoo.x+viewSize; i++){
      if(i < 0 || j < 0){
        drawTile(0,drawXat,drawYat);
      } else if (island[i][j].id == 1){
        drawTile(1,drawXat,drawYat);
      } else if (island[i][j].id == 0){
        drawTile(0,drawXat,drawYat);
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

//KESY
function keyPressed(){
  if (keyCode == DOWN_ARROW){
    targetY = ypos + speed;
  }
  if (keyCode == UP_ARROW){
    targetY = ypos - speed;
  }
  if (keyCode == LEFT_ARROW) {
    targetX = xpos - speed;
  }
  if (keyCode == RIGHT_ARROW) {
    targetX = xpos + speed;
  }
}
//Read island model//
function readMatrix(){
  var tempIland = [[]];
  for ( i = 0; i < islandMatrix.length; i++) {

  // console.log(islandMatrix.length);
            //obtain each row from 0 to final length of array from matrix array
      var row = islandMatrix[i];
 // console.log(row.length);
      //go through each character within that row
            for ( j = 0; j < row.length; j++) {
                //parse each character to do something depending on the value
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
    console.log(island);
    return tempIland;
}
