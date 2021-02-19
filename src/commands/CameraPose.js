const { Quaternion } = require('../utils/Quaternion')

class CameraPose {
    constructor(id, pitch) {
        
        this.id = id

        let pitchRadians = pitch * (Math.PI/180)
        let q = new Quaternion(pitchRadians, 0, 0).getQuaternion()
        this.command = [0, 0, "simSetCameraPose", ["0", {"position": {"x_val": 0, "y_val": 0, "z_val": 0}, "orientation": {"x_val": 0, "y_val": q.y_val, "z_val": 0, "w_val": q.w_val}}, ""]]
        
    }

    getCommand() {
        return this.command
    }

    getId() {
        return this.id
    }
}
module.exports.CameraPose = CameraPose

/*

Python -60 degree pitch

\94\00\00\b0simSetCameraPose\93\a10\82\a8position\83\a5x_val\00\a5y_val\00\a5z_val\00\aborientation\84\a5x_val\cb\00\00\00\00\00\00\00\00\a5y_val\cb\bf\df\ff\ff\ff\ff\ff\ff\a5z_val\cb\00\00\00\00\00\00\00\00\a5w_val\cb?\eb\b6z\e8XL\ab\a0

Node -60
\94\00\00\b0simSetCameraPose\93\a10\82\a8position\83\a5x_val\00\a5y_val\00\a5z_val\00\aborientation\84\a5x_val\00\a5y_val\cb\bf\f0\c1R8-se\a5z_val\00\a5w_val\01\a0

Python +45
\94\00\00\b0simSetCameraPose\93\a10\82\a8position\83\a5x_val\00\a5y_val\00\a5z_val\00\aborientation\84\a5x_val\cb\00\00\00\00\00\00\00\00\a5y_val\cb?\d8}\e2\a6\ae\a9c\a5z_val\cb\00\00\00\00\00\00\00\00\a5w_val\cb?\ed\90k\cf2\8dF\a0

Node +45
\94\00\00\b0simSetCameraPose\93\a10\82\a8position\83\a5x_val\00\a5y_val\00\a5z_val\00\aborientation\84\a5x_val\00\a5y_val\cb?\e9!\fbTD-\18\a5z_val\00\a5w_val\01\a0


94 00 00 B0 73 69 6D 53 65 74 43 61 6D 65 72 61 50 6F 73 65 93 A1 30 82 A8 70 6F 73 69 74 69 6F 6E 83 A5 78 5F 76 61 6C 00 A5 79 5F 76 61 6C 00 A5 7A 5F 76 61 6C 00 AB 6F 72 69 65 6E 74 61 74 69 6F 6E 84 A5 78 5F 76 61 6C 00 A5 79 5F 76 61 6C CB 3F E9 21 FB 54 44 2D 18 A5 7A 5F 76 61 6C 00 A5 77 5F 76 61 6C 01 A0 
*/