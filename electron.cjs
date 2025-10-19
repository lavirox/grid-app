const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1400,
		height: 900,
		backgroundColor: '#2a2a2a',
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
		},
	})

	// In development mode, load from vite dev server
	if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
		mainWindow.loadURL('http://localhost:5174')
		mainWindow.webContents.openDevTools()
	} else {
		// In production, load the built files
		mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'))
	}

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})
