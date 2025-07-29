import { Page } from '@playwright/test';
export class FilePage {
  constructor(private page: Page) {}

  async enterFileDetails(desc: string) {
    await this.page.getByPlaceholder('enter file description').fill(desc);
    await this.page.locator('input[type="file"]').setInputFiles("../ui/resources/test.png");
    await this.page.getByRole('button', { name: 'Upload' }).click();
  }
  async verifyMainPage(url: string){
    await this.page.waitForURL(`${url}`)
  }
  
  async verifyElementVisibility(elem: string){
    const element = await this.page.locator(elem).isVisible()
    return element
  }
  
  async getMessage(msg: string) {
    const toast = this.page.locator('div.chakra-alert__desc', { hasText: msg});
    return toast
  }

    async clickMenuBar(){
    const svg = this.page.locator('svg[style*="font-size: 30px"]').click();
  }
  async clickListIten(){
    const svg = this.page.locator('.css-11dqbsu').first().click();
  }
    async clickEditItem(){
    await this.page.locator('p.chakra-text.css-1n4e3gn', { hasText: 'Edit' }).first().click();
  }
   async enterNewName(){
    await this.page.locator('input[placeholder="Edit file name"]').first().fill("new title");
  }
    async clickSaveBtn(){
        await this.page.getByRole('button', { name: 'save' }).click();
  }
async clickDeleteItem(){
    await this.page.locator('p.chakra-text.css-rqgl9l svg').first().click();
  }
async clickConfirmBtn(){
    await this.page.getByRole('button', { name: 'yes' }).click();
  }
  
  async verifyFilePage(url: string){
    await this.page.waitForURL(`${url}`)
  }
}
