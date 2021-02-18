class EnableApiControl {

    constructor() {
        this.command = [0, 0, "enableApiControl", [true, ""]]
    }

    getCommand() {
        return this.command
    }

    getId() {
        return ""
    }
}
module.exports.EnableApiControl = EnableApiControl