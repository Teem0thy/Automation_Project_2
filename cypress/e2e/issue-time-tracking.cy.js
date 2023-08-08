import IssueModal from "../pages/IssueModal";

//Cause of page malfunctioning many tests may fail.

describe('Issue time tracking functionality tests', () => {
    
    before(() => {
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

        
    });

    it('Add estimation', () => {
        
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

        IssueModal.getIssueDetailModal()
        .contains("Original Estimate (hours)")
        .next()
        .children()
        .should("contain", "10");
    });

    it('Update estimation', () => {

        cy.contains("Bug_time_tracking")
        .trigger("mouseover")
        .click()
        cy.wait(5000);

        IssueModal.getIssueDetailModal()
        .contains("Original Estimate (hours)")
        .next()
        .children()
        .type("20");
        
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
        .should("contain", "20");
    });

    it('Remove estimation', () => {
    
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
    
        cy.contains("Bug_time_tracking")
        .trigger("mouseover")
        .click()
        cy.wait(5000);

        IssueModal.getIssueDetailModal()
        .contains("Time Tracking")
        .next()
        .click();

        cy.get('[data-testid="modal:tracking"]')
        .should("be.visible")
        .within(() => {
            cy.contains("Time spent (hours)")
            .next()
            .children()
            .type("2")

            cy.contains("Time remaining (hours)")
            .next()
            .children()
            .type("5")

            cy.contains("Done")
            .click()
        });

        IssueModal.getIssueDetailModal()
        .contains("Time Tracking")
        .next()
        .within(() => {
            cy.contains("No time logged")
            .should("not.exist")
            
            cy.contains("2h logged")
            .should("be.visible");

            cy.contains("5h remaining")
            .should("be.visible");
        });

    });

    it('Remove logged time', () => {

        cy.contains("Bug_time_tracking")
        .trigger("mouseover")
        .click()
        cy.wait(5000);

        IssueModal.getIssueDetailModal()
        .contains("Time Tracking")
        .next()
        .click();

        cy.get('[data-testid="modal:tracking"]')
        .should("be.visible")
        .within(() => {
            cy.contains("Time spent (hours)")
            .next()
            .children()
            .clear()

            cy.contains("Time remaining (hours)")
            .next()
            .children()
            .clear()

            cy.contains("Done")
            .click()
        });
        
        IssueModal.getIssueDetailModal()
        .contains("Time Tracking")
        .next()
        .within(() => {
            cy.contains("No time logged")
            .should("exist")
            .should("be.visible")
            
            cy.contains("2h logged")
            .should("not.exist");
            
            cy.contains("5h remaining")
            .should("not.exist");
            
            cy.contains("No time logged")
            .siblings()
            .should('be.empty');
        });

    });

});