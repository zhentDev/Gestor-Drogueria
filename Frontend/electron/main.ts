import { app, BrowserWindow, ipcMain } from 'electron'

import { fileURLToPath } from 'node:url'
import path from 'node:path'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { autoUpdater } from 'electron-updater';

// import { session } from 'electron'
// import os from 'node:os';

// const reactDevToolsPath = path.join(os.homedir(),
//   'AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\6.1.5_0'
// )


const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: true,
      contextIsolation: true,
    },
    fullscreen: false,
  });

  // Verificar actualizaciones al iniciar
  autoUpdater.checkForUpdatesAndNotify();

  win.maximize();

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // Usar path absoluto para evitar problemas de resolución relativa
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Eventos del autoUpdater
autoUpdater.on('update-available', () => {
  win?.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  win?.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});


app.whenReady().then(async () => {
  // Solo instalar devtools en desarrollo
  if (process.env.VITE_DEV_SERVER_URL) {
    try {
      await installExtension(REACT_DEVELOPER_TOOLS);
      console.log('Added Extension: React DevTools');
    } catch (err) {
      console.log('An error occurred loading DevTools: ', err);
    }
  } else {
    // In Production: Spawn Backend
    startBackend();
  }

  createWindow();
});

import { fork, ChildProcess } from 'child_process';

let backendProcess: ChildProcess | null = null;

function startBackend() {
  const backendPath = path.join(process.resourcesPath, 'backend');
  const scriptPath = path.join(backendPath, 'bin', 'www');

  console.log('Starting backend from:', scriptPath);

  backendProcess = fork(scriptPath, [], {
    cwd: backendPath,
    env: { ...process.env, PORT: '3000', NODE_ENV: 'production' }
  });

  backendProcess.on('error', (err) => {
    console.error('Backend failed to start:', err);
  });

  backendProcess.on('exit', (code, signal) => {
    console.log(`Backend process exited with code ${code} and signal ${signal}`);
  });
}

app.on('before-quit', () => {
  if (backendProcess) {
    console.log('Killing backend process...');
    backendProcess.kill();
  }
});

// app.whenReady().then(async () => {
//   try {
//     await installExtension(REACT_DEVELOPER_TOOLS);
//     console.log('React DevTools installed');
//   } catch (err) {
//     console.error('Failed to install React DevTools:', err);
//   }

//   createWindow(); // <-- mover aquí después de instalar la extensión
// });

