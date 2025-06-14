export class Animation {
    constructor(name, initialCounterValue, countIncrement, countLimit) {
        this.name = name;
        this.started = false;
        this.count = initialCounterValue || 0;
        this.countIncrement = countIncrement;
        this.countLimit = countLimit;
    }

    increment() {
        this.count += this.countIncrement;

        if (this.count > this.countLimit) {
            this.started = false;
        }
    }
}