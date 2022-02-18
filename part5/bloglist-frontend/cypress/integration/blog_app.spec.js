describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Leandro Argentiero',
      username: 'leaero',
      password: 'antwerpen',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Login');
    cy.contains('username');
    cy.contains('password');
  });

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('leaero');
      cy.get('#password').type('antwerpen');
      cy.get('#btn-login').click();

      cy.contains('Leandro Argentiero logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('leaero');
      cy.get('#password').type('wrong');
      cy.get('#btn-login').click();

      cy.get('.notification')
        .should('have.class', 'error')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'leaero', password: 'antwerpen' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('a blog created by cypress');
      cy.get('#author').type('cypress');
      cy.get('#url').type('https://www.cypress.io/');
      cy.contains('add blog').click();
      cy.contains('a blog created by cypress');
    });
  });
});
