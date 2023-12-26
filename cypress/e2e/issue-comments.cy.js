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

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
  /*
  it("Should create a comment successfully", () => {
    const comment = "TEST_COMMENT";

    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();

      cy.get('textarea[placeholder="Add a comment..."]').type(comment);

      cy.contains("button", "Save").click().should("not.exist");

      cy.contains("Add a comment...").should("exist");
      cy.get('[data-testid="issue-comment"]').should("contain", comment);
    });
  });

  it("Should edit a comment successfully", () => {
    const previousComment = "An old silent pond...";
    const comment = "TEST_COMMENT_EDITED";

    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="issue-comment"]')
        .first()
        .contains("Edit")
        .click()
        .should("not.exist");

      cy.get('textarea[placeholder="Add a comment..."]')
        .should("contain", previousComment)
        .clear()
        .type(comment);

      cy.contains("button", "Save").click().should("not.exist");

      cy.get('[data-testid="issue-comment"]')
        .should("contain", "Edit")
        .and("contain", comment);
    });
  });

  it("Should delete a comment successfully", () => {
    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .contains("Delete")
      .click();

    cy.get('[data-testid="modal:confirm"]')
      .contains("button", "Delete comment")
      .click()
      .should("not.exist");

    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .should("not.exist");
  });
*/
  // ASSIGNMENT 1

  const getIssueComment = () => cy.get('[data-testid="issue-comment"]');

  it.only("Should create, edit, and delete a comment successfully", () => {
    // Add a comment
    const initialComment = "TEST_COMMENT";
    const editedComment = "TEST_COMMENT_EDITED";

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

      cy.get('[data-testid="modal:confirm"]');
      cy.get("button", "Delete comment").click().should("not.exist");

      getIssueComment().should("not.exist");
    });
  });
});
