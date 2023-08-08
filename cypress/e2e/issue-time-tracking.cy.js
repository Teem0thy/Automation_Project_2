import IssueModal from "../pages/IssueModal";

describe('Issue time tracking functionality tests', () => {
    
    /* before(() => {
        cy.visit('/');
        cy.wait(20000);
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board?modal-issue-create=true');
            
            const issueDetails = {
                title: "Bug_time_tracking",
                type: "Bug",
                description: "My bug description",
                assignee: "Pickle Rick",
                reporter: "Pickle Rick",
                priority: "Highest",
            };
              
            IssueModal.createIssue(issueDetails);
            cy.wait(20000);

        });

        
    }); */

    it('Add estimation', () => {

        cy.visit('/');
        cy.wait(20000);
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board?modal-issue-create=true');
            
            const issueDetails = {
                title: "Bug_time_tracking",
                type: "Bug",
                description: "My bug description",
                assignee: "Pickle Rick",
                reporter: "Pickle Rick",
                priority: "Highest",
            };
              
            IssueModal.createIssue(issueDetails);
            cy.wait(20000);
        });
        
        cy.contains("Bug_time_tracking")
        .trigger("mouseover")
        .click()
        cy.wait(5000);

        IssueModal.getIssueDetailModal()
        .contains("No time logged")
        .should("exist")
        .should("be.visible");

        IssueModal.getIssueDetailModal()
        .contains("Original Estimate (hours)")
        .next()
        .children()
        .type("10");

        IssueModal.getIssueDetailModal()
        .find('[data-testid="icon:close"][size="24"]')
        .click();
        
        cy.contains("Bug_time_tracking")
        .trigger("mouseover")
        .click()
        cy.wait(5000);

        //Sometimes system do not accept updataed 
        //esteem time, so assertion may fail.
        IssueModal.getIssueDetailModal()
        .contains("No time logged")
        .next()
        .should("contain", "10h remaining");
    });

    it.skip('Update estimation', () => {

        cy.contains("Bug_time_tracking")
        .trigger("mouseover")
        .click()
        cy.wait(5000);

        IssueModal.getIssueDetailModal()
        .contains("Original Estimate (hours)")
        .next()
        .children()
        .type("20{enter}");

        IssueModal.getIssueDetailModal()
        .contains("Time Tracking")
        .next()
        .within(() => {
            cy.contains("20h remaining")
            .should("exist")
            .should("be.visible")
        });
        
        IssueModal.getIssueDetailModal()
        .find('[data-testid="icon:close"][size="24"]')
        .click();

        cy.contains("Bug_time_tracking")
        .trigger("mouseover")
        .click()
        cy.wait(5000);

        IssueModal.getIssueDetailModal()
        .contains("Time Tracking")
        .next()
        .within(() => {
            cy.contains("20h remaining")
            .should("exist")
            .should("be.visible")
        });
    });

    it.skip('Remove estimation', () => {
    
        cy.contains("Bug_time_tracking")
        .trigger("mouseover")
        .click()
        cy.wait(5000);

        IssueModal.getIssueDetailModal()
        .contains("Original Estimate (hours)")
        .next()
        .children()
        .clear();

        IssueModal.getIssueDetailModal()
        .find('[data-testid="icon:close"][size="24"]')
        .click();

        cy.contains("Bug_time_tracking")
        .trigger("mouseover")
        .click()
        cy.wait(5000);

        IssueModal.getIssueDetailModal()
        .contains("Original Estimate (hours)")
        .next()
        .children()
        .should("have.attr", "placeholder", "Number")
        .should("not.contain", "Text");

        IssueModal.getIssueDetailModal()
        .contains("No time logged")
        .siblings()
        .should("be.empty");
    });

    it('Log time', () => {
    
    });

});