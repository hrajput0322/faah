export class Cooldown {
    private lastExecution = 0;

    constructor(private interval: number) {}

    canExecute(): boolean {
        const now = Date.now();

        if (now - this.lastExecution < this.interval) {
            return false;
        }

        this.lastExecution = now;
        return true;
    }
}