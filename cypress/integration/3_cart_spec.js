describe('POST cart', () => {
  it('add to cart', () => {
    // cy.visit('http://localhost:3000')

    cy.request('POST', 'http://localhost:1323/cart', {
      "ProductID": Cypress.env('testProdId'),
      "UserID": Cypress.env('testUserId'),
    })
      .then((resp) => {
        expect(resp.status).to.eq(200)
        expect(resp.body).to.have.property('ID');
        expect(resp.body).to.have.property('User');
        expect(resp.body).to.have.property('Product');
      })
  })
})

describe('GET cart by user id', () => {
  it('get cart', () => {

    cy.request('GET', `http://localhost:1323/cart/${Cypress.env('testUserId')}`)
      .then((resp) => {
        expect(resp.status).to.eq(200);

        let testCart = resp.body.slice(-1)[0];
        expect(testCart.ProductID).to.eq( Cypress.env('testProdId'));
        expect(testCart.UserID).to.eq( Cypress.env('testUserId'));
        expect(testCart).to.have.property('User');
        expect(testCart).to.have.property('Product');
      })

  })
})
