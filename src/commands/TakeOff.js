class TakeOff {

    constructor(id) {
        this.id = id
        // 5 in the array represents the number of seconds we allow for takeoff
        this.command = [0, 0, "takeoff", [5, ""]]
    }

    getCommand() {
        return this.command
    }

    getId() {
        return this.id
    }
}
module.exports.TakeOff = TakeOff