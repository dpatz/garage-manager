describe("The login form", function () {
  it("allows users to login", function () {
    cy.visit("/login");
    cy.get('[name="email"]').type("d@patz.me");
    cy.get('[name="password"]').type("pass");

    cy.percySnapshot();

    cy.get("button").click();

    cy.url().should("eq", "http://localhost:3000/");
  });
});
