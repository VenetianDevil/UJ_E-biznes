describe('POST user', () => {
  it('add user', () => {
    // cy.visit('http://localhost:3000')

    cy.request('POST', 'http://localhost:1323/wishlist', {
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

describe('GET users', () => {
  it('get users', () => {

    cy.request('GET', `http://localhost:1323/wishlist/${Cypress.env('testUserId')}`)
      .then((resp) => {
        expect(resp.status).to.eq(200);

        let testWishlist = resp.body.slice(-1)[0];
        expect(testWishlist.ProductID).to.eq( Cypress.env('testProdId'));
        expect(testWishlist.UserID).to.eq( Cypress.env('testUserId'));
        expect(testWishlist).to.have.property('User');
        expect(testWishlist).to.have.property('Product');
      })

  })
})
