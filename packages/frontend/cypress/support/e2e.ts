import { slowCypressDown } from 'cypress-slow-down';
import '@testing-library/cypress/add-commands';
import 'cypress-real-events';
import './commands';

// slow down each command by the default amount which is 1 second
slowCypressDown(1000, false);

Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('Hydration') ||
    err.message.includes('hydrating') ||
    err.message.includes('Minified React error #418') ||
    err.message.includes('Minified React error #423')
  ) {
    return false;
  }
  return true;
});
