class ArmDisarm {
    constructor(arm) {
        this.command = [0, 0, "armDisarm", [arm, ""]]
    }

    getCommand() {
        return this.command
    }
}
module.exports.ArmDisarm = ArmDisarm