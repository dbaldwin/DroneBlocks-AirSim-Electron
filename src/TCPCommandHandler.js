const net = require('net')
const msgpack = require('msgpack-lite')
const { checkServerIdentity } = require('tls')

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

        // Increment command counter
        this.commandIndex = this.commandIndex + 1

        // Get the current command to be sent
        const command = this.commandArray[this.commandIndex]

        // We're done with the mission
        // TODO: let's rework this logic later
        if (this.commandIndex == this.commandArray.length) {
            this.client.destroy()
            console.log("Mission complete!")
            this.commandIndex = 0
            return
        }

        // Let's handle cases where we don't actually want AirSim to do anything
        // So we'll delay before the hover message
        if (command.indexOf("hover") > -1) {
            const delay = command[1] * 1000
            this.commandDelay = delay
        }

        // We'll delay between commands and when there's a hover block we'll change the delay
        setTimeout(() => {

            if (command.indexOf("hover") > -1) {

                // Reset the delay and send the next command
                this.commandDelay = 1000
                this.commandIndex = this.commandIndex + 1
                this.sendCommand(this.commandArray[this.commandIndex])

            
            } else {

                this.sendCommand(command)
            }

        }, this.commandDelay)
    }

}
module.exports.TCPCommandHandler = TCPCommandHandler