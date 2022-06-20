
describe("Full Cart", () => {
  before(() => {
    cy.visit('http://localhost:3000/signin')
    cy.get("button").contains("I have an account. Log in!").click();
    cy.get('input[name="username"]').type("test");
    cy.get('input[name="password"]').type("test");
    cy.get('form').submit();
    cy.url().should('eq', 'http://localhost:3000/logged');
  })

  it("Go to cart", () => {
    cy.get(".navbar").contains("Cart").click()
    // cy.wait(10000);
    cy.get("h2").contains("Cart");
    cy.get("button").contains("Order and Pay");
  })

  it("Order and pay", () => {
    cy.get("button").contains("Order and Pay").click();
    cy.url().should('contains', 'http://localhost:3000/cart/payment/');
  })

  it("Pay with stripe", () => {
    cy.get("h2").contains("Pay for your order");
    cy.get('iframe');
      // .then(($iframe) => {
      //   const $body = $iframe.contents().find('body')

      //   cy.wrap($body)
      //     .find('input[name="number"]')
      //     .type('4242424242424242')
      //   cy.wrap($body)
      //     .find('input[name="expiry"]')
      //     .type('1224')
      //   cy.wrap($body)
      //     .find('input[name="cvc"]')
      //     .type('123')
      //   cy.wrap($body)
      //     .find('form')
      //     .submit()
      // })
    // cy.get("iframe").get('input[name="number"]').type("4242424242424242");
    // cy.get("iframe").get('input[name="expiry"]').type("1224");
    // cy.get("iframe").get('input[name="cvc"]').type("123");
    // cy.get("iframe").get("form").submit();
  })

  // it("Ordered", () => {
  //   cy.url().should('eq', 'http://localhost:3000/cart/ordered');
  //   cy.get("h2").contains("Order sent!");
  // })
})
