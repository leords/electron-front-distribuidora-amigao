export function Imprimir() {
  const imprimirArquivo = async () => {
    try {
      const result = await window.electronAPI.printWindow();
      if (!result.success) {
        alert("Erro na impressão: " + (result.message || "Desconhecido"));
      }
    } catch (error) {
      alert("Erro inesperado: " + error.message);
    }
  };

  return { imprimirArquivo };
}
