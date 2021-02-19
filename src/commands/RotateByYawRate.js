class RotateByYawRate {
    constructor(id, rate, duration) {
        this.id = id
        this.command = [0, 0, "rotateByYawRate", [parseFloat(rate), parseInt(duration), ""]]
    }

    getCommand() {
        return this.command
    }

    getId() {
        return this.id
    }
}
module.exports.RotateByYawRate = RotateByYawRate