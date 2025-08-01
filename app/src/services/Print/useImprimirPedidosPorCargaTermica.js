export function useImprimirPedidos() {
  const imprimirPedidos = async (pedidos) => {
    const html = `
      <html>
        <head>
          <style>
            @media print {
              body { margin: 0; padding: 0; }
              .page-break { page-break-before: always; }
            }
            body {
              font-family: monospace;
              font-size: 12px;
              padding: 10px;
              width: 100%;
              max-width: 280px;
              margin: 0 auto;
              color: #000;
            }
            .pedido {
              margin-bottom: 20px;
              border-bottom: 1px dashed #000;
              padding-bottom: 10px;
            }
            .titulo {
              text-align: center;
              font-weight: bold;
              margin-bottom: 10px;
              font-size: 14px;
            }
            .info {
              margin-bottom: 5px;
            }
            .itens {
              margin-top: 5px;
              margin-bottom: 5px;
            }
            .item {
              display: flex;
              justify-content: space-between;
            }
            .total {
              text-align: right;
              font-weight: bold;
              margin-top: 5px;
            }
          </style>
        </head>
        <body>
          ${pedidos
            .map(
              (pedido, i) => `
            <div class="pedido ${i > 0 ? "page-break" : ""}">
              <div class="titulo">Pedido #${pedido.id}</div>
              <div class="info">Cliente: ${pedido.client.name}</div>
              <div class="info">Cidade: ${pedido.client.city}</div>
              <div class="info">Data: ${new Date(
                pedido.createdAt
              ).toLocaleDateString()}</div>
              <div class="itens">
                ${pedido.cartItems
                  .map(
                    (item) => `
                  <div class="item">
                    <span>${item.quantity}x ${item.productName}</span>
                    <span>R$ ${Number(item.total).toFixed(2)}</span>
                  </div>
                `
                  )
                  .join("")}
              </div>
              <div class="total">Total: R$ ${Number(pedido.total).toFixed(
                2
              )}</div>
              <div class="info">Pagamento: ${pedido.payment?.name || ""}</div>
              <div class="info">Vendedor: ${pedido.user?.name || ""}</div>
              <div class="info">Status: ${pedido.statusDelivery}</div>
            </div>
          `
            )
            .join("")}
        </body>
      </html>
    `;

    try {
      const resultPrint = await window.electronAPI.printHtml(html);
      if (!resultPrint.success) {
        alert("Erro na impressão.");
      }
    } catch (e) {
      alert("Erro inesperado: " + e.message);
    }
  };

  return { imprimirPedidos };
}
