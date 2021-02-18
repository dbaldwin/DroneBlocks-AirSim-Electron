class Hover {
    constructor(id, delay) {
        this.id = id
        this.command = ["hover", delay]
    }

    getCommand() {
        return this.command
    }

    getId() {
        return this.id
    }
}
module.exports.Hover = Hover