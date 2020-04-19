describe("The app title", function () {
  it("has the correct text content", function () {
    cy.visit("/");
    cy.get("header h1").should("contain", "GarageManager");
    cy.percySnapshot();
  });
});
