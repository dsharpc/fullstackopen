describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('/')
  })

  it('Login form is shown', function () {
    cy.get('#login-form')
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, { username: 'tester', name: 'test tester', password: 'testpass' })
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, { username: 'usertwo', name: 'user two', password: 'usertwopass' })
      cy.visit('/')
    })

    it('can login with correct credentials', function () {
      cy.get('#login-form').contains('Username').find('input').type('tester')
      cy.get('#login-form').contains('Password').find('input').type('testpass')
      cy.get('#login-form').get('button').click()

      cy.contains('Logged in as test')
    })

    it('fails to login with incorrect crendentials', function () {
      cy.get('#login-form').contains('Username').find('input').type('baduser')
      cy.get('#login-form').contains('Password').find('input').type('badpass')
      cy.get('#login-form').get('button').click()

      cy.contains('Login failed')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.loginUser({ username: 'tester', password: 'testpass' })
      })

      it('a new blog can be created', function () {
        cy.contains('add new blog').click()
        cy.get('#new-blog-form').get('input[placeholder="Title"]').type('this is a new blog')
        cy.get('#new-blog-form').get('input[placeholder="Author"]').type('Blogger Authorer')
        cy.get('#new-blog-form').get('input[placeholder="Url"]').type('newblog.com')
        cy.get('#new-blog-form').get('button:contains("Create")').click()

        cy.contains('A new blog')
        cy.get('.blogPost').contains('this is a new blog')
        cy.contains('A new blog')
      })

      describe('With existing blogs', function () {
        beforeEach(function () {
          cy.loginUser({ username: 'usertwo', password: 'usertwopass' })
          cy.createBlog({ title: 'other user blog', author: 'author yellow', url: 'blogpurple.com', likes: 4 })
          cy.loginUser({ username: 'tester', password: 'testpass' })
          cy.createBlog({ title: 'first blog',author: 'author a', url: 'bloga.com', likes: 10 })
          cy.createBlog({ title: 'second blog', author: 'author red', url: 'bloggreen.com', likes: 1 })

        })

        it('user can like a blog', function () {
          cy.contains('first blog').within(() => {
            cy.get('button:contains("show detail")').click()
            cy.contains('likes: 10')
            cy.get('button:contains("Like")').click()
            cy.contains('likes: 11')
          })
        })

        it('blog can be deleted by user that created it', function () {
          cy.contains('first blog').within(() => {
            cy.get('button:contains("show detail")').click()
            cy.get('button:contains("Delete")').click()
          })
          cy.contains('first blog').should('not.exist')
        })

        it('blog cannot be deleted by user that did not create it', function () {
          cy.contains('other user blog').within(() => {
            cy.get('button:contains("show detail")').click()
            cy.get('button:contains("Delete")').should('not.exist')
          })
        })

        it('blogs are correctly sorted according to number of likes', function () {
          cy.get('.blogPost').eq(0).should('contain', 'first blog')
          cy.get('.blogPost').eq(1).should('contain', 'other user blog')
          cy.get('.blogPost').eq(2).should('contain', 'second blog')
        })
      })
    })

  })
})