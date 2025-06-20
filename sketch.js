import {
  Fight,
  Contender,
  Move,
  drawFight,
  fightArrowKeyPressed,
  fightAKeyPressed,
  fightSKeyPressed,
  battleStartAnimation
} from './fight.js';
import { typeWriter } from "./text.js";
import { Character } from "./character.js";
import { tileMaps, MapData } from './maps.js';

//game variables
const canvasSize = {
  width: 800,
  height: 533,
};
const spaceSize = {
  width: 16 * 2,
  height: 12 * 2,
};
const multiplier = canvasSize.width / 2378;
let player;
let logo;
let version;
let font;
let font2;

//level drawing variables
let tileMap = tileMaps[0];
const backgrounds = [];
const overlays = [];
var mapVariables = [];
const trainers = [
  {
    fileName: "trainer-2.png",
    image: {},
    coords: [[9, 19], [10, 19]],
    text: ["Are you ready for the hardest fight of your life?"],
    fight: 0
  },
  {
    fileName: "trainer-3.png",
    image: {},
    coords: [[13, 9], [14, 9]],
    text: [
      "Claire is so glad she gave you a chance after the first date.",
      "Even though you blacked out and failed the bar exam."
    ],
  },
  {
    fileName: "trainer-1.png",
    image: {},
    coords: [[19, 21]],
    text: ["Ready for round 2?"],
    fight: 1
  },
  {
    fileName: "trainer-4.png",
    image: {},
    coords: [[27, 8], [28, 8]],
    text: [
      "You could've fought me if you remembered to sign up on time."
    ]
  },
  {
    fileName: "gym-leader.png",
    image: {},
    coords: [[3, 14], [4, 14]],
    text: [
      "It's now or never."
    ],
    fight: 2
  },
];

let backgroundSize;
let startPos;
let backgroundOffset;

let sounds = {
  levelSound: null,
  gymIntro: null,
  gymLoop: null,
  battleSound: null,
  battleLoop: null,
  clickSound: null,
  getItemSound: null,
  faintSound: null,
  pokeballSound: null,
  attackSound: null,
  getItemSoundDone: false,
  doorSound: null,
};

//other stuff
const game = {
  state: -1, //-1 is start screen, 0 is map, 1 is fight, 2 is white out, 3 is game over
  level: 0,
  currentFight: 0,
  activeTrainer: 0,
  map: 1,
};

let transition = {
  started: false,
  direction: 0,
  timer: 0,
  type: 0,
  count: 0,
  callback: null,
};

let textBubble2;
let speech = {
  textStep: 0,
  words: [],
  started: false,
  callback: () => { }
};
let typeWriterProps = {
  currentCharacter: 0,
  buttonLocked: false
};

//direction variables
let directions = {
  up: 0,
  down: 0,
  left: 0,
  right: 0,
};

// fight sequence variables
let fights;
let barExam;
let abeBack;
let abeSprite;

// load in all of our graphical assets
function preload() {
  //font
  font = loadFont("assets/fonts/pokemon-emerald.ttf");
  font2 = loadFont("assets/fonts/concielianbold.ttf");

  logo = loadImage("assets/images/pookiemon.png");
  version = loadImage("assets/images/version.png");

  backgrounds[0] = loadImage("assets/images/pokemon-gym.png");
  backgrounds[1] = loadImage("assets/images/gym-entrance.png");

  overlays[0] = loadImage("assets/images/gym-overlay.png");
  overlays[1] = loadImage("assets/images/gym-entrance-overlay.png");

  trainers.forEach(trainer => {
    trainer.image = loadImage(`assets/images/${trainer.fileName}`);
  });

  // character sprites
  player = new Character(spaceSize);
  player.characterSprites[0][0] = loadImage("assets/images/character-sprites/forward-1.png");
  player.characterSprites[0][1] = loadImage("assets/images/character-sprites/forward-2.png");
  player.characterSprites[0][2] = player.characterSprites[0][0];
  player.characterSprites[0][3] = loadImage("assets/images/character-sprites/forward-3.png");
  player.characterSprites[1][0] = loadImage("assets/images/character-sprites/left-1.png");
  player.characterSprites[1][1] = loadImage("assets/images/character-sprites/left-2.png");
  player.characterSprites[1][2] = player.characterSprites[1][0];
  player.characterSprites[1][3] = loadImage("assets/images/character-sprites/left-3.png");
  player.characterSprites[2][0] = loadImage("assets/images/character-sprites/right-1.png");
  player.characterSprites[2][1] = loadImage("assets/images/character-sprites/right-2.png");
  player.characterSprites[2][2] = player.characterSprites[2][0];
  player.characterSprites[2][3] = loadImage("assets/images/character-sprites/right-3.png");
  player.characterSprites[3][0] = loadImage("assets/images/character-sprites/back-1.png");
  player.characterSprites[3][1] = loadImage("assets/images/character-sprites/back-2.png");
  player.characterSprites[3][2] = player.characterSprites[3][0];
  player.characterSprites[3][3] = loadImage("assets/images/character-sprites/back-3.png");

  textBubble2 = loadImage("assets/images/text-bubble2.png");
  barExam = loadImage("assets/images/barexam.png");
  abeBack = loadImage("assets/images/abe-back.png");
  abeSprite = loadImage("assets/images/sprite.png");

  //sounds
  sounds.gymIntro = loadSound("assets/sounds/gym-theme-intro.mp3");
  sounds.gymLoop = loadSound("assets/sounds/gym-theme-loop.mp3");
  sounds.battleSound = loadSound("assets/sounds/battle-intro.mp3");
  sounds.battleLoop = loadSound("assets/sounds/battle-loop.mp3");
  sounds.clickSound = loadSound("assets/sounds/click.mp3");
  sounds.getItemSound = loadSound("assets/sounds/get-item.mp3");
  sounds.faintSound = loadSound("assets/sounds/faint.mp3");
  sounds.pokeballSound = loadSound("assets/sounds/exit-ball.mp3");
  sounds.attackSound = loadSound("assets/sounds/attack.mp3");
  sounds.doorSound = loadSound("assets/sounds/door.mp3");

  fights = [
    new Fight(
      new Contender(
        abeBack,
        'ABRAHAM',
        74,
        477,
        30,
        abeSprite
      ),
      new Contender(
        barExam,
        'CA BAR EXAM',
        100,
        470
      ),
      [
        [
          new Move('SLACK OFF', 'NORMAL', 1, 50, 0, [
          ]),
        ],
        []
      ],
      [new Move('NATURAL CONSEQUENCES', 'KARMA', 1, 500, 2, [])],
      canvasSize
    ),
    new Fight(
      new Contender(
        abeBack,
        'ABRAHAM',
        143,
        477,
        60,
        abeSprite
      ),
      new Contender(
        barExam,
        'CA BAR EXAM',
        100,
        470
      ),
      [
        [
          new Move('STUDY', 'LAWYER', 10, 100, 2, []),
          new Move('ADDERALL', 'ADHD', 10, 100, 2, []),
        ],
        []
      ],
      [
        new Move('HIGH MINIMUM PASSING SCORE', 'DIFFICULT', 1, 117, 0, []),
        new Move('KIDNEY STONE', 'STRESS', 1, 360, 2, [])
      ],
      canvasSize
    ),
    new Fight(
      new Contender(
        abeBack,
        'ABRAHAM',
        182,
        475,
        80,
        abeSprite
      ),
      new Contender(
        barExam,
        'CA BAR EXAM',
        100,
        473
      ),
      [
        [
          new Move("CLAIRE'S SUPPORT", 'BOYFRIEND', 1, 150, 2, []),
          new Move('ADDERALL', 'ADHD', 10, 120, 2, []),
        ],
        [
          new Move('EXTENDED TIME', 'ADHD', 1, 120, 2, []),
          new Move('LOCK IN', 'LAWYER', 10, 120, 2, []),
        ]
      ],
      [
        new Move('BUSINESS ASSOCIATIONS', 'DIFFICULT', 1, 117, 0, []),
        new Move('CIVIL PROCEDURE', 'DIFFICULT', 1, 117, 0, []),
        new Move('REMEDIES', 'DIFFICULT', 1, 118, 0, []),
        new Move('REAL PROPERTY', 'DIFFICULT', 1, 118, 0, []),
        new Move('PROFESSIONAL RESPONSIBILITY', 'DIFFICULT', 1, 118, 0, []),
      ],
      canvasSize
    )
  ];
}

function setup() {
  getAudioContext().suspend();
  let canvas = createCanvas(canvasSize.width, canvasSize.height);
  canvas.parent('game-container');

  mapVariables[0] = new MapData(480 * 2, 384 * 2, 240 * 2, 745, { x: -18, y: -115 }, {x: 0, y: 237});
  mapVariables[1] = new MapData(176 * 2, 144 * 2, 176, 258, {x: 0, y: 0}, {x: 0, y: 114}); //114
}

function draw() {
  clear();
  noStroke();

  // start screen
  if (game.state === -1) {
    drawStartScreen();
  } else if (game.state === 0) {
    tileMap = tileMaps[game.map];
    drawLevel(game.map);
  } else if (game.state === 1) {
    drawFight(canvasSize, multiplier, font, fights[game.currentFight], typeWriterProps);
  } else if (game.state === 2) {
    drawBlackOut();
  } else if (game.state === 3) {
    drawGameOver();
  }

  if (transition.started) {
    if (transition.type === 0) {
      battleFlashAnimation();
    } else if (transition.type === 1) {
      fade(0); //fade out
    } else if (transition.type === 2) {
      fade(1); //fade in
    }
  }

  // open fight animation
  battleStartAnimation(fights[game.currentFight], canvasSize);
}

function startTransition(timer, type, callbackFn) {
  if (!transition.started) {
    transition.started = true;
    transition.timer = timer;
    transition.direction = 0;
    transition.type = type;
    transition.count = 0;
    transition.callback = callbackFn;
    player.disabled = true;
    typeWriterProps.buttonLocked = true;
  }
}

function fade(direction) {
  let alpha = map(transition.timer, 0, 100, 0, 255);
  transition.timer -= 2;
  fill(0, direction > 0 ? alpha : 255 - alpha);
  rect(0, 0, canvasSize.width, canvasSize.height);

  if (transition.timer <= 0) {
    transition.started = false;
    player.disabled = false;
    typeWriterProps.buttonLocked = false;
    if (transition.callback) transition.callback();
  }
}

function battleFlashAnimation() {
  let alpha = map(transition.timer, 0, 100, 0, 255);
  transition.timer -= 10;
  fill(87, 97, 90, transition.direction > 0 ? alpha : 255 - alpha);
  rect(0, 0, canvasSize.width, canvasSize.height);

  // fade out
  if (transition.timer <= 0 && transition.direction === 0) {
    transition.timer = 100;
    transition.direction = 1;
  }

  // fade in
  if (transition.timer <= 0 && transition.direction === 1) {
    transition.count++;
    transition.timer = 100;
    transition.direction = 0;
    if (transition.count >= 3) {
      transition.started = false;
      player.disabled = false;
      typeWriterProps.buttonLocked = false;
      transition.callback()
    }
  }
}

function displayWithOffset(imageSrc, width, height) {
  let x = width;
  let y = height;
  if (player.xDirection < 0 && player.bgMoving) {
    x -= player.speed;
  } else if (player.xDirection > 0 && player.bgMoving) {
    x += player.speed;
  } else if (player.yDirection < 0 && player.bgMoving) {
    y -= player.speed;
  } else if (player.yDirection > 0 && player.bgMoving) {
    y += player.speed;
  }
  image(imageSrc, x, y, backgroundSize.width, backgroundSize.height);
}

function drawStartScreen() {
  imageMode(CORNER);
  const grad = drawingContext.createLinearGradient(0, 0, 0, 563);
  grad.addColorStop(0, "#7196d9");
  grad.addColorStop(0.2, "#7196d9");
  grad.addColorStop(1, "#ffcce3");
  drawingContext.fillStyle = grad;
  rect(0, 0, canvasSize.width, canvasSize.height);
  textAlign(CENTER);
  imageMode(CENTER);
  image(logo, canvasSize.width / 2, 180, 600, 474);
  image(version, canvasSize.width / 2 + 20, 300, 350, 350 * 564 / 1638);
  textSize(20)
  fill(125 + sin(frameCount * 0.1) * 125);
  textFont(font2)
  text("PRESS SPACE TO START", canvasSize.width / 2, 470)
  fill(255)
  textFont(font);
}


function drawLevel(level) {
  //some variables
  imageMode(CENTER);
  // background
  image(backgrounds[level], canvasSize.width / 2 + backgroundOffset.x, canvasSize.height / 2 + backgroundOffset.y, backgroundSize.width, backgroundSize.height);
  
  // trainers
  if (level === 0) {
    displayWithOffset(trainers[game.activeTrainer].image, canvasSize.width / 2 + backgroundOffset.x, canvasSize.height / 2 + backgroundOffset.y);
  }

  player.display(directions, backgroundOffset, backgroundSize, canvasSize, tileMap);
  // background overlay
  displayWithOffset(overlays[level], canvasSize.width / 2 + backgroundOffset.x, canvasSize.height / 2 + backgroundOffset.y);
  if (level === 1) {
    rectMode(CENTER)
    fill(0, 0, 0);
    rect(canvasSize.width / 2, canvasSize.height / 2 - 97 - 72, 100, 50);
    rectMode(CORNER)
  }

  if (speech.started) {
    imageMode(CORNER);
    image(textBubble2, 0, 1130 * multiplier, canvasSize.width, 462 * multiplier);
    textAlign(LEFT);
    textFont(font);
    textSize(40);
    fill(0);
    let displayText = typeWriter(speech.words[speech.textStep], typeWriterProps);
    text(displayText, 150 * multiplier, 1303 * multiplier, 2000 * multiplier);
  } else {
    player.disabled = false;
  }

  let xTile = Math.floor(player.getNewXPosition() / spaceSize.width);
  let yTile = Math.floor(player.getNewYPosition() / spaceSize.height);
  if (level === 1 && yTile <= 1 && xTile === 5) {
    if (!transition.started) sounds.doorSound.play();
    startTransition(100, 1, () => {
      game.map = 0;
      setUpMap();
      startTransition(100, 2);
    });
  }
}

function drawBlackOut() {
  rectMode(CORNER);
  fill(0);
  rect(0, 0, canvasSize.width, canvasSize.height);
  textAlign(CENTER);
  textFont(font);
  textSize(60);
  fill(255);
  textSize(30);
  text("You whited out!", canvasSize.width / 2, 250);
  text("Better luck next time", canvasSize.width / 2, 285);
}

function drawGameOver() {
  rectMode(CORNER);
  fill(0);
  rect(0, 0, canvasSize.width, canvasSize.height);
  textAlign(CENTER);
  textFont(font);
  textSize(60);
  fill(255);
  text("HAPPY ANNIVERSARY", canvasSize.width / 2, 200);
  text("TO MY FAVORITE ATTORNEY", canvasSize.width / 2, 250);
  textSize(30);
  text("Made with love by Claire <3", canvasSize.width / 2, 300);
}

function updateActiveTrainer() {
  trainers[game.activeTrainer].coords.map(coord => {
    tileMaps[0][coord[0]][coord[1]] = 0;
  });
  game.activeTrainer++;
  trainers[game.activeTrainer].coords.map(coord => {
    tileMaps[0][coord[0]][coord[1]] = 2;
  });

}

function startSpeech(words, callback) {
  speech.words = words;
  speech.started = true;
  player.disabled = true;

  if (callback) {
    speech.callback = callback;
  }
}

function endSpeech() {
  speech.textStep = 0;
  speech.words = [];
  speech.started = false;
  typeWriterProps.currentCharacter = 0;
  speech.callback();
  speech.callback = () => { };
}

function keyPressed() {
  if (game.state === 1) {
    fightArrowKeyPressed(keyCode, fights[game.currentFight], { sounds });
    fightAKeyPressed(keyCode, fights[game.currentFight],
      {
        typeWriterProps,
        sounds,
        startTransition,
        canvasSize,
        multiplier,
        game,
        updateActiveTrainer
      });
    fightSKeyPressed(keyCode, fights[game.currentFight]);
  }

  if (game.state === 0) {
    if (keyCode === UP_ARROW) {
      directions.up = 1;
      player.graphicType = 3;
    }
    if (keyCode === DOWN_ARROW) {
      directions.down = 1;
      player.graphicType = 0;
    }
    if (keyCode === LEFT_ARROW) {
      directions.left = 1;
      player.graphicType = 1;
    }
    if (keyCode === RIGHT_ARROW) {
      directions.right = 1;
      player.graphicType = 2;
    }
  }

  // A
  if (keyCode === 65) {
    if (!typeWriterProps.buttonLocked) {
      if (game.state === 0) {
        let xTile = Math.floor(player.getNewXPosition() / spaceSize.width);
        let yTile = Math.floor(player.getNewYPosition() / spaceSize.height);

        if (speech.started) {
          speech.textStep++;
          typeWriterProps.currentCharacter = 0;
          if (speech.textStep >= speech.words.length) {
            endSpeech();
          } else {
            sounds.clickSound.play();
          }
        } else if (game.map === 0) {
          // console.log(xTile, yTile);
          // console.log(tileMap[yTile][xTile]);
          if (tileMap[yTile][xTile] === 2) { // interactive tile
            const currentActiveTrainer = trainers[game.activeTrainer];
            if ((currentActiveTrainer.coords[0][0] === yTile &&
              currentActiveTrainer.coords[0][1] === xTile) ||
              (currentActiveTrainer.coords.length > 1 &&
                currentActiveTrainer.coords[1][1] === xTile &&
                currentActiveTrainer.coords[1][0] === yTile)) {
              startSpeech(currentActiveTrainer.text, () => {
                if (currentActiveTrainer.hasOwnProperty('fight')) {
                  if (!transition.started) {
                    sounds.gymLoop.stop();
                    sounds.gymIntro.onended(() => sounds.gymLoop.stop());
                    sounds.gymIntro.stop();
                    sounds.battleSound.play();
                    sounds.battleSound.onended(() => sounds.battleLoop.loop());
                  }
                  startTransition(100, 0, () => {
                    startTransition(100, 1, () => {
                      game.state = 1;
                      fights[game.currentFight].openFight.started = true;
                    });
                  });
                } else {
                  startTransition(100, 1, () => {
                    updateActiveTrainer();
                    startTransition(100, 2, () => {});
                  });
                }
              });
              sounds.clickSound.play();
            }
          }
        } else if (game.map === 1) {
          if ((yTile === 8 || yTile === 9) && xTile === 3) {
            sounds.clickSound.play();
            startSpeech([
              "Happy 2 year anniversary!",
              "Welcome to the Attorney Gym.",
              "This gym will be a celebration of you and Claire's past two years together.",
              "You need to find all the trainers in order to fight the gym leader.",
              "Good luck!"
            ]);
          }
        }
      } else if (game.state === 2) {
        game.state = 0;
        startTransition(100, 2, () => {
          sounds.gymIntro.play();
          sounds.gymIntro.onended(() => sounds.gymLoop.loop());
        });
      }
    }
  }
 
  //space bar
  if (keyCode === 32 && game.state === -1) {
    game.state = 0;
    userStartAudio();
    sounds.gymIntro.play();
    sounds.gymIntro.onended(() => sounds.gymLoop.loop());
    setUpMap();
  }
};

function setUpMap() {
  backgroundOffset = mapVariables[game.map].backgroundOffset;
  backgroundSize = mapVariables[game.map].backgroundSize;
  startPos = mapVariables[game.map].startPos;
  player.xPos = startPos.x;
  player.yPos = startPos.y;
  player.characterOffsetX = mapVariables[game.map].characterOffset.x;
  player.characterOffsetY = mapVariables[game.map].characterOffset.y;
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    directions.up = 0;
  }
  if (keyCode === DOWN_ARROW) {
    directions.down = 0;
  }
  if (keyCode === LEFT_ARROW) {
    directions.left = 0;
  }
  if (keyCode === RIGHT_ARROW) {
    directions.right = 0;
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