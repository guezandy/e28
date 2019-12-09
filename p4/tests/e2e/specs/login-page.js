/**
 * Only functionality here is clicking the login button
 */
describe('Login page', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'Welcome to HES Progress tracker');
  });
  it('Logging in redirects to logged in version', () => {
    cy.visit('/');
    cy.get('[data-test="login-buttom"]').click();
    // Redirects to loggin version of app
    cy.contains('h1', 'Welcome to HES Progress tracker');
  });
})