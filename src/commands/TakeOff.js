class TakeOff {

    constructor() {
        console.log("Takeoff constructor called")
        this.takeoff = [0, 2, "takeoff", [10, ""]];
    }

    command() {
        return this.takeoff
    }
}
module.exports.TakeOff = TakeOff