const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  const initialBlogCount = await page.locator('.blogShowLimited').count()

  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()

  await page.waitForFunction(
    (initialCount) =>
      document.querySelectorAll('.blogShowLimited').length > initialCount,
    initialBlogCount
  )
  // const blogLocator = await page.locator('.blogShowLimited')
  // await blogLocator.waitFor()
}

export { loginWith, createBlog }
