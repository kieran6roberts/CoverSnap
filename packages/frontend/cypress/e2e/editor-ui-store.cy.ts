context('Editor UI Store', () => {
  beforeEach(() => {
    cy.visit('/create');
  });

  it('should handle editor UI state persistence correctly', () => {
    cy.log('Check default state values');

    cy.findByRole('heading', { name: 'Hey 👋' }).should('exist');
    cy.findByRole('button', { name: 'Start editing' }).should('exist');
    cy.findByRole('button', { name: 'Start editing' }).realClick();

    cy.findByRole('complementary').should('be.visible');
    cy.findByRole('tab', { name: /Templates/i })
      .should('exist')
      .and('have.attr', 'aria-selected', 'true');
    cy.findByRole('tab', { name: /Text/i }).should('exist').and('have.attr', 'aria-selected', 'false');
    cy.findByRole('tab', { name: /Background/i })
      .should('exist')
      .and('have.attr', 'aria-selected', 'false');

    cy.log('Close drawer');

    cy.findByRole('button', { name: /close sidebar/i })
      .should('exist')
      .realClick();
    cy.findByRole('complementary').should('not.exist');

    cy.log('Reload. Drawer should be closed, Template and text sections should be closed when drawer opens');
    cy.reload();

    cy.findByRole('complementary').should('not.exist');
    cy.findByRole('heading', { name: 'Hey 👋' }).should('not.exist');

    cy.findByRole('button', { name: /open sidebar/i })
      .should('exist')
      .realClick();
    cy.findByRole('tab', { name: /Templates/i })
      .should('exist')
      .and('have.attr', 'aria-selected', 'true');
    cy.findByRole('tab', { name: /Text/i }).should('exist').and('have.attr', 'aria-selected', 'false');
    cy.findByRole('tab', { name: /Background/i })
      .should('exist')
      .and('have.attr', 'aria-selected', 'false');

    cy.log('Open Text section');
    cy.findByRole('tab', { name: /Text/i }).should('exist').realClick();

    cy.log('Reload. Drawer should be closed, Text section should be open');

    cy.reload();

    cy.findByRole('heading', { name: 'Hey 👋' }).should('not.exist');
    cy.findByRole('complementary').should('exist');

    cy.findByRole('tab', { name: /Templates/i })
      .should('exist')
      .and('have.attr', 'aria-selected', 'false');
    cy.findByRole('tab', { name: /Text/i }).should('exist').and('have.attr', 'aria-selected', 'true');
    cy.findByRole('tab', { name: /Background/i })
      .should('exist')
      .and('have.attr', 'aria-selected', 'false');
    cy.findByRole('tab', { name: /Background/i })
      .should('exist')
      .realClick();

    cy.findByRole('tab', { name: /Background/i })
      .should('exist')
      .and('have.attr', 'aria-selected', 'true');

    cy.reload();

    cy.findByRole('tab', { name: /Background/i })
      .should('exist')
      .and('have.attr', 'aria-selected', 'true');
    cy.findByRole('tab', { name: /Templates/i })
      .should('exist')
      .and('have.attr', 'aria-selected', 'false');
    cy.findByRole('tab', { name: /Text/i }).should('exist').and('have.attr', 'aria-selected', 'false');
  });
});
