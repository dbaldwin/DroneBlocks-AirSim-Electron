class ArmDisarm {
    constructor(id, arm) {
        this.id = id
        this.command = [0, 0, "armDisarm", [arm, ""]]
    }

    getCommand() {
        return this.command
    }

    getId() {
        return this.id
    }
}
module.exports.ArmDisarm = ArmDisarm