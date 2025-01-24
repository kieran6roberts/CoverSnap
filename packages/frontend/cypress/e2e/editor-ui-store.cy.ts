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
    cy.findByRole('button', { name: /Toggle template editing/i })
      .should('exist')
      .and('have.attr', 'aria-expanded', 'false');
    cy.findByRole('button', { name: /Toggle text editing/i })
      .should('exist')
      .and('have.attr', 'aria-expanded', 'false');
    cy.findByRole('button', { name: /Toggle background editing/i })
      .should('exist')
      .and('have.attr', 'aria-expanded', 'false');

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
    cy.findByRole('button', { name: /Toggle template editing/i })
      .should('exist')
      .and('have.attr', 'aria-expanded', 'false');
    cy.findByRole('button', { name: /Toggle text editing/i })
      .should('exist')
      .and('have.attr', 'aria-expanded', 'false');
    cy.findByRole('button', { name: /Toggle background editing/i })
      .should('exist')
      .and('have.attr', 'aria-expanded', 'false');

    cy.findByRole('button', { name: /Toggle template editing/i })
      .should('exist')
      .realClick();
    cy.findByRole('button', { name: /Toggle text editing/i })
      .should('exist')
      .realClick();

    cy.log('Reload. Drawer should be closed, Template and text sections should be open');

    cy.reload();

    cy.findByRole('heading', { name: 'Hey 👋' }).should('not.exist');
    cy.findByRole('complementary').should('exist');

    cy.findByRole('button', { name: /Toggle template editing/i })
      .should('exist')
      .and('have.attr', 'aria-expanded', 'true');
    cy.findByRole('button', { name: /Toggle text editing/i })
      .should('exist')
      .and('have.attr', 'aria-expanded', 'true');

    cy.findByRole('button', { name: /Toggle background editing/i })
      .should('exist')
      .and('have.attr', 'aria-expanded', 'false');

    cy.findByRole('button', { name: /Toggle background editing/i }).realClick();

    cy.findByRole('button', { name: /Toggle background editing/i })
      .should('exist')
      .and('have.attr', 'aria-expanded', 'true');

    cy.reload();

    cy.findByRole('button', { name: /Toggle background editing/i })
      .should('exist')
      .and('have.attr', 'aria-expanded', 'true');
    cy.findByRole('button', { name: /Toggle template editing/i })
      .should('exist')
      .and('have.attr', 'aria-expanded', 'true');
    cy.findByRole('button', { name: /Toggle text editing/i })
      .should('exist')
      .and('have.attr', 'aria-expanded', 'true');
  });
});
