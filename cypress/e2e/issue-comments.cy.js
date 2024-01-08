describe("Issue comments creating, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  // ASSIGNMENT 1
  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
  const getIssueComment = () => cy.get('[data-testid="issue-comment"]');
  const initialComment = "TEST_COMMENT";
  const editedComment = "TEST_COMMENT_EDITED";

  it("Should create, edit, and delete a comment successfully", () => {
    // Add a comment

    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();
      cy.get('textarea[placeholder="Add a comment..."]').type(initialComment);
      cy.contains("button", "Save").click().should("not.exist");
      cy.contains("Add a comment...").should("exist");
      getIssueComment().should("contain", initialComment);

      // Edit the comment
      getIssueComment().first().contains("Edit").click().should("not.exist");

      cy.get('textarea[placeholder="Add a comment..."]')
        .should("contain", initialComment)
        .clear()
        .type(editedComment);
      cy.contains("button", "Save").click().should("not.exist");

      getIssueComment().should("contain", "Edit").and("contain", editedComment);

      // Remove the comment
      getIssueComment().contains("Delete").click();
    });
    cy.get('[data-testid="modal:confirm"]').should("be.visible");
    cy.get('[data-testid="modal:confirm"]')
      .find("button")
      .contains("Delete comment")
      .should("be.visible")
      .click();
    getIssueDetailsModal().within(() => {
      getIssueComment().should("have.length", 1);
    });
  });
});
