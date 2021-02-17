class CameraPose {
    constructor() {
        
        this.command = [0, 0, "simSetCameraPose", ["position": {"x_val": 0, "y_val": 0, "z_val": 0}, {"orientation": {"x_val": 1.1, "y_val": 45.1, "z_val": 1.1, "w_val": 1.1}}, ""]]

        //[[{"position": ], [orientation], ""]

        //[{"position": {"x_val": 0, "y_val": 0, "z_val": 0},"orientation": {"x_val": 0, "y_val": 45, "z_val": 0, "w_val": 0}}], ""]
    }

    getCommand() {
        return this.command
    }
}
module.exports.CameraPose = CameraPose

/*

\94\00\00\b0simSetCameraPose\93\a10\82\a8position\83\a5x_val\00\a5y_val\00\a5z_val\00\aborientation\84\a5x_val\cb\00\00\00\00\00\00\00\00\a5y_val\cb?\c0\b5\15\0fm\a2\d0\a5z_val\cb\00\00\00\00\00\00\00\00\a5w_val\cb?\ef\b9\ea\92\ech\9b\a0

// Position and orientation all set to 0
\94\00\00\b0simSetCameraPose\93\a10\82\a8position\83\a5x_val\00\a5y_val\00\a5z_val\00\aborientation\84\a5x_val\cb\00\00\00\00\00\00\00\00\a5y_val\cb\00\00\00\00\00\00\00\00\a5z_val\cb\00\00\00\00\00\00\00\00\a5w_val\cb?\f0\00\00\00\00\00\00\a0

\94\00\00\b0simSetCameraPose\93\81\a8position\83\a5x_val\00\a5y_val\00\a5z_val\00\81\aborientation\84\a5x_val\cb?\f1\99\99\99\99\99\9a\a5y_val\cb@F\8c\cc\cc\cc\cc\cd\a5z_val\cb?\f1\99\99\99\99\99\9a\a5w_val\cb?\f1\99\99\99\99\99\9a\a0

94 00 00 B0 73 69 6D 53 65 74 43 61 6D 65 72 61 50 6F 73 65 93 A1 30 82 A8 70 6F 73 69 74 69 6F 6E 83 A5 78 5F 76 61 6C 00 A5 79 5F 76 61 6C 00 A5 7A 5F 76 61 6C 00 AB 6F 72 69 65 6E 74 61 74 69 6F 6E 84 A5 78 5F 76 61 6C CB 00 00 00 00 00 00 00 00 A5 79 5F 76 61 6C CB 3F C0 B5 15 0F 6D A2 D0 A5 7A 5F 76 61 6C CB 00 00 00 00 00 00 00 00 A5 77 5F 76 61 6C CB 3F EF B9 EA 92 EC 68 9B A0

*/