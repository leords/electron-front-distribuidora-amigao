window.addEventListener("DOMContentLoaded", () => {
  console.log("Preload script loaded");
});

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  printToPDF: (nomeArquivo) => ipcRenderer.invoke("print-to-pdf", nomeArquivo),
  printWindow: () => ipcRenderer.invoke("print-window"),
});
