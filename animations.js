export class Animation {
    constructor(name, initialCounterValue, countIncrement, countIncrementDelay, countLimit) {
        this.name = name;
        this.started = false;
        this.count = initialCounterValue || 0;
        this.countIncrement = countIncrement;
        this.countLimit = countLimit;
        this.countIncrementDelay = countIncrementDelay;
        this.countIncrementDelayTimer = 0;
        this.ended = false;
        this.duration = 0;
    }

    start() {
        this.started = true;
        this.ended = false;
    }

    end() {
        this.started = false;
        this.ended = true;
        this.duration = 0;
    }

    increment(callback) {
        if (this.countIncrementDelay) {
            this.countIncrementDelayTimer++;

            if (this.countIncrementDelayTimer >= this.countIncrementDelay) {
                this.count += this.countIncrement;
                this.countIncrementDelayTimer = 0;
            }
        } else {
            this.count += this.countIncrement;
        }

        if (this.count >= this.countLimit) {
            this.started = false;
            if (callback) {
                callback();
            }
        }
    }

    useDelay(callback) {
        if (this.countIncrementDelay) {
            this.countIncrementDelayTimer++;

            if (this.countIncrementDelayTimer >= this.countIncrementDelay) {
                callback();
                this.countIncrementDelayTimer = 0;
            }
        } else {
            callback();
        }
    }
}