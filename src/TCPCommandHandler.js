const net = require('net')
const notepack = require('notepack.io')
const fs = require('fs')
const path = require('path')

class TCPCommandHandler {

    constructor(host, port, commandArray, photoFolder, mainWindow) {
        this.host = host
        this.port = port
        this.commandArray = commandArray
        this.photoFolder = photoFolder
        this.mainWindow = mainWindow
        this.client = new net.Socket()
        this.commandIndex = 0
        this.commandDelay = 1000
        this.currentCommand = null
        this.imageBuffer = new Buffer([])

        // Listen for data
        this.client.on('data', (data) => {

            // We care about this response because it contains image data and we want to save it
            if (this.currentCommand != null && this.currentCommand.getCommand().toString().indexOf('simGetImages') > -1) {
                
                // Store the image data in a buffer
                // Since it's chunked we will concat it
                this.imageBuffer = Buffer.concat([this.imageBuffer, new Buffer(data)])

                // Since the data buffer is not full we are done receiving image data
                // Node has a max buffer of 65536 on receive so some images will be sent in chunks if larger than 65536
                if (data.length < 65536) {
                    
                    // Decode the image buffer and grab the image data
                    const response = notepack.decode(this.imageBuffer)
                    const imageData = response[3][0].image_data_uint8
                    const arrayBuffer = new Uint8Array(imageData)

                    // Save the buffer to an image
                    fs.writeFile(path.join(this.photoFolder, Date.now() + '.png'), arrayBuffer, (err) => {
                        if(err) {
                            console.log('error saving photo')
                        }
                    })

                    // Reset the buffer
                    this.imageBuffer = new Buffer([])

                    // Proceed with processing the next command
                    this.processNextCommand()
                }
            
            // Let's send the next command in the sequence
            } else {

                const response = notepack.decode(data)
                console.log('Response for command #' + this.commandIndex + ': ' + response)
                
                this.processNextCommand()
            }
        })

    }

    // Entry point to starting the mission
    startMissionLoop() {
        
        // Handle the connection
        this.client.connect(this.port, this.host, () => {
            console.log("Connected to AirSim")
            this.sendCommand(this.commandArray[0])            
        })

    }

    // Send command to AirSim
    sendCommand(command) {

        const commandString = command.getCommand()

        console.log('Sending command #' + this.commandIndex + ': ' + commandString)

        // Let's highlight the block on the canvas
        this.mainWindow.webContents.send("highlightBlock", {id: command.getId()})
        console.log("Trying to highlight: " + command.getId())

        // Pack and send the command
        this.client.write(notepack.encode(commandString))
    }

    // Send the next command in the array
    processNextCommand() {

        // Increment command counter
        this.commandIndex = this.commandIndex + 1

        // Get the current command to be sent
        this.currentCommand = this.commandArray[this.commandIndex]
        const command = this.currentCommand

        // We're done with the mission
        // TODO: let's rework this logic later
        if (this.commandIndex == this.commandArray.length) {
            this.client.destroy()
            console.log("Mission complete!")
            this.commandIndex = 0

            // Unhighlight blocks
            this.mainWindow.webContents.send("highlightBlock", {id: null})

            return
        }

        // Let's handle cases where we don't actually want AirSim to do anything
        // So we'll delay before the hover message
        if (command.getCommand().indexOf("hover") > -1) {
            console.log(command)

            // Delay is index 2 because block id is 1
            const delay = command.getCommand()[1] * 1000
            console.log(delay)
            this.commandDelay = delay

            // Let's highlight the hover block still
            this.mainWindow.webContents.send("highlightBlock", {id: command.getId()})
        }

        // We'll delay between commands and when there's a hover block we'll change the delay
        setTimeout(() => {

            if (command.getCommand().indexOf("hover") > -1) {

                // Reset the delay and send the next command
                this.commandDelay = 1000
                this.processNextCommand()
            
            } else {

                this.sendCommand(command)
            }

        }, this.commandDelay)
    }

}
module.exports.TCPCommandHandler = TCPCommandHandler