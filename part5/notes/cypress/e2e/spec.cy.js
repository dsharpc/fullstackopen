describe('Note app', () => {

  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'test user',
      username: 'testuser',
      password: 'testpassword'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('/')
  })

  it('front page can be opened', () => {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('user can log in', function () {
    cy.contains('log in').click()
    cy.get('#username').type('testuser')
    cy.get('#password').type('testpassword')
    cy.get('#login-button').click()

    cy.contains('test user logged in')
  })

  it('login fails with wrong password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('testuser')
    cy.get('#password').type('testpasswordwrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'test uer logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'testpassword' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain','make not important')


      })
    })
  })

})

