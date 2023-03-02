import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'
import blogService from '../services/blogs'

test('<NewBlogForm /> correct data is passed to function when called', async () => {
  const mockFunction = jest
    .spyOn(blogService, 'create')
    .mockImplementation(jest.fn())

  const dummyBlogs = []
  const dummySetNotificationMessage = jest.fn()
  const dummySetNotificationType = jest.fn()
  const dummySetBlogs = jest.fn()
  const dummyUser = {
    id: '123',
    name: 'test user',
    username: 'testuser',
  }

  render(
    <NewBlogForm
      setNotificationMessage={dummySetNotificationMessage}
      setNotificationType={dummySetNotificationType}
      blogs={dummyBlogs}
      setBlogs={dummySetBlogs}
      user={dummyUser}
    />
  )

  const titleInput = screen.getByPlaceholderText('Title')
  const authorInput = screen.getByPlaceholderText('Author')
  const urlInput = screen.getByPlaceholderText('Url')

  await userEvent.type(titleInput, 'this is the test title')
  await userEvent.type(authorInput, 'test author')
  await userEvent.type(urlInput, 'testurl.com')

  const submitButton = screen.getByText('Create')

  await userEvent.click(submitButton)

  expect(mockFunction.mock.calls).toHaveLength(1)

  const mockCallArguements = mockFunction.mock.calls[0][0]

  expect(mockCallArguements.title).toBe('this is the test title')
  expect(mockCallArguements.author).toBe('test author')
  expect(mockCallArguements.url).toBe('testurl.com')
})
