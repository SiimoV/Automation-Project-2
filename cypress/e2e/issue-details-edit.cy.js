describe("Issue details editing", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  it("Should update type, status, assignees, reporter, priority successfully", () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click("bottomRight");
      cy.get('[data-testid="select-option:Story"]')
        .trigger("mouseover")
        .trigger("click");
      cy.get('[data-testid="select:type"]').should("contain", "Story");

      cy.get('[data-testid="select:status"]').click("bottomRight");
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should("have.text", "Done");

      cy.get('[data-testid="select:assignees"]').click("bottomRight");
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click("bottomRight");
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should("contain", "Baby Yoda");
      cy.get('[data-testid="select:assignees"]').should(
        "contain",
        "Lord Gaben"
      );

      cy.get('[data-testid="select:reporter"]').click("bottomRight");
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should(
        "have.text",
        "Pickle Rick"
      );

      cy.get('[data-testid="select:priority"]').click("bottomRight");
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should("have.text", "Medium");
    });
  });

  it("Should update title, description successfully", () => {
    const title = "TEST_TITLE";
    const description = "TEST_DESCRIPTION";

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type(title)
        .blur();

      cy.get(".ql-snow").click().should("not.exist");

      cy.get(".ql-editor").clear().type(description);

      cy.contains("button", "Save").click().should("not.exist");

      cy.get('textarea[placeholder="Short summary"]').should(
        "have.text",
        title
      );
      cy.get(".ql-snow").should("have.text", description);
    });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
});

//TASK 1

describe("Issue Detail Page - Priority Dropdown", () => {
  const expectedLength = 5;
  let priorityOptionsArray = [];

  it.only("should match the expected length and content of the Priority dropdown", () => {
    // Get the initially selected priority value
    const initiallySelectedPriority = cy
      .get('[data-testid="priority-dropdown"]')
      .find("option:selected") // Assuming dropdown options are 'option' elements
      .invoke("text");

    // Push the initially selected priority into the array
    priorityOptionsArray.push(initiallySelectedPriority);

    // Access the list of all priority options
    cy.get('[data-testid="priority-dropdown"]')
      .find("option:not(:disabled)") // Assuming dropdown options are 'option' elements
      .each(($option) => {
        // Invoke the text value from the current element and save it into the array
        const priorityText = $option.invoke("text").trim();
        priorityOptionsArray.push(priorityText);

        // Print out the added value and length of the array during each iteration
        cy.log(
          `Added value: ${priorityText}, Array length: ${priorityOptionsArray.length}`
        );
      })
      .then(() => {
        // Assert that the array created has the same length as the predefined number
        expect(priorityOptionsArray.length).to.equal(expectedLength);
      });
  });
});
