const { app, BrowserWindow } = require("electron");

const createWin = () => {
    const win = new BrowserWindow({
        autoHideMenuBar: true,
        width: 800,
        height: 800,
        webPreferences: {
            devTools: true
        },
        maximizable: false,
        resizable: false,
    })

    win.loadFile("./src/index.html");
    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWin()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWin()
      }
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})