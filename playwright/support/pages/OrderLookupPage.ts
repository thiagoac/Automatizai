import { Page } from '@playwright/test'


export class SearchLookupPage {
    constructor(private page: Page) {}
  
    async searchOrder(code: string) {
      await this.page.getByRole('textbox', { name: 'Número do Pedido' }).fill(code)
      await this.page.getByRole('button', { name: 'Buscar Pedido' }).click()
    }
}