// Importa os módulos necessários do Electron e do Node.js
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

// Variável global para armazenar a janela principal
let mainWindow;

// Função para criar a janela principal
function createWindow() {
  // Cria uma nova janela do navegador
  mainWindow = new BrowserWindow({
    width: 800, // Largura da janela
    height: 600, // Altura da janela
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Script preload
      contextIsolation: true, // Isolamento de contexto para segurança
      nodeIntegration: false, // Impede acesso direto ao Node.js no frontend
    },
  });

  // Carrega a URL do frontend (React, Vite, etc.)
  mainWindow.loadURL("http://localhost:3000");

  // Aguarda o carregamento completo do conteúdo da janela
  mainWindow.webContents.once("did-finish-load", () => {
    console.log("Janela carregada!");

    // Handler para gerar e salvar PDF
    ipcMain.handle("print-to-pdf", async (event, nomeArquivo) => {
      if (!mainWindow) {
        console.log("ERRO: mainWindow indefinido!");
        return { success: false, message: "Janela principal não está pronta" };
      }
      try {
        // Gera o conteúdo da janela atual como PDF
        const pdfData = await mainWindow.webContents.printToPDF({});
        console.log("direto: ", nomeArquivo);
        const defaultFilePath = path.join(
          app.getPath("downloads"),
          `${nomeArquivo}.pdf`
        );
        console.log("formatado: ", defaultFilePath);

        // Abre diálogo para salvar o arquivo
        const { filePath, canceled } = await dialog.showSaveDialog({
          title: "Salvar PDF",
          defaultPath: defaultFilePath, // variavel com caminho e nome do arquivo.
          filters: [{ name: "PDF Files", extensions: ["pdf"] }],
        });

        // Se usuário cancelar ou não escolher caminho
        if (canceled || !filePath) {
          return { success: false, message: "Salvamento cancelado" };
        }

        // Salva o arquivo PDF no caminho especificado
        fs.writeFileSync(filePath, pdfData);
        return { success: true };
      } catch (err) {
        return { success: false, message: err.message }; // Erro na geração/salvamento
      }
    });

    // Handler para enviar o conteúdo para a impressora
    ipcMain.handle("print-window", async () => {
      if (!mainWindow) {
        return { success: false, message: "Janela principal não está pronta" };
      }

      return new Promise((resolve) => {
        mainWindow.webContents.print(
          {
            silent: false, // true = imprime direto sem diálogo
            printBackground: true, // Imprime o fundo da página
            landscape: false, // false = retrato, true = paisagem
          },
          (success, failureReason) => {
            if (!success) {
              resolve({ success: false, message: failureReason });
            } else {
              resolve({ success: true });
            }
          }
        );
      });
    });
  });
}

// Cria a janela quando o app estiver pronto
app.whenReady().then(createWindow);

// Encerra o app quando todas as janelas forem fechadas (exceto no macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Reabre a janela no macOS ao clicar no ícone do dock
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
