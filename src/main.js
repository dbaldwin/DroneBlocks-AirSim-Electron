const { app, BrowserWindow, Menu } = require('electron')
const { MissionBuilder } = require ('./MissionBuilder')
const { TCPCommandHandler } = require('./TCPCommandHandler')
const { GPSHandler } = require('./GPSHandler')

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
  mainWindow.loadURL('https://airsim-dev.web.app/airsim.html?1');

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Connect to AirSim TODO: Make this a button at some point
  //client.connect(41451, '127.0.0.1', function() {});

  new GPSHandler(mainWindow).start()
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

  console.log(arg)

  let mb = new MissionBuilder(arg)
  let commandArray = mb.parseMission()

  let t = new TCPCommandHandler('127.0.0.1', 41451, commandArray)
  t.startMissionLoop()

})