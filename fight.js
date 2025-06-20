import { drawYellowTextWithShadow, drawBlackTextWithShadow, drawTextWithShadow, drawWhiteTextWithGreyShadow, typeWriter } from "./text.js";
import { Animation } from "./animations.js";

const cursorPositions = [
    [],
    [
        [[1279, 1230], [1879, 1230]],
        [[1279, 1393], [1879, 1393]]
    ],
    [
        [[77, 1220], [870, 1220]],
        [[77, 1373], [870, 1373]]
    ]
];

export class Fight {
    constructor(player, enemy, moves, enemyMoves, canvasSize) {
        this.openFight = new Animation('open fight', 0, 4, 0, canvasSize.height / 2);
        this.screen = 0;
        this.enemy = enemy;
        this.player = player;
        this.background = loadImage("assets/images/battle-screen-2.png");
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
        this.battlePlatform = loadImage("assets/images/battle-platform-2.png");
        this.foeBattlePlatform = loadImage("assets/images/battle-platform-foe-gym.png");
        this.foeBattlePlatformBottom = loadImage("assets/images/battle-platform-foe-bottom.png");
        this.foeBubble = loadImage("assets/images/foe-bubble.png");
        this.fightBubble = loadImage("assets/images/fight-bubble.png");
        this.fightBattle = loadImage("assets/images/fight-battle.png");
        this.bagCursorIndex = 0;
        this.bagBg = loadImage("assets/images/bag.png");
        this.bagArrow = loadImage("assets/images/bag-arrow.png");
        this.usedMoves = 0;
        this.pookiemonInfo = loadImage("assets/images/pokemon-info.png");
        this.moves = moves;
        this.enemyMoves = enemyMoves;
        this.currentEnemyMove = 0;
    }

    getCurrentMove() {
        return this.moves[this.cursorIndex[0]][this.cursorIndex[1]];
    }
}

export class Contender {
    constructor(sprite, name, hp, hpWidth, level, spriteCover) {
        this.sprite = sprite;
        this.name = name;
        this.hp = hp;
        this.level = level;
        this.position = 0;
        this.transition = 255;
        this.shake = false;
        this.xPos = 0;
        this.scale = 1 / 197;
        this.hpWidth = hpWidth;
        this.hpWidthGone = 0;
        this.hpAnimation = new Animation('hp', 0, 5, 0, hpWidth);
        this.hpCurrent = hp;
        this.hpNumberAnimation = new Animation('hp number', hp, 1, 2, 0);
        this.showSprite = true;
        this.flashAnimation = new Animation('flash', 0, 0, 5, 0);
        this.disabled = false;

        if (spriteCover) {
            this.spriteCover = spriteCover;
        }
    }

    decrementHp() {
        this.hpNumberAnimation.useDelay(() => {
            if (this.hpCurrent > Math.max(0, this.hpNumberAnimation.countLimit)) {
                this.hpCurrent--;
            }
        });
    }

    startAttackAnimation(props) {
        const animationFrames = 50;
        if (!this.flashAnimation.started && !this.hpAnimation.started) {
            this.flashAnimation.started = true;
            props.fight.disabled = true;
            this.hpAnimation.count = this.hpWidthGone;
            this.hpAnimation.countLimit = Math.min(this.hpWidthGone + props.movePower, this.hpWidth);
            this.hpAnimation.countIncrement = props.movePower / animationFrames;
            this.hpNumberAnimation.countLimit = Math.max(0, this.hpCurrent - (props.movePower * this.hp / this.hpWidth));
            this.hpNumberAnimation.countIncrementDelay = animationFrames / (this.hpCurrent - this.hpNumberAnimation.countLimit);
            props.sounds.attackSound.play();
        }
    }

    animateAttack(fight, movePower, onended) {
        if (this.hpAnimation.started) {
            this.flashAnimation.end();
            this.showSprite = true;
            this.decrementHp(movePower);
            this.hpAnimation.increment(() => {
                this.hpWidthGone = this.hpAnimation.count;
                fight.disabled = false;
                this.hpCurrent = Math.floor(this.hpNumberAnimation.countLimit);
                this.hpAnimation.ended = true;
                if (onended) {
                    onended();
                }
            });
        } else if (this.flashAnimation.started) {
            this.flashAnimation.useDelay(() => {
                this.showSprite = !this.showSprite;
                this.flashAnimation.duration++;
            });
            if (this.flashAnimation.duration > 9) {
                this.hpAnimation.start();
            }
        }
    }
}

export class Move {
    constructor(name, type, pp, power, effectiveness, text) {
        this.name = name;
        this.type = type;
        this.ppCurrent = pp;
        this.ppTotal = pp;
        this.power = power;
        this.effectiveness = effectiveness; // 0 for not very effective, 1 for regular, 2 for super effective
        this.text = text;
    }
}

export function battleStartAnimation(fight, canvasSize) {
    if (fight.openFight.started) {
        fill(0);
        rect(0, 0 - fight.openFight.count, canvasSize.width, canvasSize.height / 2);
        rect(0, canvasSize.height / 2 + fight.openFight.count, canvasSize.width, canvasSize.height / 2);
        fight.openFight.increment();
    }
}

export function drawFight(canvasSize, multiplier, font, fight, typeWriterProps) {
    imageMode(CENTER);
    // background
    image(fight.background, canvasSize.width / 2, canvasSize.height / 2, canvasSize.width, canvasSize.height);

    if (fight.foeEntrance < 2375) {
        fight.foeEntrance += 19;
    } else if (fight.foeEntrance >= 2375 && fight.pookiemonEntranceStage === 0) {
        fight.pookiemonEntranceStage = 1;
    }

    imageMode(CORNER);
    image(fight.battlePlatform, (2414 - fight.foeEntrance) * multiplier, 1008 * multiplier, 1188 * multiplier, 110 * multiplier);

    image(fight.foeBattlePlatform, (fight.foeEntrance - 1271) * multiplier, 470 * multiplier, 1271 * multiplier, 311 * multiplier);
    if (fight.enemy.showSprite) {
        image(fight.enemy.sprite, (fight.foeEntrance - 850 + fight.enemy.xPos) * multiplier, Math.min(230 + fight.enemy.position, 650) * multiplier, 400 * multiplier, 400 * multiplier);
    }
    image(fight.foeBattlePlatformBottom, (fight.foeEntrance - 1271) * multiplier, 470 * multiplier, 1271 * multiplier, 311 * multiplier);

    if (fight.pookiemonEntranceStage === 1 && fight.foeBubbleEntrance < 1118) {
        fight.foeBubbleEntrance += 26;
    } else if (fight.foeBubbleEntrance >= 1118 && fight.pookiemonEntranceStage === 1) {
        fight.pookiemonEntranceStage = 2;
    }
    // enemy battle info
    image(fight.foeBubble, (fight.foeBubbleEntrance - 992) * multiplier, 155 * multiplier, 992 * multiplier, 277 * multiplier);
    rectMode(CORNERS);
    fill(79, 90, 94);
    rect((988 - fight.enemy.hpAnimation.count) * multiplier, 322 * multiplier, 988 * multiplier, 343 * multiplier);
    rectMode(CORNER);
    textAlign(LEFT);
    textFont(font);
    textSize(30);
    drawYellowTextWithShadow(fight.enemy.name, (fight.foeBubbleEntrance - 932) * multiplier, 270 * multiplier);
    drawYellowTextWithShadow("Lv100", (fight.foeBubbleEntrance - 308) * multiplier, 270 * multiplier);

    if (fight.pookiemonEntranceStage > 2) {
        imageMode(CORNERS);
        if (fight.player.scale < 1) {
            fight.player.scale += 0.1;
        }
        if (fight.player.showSprite) {
            image(fight.player.sprite, (649 - 297 * fight.player.scale / 2 + fight.player.xPos) * multiplier, (1134 - fight.player.scale * 586 + fight.player.position) * multiplier, (649 + 297 * fight.player.scale / 2 + fight.player.xPos) * multiplier, (1134 + fight.player.position) * multiplier);
        }
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
        drawYellowTextWithShadow("Lv" + fight.player.level, (3150 - fight.pookiemonEntrance) * multiplier, 860 * multiplier);
        textAlign(RIGHT);
        drawYellowTextWithShadow(`${fight.player.hpCurrent}/${fight.player.hp}`, (3320 - fight.pookiemonEntrance) * multiplier, 1030 * multiplier);
        textAlign(LEFT);
        fill(79, 90, 94);
        rectMode(CORNERS);
        rect((2168 - fight.player.hpAnimation.count) * multiplier, 900 * multiplier, 2166 * multiplier, 921 * multiplier);
    }
    textSize(45);
    image(fight.textBubble, 0, 1123 * multiplier, canvasSize.width, 462 * multiplier);

    if (fight.fightScreen === 0) {
        if (fight.pookiemonEntranceStage > 1) {
            const text = [`You are challenged by ${fight.enemy.name}!`, `Go! ${fight.player.name}!`];
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
        image(fight.fightBattle, 0, 376, canvasSize.width, 155);

        textSize(40);
        drawBlackTextWithShadow(fight.moves[0][0].name, 0, 153 * multiplier, 1310 * multiplier);
        if (fight.moves[0][1]) drawBlackTextWithShadow(fight.moves[0][1].name, 0, 950 * multiplier, 1310 * multiplier);
        if (fight.moves[1][0]) drawBlackTextWithShadow(fight.moves[1][0].name, 0, 153 * multiplier, 1456 * multiplier);
        if (fight.moves[1][1]) drawBlackTextWithShadow(fight.moves[1][1].name, 0, 950 * multiplier, 1456 * multiplier);
        drawBlackTextWithShadow("PP", fight.moves[fight.cursorIndex[0]][fight.cursorIndex[1]].ppCurrent + 1, 1670 * multiplier, 1310 * multiplier);
        textAlign(RIGHT);
        drawBlackTextWithShadow(
            `${fight.moves[fight.cursorIndex[0]][fight.cursorIndex[1]].ppCurrent}/${fight.moves[fight.cursorIndex[0]][fight.cursorIndex[1]].ppTotal}`, 
            fight.moves[fight.cursorIndex[0]][fight.cursorIndex[1]].ppCurrent + 1, 
            2302 * multiplier, 
            1310 * multiplier
        );
        textAlign(LEFT);
        textSize(38);
        drawBlackTextWithShadow(`TYPE/${fight.moves[fight.cursorIndex[0]][fight.cursorIndex[1]].type}`, 0, 1660 * multiplier, 1466 * multiplier);
        image(fight.cursor_img, cursorPositions[2][fight.cursorIndex[0]][fight.cursorIndex[1]][0] * multiplier, cursorPositions[2][fight.cursorIndex[0]][fight.cursorIndex[1]][1] * multiplier, 66 * multiplier, 106 * multiplier);
    } else if (fight.fightScreen === 3) {
        // beginning of move
        const move = fight.getCurrentMove();
        fight.enemy.animateAttack(fight, move.power);
        const text = [`${fight.player.name} used ${move.name}!`].concat(move.text);
        if (text[fight.textStep]) {
            let displayText = typeWriter(text[fight.textStep], typeWriterProps);
            drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
        }
    } else if (fight.fightScreen === 4) {
        // end of move
        const superEffectiveText = ["It's super effective!"];
        const notEffectiveText = ["It's not very effective..."];
        const move = fight.getCurrentMove();
        if (!fight.enemy.hpAnimation.started && !fight.enemy.flashAnimation.started &&
            fight.enemy.hpAnimation.count > 0
        ) {
            if (move.effectiveness === 0) {
                let displayText = typeWriter(notEffectiveText[fight.textStep], typeWriterProps);
                drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
            } else if (move.effectiveness === 2) {
                let displayText = typeWriter(superEffectiveText[fight.textStep], typeWriterProps);
                drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
            }
        }
    } else if (fight.fightScreen === 5) {
        // enemy move beginning
        fight.player.animateAttack(fight, fight.enemyMoves[fight.currentEnemyMove].power);
        const text = [`${fight.enemy.name} used ${fight.enemyMoves[fight.currentEnemyMove].name}!`];
        let displayText = typeWriter(text[fight.textStep], typeWriterProps);
        drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
    } else if (fight.fightScreen === 6) {
        // enemy move ending
        const superEffectiveText = ["It's super effective!"];
        const notEffectiveText = ["It's not very effective..."];
        const move = fight.enemyMoves[fight.currentEnemyMove];
        if (!fight.player.hpAnimation.started && !fight.player.flashAnimation.started &&
            fight.player.hpAnimation.count > 0
        ) {
            if (move.effectiveness === 0) {
                let displayText = typeWriter(notEffectiveText[fight.textStep], typeWriterProps);
                drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
            } else if (move.effectiveness === 2) {
                let displayText = typeWriter(superEffectiveText[fight.textStep], typeWriterProps);
                drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
            }
        }
    } else if (fight.fightScreen === 7) {
        // enemy faints
        fight.enemy.position += 30;
        const text = [`${fight.enemy.name} fainted!`];
        let displayText = typeWriter(text[0], typeWriterProps);
        drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
    } else if (fight.fightScreen === 8) {
        fight.player.position += 30;
        rect((2168 - fight.player.hpWidth) * multiplier, 900 * multiplier, 2166 * multiplier, 921 * multiplier);
        const text = [`${fight.player.name} fainted!`];
        let displayText = typeWriter(text[0], typeWriterProps);
        drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
    } else if (fight.fightScreen === 10) {
        // pookiemon
        image(fight.pookiemonInfo, 0, 0, canvasSize.width, canvasSize.height);
        drawWhiteTextWithGreyShadow(fight.player.level, 420 * multiplier, 1400 * multiplier);
    } else if (fight.fightScreen === 11) {
        // bag
        drawBag(fight, canvasSize, multiplier);
    } else if (fight.fightScreen === 12) {
        // run
        const text = ["Couldn't get away!"];
        let displayText = typeWriter(text[fight.textStep], typeWriterProps);
        drawTextWithShadow(displayText, 150 * multiplier, 1323 * multiplier, 1278 * multiplier);
    }
}

function drawBag(fight, canvasSize, multiplier) {
    image(fight.bagBg, 0, 0, canvasSize.width, canvasSize.height);
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
            if (fight.fightScreen !== 2 || fight.moves[0][fight.cursorIndex[1]]) {
                fight.cursorIndex[0] = 0;
            }
        } else if (fight.fightScreen === 11) {
            fight.bagCursorIndex = (fight.bagCursorIndex - 1 + bagItems.length) % bagItems.length;
            props.sounds.clickSound.play();
        }
    }
    if (keyCode === DOWN_ARROW) {
        if (fight.fightScreen === 1 || fight.fightScreen === 2) {
            if (fight.fightScreen !== 2 || fight.moves[1][fight.cursorIndex[1]]) {
                fight.cursorIndex[0] = 1;
            }
        } else if (fight.fightScreen === 11) {
            fight.bagCursorIndex = (fight.bagCursorIndex + 1) % bagItems.length;
            props.sounds.clickSound.play();
        }
    }
    if (keyCode === LEFT_ARROW) {
        if (fight.fightScreen !== 2 || fight.moves[fight.cursorIndex[0]][0]) {
            fight.cursorIndex[1] = 0;
        }
    }
    if (keyCode === RIGHT_ARROW) {
        if (fight.fightScreen !== 2 || fight.moves[fight.cursorIndex[0]][1]) {
            fight.cursorIndex[1] = 1;
        }
    }
}

export function fightAKeyPressed(keyCode, fight, props) {
    // A
    if (keyCode === 65) {
        switch (fight.fightScreen) {
            // intro screen
            case 0:
                if (!fight.openFight.started && fight.pookiemonEntranceStage > 1) {
                    advanceTextStep(fight, props.typeWriterProps);
                    if (fight.textStep === 1) {
                        if (fight.pookiemonEntranceStage < 3) {
                            props.sounds.pokeballSound.play();
                        }
                        fight.pookiemonEntranceStage = 3;
                    }
                    if (fight.textStep > 1) {
                        fight.fightScreen = 1;
                        fight.textStep = 0;
                    }
                    if(!props.typeWriterProps.buttonLocked) {
                        props.sounds.clickSound.play();
                    }
                }
                break;
            // main selection screen (fight, pokemon, bag, run)
            case 1:
                if (fight.cursorIndex[0] === 0 && fight.cursorIndex[1] === 0) {
                    fight.fightScreen = 2;
                } else if (fight.cursorIndex[0] === 0 && fight.cursorIndex[1] === 1) {
                    fight.fightScreen = 11;
                } else if (fight.cursorIndex[0] === 1 && fight.cursorIndex[1] === 0) {
                    fight.fightScreen = 10;
                } else if (fight.cursorIndex[0] === 1 && fight.cursorIndex[1] === 1) {
                    fight.fightScreen = 12;
                }
                props.sounds.clickSound.play();
                // cursorIndex = [0, 0];
                break;
            // fight screen
            case 2:
                if (fight.getCurrentMove().ppCurrent > 0) {
                    props.sounds.clickSound.play();
                    fight.fightScreen = 3;
                    fight.getCurrentMove().ppCurrent--;
                    // cursorIndex = [0, 0];
                }
                break;
            case 3:
                if (!fight.disabled) {
                    advanceTextStep(fight, props.typeWriterProps);
                    if (fight.enemy.hpAnimation.ended) {
                        fight.fightScreen = 4;
                        fight.cursorIndex = [0, 0];
                        fight.textStep = 0;
                    }
                    if (fight.textStep > fight.getCurrentMove().text.length) {
                        fight.enemy.startAttackAnimation({ sounds: props.sounds, movePower: fight.getCurrentMove().power, fight });
                    }
                    if(!props.typeWriterProps.buttonLocked) props.sounds.clickSound.play();
                }
                break;
            case 4:
                if (!fight.disabled) {
                    advanceTextStep(fight, props.typeWriterProps);
                    if (fight.textStep > 0) {
                        if (fight.enemy.hpCurrent <= 0) {
                            fight.fightScreen = 7;
                            props.sounds.faintSound.play();
                            break;
                        } 
                        fight.fightScreen = 5;
                        fight.player.startAttackAnimation({ sounds: props.sounds, movePower: fight.enemyMoves[fight.currentEnemyMove].power, fight});
                        fight.textStep = 0;
                        fight.cursorIndex = [0, 0];
                    }
                    if(!props.typeWriterProps.buttonLocked) props.sounds.clickSound.play();
                }
                break;
            case 5:
                if (!fight.disabled) {
                    advanceTextStep(fight, props.typeWriterProps);
                    if (fight.player.hpAnimation.ended) {
                        if (fight.enemyMoves[fight.currentEnemyMove].effectiveness === 1) {
                            if (fight.player.hpCurrent <= 0) {
                                fight.fightScreen = 8;
                                props.sounds.faintSound.play();
                            } else {
                                fight.fightScreen = 1;
                            }
                            fight.currentEnemyMove++;
                            fight.enemy.hpAnimation.ended = false;
                        } else {
                            fight.fightScreen = 6;
                        }
                        fight.textStep = 0;
                    }
                    if(!props.typeWriterProps.buttonLocked) props.sounds.clickSound.play();
                }
                break;
            case 6:
                if (!fight.disabled) {
                    advanceTextStep(fight, props.typeWriterProps);
                    if (fight.player.hpCurrent <= 0) {
                        fight.fightScreen = 8;
                        props.sounds.faintSound.play();
                    } else {
                        fight.fightScreen = 1;
                    }
                    fight.currentEnemyMove++;
                    fight.enemy.hpAnimation.ended = false;
                    fight.textStep = 0;
                    if(!props.typeWriterProps.buttonLocked) props.sounds.clickSound.play();
                }
                break;
            // happy ending
            case 7:
                if (fight.enemy.position > 400) {
                    props.startTransition(100, 1, () => {
                        props.game.state = 3;
                        props.sounds.battleLoop.stop();
                    });
                }
                break;
            case 8:
                if (fight.player.position > props.canvasSize.height / props.multiplier) {
                    // black out
                    props.startTransition(100, 1, () => {
                        props.game.state = 2;
                        props.game.currentFight++;
                        props.updateActiveTrainer();
                    });
                    props.sounds.battleLoop.stop();
                }
                break;
            // run
            case 12:
                fight.fightScreen = 1;
                props.typeWriterProps.currentCharacter = 0;
                props.sounds.clickSound.play();
                break;
        }
    }
}

function advanceTextStep(fight, typeWriterProps) {
    if (!typeWriterProps.buttonLocked) {
        fight.textStep++;
        typeWriterProps.currentCharacter = 0;
    }
}

export function fightSKeyPressed(keyCode, fight) {
    // S
    if (keyCode === 83) {
        if (fight.fightScreen === 2) {
            fight.fightScreen = 1;
            fight.cursorIndex = [0, 0];
        }
        // pookiemon and bag
        if (fight.fightScreen === 10 || fight.fightScreen === 11) {
            fight.fightScreen = 1;
        }
    }
}

const bagItems = [
    {
        name: "Harvard Law Degree",
        quantity: 1,
        description: "95.83% of graduates pass the CA Bar on the first try"
    },
    {
        name: "Time off work",
        quantity: "30 days",
        description: "Thanks Mike!"
    },
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
        description: "Performance enhacing drugs"
    },
    {
        name: "Air Tag",
        quantity: 8,
        description: "How else are you supposed to know where your shit is?"
    },
    {
        name: "Fish",
        quantity: 13,
        description: "Awww Babe, you love fish!"
    },
    {
        name: "PIP",
        quantity: 1,
        description: "It stands for Paid Interview Period."
    },
];
