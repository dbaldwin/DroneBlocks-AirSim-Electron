class Land {

    constructor() {
        // 60 in the array represents the number of seconds we allow for takeoff
        this.command = [0, 0, "land", [60, ""]]
    }

    getCommand() {
        return this.command
    }
}
module.exports.Land = Land