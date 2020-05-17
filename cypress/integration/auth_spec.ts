describe("Authentication", function () {
  afterEach(() => {
    cy.clearCookies();
  });

  it("allows users to login", function () {
    cy.visit("/login");
    // Remove (wait and force) when Cypress fixes their bug:
    // https://github.com/cypress-io/cypress/issues/5743,
    // https://github.com/cypress-io/cypress/issues/7306
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100);
    cy.get('[name="email"]').type("dan@example.com", { force: true });
    cy.get('[name="password"]').type("password");

    cy.percySnapshot();

    cy.get('[type="submit"]').click();

    cy.url().should("eq", "http://localhost:3000/");
  });

  it("allows users to logout", function () {
    cy.setCookie("token", "123");
    cy.visit("/");

    cy.contains("Logout").click();

    cy.url().should("eq", "http://localhost:3000/login");
  });

  it("shows an error if login fails", function () {
    cy.visit("/login");
    cy.get('[name="email"]').type("lee@example.com");
    cy.get('[name="password"]').type("pass");

    cy.get('[type="submit"]').click();

    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("[data-test-error]").contains("Invalid username or password");

    cy.percySnapshot();
  });
});
