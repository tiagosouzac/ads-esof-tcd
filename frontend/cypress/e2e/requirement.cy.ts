/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
import '../support/commands';

describe('Requirement', () => {
	beforeEach(() => {
		cy.login();
	});

	it('CT-SIS-003 - must be able to create a requirement', () => {
		const newRequirement = {
			title: faker.lorem.sentence(3),
			description: faker.lorem.paragraph(),
			status: 'Pendente'
		};

		cy.get('section ul li a').first().click();
		cy.contains('h2', 'Requisitos').should('be.visible');
		cy.contains('button', 'Adicionar requisito').click();

		cy.get('.requirement-form').should('be.visible');
		cy.get('.requirement-form #title').type(newRequirement.title);
		cy.get('.requirement-form #description').type(newRequirement.description);
		cy.get('.requirement-form #status').select(newRequirement.status);
		cy.contains('button', 'Criar requisito').click();

		cy.get('.requirement-list').should('be.visible');
		cy.contains('strong', newRequirement.title).should('exist');
		cy.contains('p', newRequirement.description).should('exist');
		cy.contains('span', newRequirement.status).should('exist');
	});

	it('CT-SIS-004 - must be able to edit a requirement', () => {
		const updatedRequirement = {
			title: faker.lorem.sentence(3),
			description: faker.lorem.paragraph(),
			status: 'Em andamento'
		};

		cy.get('section ul li a').first().click();
		cy.contains('h2', 'Requisitos').should('be.visible');
		cy.get('.requirement-list button > .lucide-square-pen').first().click();

		cy.get('.requirement-form').should('be.visible');
		cy.get('.requirement-form #title').clear().type(updatedRequirement.title);
		cy.get('.requirement-form #description').clear().type(updatedRequirement.description);
		cy.get('.requirement-form #status').select(updatedRequirement.status);
		cy.contains('.requirement-form button', 'Salvar alterações').click();

		cy.get('.requirement-list').should('be.visible');
		cy.wait(1000);
		cy.contains('.requirement-list strong', updatedRequirement.title).should('exist');
		cy.contains('.requirement-list p', updatedRequirement.description).should('exist');
		cy.contains('.requirement-list span', updatedRequirement.status).should('exist');
	});

	it('CT-SIS-005 - must be able to delete a requirement', () => {
		const requirementToDelete = {
			title: faker.lorem.sentence(3),
			description: faker.lorem.paragraph(),
			status: 'Pendente'
		};

		cy.get('section ul li a').first().click();
		cy.contains('h2', 'Requisitos').should('be.visible');
		cy.contains('button', 'Adicionar requisito').click();

		cy.get('.requirement-form').should('be.visible');
		cy.get('.requirement-form #title').type(requirementToDelete.title);
		cy.get('.requirement-form #description').type(requirementToDelete.description);
		cy.get('.requirement-form #status').select(requirementToDelete.status);
		cy.contains('button', 'Criar requisito').click();

		cy.get('.requirement-list').should('be.visible');
		cy.wait(1000);
		cy.get('.requirement-list button > .lucide-square-pen').last().click();
		cy.get('.requirement-form').should('be.visible');
		cy.contains('button', 'Excluir requisito').click();
		cy.get('.requirement-list').should('be.visible');
		cy.contains('strong', requirementToDelete.title).should('not.exist');
	});
});
