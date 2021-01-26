class TakeOff {

    constructor() {
        // 5 in the array represents the number of seconds we allow for takeoff
        this.command = [0, 0, "takeoff", [5, ""]]
    }

    getCommand() {
        return this.command
    }
}
module.exports.TakeOff = TakeOff