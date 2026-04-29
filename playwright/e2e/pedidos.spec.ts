import { test, expect } from '@playwright/test' 
import { gerarCodigoVLO } from '../support/helpers'

test.describe('Consultar Pedido', () => {


  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:5173/') 

    // Checkpoint 1: Verificar se a página de consulta de pedidos está carregada
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint') 

    await page.getByRole('link', { name: 'Consultar Pedido' }).click() 

    // Checkpoint 2: Verificar se a página de consulta de pedidos está carregada
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido') 

  })
  
  
  test('Deve consultar um pedido aprovado', async ({ page }) => {

    //Test Data
    const orderId = 'VLO-1YHZBP';
    
    await page.getByTestId('search-order-id').fill(orderId) 

    await page.getByTestId('search-order-button').click() 

    await expect(page.getByTestId('order-result-id')).toContainText(orderId) 

    await expect(page.getByTestId('order-result-status')).toContainText('APROVADO') 
  }) 

  test('Deve consultar um pedido rejeitado', async ({ page }) => {

    //Test Data
    const orderId = gerarCodigoVLO()
   
    await page.getByTestId('search-order-id').fill(orderId) 

    await page.getByTestId('search-order-button').click() 
    
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `);

    }) 

})