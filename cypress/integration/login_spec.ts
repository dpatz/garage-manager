describe("The login form", function () {
  it("allows users to login", function () {
    cy.visit("/login");
    cy.get('[name="email"]').type("dan@example.com");
    cy.get('[name="password"]').type("password");

    cy.percySnapshot();

    cy.get('[type="submit"]').click();

    cy.url().should("eq", "http://localhost:3000/");
  });

  it("show an error if login fails", function () {
    cy.visit("/login");
    cy.get('[name="email"]').type("lee@example.com");
    cy.get('[name="password"]').type("pass");

    cy.get('[type="submit"]').click();

    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("[data-test-error]").contains("Invalid username or password");

    cy.percySnapshot();
  });
});
