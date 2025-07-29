import { test, expect } from '@playwright/test'
import { baseUrl, invalidUser, validUser } from './resources/test.data'
import { LoginPage } from './pages/AuthPages'

test.describe('Authentication', () => {
  test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(baseUrl)
    await loginPage.login(validUser.email, validUser.password)
    await loginPage.verifyMainPage(baseUrl)
    expect(loginPage.verifyElementVisibility("text=Upload file")).toBeTruthy()
  })

  test('Login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(baseUrl)
    await loginPage.login(invalidUser.email, invalidUser.password)

    expect(await loginPage.getErrorMessage()).toEqual("invalid credentials")
  })
})