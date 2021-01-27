const net = require('net')
const msgpack = require('msgpack-lite')

class TCPCommandHandler {

    constructor(host, port, commandArray) {
        this.host = host
        this.port = port
        this.commandArray = commandArray
        this.client = new net.Socket()
        this.commandIndex = 0
        const commandDelay = 1000

        // So we can access in callback
        const self = this

        // Listen for data
        this.client.on('data', function(data) {
            
            console.log('Got response from AirSim: ' + msgpack.decode(data))

            // Send the next command if there are more
            self.processNextCommand()

        })

    }

    // Entry point to starting the mission
    startMissionLoop() {

        // So we can access in callback
        const self = this

        //console.log(this.commandArray)
        
        // Handle the connection
        this.client.connect(this.port, this.host, function() {
            console.log("Connected to AirSim")
            self.sendCommand(self.commandArray[0])            
        })

    }

    // Send command to AirSim
    sendCommand(command) {

        console.log('Sending command: ' + command)

        // Pack and send the command
        this.client.write(msgpack.encode(command))
    }

    // Send the next command in the array
    processNextCommand() {

        this.commandIndex = this.commandIndex + 1

        // We'll delay between commands and when there's a hover block we'll change the delay
        setTimeout(() => {
            
            if (this.commandIndex < this.commandArray.length) {

                this.sendCommand(this.commandArray[this.commandIndex])

            } else {
                
                console.log("Mission complete!")

                // Get rid of the connection
                this.client.destroy()

                // Reset the command index for the next mission
                this.commandIndex = 0
            }

        }, this.commandDelay)
    }

}
module.exports.TCPCommandHandler = TCPCommandHandler