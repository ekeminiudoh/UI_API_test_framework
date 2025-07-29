import { Page } from '@playwright/test';
import { baseUrl } from '../resources/test.data';

export class LoginPage {
  constructor(private page: Page) {}

  async goto(url: string) {
    await this.page.goto(url);
  }

  async login(email: string, password: string) {
    await this.page.getByPlaceholder('enter email').fill(email);
    await this.page.getByPlaceholder("enter password").fill(password);
    await this.page.locator('button').click();
  }
  async verifyMainPage(url: string){
    await this.page.waitForURL(`${url}`)
  }
  
  async verifyElementVisibility(elem: string){
    const element = await this.page.locator(elem).isVisible()
    return element
  }
  async getErrorMessage() {
    return await this.page.locator("text=invalid credentials").innerText();
  }

}