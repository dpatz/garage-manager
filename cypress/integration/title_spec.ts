describe("The app title", function () {
  it("has the correct text content", function () {
    cy.setCookie("token", "123");
    cy.visit("/");
    cy.get("header h1").should("contain", "GarageManager");
    cy.percySnapshot();
    cy.clearCookies();
  });
});
