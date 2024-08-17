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

test('checkboxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true })
    await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true })

    const allBoxes = page.getByRole('checkbox')

    for (const box of await allBoxes.all()) {
        await box.uncheck({ force: true })
        expect(await box.isChecked).toBeFalsy()
    }

})

test('Lists and dropdowns', async ({ page }) => {

    const dropdownMenu = page.locator('ngx-header').locator('nb-select')
    await dropdownMenu.click()

    page.getByRole('list') // list has UL tag
    page.getByRole('listitem') //list has LI tag

    //const optionList = page.getByRole('list').locator('nb-option')

    const optionList = page.locator('nb-option-list').locator('nb-option')

    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])

    await optionList.filter({ hasText: 'Cosmic' }).click()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)') //color validation

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)",
    }


    for (const color in colors) {
        await dropdownMenu.click()
        await optionList.filter({ hasText: color }).click()
        await expect(header).toHaveCSS('background-color', colors[color])
    }
})


test('tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const tooltipCard = page.locator('nb-card', { hasText: "Tooltip Placements" })
    await tooltipCard.getByRole('button', { name: "Top" }).hover()

    //page.getByRole('tooltip') //if you have a role tooltip created

    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')

})

test('Dialog Box', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => { //listener
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()

    })

    await page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash').click()

    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')



})

