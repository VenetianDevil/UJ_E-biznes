
describe("Cart test", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signin')
    cy.get("button").contains("I have an account. Log in!").click();
    cy.get('input[name="username"]').type("test");
    cy.get('input[name="password"]').type("test");
    cy.get('form').submit();
    cy.url().should('eq', 'http://localhost:3000/logged');
  })

  it("Show empty cart page", () => {
    // cy.url().should('eq', 'http://localhost:3000/cart');
    cy.get(".navbar").contains("Cart").click()
    cy.get("h2").contains("Cart");
    cy.get("p").contains("Sum: 0");
  })

  it("Add to cart by logged user", () => {
    cy.get(".navbar").contains("Products").click()
    cy.url().should('eq', 'http://localhost:3000/products');
    cy.get(".product-card button").contains("Buy").click();
    cy.url().should('eq', 'http://localhost:3000/products');
    cy.get(".notification-success")
  })
  
  it("Show full cart page - logged in", () => {
    cy.get(".navbar").contains("Cart").click()
    // cy.wait(10000);
    cy.get("h2").contains("Cart");
    cy.get("button").contains("Order and Pay");
  })
})
