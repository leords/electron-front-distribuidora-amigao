export function SalvarArquivo(nomeArquivo) {
  const salvarPDF = async () => {
    try {
      const result = await window.electronAPI.printToPDF(nomeArquivo);
      if (result.success) {
        alert("PDF salvo com sucesso!");
      } else {
        alert("Erro ao salvar PDF: " + (result.message || "Desconhecido"));
      }
    } catch (error) {
      alert("Erro inesperado: " + error.message);
    }
  };

  return { salvarPDF };
}
