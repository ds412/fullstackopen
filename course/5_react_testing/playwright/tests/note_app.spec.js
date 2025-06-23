const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note app', () => {
    beforeEach(async ({ page, request }) => {
        // empty database (backend)
        await request.post('/api/testing/reset')
        // add new user for testing purposes
        await request.post('/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })
        // go to the page (frontend)
        await page.goto('/')
    })

    test('front page can be opened', async ({ page }) => {
        // ensure both 'Notes' and the 'Note app' text are visible
        const locator = await page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'wrong')

        // ensure error message is displayed, in correct location
        const errorDiv = page.locator('.error')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
        await expect(errorDiv).toContainText('Wrong credentials')

        await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })

    test('user can succesfully log in', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
        await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    describe('when logged in', () => {
        // log in user
        beforeEach(async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen')
        })

        // try to create a note
        test('a new note can be created', async ({ page }) => {
            await createNote(page, 'a note created by playwright')
            await expect(page.getByText('a note created by playwright')).toBeVisible()
        })


        describe('and a note exists', () => {
            // create a note
            beforeEach(async ({ page }) => {
                await createNote(page, 'another note by playwright')
            })
            // change its importance
            test('importance can be changed', async ({ page }) => {
                await page.getByRole('button', { name: 'make not important' }).click()
                await expect(page.getByText('make important')).toBeVisible()
            })
        })

        describe('and several notes exists', () => {
            beforeEach(async ({ page }) => {
                await createNote(page, 'first note')
                await createNote(page, 'second note')
                await createNote(page, 'third note')
            })

            test('one of those can be made nonimportant', async ({ page }) => {
                // find element with text associated with second note
                const otherNoteText = await page.getByText('second note')
                // retrieve the parent of the second note (XPath selector)
                const otherNoteElement = await otherNoteText.locator('..')

                // click the button inside the second note's parent
                await otherNoteElement.getByRole('button', { name: 'make not important' }).click()
                await expect(otherNoteElement.getByText('make important')).toBeVisible()
            })
        })

    })
})
