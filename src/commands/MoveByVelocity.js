class MoveByVelocity {

    constructor(id, vx, vy, vz, duration) {
        this.id = id
        this.timeout = 600
        this.command = [0, 0, "moveByVelocity", [parseFloat(vx), parseFloat(vy), parseFloat(vz), parseFloat(duration), 0, {"is_rate": false, "yaw_or_rate": 0}, ""]]
    }

    getCommand() {
        return this.command
    }

    getId() {
        return this.id
    }
}
module.exports.MoveByVelocity = MoveByVelocity