import { test, expect } from '@playwright/test' 

test('Deve consultar um pedido aprovado', async ({ page }) => {

  //Test Data
  const orderId = 'VLO-1YHZBP';


  await page.goto('http://localhost:5173/') 

  // Checkpoint 1: Verificar se a página de consulta de pedidos está carregada
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint') 

  await page.getByRole('link', { name: 'Consultar Pedido' }).click() 

  // Checkpoint 2: Verificar se a página de consulta de pedidos está carregada
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido') 

  await page.getByTestId('search-order-id').fill(orderId) 

  await page.getByTestId('search-order-button').click() 

  await expect(page.getByTestId('order-result-id')).toContainText(orderId) 

  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO') 
}) 

test('Deve consultar um pedido rejeitado', async ({ page }) => {

  //Test Data
  const orderId = 'VLO-1YHZBP2';

  await page.goto('http://localhost:5173/') 

  // Checkpoint 1: Verificar se a página de consulta de pedidos está carregada
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint') 

  await page.getByRole('link', { name: 'Consultar Pedido' }).click() 
  
  // Checkpoint 2: Verificar se a página de consulta de pedidos está carregada
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido') 

  await page.getByTestId('search-order-id').fill(orderId) 

  await page.getByTestId('search-order-button').click() 
  
  // Checkpoint 3: Verificar se o pedido não foi encontrado

  // await expect(page.locator('#root')).toContainText('Pedido não encontrado');
  // await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente');

  const titleNotFound = page.getByRole('heading', { name: 'Pedido não encontrado' })
  await expect(titleNotFound).toBeVisible()

  const messageNotFound = page.locator('p').filter({ hasText: 'Verifique o número do pedido e tente novamente' })
  await expect(messageNotFound).toBeVisible()
  

}) 