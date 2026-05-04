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

    // await expect(page.getByTestId('order-result-id')).toContainText(orderId) 

    // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO') 

    await expect(page.getByTestId(`order-result-${orderId}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${orderId}
      - img
      - text: APROVADO
    `);

    await expect(page.getByTestId(`order-result-${orderId}`)).toMatchAriaSnapshot(`
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: Glacier Blue
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: aero Wheels
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: Thiago Augusto da Costa
      - paragraph: Email
      - paragraph: teste@teste.com
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: À Vista
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);


  }) 

  test('Deve consultar um pedido reprovado', async ({ page }) => {

    //Test Data
    const orderId = 'VLO-IK5T3V';
    
    await page.getByTestId('search-order-id').fill(orderId) 

    await page.getByTestId('search-order-button').click() 

    // await expect(page.getByTestId('order-result-id')).toContainText(orderId) 

    // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO') 

    await expect(page.getByTestId(`order-result-${orderId}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${orderId}
      - img
      - text: REPROVADO
    `);

    await expect(page.getByTestId(`order-result-${orderId}`)).toMatchAriaSnapshot(`
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: Midnight Black
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: sport Wheels
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: Chris Gardner Costa
      - paragraph: Email
      - paragraph: chris@teste.com
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: À Vista
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);


  }) 

  test('Deve consultar um pedido em análise', async ({ page }) => {

    //Test Data
    const orderId = 'VLO-TSMY11';
    
    await page.getByTestId('search-order-id').fill(orderId) 

    await page.getByTestId('search-order-button').click() 

    // await expect(page.getByTestId('order-result-id')).toContainText(orderId) 

    // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO') 

    await expect(page.getByTestId(`order-result-${orderId}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${orderId}
      - img
      - text: EM_ANALISE
    `);

    await expect(page.getByTestId(`order-result-${orderId}`)).toMatchAriaSnapshot(`
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: Midnight Black
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: sport Wheels
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: 2pac shakur
      - paragraph: Email
      - paragraph: 2pac@test.com
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: À Vista
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);


  }) 

  test('Deve consultar um pedido inexistente', async ({ page }) => {

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