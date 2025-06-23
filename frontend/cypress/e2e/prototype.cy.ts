/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
import '../support/commands';

describe('Prototype', () => {
	beforeEach(() => {
		cy.login();
	});

	it('CT-SIS-006 - must be able to create a prototype', () => {
		const newPrototype = {
			name: faker.lorem.sentence(3),
			link: faker.internet.url()
		};

		cy.get('section ul li a').first().click();
		cy.contains('h2', 'Protótipos').should('be.visible');
		cy.contains('button', 'Adicionar protótipo').click();

		cy.get('.prototype-form').should('be.visible');
		cy.get('.prototype-form #name').type(newPrototype.name);
		cy.get('.prototype-form #link').type(newPrototype.link);
		cy.contains('.prototype-form button', 'Criar protótipo').click();

		cy.get('.prototype-list').should('be.visible');
		cy.contains('.prototype-list strong', newPrototype.name).should('exist');
		cy.contains('.prototype-list a', newPrototype.link).should('exist');
	});

	it('CT-SIS-007 - must be able to edit a prototype', () => {
		const updatedPrototype = {
			name: faker.lorem.sentence(3),
			link: faker.internet.url()
		};

		cy.get('section ul li a').first().click();
		cy.contains('h2', 'Protótipos').should('be.visible');
		cy.get('.prototype-list button > .lucide-square-pen').first().click();

		cy.get('.prototype-form').should('be.visible');
		cy.get('.prototype-form #name').clear().type(updatedPrototype.name);
		cy.get('.prototype-form #link').clear().type(updatedPrototype.link);
		cy.contains('.prototype-form button', 'Salvar alterações').click();

		cy.get('.prototype-list').should('be.visible');
		cy.wait(1000);
		cy.contains('.prototype-list strong', updatedPrototype.name).should('exist');
		cy.contains('.prototype-list a', updatedPrototype.link).should('exist');
	});

	it('CT-SIS-008 - must be able to delete a prototype', () => {
		const prototypeToDelete = {
			name: faker.lorem.sentence(3),
			link: faker.internet.url()
		};

		cy.get('section ul li a').first().click();
		cy.contains('h2', 'Protótipos').should('be.visible');
		cy.contains('button', 'Adicionar protótipo').click();

		cy.get('.prototype-form').should('be.visible');
		cy.get('.prototype-form #name').type(prototypeToDelete.name);
		cy.get('.prototype-form #link').type(prototypeToDelete.link);
		cy.contains('button', 'Criar protótipo').click();

		cy.get('.prototype-list').should('be.visible');
		cy.wait(1000);
		cy.get('.prototype-list button > .lucide-square-pen').last().click();
		cy.get('.prototype-form').should('be.visible');
		cy.contains('.prototype-form button', 'Excluir protótipo').click();
		cy.get('.prototype-list').should('be.visible');
		cy.contains('.prototype-list strong', prototypeToDelete.name).should('not.exist');
	});
});
