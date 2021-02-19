class GetImages {
    
    constructor(id) {
        this.id = id
        this.command = [0, 0, "simGetImages", [[{"camera_name": "0", "image_type": 0, "pixels_as_float": false, "compress": true}], ""]]
    }

    getCommand() {
        return this.command
    }

    getId() {
        return this.id
    }

}
module.exports.GetImages = GetImages