export class Character {
  constructor(spaceSize) {
    this.xPos = 0;
    this.yPos = 0;
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
    this.characterSprites = [[], [], [], []];
    this.graphic = this.characterSprites[0][0];
    this.characterOffsetX = 0;
    this.characterOffsetY = 0;
    this.xp = 0;
    this.disabled = false;
    this.moving = false;
    this.bgMoving = true;
    this.spaceSize = spaceSize;
  }

  display(directions, backgroundOffset, backgroundSize, canvas, placeFree) {
    if (!this.disabled) {
      this.move(directions, backgroundOffset, backgroundSize, canvas, placeFree);
      this.graphic = this.characterSprites[this.graphicType][this.graphicFrame];
    }
    image(this.graphic, canvas.width / 2 + this.characterOffsetX, canvas.height / 2 + this.characterOffsetY, 40, 60);
  }

  updateGraphicType() {
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

  calculateDirection(directions) {
    this.xDirection = directions.right - directions.left;
    this.yDirection = directions.down - directions.up;
  }

  move(directions, backgroundOffset, backgroundSize, canvas, placeFree) {
    this.calculateDirection(directions);
    this.updatePositions(backgroundOffset, backgroundSize, canvas, placeFree);
    // console.log("x: " + this.xPos + "y: " + this.yPos);
  }

  getNewXPosition() {
    let multiplier = 0;
    if (this.graphicType === 1) {
      multiplier = this.spaceSize * -1;
    } else if (this.graphicType === 2) {
      multiplier = this.spaceSize;
    }
    return this.xPos + multiplier;
  }

  getNewYPosition() {
    let multiplier = 0;
    if (this.graphicType === 3) {
      multiplier = this.spaceSize * -1;
    } else if (this.graphicType === 0) {
      multiplier = this.spaceSize;
    }
    return this.yPos + multiplier;
  }

  updatePositions(backgroundOffset, backgroundSize, canvas, placeFree) {
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
          backgroundSize.width / 2 + newBackgroundOffset.x < canvas.width / 2 ||
          backgroundSize.width / 2 - newBackgroundOffset.x < canvas.width / 2) {
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
          backgroundSize.height / 2 + newBackgroundOffset.y < canvas.height / 2 ||
          backgroundSize.height / 2 - newBackgroundOffset.y < canvas.height / 2) {
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