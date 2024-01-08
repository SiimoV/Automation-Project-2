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

  const issueTitle = "This is an issue of type: Task.";
  const numberInput = '[placeholder="Number"]';
  const stopwatchIcon = '[data-testid="icon:stopwatch"]';
  const trackingModal = '[data-testid="modal:tracking"]';
  const closeIcon = '[data-testid="icon:close"]';
  const IssueDetail = '[data-testid="modal:issue-details"]';

  const addEstimation = (estimation) => {
    cy.get(numberInput).click().type(estimation);
    cy.get(IssueDetail)
      .should("be.visible")
      .contains(`${estimation}h estimated`);
  };

  const editEstimation = (updatedEst) => {
    cy.get(numberInput).click().clear().type(updatedEst);
    cy.get(IssueDetail)
      .should("be.visible")
      .contains(`${updatedEst}h estimated`);
  };

  const removeEstimation = () => {
    cy.get(numberInput).click().clear();
    cy.get(IssueDetail)
      .should("be.visible")
      .should("not.contain", "h estimated");
  };

  const addTimeSpent = (spent, remain) => {
    cy.get(stopwatchIcon).click();
    cy.get(trackingModal).should("be.visible");
    cy.get(numberInput).eq(1).click().clear().type(spent);
    cy.get(numberInput).eq(2).click().clear().type(remain);
    cy.contains("button", "Done").click();
    cy.get(IssueDetail).should("be.visible").contains(`${timeSpent}h logged`);
  };

  const removeLogged = () => {
    cy.get(stopwatchIcon).click();
    cy.get(trackingModal).should("be.visible");
    cy.get(numberInput).eq(1).click().clear();
    cy.get(numberInput).eq(2).click().clear();
    cy.contains("button", "Done").click();
    cy.get(IssueDetail).should("be.visible").contains(`No time logged`);
  };

  it("should add, edit, and remove ESTIMATED time successfully", () => {
    cy.contains(issueTitle).click();
    removeLogged();
    // Add estimation
    addEstimation(originalEstimation);

    // Edit estimation
    editEstimation(updatedEstimation);

    // Remove estimation
    removeEstimation();

    //Close issue
    cy.get(closeIcon).eq(0).click();
  });

  it("should add, edit, and remove LOGGED time successfully", () => {
    cy.contains(issueTitle).click();
    //Add logged time
    addTimeSpent(timeSpent, timeRemain);

    //Remove logged time
    removeLogged();
    cy.get(IssueDetail).should("be.not.visible", "h estimated");

    //Close issue
    cy.get(closeIcon).eq(0).click();
  });
});
