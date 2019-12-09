describe('Masters page', () => {
  const _navigateToMasters = () => {
    cy.visit('/');
    cy.get('[data-test="login-buttom"]').click();
    cy.get('[data-test="masters-link"]').click();
  }

  it('Renders page correctly via url navigation', () => {
    _navigateToMasters();
    cy.visit('/masters')
    cy.contains('h1', 'Masters programs');
  });

  it('Renders page correctly', () => {
    _navigateToMasters();
    cy.contains('h1', 'Masters programs');
    // 1 top header row + 12 requirements for the masters program
    cy.get('table').find('tr').should('have.length', 13);
    // Progress bar correctly renders 42% complete
    cy.contains('.progress', '42');
  });
});