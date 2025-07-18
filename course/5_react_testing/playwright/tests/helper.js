const loginWith = async (page, username, password) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByTestId('loginBtn').click()
}

const createNote = async (page, content) => {
    await page.getByRole('button', { name: 'new note' }).click()
    await page.getByRole('textbox').fill(content)
    await page.getByRole('button', { name: 'save' }).click()
    // ensure note is fully rendered before proceeeding
    await page.getByText(content).waitFor()
}

export { loginWith, createNote }
