import IssueModal from "../../pages/IssueModal";

describe("Issue delete", () => {
  let issueTitle = "This is an issue of type: Task.";
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
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle);
  });

  it("Delete issue. Decline confirmation dialogue.", () => {
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
  });
});
