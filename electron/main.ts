import path from 'node:path'
import { BrowserWindow, app } from 'electron'
import { createIPCHandler } from 'electron-trpc/main'
import { appRouter } from '../server/trpc'

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js
// │ ├─┬ preload
// │ │ └── index.js
// │ ├─┬ renderer
// │ │ └── index.html

process.env.ROOT = path.join(__dirname, '..')
process.env.DIST = path.join(process.env.ROOT, 'dist-electron')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.ROOT, 'public')
  : path.join(process.env.ROOT, '.output/public')
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

let win: BrowserWindow
const preload = path.join(process.env.DIST, 'preload.js')

function bootstrap() {
  win = new BrowserWindow({
    webPreferences: {
      preload,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL)
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    // win.webContents.openDevTools()
  else
    win.loadFile(path.join(process.env.VITE_PUBLIC!, 'index.html'))

  createIPCHandler({ router: appRouter, windows: [win] })
}

app.whenReady().then(bootstrap)
