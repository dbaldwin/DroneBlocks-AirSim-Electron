class RotateByYawRate {
    constructor(rate, duration) {
        this.command = [0, 0, "rotateByYawRate", [parseFloat(rate), parseInt(duration), ""]]
    }

    getCommand() {
        return this.command
    }
}
module.exports.RotateByYawRate = RotateByYawRate