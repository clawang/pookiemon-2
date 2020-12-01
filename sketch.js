//game variables
let canvasSize = 500;
let portalArt;
let player;
let tool;
let tiles = [];
var magic
var levelsound

//level drawing variables
let tileMaps = [];
tileMaps[0] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 0, 0, 4, 5, 5, 6, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 6, 0, 0, 0, 0, 0], 
  [0, 4, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 4, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3]
];
tileMaps[1] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 0, 0, 4, 5, 5, 6, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 4, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0], 
  [0, 4, 5, 6, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 0, 0], 
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3]
];
tileMaps[2] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 4, 5, 5, 6, 0, 0, 0, 0, 4, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 6, 0, 0, 0, 0, 0, 0], 
  [4, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 4, 5, 6, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3]
];
tileMaps[3] = [
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 6, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 6, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[4, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3]
];
tileMaps[4] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 4, 5, 5, 6, 0, 0, 0, 0, 4, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 6, 0, 0, 0, 0, 0, 0], 
  [4, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 4, 5, 6, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3]
];
tileMaps[5] = [
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 6, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
[0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 4, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 6, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3]
];
tileMaps[6] = [
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3]
];
let tileMap = tileMaps[0];
let backgrounds = [];
let covidStats = [
  {count: 5, health: 100, hp: 50, width: 40, height: 40, xp: 100},
  {count: 10, health: 150, hp: 100, width: 70, height: 40, xp: 150},
  {count: 20, health: 250, hp: 150, width: 70, height: 60, xp: 200},
  {count: 40, health: 500, hp: 300, width: 80, height: 60, xp: 250},
  {count: 30, health: 800, hp: 500, width: 80, height: 60, xp: 300},
];
let covidArtwork = [];
let playerStats = [
  {health: 1000, hp: 40},
  {health: 1500, hp: 50},
  {health: 2000, hp: 70},
  {health: 2500, hp: 100},
  {health: 3000, hp: 150},
  {health: 3500, hp: 200}
];
let portals = [
  {xPos: 500, yPos: 400, level: 0, artwork: {}, img: {}, width: 130, height: 130, unlocked: true},
  {xPos: 200, yPos: 260, level: 1, artwork: {}, img: {}, width: 90, height: 120, unlocked: false},
  {xPos: 500, yPos: 210, level: 2, artwork: {}, img: {}, width: 90, height: 120, unlocked: false},
  {xPos: 790, yPos: 260, level: 3, artwork: {}, img: {}, width: 110, height: 110, unlocked: false},
  {xPos: 680, yPos: 70, level: 4, artwork: {}, img: {}, width: 100, height: 110, unlocked: false},
];
let shopItems = [
  {name: 'potion2', description: 'This potion will restore your health points by 100', price: 50, xPos: 410, yPos: 375, width: 40, height: 40, artwork: {}, display: true},
  {name: 'potion3', description: 'This potion will restore your health points by 200', price: 100, xPos: 450, yPos: 375, width: 38, height: 40, artwork: {}, display: true},
  {name: 'potion1', description: 'This potion will restore your health points by 400', price: 200, xPos: 500, yPos: 375, width: 40, height: 40, artwork: {}, display: true},
  {name: 'bullet life', description: 'Increase your bullet range by 15', price: 300, xPos: 580, yPos: 200, width: 52, height: 43, display: false},
  {name: 'bullet power', description: 'Increase your bullet power by 20%', price: 500, xPos: 725, yPos: 255, width: 50, height: 45, display: false},
  {name: 'movement speed', description: 'Increase your speed', price: 400, xPos: 688, yPos: 427, width: 40, height: 35, display: false},
  {name: 'shield', description: 'Press "s" to protect against getting hurt by Covid particles', price: 3000, xPos: 630, yPos: 300, width: 60, height: 75, artwork: {}, display: true}
];

//other stuff
let gravity = 0.2;
let covids = [];
let covidCount = 5;
let deaths = 0;
let bullets = [];
let bulletLife = 100;
let bulletWait = 0;
let level = 1;
let graveY = 0;
let gameOver = false;
let state = -1; //-1 is start screen, 0 is japan, 1 is philippines, 2 is italy, 3 is usa, 4 is florida, 5 is map, -2 is shop
let levelChange = false
let screenIndex = -1;
let screenInterval = 100;
let screenColors = {
  0: 'rgba(255, 0, 0', 
  1: 'rgba(0, 255, 0',
  2: 'rgba(255, 255, 0',
  3: 'rgba(0, 0, 255',
  4: 'rgba(255, 255, 255'
}
let mapMode = true;
let transition = false;
let transitionDirection = 0;
let transitionTimer = 0;
let popUp = false;
let popUpText = '';
let selectedItem = -1;
let message = false;
let messageText = '';
let messageTimer = 200;
let mapPos = [canvasSize/2, 430];
let playerOldStats = {
  xp: 0,
  health: 0
};

//direction variables
let up = 0;
let down = 0;
let left = 0;
let right = 0;
let jumping = false;

// load in all of our graphical assets
function preload() {
  //font
  font = loadFont("fonts/Monoton-Regular.ttf")
  font2 =loadFont("fonts/BebasNeue-Regular.ttf")
  //backgrounds
  backgrounds[0] = loadImage("japan2.jpg");
  backgrounds[1] = loadImage("island.jpg");
  backgrounds[2] = loadImage("paris.jpg");
  backgrounds[3] = loadImage("newyork.png");
  backgrounds[4] = loadImage("florida.jpg");
  backgrounds[5] = loadImage("bg.jpg");
  portals[0].artwork = loadImage("japanportal.png");
  portals[1].artwork = loadImage("philippinesportal.png");
  portals[2].artwork = loadImage("parisportal.png");
  portals[3].artwork = loadImage("portal.png");
  portals[4].artwork = loadImage("floridaportal.png");
  portals[1].img = loadImage("philippinesportal1.png");
  portals[2].img = loadImage("parisportal1.png");
  portals[3].img = loadImage("nycportal1.png");
  portals[4].img = loadImage("floridaportal1.png");
  portalArt = loadImage("portal1.png");
  //shop assets
  npc = loadImage("npc8.png")
  shop = loadImage("shop.png")
  npc2 = loadImage("npc.png")

  //guy
  charArtwork = loadImage("MS_Warrior_art.png");
  //girl
  charLeft = loadImage("mercedes_left.png");
  charRight = loadImage("mercedes_right.png")
  tiles[1] = loadImage("Tile_1.png");
  tiles[2] = loadImage("Tile_2.png");
  tiles[3] = loadImage("Tile_3.png");
  tiles[4] = loadImage("Tile_10.png");
  tiles[5] = loadImage("Tile_11.png");
  tiles[6] = loadImage("Tile_12.png");
  //game graphic
  covidArtwork[0] = loadImage("covid1.png");
  covidArtwork[1] = loadImage("covid2.png");
  covidArtwork[2] = loadImage("covid3.png");
  covidArtwork[3] = loadImage("covid4.png");
  covidArtwork[4] = loadImage("covid4.png");
  blueBall = loadImage("good.svg");
  shopItems[1].artwork = loadImage("potion1.png");
  shopItems[0].artwork = loadImage("potion2.png");
  shopItems[2].artwork = loadImage("potion3.png");
  shopItems[6].artwork = loadImage("shieldshop.png");
  popupArt = loadImage("dialog.png")
  shieldArt = loadImage("shield.png");

  //sounds
  levelsound = loadSound("sounds/level.mp3");
  magic = loadSound("sounds/magic.wav");
}

function setup() {
  let canvas = createCanvas(1000, canvasSize + 100);
  canvas.parent('game-container');

  player = new Character(canvasSize/2, 430);
  
}

function draw() {
  // draw our background image
  clear();
  noStroke();

  if(state === -1) {
    imageMode(CORNER);
    image(backgrounds[0], 0, 0, 1000,500 );
    textSize(50)
    fill(255)
    textFont(font);
    textAlign(CENTER);
    text("COVIDSTORY", 500,150)
    textSize(25)
    fill(125 + sin(frameCount*0.1)*125);
    text("Press space to start your quest", 500,200)
    textSize(20)
    textFont(font2)
    fill(255)
    text("how to play:", 500, 380);
    text("use the arrow keys to move", 500, 405);
    text("hit X to shoot bullets and to use portals", 500, 430);

    if (keyIsDown(32)){
      state = 0;
      userStartAudio().then(function(){});
    }
  }

  if(mapMode && state != -1) {
    tileMap = tileMaps[5];
    drawLevel(5);
  }
   else {
    //japan
    if (state === 0){
      if(!levelChange) {
        resetLevel(0);
        tileMap = tileMaps[0];
        levelChange = true;
      }
      drawLevel(0);
    }

    //philippines
    if (state === 1){
      if(!levelChange) {
        resetLevel(1);
        tileMap = tileMaps[1];
        levelChange = true;
      }
      drawLevel(1);
    }
//paris
    if (state === 2){
      if(!levelChange) {
        resetLevel(2);
        tileMap = tileMaps[2];
        levelChange = true;
      }
      drawLevel(2);
    }
//new york
    if (state === 3){
      if(!levelChange) {
        resetLevel(3);
        tileMap = tileMaps[3];
        levelChange = true;
      }
      drawLevel(3);
    }
  //florida
    if (state === 4){
      if(!levelChange) {
        resetLevel(4);
        tileMap = tileMaps[4];
        levelChange = true;
      }
      drawLevel(4);
    }
//shop
    if (state === -2){
      tileMap = tileMaps[6];
      drawShop();
    }
  }

  if(message) {
    //stroke(141, 108, 87);
    fill(255, 150, 0);
    textSize(15);
    text(messageText, 503, 530);
    messageTimer--;
    if(messageTimer <= 0) {
      message = false;
    }
  }

  if(screenIndex >= 0 && screenInterval > 0) {
    let str = screenColors[screenIndex] + ',' + (screenInterval/100) + ')';
    let c = color(str);
    fill(c);
    rect(0, 0, 1000, 500);
    screenInterval--;
  }

  if(transition) {
    let alpha = map(transitionTimer, 0, 100, 0, 255)
    fill(0, transitionDirection > 0 ? alpha : 255 - alpha);
    rect(0, 0, 1000, 500);
    transitionTimer--;
    player.disabled = true;
    if(transitionTimer <= 0 && transitionDirection === 0) {
      mapMode = !mapMode;
      transitionTimer = 100;
      transitionDirection = 1;
      levelChange = false;
      if(mapMode) {
        player.xPos = mapPos[0];
        player.yPos = mapPos[1];
      }
    }
    if(transitionTimer <= 0 && transitionDirection === 1) {
      transition = false;
      player.disabled = false;
    }
  }

  if(gameOver) {
    fill(0, (down++) * 2.55);
    rect(0, 0, 1000, 600);
    player.disabled = true;
    player.display();
    fill(255, 150, 0);
    textSize(50);
    textAlign(CENTER);
    text('YOU CONTRACTED COVID', 500, 250);
    textSize(20);
    text('TRY AGAIN LATER', 500, 280);
    if(down === 100) {
      player.xp = playerOldStats.xp;
      player.hp = playerOldStats.health;
      player.xPos = mapPos[0];
      player.yPos = mapPos[1];
      down = 0;
      mapMode = true;
      transition = true;
      transitionTimer = 100;
      transitionDirection = 1;
      gameOver = false;
    }
  }
}

function resetLevel(level) {
  covids = [];
  bullets = [];
  deaths = 0;
  covidCount = covidStats[level].count;
  for(let i = 0; i < covidCount; i++) {
    covid = new Covid(level);
    covids.push(covid);
  }
  bulletWait = 0;
  player.xPos = 100;
  player.yPos = 440;
}

function drawLevel(level) {
  //some variables
  const levelNames = ["Japan", "Philippines", "Paris", "New York", "Florida"];
  imageMode(CORNER);
  image(backgrounds[level], 0, 0, 1000, 500);
  fill(0)
  rect(0,500, 1000, 50)
  fill(255)
  textSize(40);
  textAlign(CORNER);
  textFont(font);
  text(levelNames[level], 20, 50);
  textSize(20)
  //text("LvL " + player.level, 190, 50)
  text("STATS",10,532)
  textSize(15)
  textFont(font2)
  text(" EXPERIENCE " + player.xp, 100, 530)
  text(" HP " + player.hp + "/" + player.maxHp, 190, 530)
  fill(200, 200, 200)
  rect(270, 520, 200, 10)
  fill(0, 255, 0)
  rect(270, 520, (player.hp/player.maxHp) * 200, 10)
  fill(255)

  textFont(font2)
  textSize(10)
  noStroke()

  //game tiles
  for(let r = 0; r <10; r++) {
    for(let c = 0; c < 20; c++) {
      let tileIndex = tileMap[r][c];
      if(tileIndex > 0) {
        image(tiles[tileIndex], c*50, r*50, 50, 50);
      }
    }
  }

  if(!mapMode) {
    imageMode(CENTER);
    covids = covids.filter(cd => !cd.dead);
    covids.forEach(c => {
      c.draw();
      if(player.distance(c) <= 50 && !c.contact && !c.dead && !player.shield) {
        player.hurt(c.hit);
        if(player.hp <= 0) {
          gameOver = true;
        }
        c.contact = true;
      } else if(player.distance(c) > 50) {
        c.contact = false;
      }
    });
    bullets = bullets.filter(b => b.alive);
    bullets.forEach(b => {
      b.draw();
      covids.forEach(cd => {
        let dist = b.distance(cd);
        if(dist[0] <= 10 + cd.width/2 && dist[1] <= 15 + cd.height/2 && !cd.dead) {
          cd.hurt(Math.floor(player.hitPoints * player.hitUpgrade));
          if(cd.dead) {
            player.xp += covidStats[level].xp;
          }
          b.alive = false;
        }
      });
      if(b.xPos < -25 || b.xPos > 1025) {
        b.alive = false;
      }
      if(b.yPos < -25 || b.yPos > 525) {
        b.alive = false;
      }
    });
    if(bulletWait > 0) {
      bulletWait--;
    }
    if(deaths >= covidCount) { //defeat the level
      image(portalArt, 900, 425, 80, 100);
      let p = {xPos: 900, yPos: 430};
      if(level >= 4) {
        stroke(0);
        fill(255);
        textSize(40);
        textAlign(CENTER);
        text('COVID HAS BEEN ERADICATED', 500, 200);
        noStroke();
      }
      if(keyIsDown(88) && player.distance(p) <= 80 && !transition) { //if steps on portal
        levelsound.play();
        transition = true;
        transitionTimer = 100;
        transitionDirection = 0;
        if(level + 1 > player.level) { //increase player stats
          player.level = level + 1;
          player.hp += playerStats[level + 1].health - player.maxHp;
          player.maxHp = playerStats[level + 1].health;
          player.hitPoints = playerStats[level + 1].hp;
          if(level < portals.length - 1) {
            portals[level + 1].unlocked = true;
          }
        }
      }
    }
    player.display();
  } else { //map mode
    imageMode(CENTER);
    portals.forEach(p => {
      image(p.unlocked ? p.artwork : p.img, p.xPos, p.yPos, p.width, p.height);
    });
    image(npc, 930,435,75,75)
    fill(125 + sin(frameCount*0.1)*125);
    text("SHOP", 952, 419)
    textSize(15)
    fill(255)
    player.display();

    if(keyIsDown(88)) { //if entering a portal
      portals.forEach(p => {
        if(player.distance(p) <= 75 && p.unlocked && !transition) {
          transition = true;
          transitionTimer = 100;
          transitionDirection = 0;
          state = p.level;
          mapPos[0] = player.xPos;
          mapPos[1] = player.yPos;
          playerOldStats.xp = player.xp;
          playerOldStats.health = player.hp;
        }
      });
      if(player.xPos >= 920 && player.xPos <=1000 && player.yPos>=417 && player.yPos <=510 && !transition) {
        transition = true;
        transitionTimer = 100;
        transitionDirection = 0;
        state = -2;
        mapPos[0] = player.xPos;
        mapPos[1] = player.yPos;
      }
    }
  }
}  

function drawShop(){
  imageMode(CORNER)
  image(shop, 0,0,1000,550)
  image(portalArt,835,388)
  imageMode(CORNER)
  fill(255)
  textFont(font)
  textSize(45)
  text("o o  o",412,415)
  textSize(15)
  textFont(font2)
  fill(0)
  shopItems.forEach(sp => {
    if(sp.display) {
      image(sp.artwork, sp.xPos, sp.yPos, sp.width, sp.height);
    } else {
      textAlign(CENTER)
      text(sp.price, sp.xPos + sp.width / 2, sp.yPos + sp.height * 1.3);
    }
  });

  textAlign(LEFT)
  text("use your exp to buy items.", 118,389)

  //potion and weapon upgrade labels
  fill(125 + sin(frameCount*0.1)*125);
  text("BULLET RANGE", 575, 190)
  text("BULLET POWER", 715, 245)
  text("MOVEMENT SPEED", 670, 417)
  text("HP", 428, 373)
  text("HP", 468, 373)
  text("HP", 514, 373)
  if(!player.shieldUnlocked) {
    text("SHIELD", 645, 300)
  }

  //hover effect
  stroke(255);
  fill(0, 0, 0, 0);
  shopItems.forEach((sp, index) => {
    if(mouseX >= sp.xPos && mouseX <= sp.xPos + sp.width && mouseY >= sp.yPos && mouseY <= sp.yPos + sp.height && player.xp >= sp.price) {
      rect(sp.xPos, sp.yPos, sp.width, sp.height);
    }
  });
  noStroke();
  
  player.display()
  //stats bar
  fill(0)
  rect(0,500, 1000, 50)
  fill(255)
  textSize(20)
  textFont(font)
  text("STATS",10,532)
  textSize(15)
  textFont(font2)
  text(" EXPERIENCE " + player.xp, 100, 530)
  text(" HP " + player.hp + "/" + player.maxHp, 190, 530)
  fill(200, 200, 200)
  rect(270, 520, 200, 10)
  fill(0, 255, 0)
  rect(270, 520, (player.hp/player.maxHp) * 200, 10)

  //exit shop through portal
  if(keyIsDown(88) && player.xPos >= 835 && player.xPos <=875 && player.yPos>=388 && player.yPos <=500) {
    transition = true;
    transitionTimer = 100;
    transitionDirection = 0;
  }

  if(popUp) {
    imageMode(CENTER);
    image(popupArt, 500, 250, 248, 140);
    textAlign(CENTER);
    noStroke();
    fill(141, 108, 87);
    text(shopItems[selectedItem].description, 400, 220, 200, 100);
    imageMode(CORNER);
    textAlign(LEFT);
  } else {
    selectedItem = -1;
  }
  
}


  //selecting either potions or weapon upgrades
function mouseClicked(){
  if(state === -2) {
    if(!popUp) {
      shopItems.forEach((sp, index) => {
        if(mouseX >= sp.xPos && mouseX <= sp.xPos + sp.width && mouseY >= sp.yPos && mouseY <= sp.yPos + sp.height) {
          if(player.xp >= sp.price) {
            selectedItem = index;
            popUp = true;
            popUpText = sp.description;
          } else {
            message = true;
            messageText = "YOU DON'T HAVE ENOUGH XP";
            messageTimer = 200;
          }
        }
      });
    } else{
      if(mouseX >= 492 && mouseX <= 542 && mouseY >= 285 && mouseY <= 305) {
        popUp = false;
      }
      if(mouseX >= 437 && mouseX <= 487 && mouseY >= 285 && mouseY <= 305) {
        if(selectedItem === 0) {
          player.xp -= 50
          screenIndex = 1;
          screenInterval = 50;
          if(player.hp + 100 > player.maxHp) {
            player.hp = player.maxHp;
          } else {
            player.hp += 100;
          }
          popUp = false;
        } else if(selectedItem === 1) {
          if(player.hp + 200 > player.maxHp) {
            player.hp = player.maxHp;
          } else {
            player.hp += 200;
          }
          player.xp -= 100
          screenIndex = 3;
          screenInterval = 50;
          popUp = false;
        } else if(selectedItem === 2) {
          if(player.hp + 400 > player.maxHp) {
            player.hp = player.maxHp;
          } else {
            player.hp += 400;
          }
          player.xp -= 200
          screenIndex = 2;
          screenInterval = 50;
          popUp = false;
        } else if(selectedItem === 3) {
          player.xp -= shopItems[3].price;
          bulletLife += 15;
          screenIndex = 4;
          screenInterval = 50;
          shopItems[3].price = Math.ceil(shopItems[3].price*1.75);
          popUp = false;
        } else if(selectedItem === 4) {
          player.xp -= shopItems[4].price;
          player.hitUpgrade *= 1.2
          screenIndex = 4;
          screenInterval = 50;
          shopItems[4].price *= 2;
          popUp = false;
        } else if(selectedItem === 5) {
          player.xp -= shopItems[5].price;
          player.speed +=0.5
          screenIndex = 4;
          screenInterval = 50;
          shopItems[5].price *= 2;
          popUp = false;
        } else if(selectedItem === 6) {
          player.xp -= shopItems[6].price;
          player.shieldUnlocked = true;
          popUp = false;
          shopItems.splice(6, 1);
        }
      }
    }
  }
}

function collision(r1, r2) {
  if (r1.xPos + r1.size > r2.xPos &&
    r1.xPos < r2.xPos + r2.size &&
    r2.yPos + r2.size > r1.yPos &&
    r2.yPos < r1.yPos + r1.size) {
    return true;
  } else {
    return false;
  }
};

function placeFree(xNew, yNew) {
  let temp = {xPos: xNew, yPos: yNew, size: 50};
  if(xNew < 0 || xNew > 1000 || yNew < 0 || yNew > 480) {
    return false;
  }
  let xTile = Math.floor(xNew / 50);
  let yTile = Math.floor(yNew / 50);
  //japan game tiles
  let tileIndex = tileMap[yTile][xTile];
  if(tileIndex > 0 && player.gravitySpeed >= 0 && player.yPos + 30 <= yTile * 50 + 50) {
    return false;
  } 
  return true;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function keyPressed() {
  if(!gameOver) {
    if (keyCode === UP_ARROW && jumping === false) {
      up = 1;
      jumping = true;
      player.jump();
    }
    if (keyCode === LEFT_ARROW) {
      left = 1;
      player.graphic = charLeft
    }
    if (keyCode === RIGHT_ARROW) {
      right = 1;
      player.graphic = charRight
    }
    if(keyCode === 88) {
      player.shooting = true;
      player.shield = false;
    }
    if(keyCode === 83) {
      player.shielding(true);
      player.shooting = false;
    }
  }
};

function keyReleased() {
  if (keyCode === UP_ARROW) {
    up = 0;
  }
  if (keyCode === LEFT_ARROW) {
    left = 0;
  }
  if (keyCode === RIGHT_ARROW) {
    right = 0;
  }
  if(keyCode === 88) {
    player.shooting = false;
  }
  if(keyCode === 83) {
    player.shielding(false);
  }
};

window.onload=function(){

}

class Character {
  constructor(x, y) {
    this.xPos = x;
    this.yPos = y;
    this.size = 50;
    this.speed = 3;
    this.gravitySpeed = 0;
    this.hitPoints = 40;
    this.hitUpgrade = 1;
    this.maxHp = 1000;
    this.hp = 1000;
    this.shooting = false;
    this.level = 0
    this.direction = 0;
    this.graphic = charLeft
    this.ghost = false;
    this.xp = 0;
    this.disabled = false;
    this.shieldUnlocked = false;
    this.shield = false;
  }

  display() {
    if(!this.disabled) {
      this.move();
      if(!this.shield) {
        //left
        if (keyIsDown(65)) {
          this.graphic = charLeft;
        }
          //right
        if (keyIsDown(68)) {
          this.graphic = charRight;
        }
      }
    }
    if(this.shooting) {
      this.shoot();
    }

    if(this.ghost) {
      image(ghostArtwork, this.xPos, this.yPos, 60, 60);
    } else {
      image(this.graphic, this.xPos, this.yPos, 60, 60);
      if(this.shield) {
        image(shieldArt, this.xPos + 5, this.yPos + 5, 30, 30);
      }
    }
   }

   calculateDirection() {
    if(left - right > 0) {
      this.direction = -1;
    }
    if(right - left > 0) {
      this.direction = 1;
    }
  }

  move() {
    if(!this.shield) {
      this.calculateDirection();
      let xDir = right - left;
      up = ((this.gravitySpeed < 0) ? 1 : 0);
      if (placeFree(this.xPos + this.speed * xDir, this.yPos)) {
        this.xPos += this.speed * xDir;
      }
    }
    if (placeFree(this.xPos, this.yPos + this.gravitySpeed + gravity)) {
      this.gravitySpeed += gravity;
      this.yPos += this.gravitySpeed;
      jumping = true;
    } else {
      this.gravitySpeed = 0;
    }
    if(this.gravitySpeed === 0) {
      jumping = false;
    }
  }

  hurt(pts) {
    // fill(255, 0, 0, 50);
    // rect(0, 0, 500, 500);
    screenIndex = 0;
    screenInterval = 50;
    this.hp -= pts;
  }

  jump() {
    if(!this.shield) {
      this.gravitySpeed = -8;
    }
  }

  shielding(status) {
    if(this.shieldUnlocked) {
      this.shield = status;
    }
  }

  shoot() {
    if(bulletWait === 0) { //and waiting period over
      let s = new Bullet(this.xPos, this.yPos, this.direction);
      bullets.push(s);
      bulletWait = 50;
    }
  }

  distance(monster) {
    return Math.sqrt(Math.pow(monster.xPos - this.xPos, 2) + Math.pow(monster.yPos - this.yPos, 2));
  }
}

class Bullet {
  constructor(x, y, d) {
    this.xPos = x;
    this.yPos = y;
    this.direction = d;
    this.speed = 2;
    this.alive = true;
    this.lifeSpan = bulletLife;
  }

  draw() {
    if(this.alive) {
      this.xPos += this.speed * this.direction;
      fill(255, 254, 240);
      image(blueBall, this.xPos,this.yPos);
      this.lifeSpan--;
      //ellipse(this.xPos, this.yPos, 10, 10);
    }
    if(this.lifeSpan <= 0) {
      this.alive = false;
    }
  }

  distance(monster) {
    return [Math.abs(monster.xPos - this.xPos), Math.abs(monster.yPos - this.yPos)];
  }
}

class Covid {
  constructor(level) {
    this.xPos = random(100,900);
    this.xStart = this.xPos;
    this.yPos = random(100,400);
    this.hpFull = covidStats[level].health;
    this.hp = this.hpFull;
    this.hit = covidStats[level].hp;
    this.dead = false;
    this.seed = random(1, 25);
    this.seed2 = random(1, 25);
    this.bar = 50
    this.contact = false;
    this.width = covidStats[level].width;
    this.height = covidStats[level].height;
    this.artwork = covidArtwork[level];
    this.level = level;
    this.xOffset = 0;
    this.yOffset = 0;
  }

  draw() {
    imageMode(CENTER);
    this.xPrev = this.xPos;
    this.yPrev = this.yPos;
    if(!this.dead) {
      let x = noise(this.seed);
      let a = noise(this.seed2);
      if(this.level > 3 && this.hp < this.hpFull) {
        let a = noise(this.seed2);
        let xRange = Math.round((player.xPos - this.xPos) / 100);
        let yRange = Math.round((player.yPos - this.yPos) / 100);
        if(this.xOffset < 800 && this.xOffset > -800) {
          this.xOffset += Math.sign(xRange);
        }
        if(this.yOffset < 300 && this.yOffset > -300) {
          this.yOffset += Math.sign(yRange);
        }
        this.xPos = map(x, 0, 1, Math.max(this.xOffset, 0), Math.min(1000 + this.xOffset, 1000));
        this.yPos = map(a, 0, 1, Math.max(this.yOffset, 0), Math.min(500 + this.yOffset, 500));
      } else {
        let r = map(x, 0, 1, 0, 1000);
        this.xPos = r;
        if(this.level > 1) {
          let b = map(a, 0, 1, 0, 500);
          this.yPos = b;
        }
      }
      image(this.artwork, this.xPos, this.yPos, this.width, this.height);
      fill(0);
      text('HP: ' + this.hp, this.xPos - 20, this.yPos - 30);
      fill(189, 9, 0);
      rect(this.xPos - 30, this.yPos-50, (this.hp/this.hpFull) * 80, 8);
      let diff = map(this.hp/this.hpFull, 0, 1, 0.003, 0.001);
      this.seed += diff;
      this.seed2 += diff;
    }
  }

  hurt(pts) {
    magic.play();
    this.hp -= pts;
    // this.bar = 50 *(this.hp/this.hpFull)
    if(this.hp <= 0) {
      this.dead = true;
      deaths++;
    }
  }
}


