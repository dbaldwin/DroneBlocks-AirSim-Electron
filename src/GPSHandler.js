const net = require('net')
const notepack = require('notepack.io')
const ipcMain = require('electron').ipcMain

class GPSHandler {

    constructor(mainWindow) {
        this.command = [0, 0, "getMultirotorState", [""]]
        this.client = new net.Socket()
        this.interval
        this.mainWindow = mainWindow
        this.worldPosition = { x_val: 0, y_val: 0, z_val: 0}
        this.gpsPosition = { lat: 0, lon: 0, alt: 0}
        this.isDroneFlying

        // Establish the TCP connection
        // TODO: make this happen on button click
        this.client.connect(41451, '127.0.0.1', function() {
            
        })

        this.client.on("data", (data) => {
            const state = notepack.decode(data)
            
            this.isDroneFlying = state[3].landed_state
            //console.log(state[3].collision)
            
            const kinematics = state[3].kinematics_estimated
            const gps = state[3].gps_location
            
            this.worldPosition.x_val = parseFloat(kinematics.position["x_val"]).toFixed(2)
            this.worldPosition.y_val= parseFloat(kinematics.position["y_val"]).toFixed(2)
            this.worldPosition.z_val = parseFloat(kinematics.position["z_val"]).toFixed(2)

            this.gpsPosition.lat = parseFloat(gps["latitude"]).toFixed(5)
            this.gpsPosition.lon = parseFloat(gps["longitude"]).toFixed(5)
            this.gpsPosition.alt = parseFloat(gps["altitude"]).toFixed(2)
           
        })

        // Stop on error
        this.client.on("error", (error) => {
            this.stop()
        })

        // Loop to get drone state every 3 seconds
        setInterval(this.start.bind(this), 3000)

    }

    start() {
        this.client.write(notepack.encode(this.command))
        this.mainWindow.webContents.send("updatePosition", {worldPosition: this.worldPosition, gpsPosition: this.gpsPosition})
    }

    stop() {
        this.client.destroy()

        // Need to clear the interval here
        clearInterval(this.interval)
    }
}

module.exports.GPSHandler = GPSHandler