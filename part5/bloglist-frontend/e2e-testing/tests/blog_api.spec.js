const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    })
    await request.post('/api/users', {
      data: {
        name: 'Javier Coronado',
        username: 'javiercoronarv',
        password: 'cawamait',
      },
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Wrong Credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'New Note' }).click()
      await createBlog(page, 'Test', 'Matti Luukkainen', 'www.test.com')
      const newContent = 'Test Matti Luukkainen'
      const blogLocator = await page.locator('.blogShowLimited')
      await expect(blogLocator).toHaveText(new RegExp(newContent))
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'New Note' }).click()
      await createBlog(page, 'Test', 'Matti Luukkainen', 'www.test.com')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      const likeLocator = await page
        .locator('.blogShowAll')
        .locator('p', { hasText: 'Likes: 1' })
      await expect(likeLocator).toBeVisible()
    })

    test('ensure user who added the blog can delete the blog', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'New Note' }).click()
      await createBlog(page, 'Test', 'Matti Luukkainen', 'www.test.com')
      await page.getByRole('button', { name: 'view' }).click()

      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toBe('confirm')
        expect(dialog.message()).toBe('Remove Test by Matti Luukkainen')
        await dialog.accept()
      })

      await page.getByRole('button', { name: 'delete' }).click()

      const blog = await page.locator('.Blog')

      expect(blog).not.toBeVisible()
    })

    test('ensure user who added the blog sees the delete button', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'New Note' }).click()
      await createBlog(page, 'Test', 'Matti Luukkainen', 'www.test.com')
      await page.getByRole('button', { name: 'view' }).click()
      let deleteButton = await page.getByRole('button', { name: 'delete' })
      expect(deleteButton).toBeVisible()

      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'javiercoronarv', 'cawamait')
      await page.getByRole('button', { name: 'view' }).click()
      deleteButton = await page.getByRole('button', { name: 'delete' })
      expect(deleteButton).not.toBeVisible()
    })
  })
})
