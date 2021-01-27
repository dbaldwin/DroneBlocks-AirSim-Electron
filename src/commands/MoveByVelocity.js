const { MoveToPosition } = require("./MoveToPosition");

class MoveByVelocity {

    constructor(vx, vy, vz, duration) {
        this.timeout = 600
        this.command = [0, 0, "moveByVelocity", [parseFloat(vx), parseFloat(vy), parseFloat(vz), parseFloat(duration), 0, {"is_rate": false, "yaw_or_rate": 0}, ""]]
    }

    getCommand() {
        return this.command
    }
}
module.exports.MoveByVelocity = MoveByVelocity