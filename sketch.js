import { Fight, Contender, Move, drawFight, fightArrowKeyPressed, fightAKeyPressed } from './fight.js';
import { typeWriter } from "./text.js";

//game variables
const canvasWidth = 800;
const canvasHeight = 533;
const spaceSize = 34;
const multiplier = canvasWidth / 2378;
let player;
let logo;
let version;
let font;
let font2;

//level drawing variables
const tileMaps = [];
tileMaps[0] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 0, 1, 1, 2, 1, 0, 1, 2, 1, 1, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 1, 1, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let tileMap = tileMaps[0];
const backgrounds = [];
var mapVariables = [];
const foregroundObjects = [
  {
    fileName: "car-1.png",
    image: {},
    widthTiles: 3,
    heightTiles: 2,
    offsetXTiles: -5.5,
    offsetYTiles: 0.5
  },
  {
    fileName: "house-1.png",
    image: {},
    widthTiles: 8,
    heightTiles: 6,
    offsetXTiles: 1,
    offsetYTiles: 1.5
  },
  {
    fileName: "house-2.png",
    image: {},
    widthTiles: 6,
    heightTiles: 5,
    offsetXTiles: 5,
    offsetYTiles: -6
  },
  {
    fileName: "house-3.png",
    image: {},
    widthTiles: 8,
    heightTiles: 7,
    offsetXTiles: -6,
    offsetYTiles: -7
  },
  {
    fileName: "gate.png",
    image: {},
    widthTiles: 5,
    heightTiles: 2,
    offsetXTiles: -0.5,
    offsetYTiles: -4.5
  }
];

let backgroundSize;
let startPos;
let backgroundOffset;

var characterSprites = [[], [], [], []];
let sounds = {
  levelSound: null,
  battleSound: null,
  battleLoop: null,
  clickSound: null,
  getItemSound: null,
  faintSound: null,
  pokeballSound: null,
  attackSound: null,
  getItemSoundDone: false,
};

//other stuff
let level = 0;
let state = -1; //-1 is start screen, 0 is map, 1 is fight, 2 is game over
let screenIndex = -1;
let screenInterval = 100;
let screenColors = {
  0: 'rgba(255, 0, 0',
  1: 'rgba(0, 255, 0',
  2: 'rgba(255, 255, 0',
  3: 'rgba(0, 0, 255',
  4: 'rgba(255, 255, 255'
}

let transition = {
  started: false,
  direction: 0,
  timer: 0,
  type: 0,
  count: 0
};

let textBubble2;
let speechIndex = -1;
let speeches = [
  ["Claire really loves you, you know.", "She spent hours and hours working on this game.", "She'll kill herself if you don't like it."],
  ["I heard it's your and Claire's first anniversary?", "Congrats, man!"],
  ["Woah that car over there looks terrible!"],
  ["LITTLEROOT TOWN"]
];
let typeWriterProps = {
  currentCharacter: 0,
  buttonLocked: false
};

//direction variables
let up = 0;
let down = 0;
let left = 0;
let right = 0;

// fight sequence variables
let fights;
let currentFight = 0;

let textStep = 0;
let fightCar;
let abeBack;
let abeSprite;

// load in all of our graphical assets
function preload() {
  //font
  font = loadFont("assets/fonts/pokemon-emerald.ttf");
  font2 = loadFont("assets/fonts/concielianbold.ttf");

  logo = loadImage("assets/images/pookiemon.png");
  version = loadImage("assets/images/version.png");

  backgrounds[0] = loadImage("assets/images/littleroot-grid.png");
  backgrounds[1] = loadImage("assets/images/battle-screen-1.png");

  foregroundObjects.forEach(fg => {
    fg.image = loadImage(`assets/images/${fg.fileName}`);
  });

  // character sprites
  characterSprites[0][0] = loadImage("assets/images/character-sprites/forward-1.png");
  characterSprites[0][1] = loadImage("assets/images/character-sprites/forward-2.png");
  characterSprites[0][2] = characterSprites[0][0];
  characterSprites[0][3] = loadImage("assets/images/character-sprites/forward-3.png");
  characterSprites[1][0] = loadImage("assets/images/character-sprites/left-1.png");
  characterSprites[1][1] = loadImage("assets/images/character-sprites/left-2.png");
  characterSprites[1][2] = characterSprites[1][0];
  characterSprites[1][3] = loadImage("assets/images/character-sprites/left-3.png");
  characterSprites[2][0] = loadImage("assets/images/character-sprites/right-1.png");
  characterSprites[2][1] = loadImage("assets/images/character-sprites/right-2.png");
  characterSprites[2][2] = characterSprites[2][0];
  characterSprites[2][3] = loadImage("assets/images/character-sprites/right-3.png");
  characterSprites[3][0] = loadImage("assets/images/character-sprites/back-1.png");
  characterSprites[3][1] = loadImage("assets/images/character-sprites/back-2.png");
  characterSprites[3][2] = characterSprites[3][0];
  characterSprites[3][3] = loadImage("assets/images/character-sprites/back-3.png");

  textBubble2 = loadImage("assets/images/text-bubble2.png");
  fightCar = loadImage("assets/images/car-battle.png");
  abeBack = loadImage("assets/images/abe-back.png");
  abeSprite = loadImage("assets/images/sprite.png");

  //sounds
  sounds.levelSound = loadSound("assets/sounds/littleroot-town.mp3");
  sounds.battleSound = loadSound("assets/sounds/battle-intro.mp3");
  sounds.battleLoop = loadSound("assets/sounds/battle-loop.mp3");
  sounds.clickSound = loadSound("assets/sounds/click.mp3");
  sounds.getItemSound = loadSound("assets/sounds/get-item.mp3");
  sounds.faintSound = loadSound("assets/sounds/faint.mp3");
  sounds.pokeballSound = loadSound("assets/sounds/exit-ball.mp3");
  sounds.attackSound = loadSound("assets/sounds/attack.mp3");

  fights = [
    new Fight(
      new Contender(
        abeBack,
        'ABRAHAM',
        25,
        5,
        abeSprite
      ),
      new Contender(
        fightCar,
        'SHITTY USED CAR',
      ),
      [
        [
        new Move('SHOW GF', 'BOYFRIEND', 1),
        new Move('YELL TO OWNER', 'EXTROVERT', 1),
        ],
        [
        new Move('EXAMINE', 'MECHANIC', 1),
        new Move('HAGGLE', 'SKEEZE', 1)
        ]
      ],
      canvasWidth,
      canvasHeight
    )
  ];
}

function setup() {
  getAudioContext().suspend();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('game-container');

  mapVariables[0] = new MapData(1156, 850, 578, 335);
  backgroundOffset = mapVariables[level].backgroundOffset;
  backgroundSize = mapVariables[level].backgroundSize;
  startPos = mapVariables[level].startPos;
  player = new Character(startPos.x, startPos.y);
}

function draw() {
  clear();
  noStroke();

  // start screen
  if (state === -1) {
    imageMode(CORNER);
    const grad = drawingContext.createLinearGradient(0, 0, 0, 563);
    grad.addColorStop(0, "#00489d");
    grad.addColorStop(1, "#0a9768");
    drawingContext.fillStyle = grad;
    rect(0, 0, canvasWidth, canvasHeight);
    textAlign(CENTER);
    imageMode(CENTER);
    image(logo, canvasWidth / 2, 180, 600, 474);
    image(version, canvasWidth / 2, 300, 350, 350 * 564 / 1638);
    textSize(20)
    fill(125 + sin(frameCount * 0.1) * 125);
    textFont(font2)
    text("PRESS SPACE TO START", canvasWidth / 2, 470)
    fill(255)
    textFont(font)

    if (keyIsDown(32)) {
      state = 0;
      userStartAudio();
      sounds.levelSound.play();
    }
  } else if (state === 0) {
    tileMap = tileMaps[0];
    drawLevel(0);
  } else if (state === 1) {
    drawFirstFight();
  } else if (state === 2) {
    drawGameOver();
  }

  // if (message) {
  //   //stroke(141, 108, 87);
  //   fill(255, 150, 0);
  //   textSize(15);
  //   text(messageText, 503, 530);
  //   messageTimer--;
  //   if (messageTimer <= 0) {
  //     message = false;
  //   }
  // }

  if (screenIndex >= 0 && screenInterval > 0) {
    let str = screenColors[screenIndex] + ',' + (screenInterval / 100) + ')';
    let c = color(str);
    fill(c);
    rect(0, 0, 1000, 500);
    screenInterval--;
  }

  if (transition.started) {
    let alpha = map(transition.timer, 0, 100, 0, 255);

    if (transition.type === 0) {
      transition.timer -= 10;
      fill(87, 97, 90, transition.direction > 0 ? alpha : 255 - alpha);
    } else if (transition.type === 1) {
      transition.timer -= 2;
      fill(0, transition.direction > 0 ? alpha : 255 - alpha);
    }
    rect(0, 0, canvasWidth, canvasHeight);
    if (transition.timer <= 0 && transition.direction === 0) {
      transition.timer = 100;
      transition.direction = 1;
      if (state === 1) {
        state = 2;
      } else if (state === 0 && transition.count >= 3) {
        state = 1;
        fights[currentFight].openFight.started = true;
        transition.started = false;
      }
    }
    if (transition.timer <= 0 && transition.direction === 1) {
      if (transition.type === 0) {
        transition.count++;
        transition.timer = 100;
        transition.direction = 0;
        if (transition.count >= 3) {
          transition.type = 1;
          // transition = false;
          // transition.count = 0;
        }
      } else {
        transition.started = false;
      }
    }
  }

  if (fights[currentFight].openFight.started) {
    fill(0);
    rect(0, 0 - fights[currentFight].openFight.count, canvasWidth, canvasHeight / 2);
    rect(0, canvasHeight / 2 + fights[currentFight].openFight.count, canvasWidth, canvasHeight / 2);
    fights[currentFight].openFight.increment();
  }
}

function drawLevel(level) {
  //some variables
  imageMode(CENTER);
  // background
  image(backgrounds[level], canvasWidth / 2 + backgroundOffset.x, canvasHeight / 2 + backgroundOffset.y, backgroundSize.width, backgroundSize.height);
  // console.log(canvasWidth / 2 + backgroundOffset.x);
  player.display();

  foregroundObjects.forEach((fg, i) => {
    let x = canvasWidth / 2 + backgroundOffset.x + (fg.offsetXTiles * spaceSize);
    let y = canvasHeight / 2 + backgroundOffset.y + fg.offsetYTiles * spaceSize;
    if (player.xDirection < 0 && player.bgMoving) {
      x -= player.speed;
    } else if (player.xDirection > 0 && player.bgMoving) {
      x += player.speed;
    } else if (player.yDirection < 0 && player.bgMoving) {
      y -= player.speed;
    } else if (player.yDirection > 0 && player.bgMoving) {
      y += player.speed;
    }
    image(fg.image, x, y, fg.widthTiles * spaceSize, fg.heightTiles * spaceSize);
  });

  if (speechIndex >= 0) {
    imageMode(CORNER);
    image(textBubble2, 0, 1130 * multiplier, canvasWidth, 462 * multiplier);
    textAlign(LEFT);
    textFont(font);
    textSize(40);
    fill(0);
    let displayText = typeWriter(speeches[speechIndex][textStep], typeWriterProps);
    text(displayText, 150 * multiplier, 1303 * multiplier, 2000 * multiplier);
    player.disabled = true;
  } else {
    player.disabled = false;
  }
}

function drawFirstFight() {
  drawFight(canvasWidth, canvasHeight, multiplier, font, fights[currentFight], typeWriterProps);
}

function drawGameOver() {
  rectMode(CORNER);
  fill(0);
  rect(0, 0, canvasWidth, canvasHeight);
  textAlign(CENTER);
  textFont(font);
  textSize(60);
  fill(255);
  text("GAME OVER", canvasWidth / 2, 200);
  textSize(30);
  text("Made with love by Claire <3", canvasWidth / 2, 250);
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
  if (xNew < 0 || xNew > backgroundSize.width || yNew < 0 || yNew > backgroundSize.height) {
    return false;
  }
  let xTile = Math.floor(xNew / spaceSize);
  let yTile = Math.floor(yNew / spaceSize);

  let tileIndex = tileMap[yTile][xTile];
  if (tileIndex > 0) {
    return false;
  }
  return true;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function keyPressed() {
  if (state === 1) {
    fightArrowKeyPressed(keyCode, fights[currentFight], { sounds });
    fightAKeyPressed(keyCode, fights[currentFight],
      {
        typeWriterProps,
        sounds,
        transition,
        canvasHeight,
        multiplier
      });
  }

  if (keyCode === UP_ARROW) {
    if (state === 0) {
      up = 1;
      player.graphicType = 3;
    }
  }
  if (keyCode === DOWN_ARROW) {
    if (state === 0) {
      down = 1;
      player.graphicType = 0;
    }
  }
  if (keyCode === LEFT_ARROW) {
    if (state === 0) {
      left = 1;
      player.graphicType = 1;
    }
  }
  if (keyCode === RIGHT_ARROW) {
    if (state === 0) {
      right = 1;
      player.graphicType = 2;
    }
  }
  // A
  if (keyCode === 65) {
    if (!typeWriterProps.buttonLocked) {
      if (state === 0) {
        if (speechIndex >= 0) {
          textStep++;
          typeWriterProps.currentCharacter = 0;
          if (textStep >= speeches[speechIndex].length) {
            textStep = 0;
            speechIndex = -1;
            typeWriterProps.currentCharacter = 0;
          } else {
            sounds.clickSound.play();
          }
        } else {
          let xTile = Math.floor(player.getNewXPosition() / spaceSize);
          let yTile = Math.floor(player.getNewYPosition() / spaceSize);
          // console.log(xTile, yTile);
          // console.log(tileMap[yTile][xTile]);
          if (tileMap[yTile][xTile] === 2) { // interactive tile
            if (xTile >= 10 && xTile <= 13 &&
              yTile >= 11 && yTile <= 14 && !transition.started) {
              transition.started = true;
              transition.timer = 100;
              transition.direction = 0;
              sounds.levelSound.stop();
              sounds.battleSound.play();
              sounds.battleSound.onended(() => sounds.battleLoop.loop());
            } else if (xTile === 23 &&
              yTile >= 10 && yTile <= 11) { // npc 1
              speechIndex = 0;
              sounds.clickSound.play();
            } else if (xTile === 23 &&
              yTile >= 15 && yTile <= 16) { // npc 2
              speechIndex = 1;
              sounds.clickSound.play();
            } else if (xTile === 14 &&
              yTile >= 1 && yTile <= 2) { // npc 3
              speechIndex = 2;
              sounds.clickSound.play();
            } else if (xTile === 17 && yTile === 8) { // town sign
              speechIndex = 3;
              sounds.clickSound.play();
            }
          }
        }
      }
    }
  }
  // S

};

function keyReleased() {
  if (keyCode === UP_ARROW) {
    up = 0;
  }
  if (keyCode === DOWN_ARROW) {
    down = 0;
  }
  if (keyCode === LEFT_ARROW) {
    left = 0;
  }
  if (keyCode === RIGHT_ARROW) {
    right = 0;
  }
  if (keyCode === 65) {
  }
  if (keyCode === 83) {
  }
};

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
window.keyReleased = keyReleased;

class Character {
  constructor(x, y) {
    this.xPos = x;
    this.yPos = y;
    this.size = 50;
    this.speed = 3;
    this.hitPoints = 40;
    this.hitUpgrade = 1;
    this.maxHp = 1000;
    this.hp = 1000;
    this.shooting = false;
    this.level = 0
    this.facingDirection = 0;
    this.xDirection = 0;
    this.yDirection = 0;
    this.graphicType = 0; // 0 is forward, 1 is left, 2 is right, 3 is back
    this.graphicFrame = 0;
    this.graphicDelay = 8;
    this.graphic = characterSprites[0][0];
    this.characterOffsetX = 0;
    this.characterOffsetY = 0;
    this.xp = 0;
    this.disabled = false;
    this.moving = false;
    this.bgMoving = true;
  }

  display() {
    if (!this.disabled) {
      this.move();
      this.graphic = characterSprites[this.graphicType][this.graphicFrame];
    }
    image(this.graphic, canvasWidth / 2 + this.characterOffsetX, canvasHeight / 2 + this.characterOffsetY, 40, 60);
  }

  updateGraphicType(newGraphicType) {
    if (this.xDirection > 0) {
      this.graphicType = 2;
    } else if (this.xDirection < 0) {
      this.graphicType = 1;
    } else if (this.yDirection < 0) {
      this.graphicType = 3;
    } else if (this.yDirection > 0) {
      this.graphicType = 0;
    }
  }

  calculateDirection() {
    this.xDirection = right - left;
    this.yDirection = down - up;
  }

  move() {
    this.calculateDirection();
    this.updatePositions();
    // console.log("x: " + this.xPos + "y: " + this.yPos);
  }

  getNewXPosition() {
    let multiplier = 0;
    if (this.graphicType === 1) {
      multiplier = spaceSize * -1;
    } else if (this.graphicType === 2) {
      multiplier = spaceSize;
    }
    return this.xPos + multiplier;
  }

  getNewYPosition() {
    let multiplier = 0;
    if (this.graphicType === 3) {
      multiplier = spaceSize * -1;
    } else if (this.graphicType === 0) {
      multiplier = spaceSize;
    }
    return this.yPos + multiplier;
  }

  updatePositions() {
    const newBackgroundOffset = {
      x: backgroundOffset.x + this.speed * this.xDirection * -1,
      y: backgroundOffset.y + this.speed * this.yDirection * -1,
    };
    if (this.xDirection != 0) {
      if (placeFree(this.xPos + this.speed * this.xDirection, this.yPos) &&
        placeFree(this.xPos + (this.speed + 20) * this.xDirection, this.yPos)) {
        this.updateGraphic();
        this.moving = true;
        if (this.characterOffsetX != 0 ||
          backgroundSize.width / 2 + newBackgroundOffset.x < canvasWidth / 2 ||
          backgroundSize.width / 2 - newBackgroundOffset.x < canvasWidth / 2) {
          this.xPos += this.speed * this.xDirection;
          this.characterOffsetX += this.speed * this.xDirection;
          this.bgMoving = false;
        } else {
          backgroundOffset.x = newBackgroundOffset.x;
          this.xPos = backgroundSize.width / 2 - backgroundOffset.x;
          this.bgMoving = true;
        }
      } else {
        this.stop();
      }
    } else if (this.yDirection != 0) {
      if (placeFree(this.xPos, this.yPos + this.speed * this.yDirection) &&
        placeFree(this.xPos, this.yPos + (this.speed + 15) * this.yDirection)) {
        this.updateGraphic();
        this.moving = true;
        if (this.characterOffsetY != 0 ||
          backgroundSize.height / 2 + newBackgroundOffset.y < canvasHeight / 2 ||
          backgroundSize.height / 2 - newBackgroundOffset.y < canvasHeight / 2) {
          this.yPos += this.speed * this.yDirection;
          this.characterOffsetY += this.speed * this.yDirection;
          this.bgMoving = false;
        } else {
          backgroundOffset.y = newBackgroundOffset.y;
          this.yPos = backgroundSize.height / 2 - backgroundOffset.y;
          this.bgMoving = true;
        }
      } else {
        this.stop();
      }
    } else {
      this.stop();
    }
  }

  stop() {
    this.graphicFrame = 0;
    this.moving = false;
    this.bgMoving = false;
    this.xPos
  }

  updateGraphic() {
    this.graphicDelay--;
    if (this.graphicDelay === 0) {
      this.graphicFrame = (this.graphicFrame + 1) % 4;
      this.graphicDelay = 8;
    }
  }

  distance(monster) {
    return Math.sqrt(Math.pow(monster.xPos - this.xPos, 2) + Math.pow(monster.yPos - this.yPos, 2));
  }
}


class MapData {
  constructor(bgWidth, bgHeight, startPosX, startPosY) {
    this.backgroundSize = {
      width: bgWidth,
      height: bgHeight
    };
    this.startPos = {
      x: startPosX,
      y: startPosY
    };
    this.backgroundOffset = {
      x: bgWidth / 2 - startPosX,
      y: bgHeight / 2 - startPosY
    };
  }
}