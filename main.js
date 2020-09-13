const { app, BrowserWindow, ipcMain } = require('electron')

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('www/index.html')

  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var msgpack = require("msgpack-lite");
var net = require('net');

var enableApiControl  = [0, 0, "enableApiControl", [true, ""]];
var armDisarm  = [0, 1, "armDisarm", [false, ""]];
var takeoff  = [0, 2, "takeoff", [10, ""]];
var flyForward = [0, 3, "moveToPosition", [0, -5, -25, 5, 60, 0, {"is_rate": true, "yaw_or_rate": 0}, -1, 1, ""]]
var land = [0, 4, "land", [60, ""]];


let commandIndex = 0;

let commands = [enableApiControl, armDisarm, takeoff];

let commandCount = commands.length;

let currentCommand = commands[0];

var client = new net.Socket();

// Connect to AirSim
client.connect(41451, '127.0.0.1', function() {});

// Listen for response
client.on('data', function(data) {
	console.log('Received: ' + msgpack.decode(data));

    commandIndex = commandIndex + 1;

    // Send next command
    if (commandIndex < commandCount) {
        send(commands[commandIndex]);
    } else {
        console.log("Mission complete!");
    }
	//client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});

function send(command) {
    console.log("sending command: " + command);
    client.write(msgpack.encode(command));
}


ipcMain.on('launch', (event, arg) => {
  console.log(arg) // prints "ping"

  send(commands[commandIndex]);
});