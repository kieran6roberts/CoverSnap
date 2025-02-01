context('Active cover Settings', () => {
  before(() => {
    if (window.indexedDB) {
      // Reset IndexedDB
      window.indexedDB.deleteDatabase('keyval-store');
    }
    cy.visit('/create');
  });

  it('Cover settings are persisted', () => {
    cy.log('Close welcome modal');

    cy.findByRole('heading', { name: 'Hey 👋' }).should('exist');
    cy.findByRole('button', { name: 'Start editing' }).should('exist');
    cy.findByRole('button', { name: 'Start editing' }).realClick();

    cy.log('1. DEFAULT SETTINGS (COVER SIZE)');

    cy.findByRole('textbox', { name: 'Image download size' }).should('exist').and('have.value', '1600x840 (Hashnode)');

    cy.log('1. DEFAULT SETTINGS (TEMPLATES)');

    cy.findByRole('button', { name: 'Toggle Window template' })
      .should('exist')
      .and('have.attr', 'data-selected', 'true');

    cy.findByRole('button', { name: 'Toggle Left Handed template' })
      .should('exist')
      .and('have.attr', 'data-selected', 'true');

    cy.log('1. DEFAULT SETTINGS (TEXT)');

    cy.findByRole('tab', { name: /Text/i }).filter(':visible').should('exist').realClick();

    cy.findAllByPlaceholderText('HTTP Security Headers and how to...')
      .filter(':visible')
      .should('exist')
      .and('have.value', 'How To Persist Style Changes Through Reloads Using Overrides In Dev Tools');

    cy.findAllByRole('textbox', { name: 'Color' })
      .filter(':visible')
      .first()
      .should('exist')
      .and('have.value', 'rgba(20, 4, 4, 1)');

    cy.findAllByPlaceholderText('Pick primary font style')
      .filter(':visible')
      .should('exist')
      .and('have.value', 'Arial');

    cy.findAllByRole('textbox', { name: 'Primary font size' })
      .filter(':visible')
      .should('exist')
      .and('have.value', '40px');

    cy.findAllByPlaceholderText('by Kieran Roberts')
      .filter(':visible')
      .should('exist')
      .and('have.value', 'by Kieran Roberts');

    cy.findAllByRole('textbox', { name: 'Color' })
      .filter(':visible')
      .last()
      .should('exist')
      .and('have.value', 'rgba(20, 4, 4, 1)');

    cy.findAllByPlaceholderText('Pick secondary font style').should('exist').and('have.value', 'Arial');

    cy.findByRole('textbox', { name: 'Secondary font size' }).should('exist').and('have.value', '25px');

    cy.log('1. DEFAULT SETTINGS (BACKGROUND)');

    cy.findByRole('tab', { name: /Background/i })
      .filter(':visible')
      .realClick();

    cy.findAllByRole('textbox', { name: 'Background color 1' })
      .should('exist')
      .and('have.value', 'rgba(255, 255, 255, 1)');

    cy.findAllByRole('textbox', { name: 'Background color 2' })
      .should('exist')
      .and('have.value', 'rgba(230, 227, 227, 1)');

    cy.findAllByRole('textbox', { name: 'Background color 3' })
      .should('exist')
      .and('have.value', 'rgba(205, 203, 203, 1)');

    cy.findAllByRole('textbox', { name: 'Background color 4' })
      .should('exist')
      .and('have.value', 'rgba(176, 171, 171, 1)');

    cy.findAllByRole('textbox', { name: 'Pattern color' }).should('exist').and('have.value', '#8f8888');
    cy.findAllByRole('textbox', { name: 'Pattern opacity' }).should('exist').and('have.value', '0.1');

    cy.log('2. UPDATE SETTINGS');

    const newData = {
      imageDownloadSize: '1000x420 (Dev)',
      primaryText: 'New title',
      secondaryText: 'New secondary title',
      primaryFont: 'Verdana',
      primaryFontSize: '20px',
      primaryColor: 'rgba(100, 100, 100, 1)',
      secondaryFont: 'Verdana',
      secondaryFontSize: '15px',
      secondaryColor: 'rgba(100, 100, 100, 1)',
      backgroundColor1: 'rgba(200, 200, 200, 1)',
      patternColor: '#ffffff',
      patternOpacity: '0.5'
    };

    cy.log('2. UPDATE SETTINGS (COVER SIZE)');

    cy.findByRole('textbox', { name: 'Image download size' }).realClick();
    cy.findByRole('option', { name: newData.imageDownloadSize }).should('exist').realClick();
    cy.findByRole('textbox', { name: 'Image download size' }).should('have.value', newData.imageDownloadSize);

    cy.log('2. UPDATE SETTINGS (TEMPLATES)');

    cy.findByRole('tab', { name: /Templates/i })
      .filter(':visible')
      .should('exist')
      .realClick();

    cy.findByRole('button', { name: 'Toggle Solid template' }).should('exist').realClick();

    cy.log('2. UPDATE SETTINGS (TEXT)');

    cy.findByRole('tab', { name: /Text/i }).filter(':visible').should('exist').realClick();

    cy.findAllByPlaceholderText('HTTP Security Headers and how to...')
      .filter(':visible')
      .clear()
      .realType(newData.primaryText);

    cy.findAllByRole('textbox', { name: 'Color' })
      .filter(':visible')
      .first()
      .should('exist')
      .clear()
      .realType(newData.primaryColor);

    // Close color picker with outside click, 600 is half the width of the screen
    cy.get('body').click(600, 10);

    cy.findAllByPlaceholderText('Pick primary font style').filter(':visible').realClick();
    cy.findByRole('option', { name: newData.primaryFont }).should('exist').realClick();
    cy.findAllByPlaceholderText('Pick primary font style').filter(':visible').should('have.value', newData.primaryFont);

    cy.findAllByRole('textbox', { name: 'Primary font size' })
      .filter(':visible')
      .clear()
      .realType(newData.primaryFontSize);

    cy.findAllByPlaceholderText('by Kieran Roberts').filter(':visible').last().clear().realType(newData.secondaryText);

    cy.findAllByRole('textbox', { name: 'Color' })
      .filter(':visible')
      .last()
      .should('exist')
      .clear()
      .realType(newData.secondaryColor);

    // Close color picker with outside click, 600 is half the width of the screen
    cy.get('body').click(600, 10);

    cy.findAllByPlaceholderText('Pick secondary font style').filter(':visible').realClick();
    cy.findByRole('option', { name: newData.secondaryFont }).should('exist').realClick();
    cy.findAllByPlaceholderText('Pick secondary font style')
      .filter(':visible')
      .should('have.value', newData.secondaryFont);
    cy.findAllByRole('textbox', { name: 'Secondary font size' })
      .filter(':visible')
      .clear()
      .realType(newData.secondaryFontSize);

    cy.log('2. UPDATE SETTINGS (BACKGROUND)');

    cy.findByRole('tab', { name: /Background/i })
      .filter(':visible')
      .realClick();

    // Solid is a 1 color background
    cy.findAllByRole('textbox', { name: 'Background color 1' })
      .should('exist')
      .clear()
      .realType(newData.backgroundColor1);

    // Close color picker with outside click, 600 is half the width of the screen
    cy.get('body').click(600, 10);

    cy.findAllByRole('textbox', { name: 'Background color 2' }).should('not.exist');
    cy.findAllByRole('textbox', { name: 'Background color 3' }).should('not.exist');
    cy.findAllByRole('textbox', { name: 'Background color 4' }).should('not.exist');

    cy.findAllByRole('textbox', { name: 'Pattern opacity' }).should('exist').clear().realType(newData.patternOpacity);
    cy.findByRole('button', { name: 'Toggle architect background pattern' }).should('exist').realClick();

    // ASSERTIONS
    cy.reload();
    cy.log('3. ASSERT PERSISTED VALUES (COVER SIZE)');

    cy.findByRole('textbox', { name: 'Image download size' })
      .should('exist')
      .and('have.value', newData.imageDownloadSize);

    cy.log('3. ASSERT PERSISTED VALUES (TEMPLATES)');

    cy.findByRole('tab', { name: /Templates/i })
      .filter(':visible')
      .should('exist')
      .realClick();

    cy.findByRole('button', { name: 'Toggle Solid template' })
      .should('exist')
      .and('have.attr', 'data-selected', 'true');

    cy.log('3. ASSERT PERSISTED VALUES (TEXT)');

    cy.findByRole('tab', { name: /Text/i }).filter(':visible').should('exist').realClick();

    cy.findAllByPlaceholderText('HTTP Security Headers and how to...')
      .should('exist')
      .and('have.value', newData.primaryText);

    cy.findAllByRole('textbox', { name: 'Color' })
      .filter(':visible')
      .first()
      .should('exist')
      .and('have.value', newData.primaryColor);

    cy.findAllByPlaceholderText('Pick primary font style').should('exist').and('have.value', newData.primaryFont);

    cy.findAllByRole('textbox', { name: 'Primary font size' })
      .should('exist')
      .and('have.value', newData.primaryFontSize);

    cy.findAllByPlaceholderText('by Kieran Roberts')
      .filter(':visible')
      .last()
      .should('exist')
      .and('have.value', newData.secondaryText);

    cy.findAllByRole('textbox', { name: 'Color' })
      .filter(':visible')
      .last()
      .should('exist')
      .and('have.value', newData.secondaryColor);

    cy.findAllByPlaceholderText('Pick secondary font style').should('exist').and('have.value', newData.secondaryFont);
    cy.findAllByRole('textbox', { name: 'Secondary font size' })
      .should('exist')
      .and('have.value', newData.secondaryFontSize);

    cy.log('3. ASSERT PERSISTED VALUES (BACKGROUND)');

    cy.findByRole('tab', { name: /Background/i })
      .filter(':visible')
      .should('exist')
      .realClick();

    cy.findAllByRole('textbox', { name: 'Background color 1' })
      .should('exist')
      .and('have.value', newData.backgroundColor1);
    cy.findAllByRole('textbox', { name: 'Background color 2' }).should('not.exist');
    cy.findAllByRole('textbox', { name: 'Background color 3' }).should('not.exist');
    cy.findAllByRole('textbox', { name: 'Background color 4' }).should('not.exist');

    cy.findAllByRole('textbox', { name: 'Pattern opacity' }).should('exist').and('have.value', newData.patternOpacity);

    cy.findByRole('button', { name: 'Toggle architect background pattern' })
      .should('exist')
      .and('have.attr', 'data-selected', 'true');

    cy.log('4. RESET AND CHECK DEFAULT VALUES (COVER SIZE)');

    cy.findByRole('button', { name: 'Reset cover' }).should('exist').realClick();

    cy.findByRole('textbox', { name: 'Image download size' }).should('exist').and('have.value', '1600x840 (Hashnode)');

    cy.log('4. RESET AND CHECK DEFAULT VALUES (COVER SIZE)');

    cy.findByRole('tab', { name: /Templates/i })
      .filter(':visible')
      .should('exist')
      .realClick();

    cy.log('4. RESET AND CHECK DEFAULT VALUES (TEMPLATES)');

    cy.findByRole('button', { name: 'Toggle Window template' })
      .should('exist')
      .and('have.attr', 'data-selected', 'true');

    cy.findByRole('button', { name: 'Toggle Left Handed template' })
      .should('exist')
      .and('have.attr', 'data-selected', 'true');

    cy.log('4. RESET AND CHECK DEFAULT VALUES (TEXT)');

    cy.findByRole('tab', { name: /Text/i }).filter(':visible').should('exist').realClick();

    cy.findAllByPlaceholderText('HTTP Security Headers and how to...')
      .filter(':visible')
      .should('exist')
      .and('have.value', 'How To Persist Style Changes Through Reloads Using Overrides In Dev Tools');

    cy.findAllByRole('textbox', { name: 'Color' })
      .filter(':visible')
      .first()
      .should('exist')
      .and('have.value', 'rgba(20, 4, 4, 1)');

    cy.findAllByPlaceholderText('Pick primary font style')
      .filter(':visible')
      .should('exist')
      .and('have.value', 'Arial');

    cy.findAllByRole('textbox', { name: 'Primary font size' })
      .filter(':visible')
      .should('exist')
      .and('have.value', '40px');

    cy.findAllByPlaceholderText('by Kieran Roberts')
      .filter(':visible')
      .should('exist')
      .and('have.value', 'by Kieran Roberts');

    cy.findAllByRole('textbox', { name: 'Color' })
      .filter(':visible')
      .last()
      .should('exist')
      .and('have.value', 'rgba(20, 4, 4, 1)');

    cy.findAllByPlaceholderText('Pick secondary font style').should('exist').and('have.value', 'Arial');

    cy.findByRole('textbox', { name: 'Secondary font size' }).should('exist').and('have.value', '25px');

    cy.log('4. RESET AND CHECK DEFAULT VALUES (BACKGROUND)');

    cy.findByRole('tab', { name: /Background/i })
      .filter(':visible')
      .should('exist')
      .realClick();

    cy.findAllByRole('textbox', { name: 'Background color 1' })
      .should('exist')
      .and('have.value', 'rgba(255, 255, 255, 1)');

    cy.findAllByRole('textbox', { name: 'Background color 2' })
      .should('exist')
      .and('have.value', 'rgba(230, 227, 227, 1)');

    cy.findAllByRole('textbox', { name: 'Background color 3' })
      .should('exist')
      .and('have.value', 'rgba(205, 203, 203, 1)');

    cy.findAllByRole('textbox', { name: 'Background color 4' })
      .should('exist')
      .and('have.value', 'rgba(176, 171, 171, 1)');

    cy.findAllByRole('textbox', { name: 'Pattern color' }).should('exist').and('have.value', '#8f8888');
    cy.findAllByRole('textbox', { name: 'Pattern opacity' }).should('exist').and('have.value', '0.1');
  });
});
