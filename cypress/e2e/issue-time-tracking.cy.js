describe("Tests for time tracking", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
      });
  });

  const originalEstimation = 10;
  const updatedEstimation = 20;
  const timeSpent = 2;
  const timeRemain = 5;

  const issueTitle = "Click on an issue to see what's behind it.";
  const numberInput = '[placeholder="Number"]';
  const stopwatchIcon = '[data-testid="icon:stopwatch"]';
  const trackingModal = '[data-testid="modal:tracking"]';
  const closeIcon = '[data-testid="icon:close"]';
  const IssueDetail = '[data-testid="modal:issue-details"]';

  // Test case ID: Add estimation
  const addEstimation = (estimation) => {
    cy.contains(issueTitle).click();
    cy.get(IssueDetail).should("be.visible").contains(`No time logged`); //BUG
    cy.get(numberInput).click().type(estimation);
    cy.get(IssueDetail)
      .should("be.visible")
      .contains(`${estimation}h estimated`);
    cy.get(closeIcon).eq(0).click();
    cy.contains(issueTitle).click();
    cy.get(IssueDetail)
      .should("be.visible")
      .contains(`${estimation}h estimated`);
  };

  // Test case ID: Update estimation
  const editEstimation = (updatedEst) => {
    cy.contains(issueTitle).click();
    cy.get(numberInput).click().clear().type(updatedEst);
    cy.get(IssueDetail)
      .should("be.visible")
      .contains(`${updatedEst}h estimated`);
    cy.get(closeIcon).eq(0).click();
    cy.contains(issueTitle).click();
    cy.get(IssueDetail)
      .should("be.visible")
      .contains(`${updatedEst}h estimated`);
  };

  // Test case ID: Remove estimation
  const removeEstimation = () => {
    cy.contains(issueTitle).click();
    cy.get(numberInput).click().clear();
    cy.get(closeIcon).eq(0).click();
    cy.contains(issueTitle).click(); // BUG
    cy.get(IssueDetail)
      .should("be.visible")
      .should("not.contain", "h estimated");
    cy.get(numberInput).should("be.visible");
  };

  // Test case ID: Log time
  const addTimeSpent = (spent, remain) => {
    cy.contains(issueTitle).click();
    cy.get(stopwatchIcon).click();
    cy.get(trackingModal).should("be.visible");
    cy.get(numberInput).eq(1).click().clear().type(spent);
    cy.get(numberInput).eq(2).click().clear().type(remain);
    cy.contains("button", "Done").click();
    cy.get(IssueDetail)
      .should("contain", `${timeSpent}h logged`)
      .and("not.contain", "No time logged")
      .and("contain", `${remain}h remaining`);
  };

  // Test case ID: Remove logged time
  const removeLogged = () => {
    cy.get(stopwatchIcon).click();
    cy.get(trackingModal).should("be.visible");
    cy.get(numberInput).eq(1).click().clear();
    cy.get(numberInput).eq(2).click().clear();
    cy.contains("button", "Done").click();
    cy.get(IssueDetail).should("be.visible").contains(`No time logged`);
  };

  it("Should add, edit, and remove ESTIMATED time successfully", () => {
    addEstimation(originalEstimation); // Test case ID: Add estimation
    editEstimation(updatedEstimation); // Test case ID: Update estimation
    removeEstimation(); // Test case ID: Remove estimation
  });

  it("Should add and remove LOGGED time successfully", () => {
    addTimeSpent(timeSpent, timeRemain); // Test case ID: Log time
    removeLogged(); // Test case ID: Remove logged time
  });
});
