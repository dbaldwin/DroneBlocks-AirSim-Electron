class MoveToPosition {

    constructor(n, e, d, speed) {
        this.timeout = 600
        this.command = [0, 0, "moveToPosition", [n, e, d, speed, this.timeout, 0, {"is_rate": true, "yaw_or_rate": 0}, -1, 1, ""]]
    }

    getCommand() {
        return this.command
    }
}

module.exports.MoveToPosition = MoveToPosition