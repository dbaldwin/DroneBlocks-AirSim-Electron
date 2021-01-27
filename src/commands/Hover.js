class Hover {
    constructor(delay) {
        console.log("Hover delay is: " + delay)
        this.command = ["hover", delay]
    }

    getCommand() {
        return this.command
    }
}
module.exports.Hover = Hover