class GetImages {
    
    constructor(id, photo_type) {
        this.id = id
        this.command = [0, 0, "simGetImages", [[{"camera_name": "0", "image_type": photo_type, "pixels_as_float": false, "compress": true}], ""]]
    }

    getCommand() {
        return this.command
    }

    getId() {
        return this.id
    }

}
module.exports.GetImages = GetImages