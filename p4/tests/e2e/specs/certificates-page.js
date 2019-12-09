describe('Certificate page', () => {
  const _navigateToCertificatePage = () => {
    cy.visit('/');
    cy.get('[data-test="login-buttom"]').click();
    cy.get('[data-test="certificate-link"]').click();
  }

  it('Renders page correctly via url navigation', () => {
    _navigateToCertificatePage();
    cy.visit('/certificates')
    cy.contains('h1', 'Certificate programs');
  });

  it('Renders page correctly via nav bar navigation', () => {
    _navigateToCertificatePage();
    cy.contains('h1', 'Certificate programs');
  });

  it('Renders 3 tables one for each program', () => {
    _navigateToCertificatePage();
    cy.contains('h1', 'Certificate programs');
    // 3 tables one for each certificate program
    cy.get('[data-test="certificate-page"').find('table').should('have.length', 3)
  });
});