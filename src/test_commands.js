/*
    A basic file to test a simple mission in AirSim
*/
const net = require('net')
const util = require('util')
const notepack = require('notepack.io')
const fs = require('fs')

const { TakeOff } = require('./commands/TakeOff')
const { EnableApiControl } = require('./commands/EnableApiControl')
const { MoveToPosition } = require('./commands/MoveToPosition')
const { Land } = require('./commands/Land')
const { ArmDisarm } = require('./commands/ArmDisarm')
const { WeatherEnable } = require('./commands/WeatherEnable')
const { WeatherSet } = require('./commands/WeatherSet')
const { MoveByVelocity } = require('./commands/MoveByVelocity')
const { GetImages } = require('./commands/GetImages')
const { CameraPose } = require('./commands/CameraPose')

let enableApiControl = new EnableApiControl().getCommand()
let takeoff = new TakeOff().getCommand()
let land = new Land().getCommand()
let flyBy = new MoveByVelocity(0, 0, -5, 10).getCommand()
let flyTo = new MoveToPosition(20, 0, 0, 5).getCommand()
let disarm = new ArmDisarm(false).getCommand()
let enableWeather = new WeatherEnable(true).getCommand()
let weatherSet = new WeatherSet(2, 0.5).getCommand() // 50% snow
let getImage = new GetImages().getCommand()
let cameraPose = new CameraPose().getCommand()

// Create the TCP client
let client = new net.Socket()

// Index of the current command being executed
let commandIndex = 0

// Stores array of commands to be executed
//let commandArray = [enableApiControl, enableWeather, weatherSet, takeoff, flyBy, flyTo, land, disarm]

let commandArray = [cameraPose]

// Delay between commands
const commandDelay = 1000

// Let's send commands to AirSim
client.connect(41451, '127.0.0.1', function() {
    
    // Kick off the command process
    sendCommand(commandArray[0])

})

// When we get a response from AirSim let's process the next command
client.on('data', function(data) {

    let response = notepack.decode(data)
    console.log('Got response from AirSim: ' + response)

    
    // This should be a photo
    if (response.length == 4 && response[3]) {

        const imageData = response[3][0].image_data_uint8

        const arrayBuffer = new Uint8Array(imageData)

        fs.writeFile('test.jpg', arrayBuffer, function(err) {
            
        })

        
    }
    

    // Send the next command if there are more
    processNextCommand()
    
})


function sendCommand(command) {
    client.write(notepack.encode(command))
}

function processNextCommand() {

    commandIndex = commandIndex + 1

    setTimeout(() => {
        if (commandIndex < commandArray.length) {
            sendCommand(commandArray[commandIndex])
        } else {
            
            console.log("Mission complete!")

            // Get rid of the connection
            client.destroy()

            // Reset the command index for the next mission
            commandIndex = 0
        }
    }, commandDelay)
}

