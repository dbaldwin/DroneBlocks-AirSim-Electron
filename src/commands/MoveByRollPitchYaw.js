class MoveByRollPitchYaw {

    constructor(roll, pitch, yaw) {
        this.command = [0, 0, "moveByRollPitchYawZ", []]
    }

    getCommand() {
        return this.command
    }
}

// \94\00\00\b3moveByRollPitchYawZ\96\cb?\b6W\18J\e7D\87\00\00\00\cb@\04\00\00\00\00\00\00\a0

// 94 00 00 B3 6D 6F 76 65 42 79 52 6F 6C 6C 50 69 74 63 68 59 61 77 5A 96 CB 3F B6 57 18 4A E7 44 87 00 00 00 CB 40 04 00 00 00 00 00 00 A0 