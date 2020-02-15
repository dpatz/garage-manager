describe("The login form", function() {
  it("allows users to login", function() {
    cy.visit("/login");
    cy.get('[name="email"]').type("dan@example.com");
    cy.get('[name="password"]').type("password");

    cy.percySnapshot();

    cy.get("button").click();

    cy.url().should("eq", "http://localhost:3000/");
  });
});
