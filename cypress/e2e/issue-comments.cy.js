
describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Create, edit and delete issue.', () => {

        const commentText = "Test_comment_text";
        const commentTextEdited = "Test_comment_text_edited"

        getIssueDetailsModal().within(() => {

        //"Create new comment" block.
            cy.contains("Add a comment...")
            .parent()
            .within(() => {
                cy.contains("Add a comment...")
                .click();

                cy.get("textarea[placeholder='Add a comment...']")
                .type(commentText);

                cy.get("button")
                .contains("Save")
                .click();

                cy.get("button")
                .contains("Save")
                .should("not.exist");

                cy.contains("Add a comment...")
                .should("exist");
            });
            cy.contains(commentText)
            .scrollIntoView()
            .should("be.visible");
            
        //"Edit newly created comment" block.
            cy.contains(commentText)
            .parent()
            .within(() => {
                cy.get("div")
                .contains("Edit")
                .click();

                cy.get("textarea")
                .clear()
                .type(commentTextEdited);

                cy.get("button")
                .contains("Save")
                .click();

                cy.get("button")
                .contains("Save")
                .should("not.exist");

            });
            cy.contains(commentTextEdited)
            .scrollIntoView()
            .should("be.visible");

        //"Delete comment" block.
            cy.contains(commentTextEdited)
            .parent()
            .within(() => {
                cy.get("div")
                .contains("Delete")
                .click();
            });
        });
        cy.get('[data-testid="modal:confirm"]')
        .contains("Delete comment")
        .click()
        .should("not.exist");

        getIssueDetailsModal()
        .contains(commentTextEdited)
        .should("not.exist")
    });
});
