import IssueModal from "../pages/IssueModal";
import { faker } from '@faker-js/faker';
//const { faker } = require('@faker-js/faker');
//import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';


describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      //System will already open issue creating modal in beforeEach block  
      cy.visit(url + '/board?modal-issue-create=true');
    });
  });

  it('Should create an issue and validate it successfully', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      
      //open issue type dropdown and choose Story
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]')
      .trigger('click');
      
      //Type value to description input field
      cy.get('.ql-editor').type('TEST_DESCRIPTION');
      
      //Type value to title input field
      //Order of filling in the fields is first description, then title on purpose
      //Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get('input[name="title"]').type('TEST_TITLE');
      
      //Select Lord Gaben from reporter dropdown
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      
      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });
    
    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    
    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');
    
    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      //Assert that this list contains 5 issues and first element with tag p has specified text
      cy.get('[data-testid="list-issue"]')
      .should('have.length', '5')
      .first()
      .find('p')
      .contains('TEST_TITLE');
      //Assert that correct avatar and type icon are visible
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
      type: "Bug",
      description: faker.lorem.sentence(5),
      assignee: "Pickle Rick",
      reporter: "Baby Yoda",
      priority: "Low",
    };
    
    IssueModal.createIssue(issueDetails);
    IssueModal.ensureIssueIsCreated(5, issueDetails)
    
    
  });
  
  it('Should validate title is required field if missing', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      //Try to click create issue button without filling any data
      cy.get('button[type="submit"]').click();
      
      //Assert that correct error message is visible
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