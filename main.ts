import { app, BrowserWindow } from "electron"
import path from "path"
import cp from 'child_process'

let isProd = process.env.NODE_ENV === 'production'
let mainWindow

async function startAdonis() {
  cp.execFile('node', [`${path.join(__dirname,'./server.js')}`, !isProd?'--dev':''])
}

async function createWindow() {
  // Create the browser window.
  // preload: path.join(__dirname, "preload.js"),

  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    title: "My App",
    webPreferences: {
      nodeIntegration: true
    },
    /// show to false mean than the window will proceed with its lifecycle, but will not render until we will show it up
    show: false,
    /// and set the transparency, to remove any window background color
    transparent: true
  })

  await startAdonis()

  // Remove toolbar
  mainWindow.setMenuBarVisibility(false)

  // Set Title Program
  mainWindow.on('page-title-updated', function(e) {
    e.preventDefault()
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  /// keep listening on the did-finish-load event, when the mainWindow content has loaded
  mainWindow.webContents.on('did-finish-load', () => {
    /// then close the loading screen window and show the main window
    if (loadingScreen) {
      loadingScreen.close()
    }
    mainWindow.show()
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

/// create a global var, wich will keep a reference to out loadingScreen window
let loadingScreen;
const createLoadingScreen = () => {
  /// create a browser window
  loadingScreen = new BrowserWindow(
    Object.assign({
      /// define width and height for the window
      width: 250,
      height: 400,
      /// remove the window frame, so it will become a frameless window
      frame: false,
      /// and set the transparency, to remove any window background color
      transparent: true
    })
  )
  loadingScreen.setResizable(false)
  loadingScreen.loadURL(
    'file://' + __dirname + '/windows/loading.html'
  )
  loadingScreen.on('closed', () => (loadingScreen = null))
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show()
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createLoadingScreen()
  /// add a little bit of delay for tutorial purposes, remove when not needed
  setTimeout(() => {
    createWindow();
  }, 5000)

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
