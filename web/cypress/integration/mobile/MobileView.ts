it('visits GameInfo page on mobile', () => {
  cy.visit('/en/play/takesix');
  cy.get('[data-testid="MobileViewDiv"]').should('exist');
});

export {};
