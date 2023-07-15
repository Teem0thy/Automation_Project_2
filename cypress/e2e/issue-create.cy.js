import IssueModal from "../pages/IssueModal";
import { faker } from '@faker-js/faker';


describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      cy.visit(url + '/board?modal-issue-create=true');
    });
  });

  it('Should create an issue and validate it successfully', () => {

    cy.get('[data-testid="modal:issue-create"]').within(() => {
      
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]')
      .trigger('click');
      
      cy.get('.ql-editor').type('TEST_DESCRIPTION');
  
      cy.get('input[name="title"]').type('TEST_TITLE');
      
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      
      cy.get('button[type="submit"]').click();
    });
    
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');
    
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {

      cy.get('[data-testid="list-issue"]')
      .should('have.length', '5')
      .first()
      .find('p')
      .contains('TEST_TITLE');

      cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
      cy.get('[data-testid="icon:story"]').should('be.visible');
    });
  });
  
  it('Create new issue', () => {
    
    const issueDetails = {
      title: "Bug",
      type: "Bug",
      description: "My bug description",
      assignee: "Pickle Rick",
      reporter: "Pickle Rick",
      priority: "Highest",
    };
    
    IssueModal.createIssue(issueDetails);
    IssueModal.ensureIssueIsCreated(5, issueDetails)
    
    
  });
  
  it.only('Create new issue with random data', () => {
    
    const issueDetails = {
      title: faker.word.noun(),
      type: "Task",
      description: faker.lorem.sentence(5),
      assignee: "Pickle Rick",
      reporter: "Baby Yoda",
      priority: "Low",
    };
    
    IssueModal.createIssue(issueDetails);
    IssueModal.ensureIssueIsCreated(5, issueDetails)
    
    
  });
  
  it('Should validate title is required field if missing', () => {

    cy.get('[data-testid="modal:issue-create"]').within(() => {

      cy.get('button[type="submit"]').click();
      
      cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
    });
  });
});













/* let currentBugsCount = document.querySelectorAll('a[data-testid="list-issue"]');
currentBugsCount = currentBugsCount.length;
cy.get('[data-testid="board-list:backlog"]').children()
  .its('length')
  .as('initial')
  .then(initial => {
    currAmount = initial;
});
console.log(cy.get('@currAmount'));
cy.get('@currentIssuesAmount').then(initial => {
  console.log(initial)
}); */