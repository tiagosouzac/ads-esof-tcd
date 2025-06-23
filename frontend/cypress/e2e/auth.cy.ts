/// <reference types="cypress" />

const validUser = {
	email: 'manager@mail.com',
	password: '12345678'
};

describe('Auth', () => {
	it('CT-SIS-001 - must be able to sign in', () => {
		cy.visit('/sign-in');
		cy.get('#email').type(validUser.email);
		cy.get('#password').type(validUser.password);
		cy.get('button[type="submit"]').click();
		cy.url().should('eq', Cypress.config().baseUrl + '/');
		cy.getCookie('auth_token').should('exist');
	});
});
