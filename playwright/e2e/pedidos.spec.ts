import { test, expect } from '@playwright/test' 

test('Deve consultar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/') 

  // Checkpoint 1: Verificar se a página de consulta de pedidos está carregada
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint') 

  await page.getByRole('link', { name: 'Consultar Pedido' }).click() 

  // Checkpoint 2: Verificar se a página de consulta de pedidos está carregada
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido') 

  await page.getByTestId('search-order-id').fill('VLO-1YHZBP') 

  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  await expect(page.getByTestId('order-result-VLO-1YHZBP')).toContainText('VLO-1YHZBP');

  await expect(page.getByTestId('order-result-VLO-1YHZBP')).toContainText('APROVADO');
})  