class GetImages {

    
    constructor() {
        this.command = [0, 0, "simGetImages", [[{"camera_name": "0", "image_type": 0, "pixels_as_float": false, "compress": true}], ""]]
    }

    getCommand() {
        return this.command
    }

}
module.exports.GetImages = GetImages