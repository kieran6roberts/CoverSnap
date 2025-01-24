import { SITE_NAME } from '~/config/consts';

context(`Download flow for ${SITE_NAME} cover`, () => {
  beforeEach(() => {
    cy.visit('/create');
  });

  it('Download cover flow start to finish', () => {
    cy.log('User is first greeted with a welcome modal');

    cy.findByRole('heading', { name: 'Hey 👋' }).should('exist');
    cy.findByRole('button', { name: 'Start editing' }).should('exist');
    cy.findByRole('button', { name: 'Start editing' }).realClick();
    cy.findByRole('heading', { name: 'Hey 👋' }).should('not.exist');

    cy.log('Local storage item prevents modal from showing to user again');

    cy.reload();
    cy.findByRole('heading', { name: 'Hey 👋' }).should('not.exist');

    /**
     * Allowing download breaks the app styling in test environment, which breaks test in CI.
     * The download will be tested further in the unit tests.
     */
    cy.window().then((win) => {
      cy.stub(win.URL, 'createObjectURL').as('downloadStub');
    });

    cy.log('User can download the cover image');

    cy.findByRole('button', { name: 'Download image' }).should('exist');
    cy.findByRole('button', { name: 'Download image' }).realClick();
    cy.get('@downloadStub').should('have.been.calledOnce');

    cy.log('Download success modal should be shown');

    cy.findByRole('dialog').should('exist');
    cy.findByRole('button', { name: 'Keep building' }).should('exist');
    cy.findByRole('button', { name: 'Keep building' }).realClick();
    cy.findByRole('button', { name: 'Keep building' }).should('not.exist');
  });
});
