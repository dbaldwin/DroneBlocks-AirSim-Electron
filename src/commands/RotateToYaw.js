class RotateToYaw {
    constructor(yaw) {
        this.command = [0, 0, "rotateToYaw", [parseInt(yaw), 600, 5, ""]]
    }

    getCommand() {
        return this.command
    }
}
module.exports.RotateToYaw = RotateToYaw