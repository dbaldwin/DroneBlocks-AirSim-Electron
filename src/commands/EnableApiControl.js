class EnableApiControl {

    constructor() {
        this.command = [0, 0, "enableApiControl", [true, ""]]
    }

    getCommand() {
        return this.command
    }
}
module.exports.EnableApiControl = EnableApiControl