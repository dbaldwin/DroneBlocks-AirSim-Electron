// import { ShowMessage } from './commands/ShowMessage'
// import { TakeOff } from './commands/TakeOff'
// import { Fly } from './commands/Fly'
// import { Yaw } from './commands/Yaw'
// import { Flip } from './commands/Flip'
// import { Speed } from './commands/Speed'
// import { Curve } from './commands/Curve'
// import { FlyXYZ } from './commands/FlyXYZ'
// import { Hover } from './commands/Hover'
// import { Land } from  './commands/Land'

const { TakeOff } = require('./commands/TakeOff')
const net = require('net')
const msgpack = require('msgpack-lite')

class TCPCommandHandler {

    constructor(host, port, /*drone,*/ mainWindow) {
        this.client = new net.Socket()
        this.host = host
        this.port = port
        //this.drone = drone;
        this.mainWindow = mainWindow
        this.commandArray = []
        this.commandIndex = 0
        this.interval = 0
        this.commandDelay = 1000
        this.isMissionAborted = false

        this.commandClasses = {
            takeOff: TakeOff
        }

        // this.commandClasses = {
        //     showMessage: ShowMessage,
        //     takeOff: TakeOff,
        //     flyForward: Fly,
        //     flyBackward: Fly,
        //     flyLeft: Fly,
        //     flyRight: Fly,
        //     flyUp: Fly,
        //     flyDown: Fly,
        //     yawLeft: Yaw,
        //     yawRight: Yaw,
        //     flipLeft: Flip,
        //     flipRight: Flip,
        //     flipForward: Flip,
        //     flipBackward: Flip,
        //     setSpeed: Speed,
        //     flyCurve: Curve,
        //     flyXYZ: FlyXYZ,
        //     hover: Hover,
        //     land: Land
        // };

        console.log("Constructor called")
        
        //var msgpack = require("msgpack-lite");
        //var net = require('net');

        var enableApiControl  = [0, 0, "enableApiControl", [true, ""]];
        var armDisarm  = [0, 1, "armDisarm", [false, ""]];
        var flyForward = [0, 3, "moveToPosition", [0, -5, -25, 5, 60, 0, {"is_rate": true, "yaw_or_rate": 0}, -1, 1, ""]]
        var land = [0, 4, "land", [60, ""]]

        
        // Connect to AirSim
        this.client.connect(this.port, this.host, function() {
            //console.log(this.commandDelay)
        })

        // Listen for response
        this.client.on('data', function(data) {
            console.log('Received: ' + msgpack.decode(data))

            /*commandIndex = commandIndex + 1;

            // Send next command
            if (commandIndex < commandCount) {
                send(commands[commandIndex]);
            } else {
                console.log("Mission complete!");
            }*/
            //client.destroy(); // kill client after server's response
        })

        this.client.on('close', function() {
            console.log('Connection closed')
        })

    }

    send() {
        this.client.write(msgpack.encode(new TakeOff().command()))
    }

    init() {        
        // Bind the client to a specific port so we can get responses from Tello on that port
        // We use a different port than the connection handler so we don't run into conflicts
        this.client.bind(9000);

        // Receive messages
        this.client.on('message', (message, remote) => {
            let response = message.toString();

            console.log("Got response: " + response);

            // If we get a valid response let's stop pinging
            if (response == "ok") {
                console.log("got ok, let's process the next command");
                this.commandIndex = this.commandIndex + 1;
                this.processNextCommand();
            // Handle battery response
            } else if (Number.isInteger(Number.parseInt(response))) {
                this.mainWindow.webContents.send("battery", response);
            // Error processing the command. Perhaps we implement some retry
            } else {
                console.log("The response was not ok");
            }
        });
    }

    processCommands(code) {

        // Hide abort button in cases where there's a crash and the button gets stuck
        this.mainWindow.webContents.send("toggle-abort", {"show": false});

        // Reset the command array
        this.commandArray = [];

        const commands = code.split("|");

        for (let command of commands) {

            // In cases where there is only one command it will look like flipRight|
            // So we should ignore the empty command by breaking out of the loop
            if (command.length == 0) break;

            // Get the command string
            const className = command.split(",")[0];

            // Dynamically instantiate the command class
            const obj = new this.commandClasses[className](command);

            // Get the interpreted command
            const telloCommand = obj.command;
            
            // Append the commands to the array
            this.commandArray.push(telloCommand);

        }

        // Don't proceed if Tello is not connected
        if (!this.drone.connected) {

            // Show message is the first and only command so we want to trigger this
            if (this.commandArray[0].indexOf("showMessage") != -1 && this.commandArray.length == 1) {
                // Call the UI to display the message
                var message = this.commandArray[0].split(",")[1];
                this.mainWindow.webContents.send("show-message", message);

                return;
            }

            // Display message that Tello isn't connected
            this.mainWindow.webContents.send("show-message", "Please connect to Tello's network.");
            return;
        }

        // Show abort button
        this.mainWindow.webContents.send("toggle-abort", {"show": true});

        // Begin sending commands
        this.processNextCommand();
        
    }

    processNextCommand() {
        setTimeout(() => {
            if (this.commandIndex < this.commandArray.length) {
                this.commandDelay = 1000;
                this.sendCommand(this.commandArray[this.commandIndex]);
            } else {
                // Hide the abort button
                this.mainWindow.webContents.send("toggle-abort", {"show": false});
                if (this.isMissionAborted) {
                    this.mainWindow.webContents.send("show-message", "Mission aborted!");
                    this.isMissionAborted = false;
                } else {
                    this.mainWindow.webContents.send("show-message", "Mission completed successfully!");
                }
                this.commandIndex = 0;
            }
        }, this.commandDelay);
    }

    sendCommand(command) {

        if (command.indexOf("showMessage") > -1) {
            
            // Call the UI to display the message
            var message = command.split(",")[1];
            this.mainWindow.webContents.send("show-message", message);

            // Let's send the command message to keep the sequence of events running
            command = "command";
        } else if(command.indexOf("hover") > -1) {

            var delay = command.split(",")[1];
            this.commandDelay = parseInt(delay) * 1000;
            command = "command";
            
        }

        this.client.send(command, 0, command.length, this.port, this.host, function(err, bytes) {
            if (err) throw err;
            console.log('UDPCommandHandler.sendCommand ' + command + ' sent to ' + this.address + ':' + this.port);
        });

    }

    // User has aborted mission
    abortMission() {
        this.commandArray = [];
        this.sendCommand("land");
        this.isMissionAborted = true;
    }

}

module.exports.TCPCommandHandler = TCPCommandHandler