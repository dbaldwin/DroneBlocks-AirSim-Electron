class RotateToYaw {
    constructor(id, yaw) {
        this.id = id
        this.command = [0, 0, "rotateToYaw", [parseInt(yaw), 600, 5, ""]]
    }

    getCommand() {
        return this.command
    }

    getId() {
        return this.id
    }
}
module.exports.RotateToYaw = RotateToYaw