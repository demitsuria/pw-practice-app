import { Page } from '@playwright/test'

export class FormsLayoutPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {

        const usingTheGridForm = this.page.locator('nb-card', { hasText: "Using The Grid" })
        await usingTheGridForm.getByRole('textbox', { name: "Email" }).fill(email)
        await usingTheGridForm.getByRole('textbox', { name: "Password" }).fill(password)
        await usingTheGridForm.getByLabel(optionText).check({ force: true })
        await usingTheGridForm.getByRole('button').click()

    }


    /**
     * This method will fill out the inline form with user details
     * 
     * @param name First and last name
     * @param email Email
     * @param rememberMe If session is to be saved
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: "Inline form" })
        await inlineForm.getByRole('textbox', { name: "Jane Doe" }).fill(name)
        await inlineForm.getByRole('textbox', { name: "Email" }).fill(email)
        if (rememberMe)
            await inlineForm.getByRole('checkbox').check({ force: true })
        await inlineForm.getByRole('button').click()
    }


}