/// <reference types="cypress" />

// Default test user credentials
export const validUser = {
	email: 'manager@mail.com',
	password: '12345678'
};

// Custom command for login
Cypress.Commands.add('login', () => {
	cy.clearAllCookies();
	cy.visit('/sign-in');
	cy.get('#email').type(validUser.email);
	cy.get('#password').type(validUser.password);
	cy.get('button[type="submit"]').click();
	cy.url().should('eq', Cypress.config().baseUrl + '/');
	cy.getCookie('auth_token').should('exist');
});

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		interface Chainable {
			login(): Chainable<void>;
		}
	}
}
