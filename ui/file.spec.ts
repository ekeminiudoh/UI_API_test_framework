import { test, expect } from '@playwright/test'
import { baseUrl, fileDesc, invalidUser, validUser } from './resources/test.data'
import { LoginPage } from './pages/AuthPages'
import { FilePage } from './pages/FilePage';

test.describe('File management', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(baseUrl)
    await loginPage.login(validUser.email, validUser.password)
    await loginPage.verifyMainPage(baseUrl)
    expect(loginPage.verifyElementVisibility("text=Upload file")).toBeTruthy()
  });
  test('Create a new file', async ({ page }) => {
    const filePage = new FilePage(page)
    await filePage.enterFileDetails(fileDesc.title)
    expect(await filePage.getMessage('uploaded file(s) successfully' )).toBeVisible()
  })
 
  test('update a file', async ({ page }) => {
    const filePage = new FilePage(page)
    await filePage.clickMenuBar()
    await filePage.clickListIten()
    await filePage.verifyFilePage("http://localhost:3000/files/myFiles")
    await filePage.clickEditItem()
    await filePage.enterNewName()
    await filePage.clickSaveBtn()
    expect(await filePage.getMessage("file has been updated successfully" )).toBeVisible()
  })
    test('delete a file', async ({ page }) => {
    const filePage = new FilePage(page)
    await filePage.clickMenuBar()
    await filePage.clickListIten()
    await filePage.verifyFilePage("http://localhost:3000/files/myFiles")
    await filePage.clickDeleteItem()
    await filePage.clickConfirmBtn()
    expect(await filePage.getMessage("file has been deleted successfully" )).toBeVisible()
  })
})