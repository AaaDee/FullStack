describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test Testerson',
      username: 'test',
      password: 'testpw'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('Wrong credentials give an error', function() {
      cy.get('#username').type('asdf')
      cy.get('#password').type('asdf')
      cy.get('#submitLogin').click()
      cy.contains('wrong credentials')
    })

    it('Correct credentials allow log in', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('testpw')
      cy.get('#submitLogin').click()
      cy.contains('test Logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('test')
      cy.get('#password').type('testpw')
      cy.get('#submitLogin').click()
    })

    it('A blog can be created', function() {
      cy.get('#newBlogToggle').click()
      cy.get('#title-input').type('blog')
      cy.get('#author-input').type('author')
      cy.get('#url-input').type('url')
      cy.get('#submit-blog').click()
      cy.contains('blog')
      cy.contains('author')
    })

    it('A blog can be liked', function() {
      cy.get('#newBlogToggle').click()
      cy.get('#title-input').type('blog')
      cy.get('#author-input').type('author')
      cy.get('#url-input').type('url')
      cy.get('#submit-blog').click()

      cy.get('#blogToggle').click()
      cy.get('#like').click()
      cy.contains('likes: 1')
    })

    it('A blog can be removed', function() {
      cy.get('#newBlogToggle').click()
      cy.get('#title-input').type('blog')
      cy.get('#author-input').type('author')
      cy.get('#url-input').type('url')
      cy.get('#submit-blog').click()

      cy.get('#blogToggle').click()
      cy.get('#remove').click()
      cy.contains('blog author').should('not.exist')
    })

    it.only('Blogs are sorted according to likes', function() {
      cy.get('#newBlogToggle').click()
      cy.get('#title-input').type('blog second best')
      cy.get('#author-input').type('author')
      cy.get('#url-input').type('url')
      cy.get('#submit-blog').click()

      cy.get('#blogToggle').click()
      cy.get('#like').click()
      cy.get('#blogToggle').click()

      cy.get('#newBlogToggle').click()
      cy.get('#title-input').type('blog best')
      cy.get('#author-input').type('author')
      cy.get('#url-input').type('url')
      cy.get('#submit-blog').click()

      cy.contains('blog best author')
        .find('#blogToggle')
        .click()

      cy.get('#like').click()
      cy.get('#like').click()

      cy.contains('likes: 2')

      cy.get('.blog').eq(0).should('contain', 'blog best')
      cy.get('.blog').eq(1).should('contain', 'blog second best')
    })
  })
})