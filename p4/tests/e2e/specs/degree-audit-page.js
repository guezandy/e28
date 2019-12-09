describe('Degree Audit page', () => {
  const _navigateToDegreeAudit = () => {
    cy.visit('/');
    cy.get('[data-test="login-buttom"]').click();
  }

  it('Renders page correctly', () => {
    _navigateToDegreeAudit();
    cy.contains('h1', 'Welcome to HES Progress tracker');
  });

  it('Renders data in table correctly', () => {
    _navigateToDegreeAudit();
    cy.contains('h1', 'Welcome to HES Progress tracker');
    // 1 top header row + 6 courses taken
    cy.get('table').find('tr').should('have.length', 7)
  });
});