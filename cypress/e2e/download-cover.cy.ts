context('Download Cover', () => {
  beforeEach(() => {
    cy.visit('/create');
  });

  it('Download cover', () => {
    cy.log('User is first greeted with a welcome modal');
    cy.findByRole('heading', { name: 'Hey 👋' }).should('exist');
    cy.findByRole('button', { name: 'Start editing' }).should('exist');
    cy.findByRole('button', { name: 'Start editing' }).click();
    cy.findByRole('heading', { name: 'Hey 👋' }).should('not.exist');

    cy.log('Local storage item prevents modal from showing to user again');
    cy.reload();
    cy.findByRole('heading', { name: 'Welcome to CvrSnap!' }).should('not.exist');

    cy.log('User can download the cover image');
    cy.findByRole('button', { name: 'Download image' }).should('exist');
    cy.findByRole('button', { name: 'Download image' }).click();

    cy.log('Download success modal should be shown');

    cy.findByRole('heading', { name: 'Thanks for using CvrSnap!' }).should('be.visible');
    cy.findByRole('button', { name: 'Keep building' }).should('be.visible');
    cy.findByRole('button', { name: 'Keep building' }).click();

    cy.verifyDownload('cvrsnap-cover.png');
  });
});
