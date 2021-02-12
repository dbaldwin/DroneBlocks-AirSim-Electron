class GetImages {

    
    constructor() {
        this.command = [0, 0, "simGetImages", [[{"camera_name": "1", "image_type": 0, "pixels_as_float": false, "compress": true}], ""]]
    }

    getCommand() {
        return this.command
    }

}
module.exports.GetImages = GetImages


/*

Python: responses = client.simGetImages([airsim.ImageRequest(1, airsim.ImageType.Scene)])

\94\00\00\acsimGetImages\92\91\84\abcamera_name\a11\aaimage_type\00\afpixels_as_float\c2\a8compress\c3\a0
             s  i  m  g  e  t  i  m  a  g  e  s                c  a  m  e  r  a  _  n  a  m  e             i  m  a  g  e  _  t  y  p  e          p  i  x  e  l  s  _  a  s  _  f  l  o  a  t          c  o  m  p  r  e  s  s                               
94 00 00 AC {73 69 6D 47 65 74 49 6D 61 67 65 73} 92 91 84 AB {63 61 6D 65 72 61 5F 6E 61 6D 65} A1 31 AA {69 6D 61 67 65 5F 74 79 70 65} 00 AF {70 69 78 65 6C 73 5F 61 73 5F 66 6C 6F 61 74} C2 A8 {63 6F 6D 70 72 65 73 73} C3 A0 

\94\00\00\acsimGetImages\92\91\84\abcamera_name\a11\aaimage_type\00\afpixels_as_float\c2\a8compress\c3\a6Drone1
                                                                                                                                                                                                                           D  r  o  n  e  1                        
94 00 00 AC 73 69 6D 47 65 74 49 6D 61 67 65 73 92 91 84 AB 63 61 6D 65 72 61 5F 6E 61 6D 65 A1 31 AA 69 6D 61 67 65 5F 74 79 70 65 00 AF 70 69 78 65 6C 73 5F 61 73 5F 66 6C 6F 61 74 C2 A8 63 6F 6D 70 72 65 73 73 C3 A6 44 72 6F 6E 65 31

class ImageRequest(MsgpackMixin):
    camera_name = '0'
    image_type = ImageType.Scene
    pixels_as_float = False
    compress = False

    def __init__(self, camera_name, image_type, pixels_as_float = False, compress = True):
        # todo: in future remove str(), it's only for compatibility to pre v1.2
        self.camera_name = str(camera_name)
        self.image_type = image_type
        self.pixels_as_float = pixels_as_float
        self.compress = compress

*/