import IssueModal from "../pages/IssueModal";

describe("Issue delete", () => {
    
  let issueTitle = "This is an issue of type: Task.";
  const selector = {
    deleteButton: "[data-testid='icon:trash']",
    confirmationWindow: "[data-testid='modal:confirm']",
    listOfIssues: "[data-testid='board-list:backlog']",
    issueDetailsModal: "[data-testid='modal:issue-details']",
  };

  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains(issueTitle).click();
        IssueModal.getIssueDetailModal().should("be.visible");
      });
  });

  it("Delete issue, with confirmation.", () => {

    cy.get(selector.deleteButton).click();
    cy.get(selector.confirmationWindow).within(() => {
      cy.contains("Delete issue").click();
    });

    cy.get(selector.confirmationWindow).should("not.exist");
    cy.get(selector.listOfIssues).should("be.visible");

    cy.get(selector.issueDetailsModal).should("not.exist");
    cy.reload();
    cy.contains(issueTitle).should("not.exist");

  });

  it("Delete issue. Decline confirmation dialogue.", () => {

    cy.get(selector.deleteButton).click();
    cy.get(selector.confirmationWindow).should("be.visible");
    
    cy.get(selector.confirmationWindow).within(() => {
    cy.contains("Cancel").click();
    });
    cy.get(selector.confirmationWindow).should("not.exist");
    cy.get(selector.issueDetailsModal).should("be.visible");

  });
});
