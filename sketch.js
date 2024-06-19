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
let levelSound;
let battleSound;
let battleLoop;
let clickSound;
let getItemSound;
let faintSound;
let pokeballSound;
let attackSound;

//other stuff
let level = 0;
let state = -1; //-1 is start screen, 0 is map, 1 is fight, 2 is game over
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
let transition = false;
let transitionDirection = 0;
let transitionTimer = 0;
let transitionType = 0;
let transitionCount = 0;
let popUp = false;
let popUpText = '';
let selectedItem = -1;
let message = false;
let messageText = '';
let messageTimer = 200;
let mapPos = [canvasHeight / 2, 430];
let textBubble2;
let speechIndex = -1;
let speeches = [
  ["Claire really loves you, you know.", "She spent hours and hours working on this game.", "She'll kill herself if you don't like it."],
  ["I heard it's your and Claire's first anniversary?", "Congrats, man!"],
  ["Woah that car over there looks terrible!"],
  ["LITTLEROOT TOWN"]
];
let buttonLocked = false;

//direction variables
let up = 0;
let down = 0;
let left = 0;
let right = 0;

// fight sequence variables
let openFight = false;
let openFightTimer = 0;
let textBubble;
let cursor;
let cursorIndex = [0, 0];
let fightScreen = 0;
let textStep = 0;
let pookiemonBubble;
let pookiemonEntranceStage = 0;
let pookiemonEntrance = 0;
let foeEntrance = 0;
let foeBubbleEntrance = 0;
let battlePlatform;
let foeBattlePlatform;
let foeBubble;
let fightBubble;
let fightBattle;
let fightCar;
let abeBack;
let abeSprite;
let abePosition = 0;
let abeTransition = 255;
let abeShake = false;
let abeXPos = 0;
let abeScale = 1 / 197;
let usedMoves = 0;
const cursorPositions = [
  [],
  [
    [[1279, 1230], [1279, 1393]],
    [[1879, 1230], [1879, 1393]]
  ],
  [
    [[77, 1220], [77, 1383]],
    [[840, 1220], [840, 1383]]
  ]
];
const pp = [[1, 1], [1, 1]];
const moveTypes = [["BOYFRIEND", "EXTROVERT"], ["MECHANIC", "SKEEZE"]];
let currentCharacter = 0;
let pookiemonInfo;
let bagBg;
let bagArrow;
let bagCursorIndex = 0;
let hpWidth = 0;
let hpAnimation = false;
let getItemSoundDone = false;

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

  textBubble = loadImage("assets/images/text-bubble.png");
  textBubble2 = loadImage("assets/images/text-bubble2.png");
  fightBubble = loadImage("assets/images/fight-bubble.png");
  fightBattle = loadImage("assets/images/fight-battle.png");
  pookiemonBubble = loadImage("assets/images/pookiemon-bubble.png");
  battlePlatform = loadImage("assets/images/battle-platform.png");
  foeBattlePlatform = loadImage("assets/images/battle-platform-foe.png");
  foeBubble = loadImage("assets/images/foe-bubble.png");
  fightCar = loadImage("assets/images/car-battle.png");
  abeBack = loadImage("assets/images/abe-back.png");
  abeSprite = loadImage("assets/images/sprite.png");
  cursor = loadImage("assets/images/arrow.png");
  bagBg = loadImage("assets/images/bag.png");
  bagArrow = loadImage("assets/images/bag-arrow.png");
  pookiemonInfo = loadImage("assets/images/pokemon-info.png");

  //sounds
  levelSound = loadSound("assets/sounds/littleroot-town.mp3");
  battleSound = loadSound("assets/sounds/battle-intro.mp3");
  battleLoop = loadSound("assets/sounds/battle-loop.mp3");
  clickSound = loadSound("assets/sounds/click.mp3");
  getItemSound = loadSound("assets/sounds/get-item.mp3");
  faintSound = loadSound("assets/sounds/faint.mp3");
  pokeballSound = loadSound("assets/sounds/exit-ball.mp3");
  attackSound = loadSound("assets/sounds/attack.mp3");
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
      levelSound.play();
    }
  } else if (state === 0) {
    tileMap = tileMaps[0];
    drawLevel(0);
  } else if (state === 1) {
    drawFight();
  } else if (state === 2) {
    drawGameOver();
  }

  if (message) {
    //stroke(141, 108, 87);
    fill(255, 150, 0);
    textSize(15);
    text(messageText, 503, 530);
    messageTimer--;
    if (messageTimer <= 0) {
      message = false;
    }
  }

  if (screenIndex >= 0 && screenInterval > 0) {
    let str = screenColors[screenIndex] + ',' + (screenInterval / 100) + ')';
    let c = color(str);
    fill(c);
    rect(0, 0, 1000, 500);
    screenInterval--;
  }

  if (transition) {
    let alpha = map(transitionTimer, 0, 100, 0, 255);

    if (transitionType === 0) {
      transitionTimer -= 10;
      fill(87, 97, 90, transitionDirection > 0 ? alpha : 255 - alpha);
    } else if (transitionType === 1) {
      transitionTimer -= 2;
      fill(0, transitionDirection > 0 ? alpha : 255 - alpha);
    }
    rect(0, 0, canvasWidth, canvasHeight);
    if (transitionTimer <= 0 && transitionDirection === 0) {
      transitionTimer = 100;
      transitionDirection = 1;
      if (state === 1) {
        state = 2;
      } else if (state === 0 && transitionCount >= 3) {
        state = 1;
        openFight = true;
        transition = false;
      }
    }
    if (transitionTimer <= 0 && transitionDirection === 1) {
      if (transitionType === 0) {
        transitionCount++;
        transitionTimer = 100;
        transitionDirection = 0;
        if (transitionCount >= 3) {
          transitionType = 1;
          // transition = false;
          // transitionCount = 0;
        }
      } else {
        transition = false;
      }
    }
  }

  if (openFight) {
    fill(0);
    rect(0, 0 - openFightTimer, canvasWidth, canvasHeight / 2);
    rect(0, canvasHeight / 2 + openFightTimer, canvasWidth, canvasHeight / 2);
    openFightTimer += 4;
    if (openFightTimer > canvasHeight / 2) {
      openFight = false;
    }
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
    let displayText = typeWriter(speeches[speechIndex][textStep]);
    text(displayText, 150 * multiplier, 1303 * multiplier, 2000 * multiplier);
    player.disabled = true;
  } else {
    player.disabled = false;
  }
}

function drawFight() {
  imageMode(CENTER);
  // background
  image(backgrounds[1], canvasWidth / 2, canvasHeight / 2, canvasWidth, canvasHeight);

  if (foeEntrance < 2375) {
    foeEntrance += 19;
  } else if (foeEntrance >= 2375 && pookiemonEntranceStage === 0) {
    pookiemonEntranceStage = 1;
  }

  imageMode(CORNER);
  image(battlePlatform, (2414 - foeEntrance) * multiplier, 1008 * multiplier, 1188 * multiplier, 110 * multiplier);

  image(foeBattlePlatform, (foeEntrance - 1271) * multiplier, 470 * multiplier, 1271 * multiplier, 311 * multiplier);
  image(fightCar, (foeEntrance - 975) * multiplier, 290 * multiplier, 250, 147);

  if (pookiemonEntranceStage === 1 && foeBubbleEntrance < 1118) {
    foeBubbleEntrance += 26;
  } else if (foeBubbleEntrance >= 1118 && pookiemonEntranceStage === 1) {
    pookiemonEntranceStage = 2;
  }
  image(foeBubble, (foeBubbleEntrance - 992) * multiplier, 155 * multiplier, 992 * multiplier, 277 * multiplier);
  textAlign(LEFT);
  textFont(font);
  textSize(30);
  drawYellowTextWithShadow("SHITTY USED CAR", (foeBubbleEntrance - 932) * multiplier, 270 * multiplier);
  drawYellowTextWithShadow("Lv100", (foeBubbleEntrance - 308) * multiplier, 270 * multiplier);

  if (pookiemonEntranceStage > 2) {
    imageMode(CORNERS);
    if (abeScale < 1) {
      abeScale += 0.1;
    }
    image(abeBack, (649 - 297 * abeScale / 2 + abeXPos) * multiplier, (1134 - abeScale * 586 + abePosition) * multiplier, (649 + 297 * abeScale / 2 + abeXPos) * multiplier, (1134 + abePosition) * multiplier);
    if (abeTransition > 0) {
      tint(255, abeTransition);
      image(abeSprite, (649 - 297 * abeScale / 2) * multiplier, (1134 - abeScale * 586) * multiplier, (649 + 297 * abeScale / 2) * multiplier, 1134 * multiplier);
      noTint();
      if (abeScale >= 1) abeTransition -= 25;
    }
    if (abeTransition <= 0 && pookiemonEntrance < 1122) {
      pookiemonEntrance += 40;
    }
    imageMode(CORNER);
    image(pookiemonBubble, (2378 - pookiemonEntrance) * multiplier, 733 * multiplier, 1028 * multiplier, 357 * multiplier);
    textSize(35);
    drawYellowTextWithShadow("ABRAHAM", (2519 - pookiemonEntrance) * multiplier, 860 * multiplier);
    drawYellowTextWithShadow("Lv5", (3202 - pookiemonEntrance) * multiplier, 860 * multiplier);
    drawYellowTextWithShadow("25/25", (3122 - pookiemonEntrance) * multiplier, 1030 * multiplier);
  }
  textSize(45);
  image(textBubble, 0, 1123 * multiplier, canvasWidth, 462 * multiplier);

  if (fightScreen === 0) {
    if (pookiemonEntranceStage > 1) {
      const text = ["Wild SHITTY USED CAR appeared!", "Go! ABRAHAM!"];
      let introText = typeWriter(text[textStep]);
      drawTextWithShadow(introText, 50, 440);
    }
  } else if (fightScreen === 1) {
    // battle menu screen
    image(fightBubble, 400, 376, 400, 155);
    resetMatrix();
    textWrap(WORD);
    textAlign(LEFT);
    textLeading(50);
    drawTextWithShadow("What will ABRAHAM do?", 90 * multiplier, 1323 * multiplier, 636 * multiplier);
    drawBlackTextWithShadow("FIGHT", 0, 1352 * multiplier, 1323 * multiplier);
    drawBlackTextWithShadow("BAG", 0, 1954 * multiplier, 1323 * multiplier);
    drawBlackTextWithShadow("POOKIEMON", 0, 1352 * multiplier, 1479 * multiplier);
    drawBlackTextWithShadow("RUN", 0, 1954 * multiplier, 1479 * multiplier);
    image(cursor, cursorPositions[1][cursorIndex[0]][cursorIndex[1]][0] * multiplier, cursorPositions[1][cursorIndex[0]][cursorIndex[1]][1] * multiplier, 66 * multiplier, 106 * multiplier);
  } else if (fightScreen === 2) {
    // fight menu screen
    imageMode(CORNER);
    image(fightBattle, 0, 376, canvasWidth, 155);
    drawBlackTextWithShadow("SHOW GF", 0, 153 * multiplier, 1310 * multiplier);
    drawBlackTextWithShadow("EXAMINE", 0, 920 * multiplier, 1310 * multiplier);
    drawBlackTextWithShadow("YELL TO OWNER", 0, 153 * multiplier, 1466 * multiplier);
    drawBlackTextWithShadow("HAGGLE", 0, 920 * multiplier, 1466 * multiplier);
    drawBlackTextWithShadow("PP", pp[cursorIndex[0]][cursorIndex[1]] + 1, 1670 * multiplier, 1310 * multiplier);
    drawBlackTextWithShadow(`${pp[cursorIndex[0]][cursorIndex[1]]}/1`, pp[cursorIndex[0]][cursorIndex[1]] + 1, 2102 * multiplier, 1310 * multiplier);
    textSize(38);
    drawBlackTextWithShadow(`TYPE/${moveTypes[cursorIndex[0]][cursorIndex[1]]}`, 0, 1660 * multiplier, 1466 * multiplier);
    image(cursor, cursorPositions[2][cursorIndex[0]][cursorIndex[1]][0] * multiplier, cursorPositions[2][cursorIndex[0]][cursorIndex[1]][1] * multiplier, 66 * multiplier, 106 * multiplier);
  } else if (fightScreen === 3) {
    // show gf move
    const text = ["ABRAHAM used SHOW GF!", "\"Hey Babe, let's check out this car! Hop out!\"", "It's not very effective..."];
    let displayText = typeWriter(text[textStep]);
    drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
  } else if (fightScreen === 4) {
    // yell to owner move
    const text = ["ABRAHAM used YELL TO OWNER!", "\"Hey Dudeeee, sick car!\"", "It's not very effective..."];
    let displayText = typeWriter(text[textStep]);
    drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
  } else if (fightScreen === 5) {
    // examine move
    const text = ["ABRAHAM used EXAMINE!", "\"Woah, it's an old 1980's Yugo!\"", "It's not very effective..."];
    let displayText = typeWriter(text[textStep]);
    drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
  } else if (fightScreen === 6) {
    // haggle move
    let text = ["ABRAHAM used HAGGLE!", "\"Hey Man, I'll take it for $800!\"", "\"...You know what? Yeah, sure, it's yours.\"", "\"Oh shit really? I wasn't expecting that to work.\"", "ABRAHAM now owns SHITTY USED CAR!"];
    if (usedMoves < 3) {
      text = ["You haven't used all your other moves yet!"];
    }
    let displayText = typeWriter(text[textStep]);
    drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
  } else if (fightScreen === 7) {
    // haggle move ending
    fill(79, 90, 94);
    rectMode(CORNERS);
    if (hpAnimation) {
      abeShake = false;
      hpWidth = hpWidth + 5;
      if (hpWidth === 475) {
        hpAnimation = false;
        currentCharacter = 0;
      }
    } else if (abeShake) {
      abeXPos = abeXPos > 0 ? -10 : 10;
    }
    rect((2168 - hpWidth) * multiplier, 900 * multiplier, 2166 * multiplier, 921 * multiplier);
    const text = ["Wild SHITTY USED CAR used BREAK DOWN!", "It's super effective!"];
    let displayText = hpWidth === 475 ? typeWriter(text[1]) : typeWriter(text[0]);
    drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
  } else if (fightScreen === 8) {
    abePosition += 30;
    rect((2168 - hpWidth) * multiplier, 900 * multiplier, 2166 * multiplier, 921 * multiplier);
    const text = ["ABRAHAM fainted!"];
    let displayText = typeWriter(text[0]);
    drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
  } else if (fightScreen === 10) {
    image(pookiemonInfo, 0, 0, canvasWidth, canvasHeight);
  } else if (fightScreen === 11) {
    // bag
    drawBag();
  } else if (fightScreen === 12) {
    // run
    const text = ["Couldn't get away!"];
    let displayText = typeWriter(text[textStep]);
    drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
  }
}

const bagItems = [
  {
    name: "Sunglasses",
    quantity: 1,
    description: "Ray Bans, of course."
  },
  {
    name: "Cash Bills",
    quantity: 100,
    description: "For that cash disco- I mean, helping small businesses."
  },
  {
    name: "Adderall",
    quantity: "1800mg",
    description: "To treat the raging ADHD. Or maybe the Narcolepsy."
  },
  {
    name: "Air Tag",
    quantity: 8,
    description: "How else are you supposed to know where your shit is?"
  },
  {
    name: "Car Play",
    quantity: 1,
    description: "A non-negotiable."
  },
  {
    name: "Loose Screws",
    quantity: 24,
    description: "Real mechanic shit."
  },
  {
    name: "Oil Stains",
    quantity: 57,
    description: "It's part of the blue collar cosplay."
  },
  {
    name: "Fish",
    quantity: 13,
    description: "Awww Babe, you love fish!"
  }
];

function drawBag() {
  image(bagBg, 0, 0, canvasWidth, canvasHeight);
  bagItems.forEach((item, index) => {
    drawBlackTextWithShadow(item.name.toUpperCase(), 0, 1191 * multiplier, 270 * multiplier + index * 45, 1079 * multiplier);
    textAlign(RIGHT);
    drawBlackTextWithShadow("x " + item.quantity, 0, 1200 * multiplier, 270 * multiplier + index * 45, 1079 * multiplier);
    textAlign(LEFT);
  });
  drawYellowTextWithShadow("ITEMS", 500 * multiplier, 198 * multiplier);
  image(bagArrow, 1120 * multiplier, 179 * multiplier + bagCursorIndex * 45, 66 * multiplier, 106 * multiplier);
  textLeading(47);
  drawBlackTextWithShadow(bagItems[bagCursorIndex].description, 0, 31 * multiplier, 1140 * multiplier, 1011 * multiplier);
  textLeading(50);
}

function drawTextWithShadow(textContent, x, y, maxWidth) {
  fill(102, 88, 113);
  text(textContent, x + 3, y + 3, maxWidth);
  text(textContent, x, y + 3, maxWidth);
  text(textContent, x + 3, y, maxWidth);
  fill(255);
  text(textContent, x, y, maxWidth);
}

function drawBlackTextWithShadow(textContent, color, x, y, maxWidth) {
  fill(224, 220, 219);
  if (color === 1) {
    fill(243, 220, 167);
  }
  text(textContent, x + 3, y + 3, maxWidth);
  text(textContent, x, y + 3, maxWidth);
  text(textContent, x + 3, y, maxWidth);
  fill(70, 73, 71);
  if (color === 1) {
    fill(201, 52, 18);
  }
  text(textContent, x, y, maxWidth);
}

function drawYellowTextWithShadow(textContent, x, y, maxWidth) {
  fill(219, 217, 184)
  text(textContent, x + 2, y + 2, maxWidth);
  text(textContent, x, y + 2, maxWidth);
  text(textContent, x + 2, y, maxWidth);
  fill(70, 73, 71);
  text(textContent, x, y, maxWidth);
}

function typeWriter(str) {
  const result = str.substring(0, currentCharacter);
  if (currentCharacter < str.length) {
    currentCharacter++;
    buttonLocked = true;
  } else {
    buttonLocked = false;
  }
  return result;
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
  if (keyCode === UP_ARROW) {
    if (state === 0) {
      up = 1;
      player.graphicType = 3;
    } else if (state === 1) {
      if (fightScreen === 1 || fightScreen === 2) {
        cursorIndex[1] = 0;
      } else if (fightScreen === 11) {
        bagCursorIndex = (bagCursorIndex - 1 + bagItems.length) % bagItems.length;
        clickSound.play();
      }
    }
  }
  if (keyCode === DOWN_ARROW) {
    if (state === 0) {
      down = 1;
      player.graphicType = 0;
    } else if (state === 1) {
      if (fightScreen === 1 || fightScreen === 2) {
        cursorIndex[1] = 1;
      } else if (fightScreen === 11) {
        bagCursorIndex = (bagCursorIndex + 1) % bagItems.length;
        clickSound.play();
      }
    }
  }
  if (keyCode === LEFT_ARROW) {
    if (state === 0) {
      left = 1;
      player.graphicType = 1;
    } else if (state === 1) {
      cursorIndex[0] = 0;
    }
  }
  if (keyCode === RIGHT_ARROW) {
    if (state === 0) {
      right = 1;
      player.graphicType = 2;
    } else if (state === 1) {
      cursorIndex[0] = 1;
    }
  }
  // A
  if (keyCode === 65) {
    if (!buttonLocked) {
      if (state === 0) {
        if (speechIndex >= 0) {
          textStep++;
          currentCharacter = 0;
          if (textStep >= speeches[speechIndex].length) {
            textStep = 0;
            speechIndex = -1;
            currentCharacter = 0;
          } else {
            clickSound.play();
          }
        } else {
          let xTile = Math.floor(player.getNewXPosition() / spaceSize);
          let yTile = Math.floor(player.getNewYPosition() / spaceSize);
          // console.log(xTile, yTile);
          // console.log(tileMap[yTile][xTile]);
          if (tileMap[yTile][xTile] === 2) { // interactive tile
            if (xTile >= 10 && xTile <= 13 &&
              yTile >= 11 && yTile <= 14 && !transition) {
              transition = true;
              transitionTimer = 100;
              transitionDirection = 0;
              levelSound.stop();
              battleSound.play();
              battleSound.onended(() => battleLoop.loop());
            } else if (xTile === 23 &&
              yTile >= 10 && yTile <= 11) { // npc 1
              speechIndex = 0;
              clickSound.play();
            } else if (xTile === 23 &&
              yTile >= 15 && yTile <= 16) { // npc 2
              speechIndex = 1;
              clickSound.play();
            } else if (xTile === 14 &&
              yTile >= 1 && yTile <= 2) { // npc 3
              speechIndex = 2;
              clickSound.play();
            } else if (xTile === 17 && yTile === 8) { // town sign
              speechIndex = 3;
              clickSound.play();
            }
          }
        }
      } else if (state === 1) {
        switch (fightScreen) {
          case 0:
            if (!openFight && pookiemonEntranceStage > 1) {
              textStep++;
              if (textStep === 1) {
                pookiemonEntranceStage = 3;
                pokeballSound.play();
              }
              if (textStep > 1) {
                fightScreen = 1;
                textStep = 0;
              } else {
                clickSound.play();
              }
              currentCharacter = 0;
            }
            break;
          case 1:
            if (cursorIndex[0] === 0 && cursorIndex[1] === 0) {
              fightScreen = 2;
            } else if (cursorIndex[0] === 0 && cursorIndex[1] === 1) {
              fightScreen = 10;
            } else if (cursorIndex[0] === 1 && cursorIndex[1] === 0) {
              fightScreen = 11;
            } else if (cursorIndex[0] === 1 && cursorIndex[1] === 1) {
              fightScreen = 12;
            }
            clickSound.play();
            // cursorIndex = [0, 0];
            break;
          case 2:
            if (pp[cursorIndex[0]][cursorIndex[1]] > 0) {
              if (cursorIndex[0] === 0 && cursorIndex[1] === 0) {
                fightScreen = 3;
              } else if (cursorIndex[0] === 0 && cursorIndex[1] === 1) {
                fightScreen = 4;
              } else if (cursorIndex[0] === 1 && cursorIndex[1] === 0) {
                fightScreen = 5;
              } else if (cursorIndex[0] === 1 && cursorIndex[1] === 1) {
                fightScreen = 6;
              }
              clickSound.play();
              pp[cursorIndex[0]][cursorIndex[1]]--;
              // cursorIndex = [0, 0];
            }
            break;
          case 3:
          case 4:
          case 5:
            textStep++;
            if (textStep > 2) {
              fightScreen = 1;
              textStep = 0;
              cursorIndex = [0, 0];
            }
            currentCharacter = 0;
            clickSound.play();
            usedMoves++;
            break;
          case 6:
            if (textStep < 4 || getItemSoundDone) {
              textStep++;
              currentCharacter = 0;
              clickSound.play();
            }
            if (usedMoves < 3 && textStep >= 1) {
              fightScreen = 2;
              textStep = 0;
              pp[cursorIndex[0]][cursorIndex[1]] = 1;
            }
            if (textStep > 4) {
              fightScreen = 7;
              textStep = 0;
              battleLoop.play();
            }
            if (textStep === 4 && !getItemSound.isPlaying()) {
              battleLoop.pause();
              getItemSound.play();
              getItemSound.onended(() => getItemSoundDone = true);
            }
            break;
          case 7:
            if (!abeShake && !hpAnimation) {
              abeShake = true;
              attackSound.play();
              attackSound.onended(() => hpAnimation = true);
            }
            if (hpWidth >= 475) {
              fightScreen = 8;
              faintSound.play();
            }
            break;
          case 8:
            if (abePosition > canvasHeight / multiplier && !transition) {
              // game over
              transition = true;
              transitionTimer = 100;
              transitionDirection = 0;
              battleLoop.setVolume(0, 1);
            }
            break;
          case 12:
            fightScreen = 1;
            currentCharacter = 0;
            clickSound.play();
            break;
        }
      }
    }
  }
  // S
  if (keyCode === 83) {
    if (fightScreen === 2) {
      fightScreen = 1;
      cursorIndex = [0, 0];
    }
    if (fightScreen === 10 || fightScreen === 11) {
      fightScreen = 1;
    }
  }
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

window.onload = function () {

}

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