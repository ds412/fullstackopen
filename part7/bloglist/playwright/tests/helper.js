const loginWith = async (page, username, password) => {
    await page.locator('input[name="Username"]').fill(username)
    await page.locator('input[name="Password"]').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.locator('#blogTitle-input').fill(title)
    await page.locator('#blogAuthor-input').fill(author)
    await page.locator('#blogUrl-input').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
    await page.getByText(`${title} ${author}`).first().waitFor();
}

export { loginWith, createBlog }
