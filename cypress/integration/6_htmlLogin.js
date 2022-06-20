describe('Login', () => {
  it('No user', () => {
    cy.visit('http://localhost:3000')

    cy.get(".navbar").contains("Sign in").click()
  })

  it('Login with github button', () => {

    cy.get("button").contains("With GitHub")
  })

  it('Login with google button', () => {

    cy.get("button").contains("With Google")
  })

  it("create account that already exist", () => {
    cy.get("button").contains("Sign in"); //check if it's right form
    cy.get('input[name="username"]').type("test");
    cy.get('input[name="password"]').type("test");
    cy.get('form').submit();
    cy.url().should('eq', 'http://localhost:3000/signin');
    cy.get(".notification-error")
  })
  
  it('Traditional log in - error', () => {
    cy.get("button").contains("I have an account. Log in!").click();
    cy.get('input[name="username"]').type("testerror");
    cy.get('input[name="password"]').type("test");
    cy.get('form').submit();
    cy.url().should('eq', 'http://localhost:3000/signin');
    cy.get(".notification-error")
  })

  it('Traditional log in', () => {
    // cy.get("button").contains("I have an account. Log in!").click();
    cy.get('input[name="username"]').type("test");
    cy.get('input[name="password"]').type("test");
    cy.get('form').submit();
  })

  it("Logged page", () => {
    cy.url().should('eq', 'http://localhost:3000/logged');
    cy.get("h2").contains("Hello test");
    cy.get("button").contains("Produkty").click();
  })


  it("Logged in - log out button", () => {
    cy.get(".navbar").contains("Logout").click();

  })

  it("Logged out page", () => {
    cy.get("h2").contains("Goodbye");
    cy.get("button").contains("Produkty").click();
  })

  it("Add to cart - not logged in", () => {
    cy.visit('http://localhost:3000')
    cy.get(".product-card button").contains("Buy").click();
    cy.url().should('eq', 'http://localhost:3000/signin');

  })

})
