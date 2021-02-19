class MoveToPosition {

    constructor(id, n, e, d, velocity) {
        this.id = id
        this.timeout = 600
        this.command = [0, 0, "moveToPosition", [parseFloat(n), parseFloat(e), parseFloat(d), parseFloat(velocity), this.timeout, 0, {"is_rate": true, "yaw_or_rate": 0}, -1, 1, ""]]
    }

    getCommand() {
        return this.command
    }

    getId() {
        return this.id
    }
}

module.exports.MoveToPosition = MoveToPosition