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
  win.loadURL('https://airsim-dev.web.app/airsim.html');

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


ipcMain.on('launch', (event, arg) => {

  console.log("launch called");

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