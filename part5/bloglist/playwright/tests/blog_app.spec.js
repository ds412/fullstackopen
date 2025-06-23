const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users/', {
            data: {
                name: 'Alyssa P. Hacker',
                username: 'APHacker',
                password: 'SICPv2'
            }
        })
        await request.post('/api/users/', {
            data: {
                name: 'Eva Lu Ator',
                username: 'ELator',
                password: 'LISP_interpreter'
            }
        })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('log in to application')).toBeVisible()
        await expect(page.getByText('username')).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'APHacker', 'SICPv2')
            await expect(page.getByText('Welcome Alyssa P. Hacker')).toBeVisible()
            await expect(page.getByText('Alyssa P. Hacker logged in')).toBeVisible()
            await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
            await expect(page.getByRole('button', { name: 'create new blog' })).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'APHacker', 'iforgot')
            await expect(page.getByText('Error: wrong username or password')).toBeVisible()
            await expect(page.getByText('Alyssa P. Hacker logged in')).not.toBeVisible()
            await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()
            await expect(page.getByRole('button', { name: 'create new blog' })).not.toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'APHacker', 'SICPv2')
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'SICP blog', 'Ben Bitddidle', 'bitdiddle.org')
            await expect(page.getByRole('paragraph').filter({ hasText: 'SICP blog Ben Bitddidle' })).toBeVisible()
            await expect(page.getByRole('button', { name: 'show details' })).toBeVisible()

        })

        describe('and a blog exists', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, 'My wonderful Blog', 'Louis Reasoner', 'louis.net')
            })

            test('it can be liked', async ({ page }) => {
                await page.getByRole('button', { name: 'show details' }).click()
                await page.getByRole('button', { name: 'like' }).click()
                await expect(page.getByText('Liked My wonderful Blog by Louis Reasoner')).toBeVisible()
            })

            test('the user who added the blog can delete it', async ({ page }) => {
                await page.getByRole('button', { name: 'show details' }).click()

                page.on('dialog', async dialog => {
                    expect(dialog.type()).toBe('confirm')
                    expect(dialog.message()).toBe('Remove My wonderful Blog by Louis Reasoner?')
                    await dialog.accept()
                })

                await page.getByRole('button', { name: 'remove' }).click()
                await expect(page.getByText('Removed My wonderful Blog by Louis Reasoner')).toBeVisible()
                await expect(page.getByText('My wonderful Blog Louis Reasoner')).not.toBeVisible()
            })

            test('only the user who added the blog sees the delete button', async ({ page }) => {
                await page.getByRole('button', { name: 'logout' }).click()
                await loginWith(page, 'ELator', 'LISP_interpreter')
                await page.getByRole('button', { name: 'show details' }).click()
                await expect(page.getByRole('button', { name: 'like' })).toBeVisible()
                await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
            })
        })

        test('if multiple blogs exist, they are arranged in order of likes', async ({ page }) => {
            await page.pause()
            await createBlog(page, 'blog1', 'author1', 'url1')
            await createBlog(page, 'blog2', 'author2', 'url2')

            // ensure both blogs exist and have their original order
            const initialBlogs = await page.locator('.blog').all();
            expect(initialBlogs.length).toBe(2);
            await expect(initialBlogs[0]).toContainText('blog1 author1');
            await expect(initialBlogs[1]).toContainText('blog2 author2');

            // like blog 2
            await initialBlogs[1].getByRole('button', { name: 'show details' }).click();
            await initialBlogs[1].getByRole('button', { name: 'like' }).click()

            // check new order - blog 2 before blog 1
            const reorderedBlogs = await page.locator('.blog').all();
            await expect(reorderedBlogs[0]).toContainText('blog2 author2');
            await expect(reorderedBlogs[1]).toContainText('blog1 author1');
        })

    })
})
