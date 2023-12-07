describe("Issue delete", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  // Test Case 1

  it("Test Case 1: Issue Deletion", () => {
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should("be.visible");
    cy.contains("Delete issue").click();
    cy.contains("This is an issue of type: Task.").should("not.exist");
  });

  // Test Case 2

  it("Test Case 2: Delete Cancellation", () => {
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should("be.visible");
    cy.contains("Cancel").click();
    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    cy.get('[data-testid="icon:close"]').eq(0).click();
    cy.contains("This is an issue of type: Task.").should("exist");
  });
});
