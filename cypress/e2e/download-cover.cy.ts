context('Download Cover', () => {
  beforeEach(() => {
    cy.visit('/create');
  });

  it('Download cover', () => {
    // User is first greeted with a welcome modal
    cy.findByRole('heading', { name: 'Welcome to CoverSnap!' }).should('exist');
    cy.findByRole('button', { name: 'Start editing' }).should('exist');
    cy.findByRole('button', { name: 'Start editing' }).click();
    cy.findByRole('heading', { name: 'Welcome to CoverSnap!' }).should('not.exist');

    // Local storage item prevents modal from showing to user again
    cy.reload();
    cy.findByRole('heading', { name: 'Welcome to CoverSnap!' }).should('not.exist');

    // User can download the cover image
    cy.findByRole('button', { name: 'Download image' }).should('exist');
    cy.findByRole('button', { name: 'Download image' }).click();

    cy.log('Download success modal should be shown');

    cy.findByRole('heading', { name: 'Thanks for using CoverSnap!' }).should('be.visible');
    cy.findByRole('button', { name: 'Build a new cover' }).should('be.visible');
    cy.findByRole('button', { name: 'Build a new cover' }).click();

    cy.verifyDownload('coverSnap-cover.png');
  });
});