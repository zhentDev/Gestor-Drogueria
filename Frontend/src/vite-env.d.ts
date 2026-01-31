/// <reference types="vite/client" />

interface Window {
    ipcRenderer: import('electron').IpcRenderer;
    electronAPI: {
        onUpdateAvailable: (callback: () => void) => void;
        onUpdateDownloaded: (callback: () => void) => void;
        restartApp: () => void;
    };
}
