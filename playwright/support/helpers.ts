export function gerarCodigoVLO() {
  const prefixo = "VLO-";
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let sufixo = "";
  
  for (let i = 0; i < 6; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    sufixo += caracteres.charAt(indiceAleatorio);
  }
  
  return prefixo + sufixo;
}

import { Page } from '@playwright/test'

export async function searchOrder(page: Page, orderNumber: string) {
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(orderNumber)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()
}
