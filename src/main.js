const { app, BrowserWindow, Menu } = require('electron')
const { TCPCommandHandler } = require('./TCPCommandHandler')

// Handles connection between web view and main app
const ipcMain = require('electron').ipcMain


//let client = new net.Socket();

let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('https://airsim-dev.web.app/airsim.html');

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Connect to AirSim TODO: Make this a button at some point
  //client.connect(41451, '127.0.0.1', function() {});
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


ipcMain.on('launch', (event, arg) => {

  console.log("launch called");

  const commandHandler = new TCPCommandHandler('127.0.0.1', 41451, mainWindow);
  
  // var enableApiControl  = [0, 0, "enableApiControl", [true, ""]];
  // client.write(msgpack.encode(enableApiControl));
  
  // let takeoff  = [0, 2, "takeoff", [10, ""]];
  // client.write(msgpack.encode(takeoff));

  


  // send(enableApiControl);
  // send(armDisarm);

  // if (arg.indexOf("takeoff") > -1) {
  //   console.log("taking off")
  //   send(takeoff)
  // } else if (arg.indexOf("land") > -1) {
  //   console.log("land")
  //   send(land)
  // } else if (arg.indexOf("fly_to") > -1) {
  //   let params = arg.split(",")

  //   let x = params[1]
  //   let y = params[2]
  //   let z = params[3]

  //   let fly = [0, 3, "moveToPosition", [x, y, z, 5, 60, 0, {"is_rate": true, "yaw_or_rate": 0}, -1, 1, ""]]
    
  //   send(fly)
  // }


});