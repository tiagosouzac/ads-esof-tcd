/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
import '../support/commands';

describe('Project', () => {
	beforeEach(() => {
		cy.login();
	});

	it('CT-SIS-002 - must be able to create a project', () => {
		cy.get("section a[href='/project/create']").click();

		const newProject = {
			name: faker.lorem.words(3),
			description: faker.lorem.paragraph()
		};

		cy.get('#name').type(newProject.name);
		cy.get('#description').type(newProject.description);
		cy.get('#architect').select('Architect');
		cy.get('#designer').select('Designer');
		cy.get('#developer').select('Developer');
		cy.get('#qualityAnalyst').select('Quality Analyst');

		cy.contains('button', 'Criar projeto').click();
		cy.url().should('match', /\/project\/[\w-]+$/);
		cy.contains('h1', newProject.name).should('exist');
		cy.contains('p', newProject.description).should('exist');
	});
});
