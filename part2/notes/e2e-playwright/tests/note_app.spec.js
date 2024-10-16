const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    // await request.post('http://localhost:3001/api/testing/reset')
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    })

    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    // await page.goto("http://localhost:5173");

    //const locator = await page.getByText("Notes");
    const locator = await page.locator('h1', { hasText: 'Notes' })
    await expect(locator).toBeVisible()
    await expect(
      page.getByText(
        'Note app, Department of Computer Science, University of Helsinki 2024'
      )
    ).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {
    // await page.goto("http://localhost:5173");

    await page.getByRole('button', { name: 'login' }).click()
    await loginWith(page, 'mluukkai', 'salainen')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright')
      await expect(
        page.getByText('a note created by playwright')
      ).toBeVisible()
    })

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'a note created by playwright')
      })

      test('importance can be changed', async ({ page }) => {
        await page.getByRole('button', { name: 'make not important' }).click()
        await expect(page.getByText('make important')).toBeVisible()
      })
    })
  })

  test('login fails with wrong password', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    await expect(
      page.getByText('Matti Luukkainen logged in')
    ).not.toBeVisible()
  })

  describe('and several notes exists', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await createNote(page, 'first note', true)
      await createNote(page, 'second note', true)
      await createNote(page, 'third note', true)
    })

    test('one of those can be made nonimportant', async ({ page }) => {
      await page.pause()
      const secondNoteElement = await page
        .getByText('second note')
        .locator('..')
      await secondNoteElement
        .getByRole('button', { name: 'make not important' })
        .click()
      await expect(secondNoteElement.getByText('make important')).toBeVisible()
    })
  })
})
