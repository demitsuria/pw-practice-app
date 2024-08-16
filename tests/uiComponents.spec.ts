import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:4200/')

})

test.describe('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()

    })

    test('input fieldz', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using The Grid" }).getByRole('textbox', { name: "Email" })
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test.com', { delay: 500 })

        //generic assertion

        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        //locatorAssertion

        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')


    })

    test('radio buttonz', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: "Using The Grid" })
        await usingTheGridForm.getByLabel('Option 1').check({ force: true })
        // await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).check({ force: true })

        //Generic assertion
        const radioStatus = await usingTheGridForm.getByLabel('Option 1').isChecked()
        expect(radioStatus).toBeTruthy();

        //Locator assertion
        await expect(usingTheGridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked()

        await usingTheGridForm.getByLabel('Option 2').check({ force: true })

        expect(await usingTheGridForm.getByLabel('Option 1').isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByLabel('Option 2').isChecked()).toBeTruthy()

    })
})

