class Hover {
    constructor(delay) {
        this.command = ["hover", delay]
    }

    getCommand() {
        return this.command
    }
}
module.exports.Hover = Hover