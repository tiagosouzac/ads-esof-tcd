/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
import '../support/commands';

describe('Task', () => {
	beforeEach(() => {
		cy.login();
	});

	it('CT-SIS-009 - must be able to create a task', () => {
		const newTask = {
			title: faker.lorem.sentence(3),
			description: faker.lorem.paragraph(),
			status: 'Pendente',
			assignee: 'Developer'
		};

		cy.get('section ul li a').first().click();
		cy.contains('h2', 'Tarefas').should('be.visible');
		cy.contains('button', 'Adicionar tarefa').click();

		cy.get('.task-form').should('be.visible');
		cy.get('.task-form #title').type(newTask.title);
		cy.get('.task-form #description').type(newTask.description);
		cy.get('.task-form #status').select(newTask.status);
		cy.get('.task-form #assigneeId').select(newTask.assignee);
		cy.contains('.task-form button', 'Criar tarefa').click();

		cy.get('.task-list').should('be.visible');
		cy.contains('.task-list strong', newTask.title).should('exist');
		cy.contains('.task-list p', newTask.description).should('exist');
		cy.contains('.task-list span', newTask.status).should('exist');
		cy.contains('.task-list span', newTask.assignee).should('exist');
	});

	it('CT-SIS-0010 - must be able to edit a task', () => {
		const updatedTask = {
			title: faker.lorem.sentence(3),
			description: faker.lorem.paragraph(),
			status: 'Em andamento',
			assignee: 'Developer'
		};

		cy.get('section ul li a').first().click();
		cy.contains('h2', 'Tarefas').should('be.visible');
		cy.get('.task-list button > .lucide-square-pen').first().click();

		cy.get('.task-form').should('be.visible');
		cy.get('.task-form #title').clear().type(updatedTask.title);
		cy.get('.task-form #description').clear().type(updatedTask.description);
		cy.get('.task-form #status').select(updatedTask.status);
		cy.get('.task-form #assigneeId').select(updatedTask.assignee);
		cy.contains('.task-form button', 'Salvar alterações').click();

		cy.get('.task-list').should('be.visible');
		cy.wait(1000);
		cy.contains('.task-list strong', updatedTask.title).should('exist');
		cy.contains('.task-list p', updatedTask.description).should('exist');
		cy.contains('.task-list span', updatedTask.status).should('exist');
		cy.contains('.task-list span', updatedTask.assignee).should('exist');
	});

	it('CT-SIS-0011 - must be able to delete a task', () => {
		const taskToDelete = {
			title: faker.lorem.sentence(3),
			description: faker.lorem.paragraph(),
			status: 'Pendente',
			assignee: 'Developer'
		};

		cy.get('section ul li a').first().click();
		cy.contains('h2', 'Tarefas').should('be.visible');
		cy.contains('button', 'Adicionar tarefa').click();

		cy.get('.task-form').should('be.visible');
		cy.get('.task-form #title').type(taskToDelete.title);
		cy.get('.task-form #description').type(taskToDelete.description);
		cy.get('.task-form #status').select(taskToDelete.status);
		cy.get('.task-form #assigneeId').select(taskToDelete.assignee);
		cy.contains('.task-form button', 'Criar tarefa').click();

		cy.get('.task-list').should('be.visible');
		cy.wait(1000);
		cy.get('.task-list button > .lucide-square-pen').last().click();
		cy.get('.task-form').should('be.visible');
		cy.contains('.task-form button', 'Excluir tarefa').click();
		cy.get('.task-list').should('be.visible');
		cy.contains('.task-list strong', taskToDelete.title).should('not.exist');
	});
});
