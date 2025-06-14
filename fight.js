import { drawYellowTextWithShadow, drawBlackTextWithShadow, drawTextWithShadow, typeWriter } from "./text.js";
import { Animation } from "./animations.js";

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

export class Fight {
    constructor(player, enemy, moves, canvasWidth, canvasHeight) {
        this.openFight = new Animation('open fight', 0, 4, canvasHeight / 2);
        this.screen = 0;
        this.enemy = enemy;
        this.player = player;
        this.background = loadImage("assets/images/battle-screen-1.png");
        this.textBubble = loadImage("assets/images/text-bubble.png");
        this.cursor_img = loadImage("assets/images/arrow.png");
        this.cursorIndex = [0, 0];
        this.fightScreen = 0;
        this.textStep = 0;
        this.pookiemonBubble = loadImage("assets/images/pookiemon-bubble.png");
        this.pookiemonEntranceStage = 0;
        this.pookiemonEntrance = 0;
        this.foeEntrance = 0;
        this.foeBubbleEntrance = 0;
        this.battlePlatform = loadImage("assets/images/battle-platform.png");
        this.foeBattlePlatform = loadImage("assets/images/battle-platform-foe.png");
        this.foeBubble = loadImage("assets/images/foe-bubble.png");
        this.fightBubble = loadImage("assets/images/fight-bubble.png");
        this.fightBattle = loadImage("assets/images/fight-battle.png");
        this.bagCursorIndex = 0;
        this.bagBg = loadImage("assets/images/bag.png");
        this.bagArrow = loadImage("assets/images/bag-arrow.png");
        this.usedMoves = 0;
        this.pookiemonInfo = loadImage("assets/images/pokemon-info.png");
        this.moves = moves;
    }
}

export class Contender {
    constructor(sprite, name, hp, level, spriteCover) {
        this.sprite = sprite;
        this.name = name;
        this.hp = hp;
        this.level = level;
        this.position = 0;
        this.transition = 255;
        this.shake = false;
        this.xPos = 0;
        this.scale = 1 / 197;
        this.hpWidth = 0;
        this.hpAnimation = false;
        this.hpCurrent = hp;

        if (spriteCover) {
            this.spriteCover = spriteCover;
        }
    }

    decrementHp() {
        if (this.hpCurrent > 0) {
            this.hpCurrent--;
        }
    }
}

export class Move {
    constructor(name, type, pp) {
        this.name = name;
        this.type = type;
        this.ppCurrent = pp;
        this.ppTotal = pp;
    }
}

export function drawFight(canvasWidth, canvasHeight, multiplier, font, fight, typeWriterProps) {
    imageMode(CENTER);
    // background
    image(fight.background, canvasWidth / 2, canvasHeight / 2, canvasWidth, canvasHeight);

    if (fight.foeEntrance < 2375) {
        fight.foeEntrance += 19;
    } else if (fight.foeEntrance >= 2375 && fight.pookiemonEntranceStage === 0) {
        fight.pookiemonEntranceStage = 1;
    }

    imageMode(CORNER);
    image(fight.battlePlatform, (2414 - fight.foeEntrance) * multiplier, 1008 * multiplier, 1188 * multiplier, 110 * multiplier);

    image(fight.foeBattlePlatform, (fight.foeEntrance - 1271) * multiplier, 470 * multiplier, 1271 * multiplier, 311 * multiplier);
    image(fight.enemy.sprite, (fight.foeEntrance - 975) * multiplier, 290 * multiplier, 250, 147);

    if (fight.pookiemonEntranceStage === 1 && fight.foeBubbleEntrance < 1118) {
        fight.foeBubbleEntrance += 26;
    } else if (fight.foeBubbleEntrance >= 1118 && fight.pookiemonEntranceStage === 1) {
        fight.pookiemonEntranceStage = 2;
    }
    image(fight.foeBubble, (fight.foeBubbleEntrance - 992) * multiplier, 155 * multiplier, 992 * multiplier, 277 * multiplier);
    textAlign(LEFT);
    textFont(font);
    textSize(30);
    drawYellowTextWithShadow("SHITTY USED CAR", (fight.foeBubbleEntrance - 932) * multiplier, 270 * multiplier);
    drawYellowTextWithShadow("Lv100", (fight.foeBubbleEntrance - 308) * multiplier, 270 * multiplier);

    if (fight.pookiemonEntranceStage > 2) {
        imageMode(CORNERS);
        if (fight.player.scale < 1) {
            fight.player.scale += 0.1;
        }
        image(fight.player.sprite, (649 - 297 * fight.player.scale / 2 + fight.player.xPos) * multiplier, (1134 - fight.player.scale * 586 + fight.player.position) * multiplier, (649 + 297 * fight.player.scale / 2 + fight.player.xPos) * multiplier, (1134 + fight.player.position) * multiplier);
        if (fight.player.transition > 0) {
            tint(255, fight.player.transition);
            image(fight.player.sprite, (649 - 297 * fight.player.scale / 2) * multiplier, (1134 - fight.player.scale * 586) * multiplier, (649 + 297 * fight.player.scale / 2) * multiplier, 1134 * multiplier);
            noTint();
            if (fight.player.scale >= 1) fight.player.transition -= 25;
        }
        if (fight.player.transition <= 0 && fight.pookiemonEntrance < 1122) {
            fight.pookiemonEntrance += 40;
        }
        imageMode(CORNER);
        image(fight.pookiemonBubble, (2378 - fight.pookiemonEntrance) * multiplier, 733 * multiplier, 1028 * multiplier, 357 * multiplier);
        textSize(35);
        drawYellowTextWithShadow(fight.player.name, (2519 - fight.pookiemonEntrance) * multiplier, 860 * multiplier);
        drawYellowTextWithShadow("Lv" + fight.player.level, (3202 - fight.pookiemonEntrance) * multiplier, 860 * multiplier);
        drawYellowTextWithShadow(`${fight.player.hpCurrent}/${fight.player.hp}`, (3122 - fight.pookiemonEntrance) * multiplier, 1030 * multiplier);
    }
    textSize(45);
    image(fight.textBubble, 0, 1123 * multiplier, canvasWidth, 462 * multiplier);

    if (fight.fightScreen === 0) {
        if (fight.pookiemonEntranceStage > 1) {
            const text = ["Wild SHITTY USED CAR appeared!", "Go! ABRAHAM!"];
            let introText = typeWriter(text[fight.textStep], typeWriterProps);
            drawTextWithShadow(introText, 50, 440);
        }
    } else if (fight.fightScreen === 1) {
        // battle menu screen
        image(fight.fightBubble, 400, 376, 400, 155);
        resetMatrix();
        textWrap(WORD);
        textAlign(LEFT);
        textLeading(50);
        drawTextWithShadow(`What will ${fight.player.name} do?`, 90 * multiplier, 1323 * multiplier, 636 * multiplier);
        drawBlackTextWithShadow("FIGHT", 0, 1352 * multiplier, 1323 * multiplier);
        drawBlackTextWithShadow("BAG", 0, 1954 * multiplier, 1323 * multiplier);
        drawBlackTextWithShadow("POOKIEMON", 0, 1352 * multiplier, 1479 * multiplier);
        drawBlackTextWithShadow("RUN", 0, 1954 * multiplier, 1479 * multiplier);
        image(fight.cursor_img, cursorPositions[1][fight.cursorIndex[0]][fight.cursorIndex[1]][0] * multiplier, cursorPositions[1][fight.cursorIndex[0]][fight.cursorIndex[1]][1] * multiplier, 66 * multiplier, 106 * multiplier);
    } else if (fight.fightScreen === 2) {
        // fight menu screen
        imageMode(CORNER);
        image(fight.fightBattle, 0, 376, canvasWidth, 155);
        drawBlackTextWithShadow("SHOW GF", 0, 153 * multiplier, 1310 * multiplier);
        drawBlackTextWithShadow("EXAMINE", 0, 920 * multiplier, 1310 * multiplier);
        drawBlackTextWithShadow("YELL TO OWNER", 0, 153 * multiplier, 1466 * multiplier);
        drawBlackTextWithShadow("HAGGLE", 0, 920 * multiplier, 1466 * multiplier);
        drawBlackTextWithShadow("PP", fight.moves[fight.cursorIndex[0]][fight.cursorIndex[1]].ppCurrent + 1, 1670 * multiplier, 1310 * multiplier);
        drawBlackTextWithShadow(`${fight.moves[fight.cursorIndex[0]][fight.cursorIndex[1]].ppCurrent}/1`, fight.moves[fight.cursorIndex[0]][fight.cursorIndex[1]].ppCurrent + 1, 2102 * multiplier, 1310 * multiplier);
        textSize(38);
        drawBlackTextWithShadow(`TYPE/${fight.moves[fight.cursorIndex[0]][fight.cursorIndex[1]].type}`, 0, 1660 * multiplier, 1466 * multiplier);
        image(fight.cursor_img, cursorPositions[2][fight.cursorIndex[0]][fight.cursorIndex[1]][0] * multiplier, cursorPositions[2][fight.cursorIndex[0]][fight.cursorIndex[1]][1] * multiplier, 66 * multiplier, 106 * multiplier);
    } else if (fight.fightScreen === 3) {
        // show gf move
        const text = ["ABRAHAM used SHOW GF!", "\"Hey Babe, let's check out this car! Hop out!\"", "It's not very effective..."];
        let displayText = typeWriter(text[fight.textStep], typeWriterProps);
        drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
    } else if (fight.fightScreen === 4) {
        // yell to owner move
        const text = ["ABRAHAM used YELL TO OWNER!", "\"Hey Dudeeee, sick car!\"", "It's not very effective..."];
        let displayText = typeWriter(text[fight.textStep], typeWriterProps);
        drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
    } else if (fight.fightScreen === 5) {
        // examine move
        const text = ["ABRAHAM used EXAMINE!", "\"Woah, it's an old 1980's Yugo!\"", "It's not very effective..."];
        let displayText = typeWriter(text[fight.textStep], typeWriterProps);
        drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
    } else if (fight.fightScreen === 6) {
        // haggle move
        let text = ["ABRAHAM used HAGGLE!", "\"Hey Man, I'll take it for $800!\"", "\"...You know what? Yeah, sure, it's yours.\"", "\"Oh shit really? I wasn't expecting that to work.\"", "ABRAHAM now owns SHITTY USED CAR!"];
        if (fight.usedMoves < 3) {
            text = ["You haven't used all your other moves yet!"];
        }
        let displayText = typeWriter(text[fight.textStep], typeWriterProps);
        drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
    } else if (fight.fightScreen === 7) {
        // haggle move ending
        fill(79, 90, 94);
        rectMode(CORNERS);
        if (fight.player.hpAnimation) {
            fight.player.shake = false;
            fight.player.hpWidth = fight.player.hpWidth + 5;
            fight.player.decrementHp();
            if (fight.player.hpWidth === 475) {
                fight.player.hpAnimation = false;
                typeWriterProps.currentCharacter = 0;
            }
        } else if (fight.player.shake) {
            fight.player.xPos = fight.player.xPos > 0 ? -10 : 10;
        }
        rect((2168 - fight.player.hpWidth) * multiplier, 900 * multiplier, 2166 * multiplier, 921 * multiplier);
        const text = ["Wild SHITTY USED CAR used BREAK DOWN!", "It's super effective!"];
        let displayText = fight.player.hpWidth === 475 ? typeWriter(text[1], typeWriterProps) : typeWriter(text[0], typeWriterProps);
        drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
    } else if (fight.fightScreen === 8) {
        fight.player.position += 30;
        rect((2168 - fight.player.hpWidth) * multiplier, 900 * multiplier, 2166 * multiplier, 921 * multiplier);
        const text = ["ABRAHAM fainted!"];
        let displayText = typeWriter(text[0], typeWriterProps);
        drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
    } else if (fight.fightScreen === 10) {
        image(fight.pookiemonInfo, 0, 0, canvasWidth, canvasHeight);
    } else if (fight.fightScreen === 11) {
        // bag
        drawBag(fight, canvasWidth, canvasHeight, multiplier);
    } else if (fight.fightScreen === 12) {
        // run
        const text = ["Couldn't get away!"];
        let displayText = typeWriter(text[fight.textStep], typeWriterProps);
        drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
    }
}

function drawBag(fight, canvasWidth, canvasHeight, multiplier) {
    image(fight.bagBg, 0, 0, canvasWidth, canvasHeight);
    bagItems.forEach((item, index) => {
      drawBlackTextWithShadow(item.name.toUpperCase(), 0, 1191 * multiplier, 270 * multiplier + index * 45, 1079 * multiplier);
      textAlign(RIGHT);
      drawBlackTextWithShadow("x " + item.quantity, 0, 1200 * multiplier, 270 * multiplier + index * 45, 1079 * multiplier);
      textAlign(LEFT);
    });
    drawYellowTextWithShadow("ITEMS", 500 * multiplier, 198 * multiplier);
    image(fight.bagArrow, 1120 * multiplier, 179 * multiplier + fight.bagCursorIndex * 45, 66 * multiplier, 106 * multiplier);
    textLeading(47);
    drawBlackTextWithShadow(bagItems[fight.bagCursorIndex].description, 0, 31 * multiplier, 1140 * multiplier, 1011 * multiplier);
    textLeading(50);
  }

export function fightArrowKeyPressed(keyCode, fight, props) {
    if (keyCode === UP_ARROW) {
        if (fight.fightScreen === 1 || fight.fightScreen === 2) {
            fight.cursorIndex[1] = 0;
        } else if (fight.fightScreen === 11) {
            fight.bagCursorIndex = (fight.bagCursorIndex - 1 + bagItems.length) % bagItems.length;
            props.sounds.clickSound.play();
        }
    }
    if (keyCode === DOWN_ARROW) {
        if (fight.fightScreen === 1 || fight.fightScreen === 2) {
            fight.cursorIndex[1] = 1;
        } else if (fight.fightScreen === 11) {
            fight.bagCursorIndex = (fight.bagCursorIndex + 1) % bagItems.length;
            props.sounds.clickSound.play();
        }
    }
    if (keyCode === LEFT_ARROW) {
        fight.cursorIndex[0] = 0;
    }
    if (keyCode === RIGHT_ARROW) {
        fight.cursorIndex[0] = 1;
    }
}

export function fightAKeyPressed(keyCode, fight, props) {
    // A
    if (keyCode === 65) {
        switch (fight.fightScreen) {
            // intro screen
            case 0:
                if (!fight.openFight.started && fight.pookiemonEntranceStage > 1) {
                    fight.textStep++;
                    if (fight.textStep === 1) {
                        fight.pookiemonEntranceStage = 3;
                        props.sounds.pokeballSound.play();
                    }
                    if (fight.textStep > 1) {
                        fight.fightScreen = 1;
                        fight.textStep = 0;
                    } else {
                        props.sounds.clickSound.play();
                    }
                    props.typeWriterProps.currentCharacter = 0;
                }
                break;
            // main selection screen (fight, pokemon, bag, run)
            case 1:
                if (fight.cursorIndex[0] === 0 && fight.cursorIndex[1] === 0) {
                    fight.fightScreen = 2;
                } else if (fight.cursorIndex[0] === 0 && fight.cursorIndex[1] === 1) {
                    fight.fightScreen = 10;
                } else if (fight.cursorIndex[0] === 1 && fight.cursorIndex[1] === 0) {
                    fight.fightScreen = 11;
                } else if (fight.cursorIndex[0] === 1 && fight.cursorIndex[1] === 1) {
                    fight.fightScreen = 12;
                }
                props.sounds.clickSound.play();
                // cursorIndex = [0, 0];
                break;
            // fight screen
            case 2:
                if (fight.moves[fight.cursorIndex[0]][fight.cursorIndex[1]].ppCurrent > 0) {
                    if (fight.cursorIndex[0] === 0 && fight.cursorIndex[1] === 0) {
                        fight.fightScreen = 3;
                        fight.usedMoves++;
                    } else if (fight.cursorIndex[0] === 0 && fight.cursorIndex[1] === 1) {
                        fight.fightScreen = 4;
                        fight.usedMoves++;
                    } else if (fight.cursorIndex[0] === 1 && fight.cursorIndex[1] === 0) {
                        fight.fightScreen = 5;
                        fight.usedMoves++;
                    } else if (fight.cursorIndex[0] === 1 && fight.cursorIndex[1] === 1) {
                        fight.fightScreen = 6;
                    }
                    props.sounds.clickSound.play();
                    fight.moves[fight.cursorIndex[0]][fight.cursorIndex[1]].ppCurrent--;
                    // cursorIndex = [0, 0];
                }
                break;
            case 3:
            case 4:
            case 5:
                fight.textStep++;
                if (fight.textStep > 2) {
                    fight.fightScreen = 1;
                    fight.textStep = 0;
                    fight.cursorIndex = [0, 0];
                }
                props.typeWriterProps.currentCharacter = 0;
                props.sounds.clickSound.play();
                break;
            case 6:
                if (fight.textStep < 4 || props.sounds.getItemSoundDone) {
                    fight.textStep++;
                    props.typeWriterProps.currentCharacter = 0;
                    props.sounds.clickSound.play();
                }
                if (fight.usedMoves < 3 && fight.textStep >= 1) {
                    fight.fightScreen = 2;
                    fight.textStep = 0;
                    fight.moves[fight.cursorIndex[0]][fight.cursorIndex[1]].ppCurrent = 1;
                }
                if (fight.textStep > 4) {
                    fight.fightScreen = 7;
                    fight.textStep = 0;
                    props.sounds.battleLoop.play();
                }
                if (fight.textStep === 4 && !props.sounds.getItemSound.isPlaying()) {
                    props.sounds.battleLoop.pause();
                    props.sounds.getItemSound.play();
                    props.sounds.getItemSound.onended(() => props.sounds.getItemSoundDone = true);
                }
                break;
            case 7:
                if (!fight.player.shake && !fight.player.hpAnimation) {
                    fight.player.shake = true;
                    props.sounds.attackSound.play();
                    props.sounds.attackSound.onended(() => fight.player.hpAnimation = true);
                }
                if (fight.player.hpWidth >= 475) {
                    fight.fightScreen = 8;
                    props.sounds.faintSound.play();
                }
                break;
            case 8:
                if (fight.player.position > props.canvasHeight / props.multiplier && !props.transition.started) {
                    // game over
                    props.transition.started = true;
                    props.transition.timer = 100;
                    props.transition.direction = 0;
                    props.sounds.battleLoop.setVolume(0, 1);
                }
                break;
            case 12:
                fight.fightScreen = 1;
                props.typeWriterProps.currentCharacter = 0;
                props.sounds.clickSound.play();
                break;
        }
    }

    // S
    if (keyCode === 83) {
        if (fight.fightScreen === 2) {
            fight.fightScreen = 1;
            fight.cursorIndex = [0, 0];
        }
        if (fight.fightScreen === 10 || fight.fightScreen === 11) {
            fight.fightScreen = 1;
        }
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
  