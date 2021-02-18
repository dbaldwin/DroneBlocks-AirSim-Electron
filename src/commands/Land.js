class Land {

    constructor(id) {
        this.id = id
        // 60 in the array represents the number of seconds we allow for takeoff
        this.command = [0, 0, "land", [60, ""]]
    }

    getCommand() {
        return this.command
    }

    getId() {
        return this.id
    }
}
module.exports.Land = Land