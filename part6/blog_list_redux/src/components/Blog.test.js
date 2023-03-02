import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'

let blog

beforeEach(() => {
  const BlogData = {
    user: {
      id: '1234',
      username: 'username',
      name: 'name surname',
    },
    likes: 2,
    author: 'author',
    title: 'title',
    url: 'url.com',
  }

  const dummyBlogs = []
  const setBlogsMock = jest.fn()

  blog = render(
    <Blog blog={BlogData} blogs={dummyBlogs} setBlogs={setBlogsMock} />
  )
})

test('<Blog /> displays blog title and author, but not URL or likes', async () => {
  const { container } = blog

  const blogDiv = container.querySelector('.blogPost')
  expect(blogDiv).toHaveTextContent('title author')

  const detailBlogDiv = container.querySelector('.blogPostDetail')
  expect(detailBlogDiv).toHaveStyle('display: none')
})

test('<Blog /> blog detail is displayed when the show detail button is clicked', async () => {
  const { container } = blog

  const detailButton = screen.getByText('show detail')
  const user = userEvent.setup()

  await user.click(detailButton)

  const detailBlogDiv = container.querySelector('.blogPostDetail')
  expect(detailBlogDiv).not.toHaveStyle('display: none')
})

test('<Blog /> handleAddLike function called twice when like button clicked twice', async () => {
  const mockFunction = jest
    .spyOn(blogService, 'update')
    .mockImplementation(jest.fn())

  const detailButton = screen.getByText('show detail')
  const user = userEvent.setup()

  await user.click(detailButton)

  const likeButton = screen.getByText('Like')

  await user.click(likeButton)

  await user.click(likeButton)

  expect(mockFunction.mock.calls).toHaveLength(2)
})
