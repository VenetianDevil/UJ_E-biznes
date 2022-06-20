describe('POST wish list', () => {
  it('unauthorized', () => {
    cy.request({
      method: 'GET',
      failOnStatusCode: false,
      url: `http://localhost:1323/wishlist/${Cypress.env('testUserId')}`,

    }).then((resp) => {
      expect(resp.status).to.eq(401);
    })

  })

  it('add to wish list', () => {
    // cy.visit('http://localhost:3000')

    cy.request({
      method: 'POST',
      auth: {
        'bearer': Cypress.env('testUserToken')
      },
      url: `http://localhost:1323/wishlist/${Cypress.env('testUserId')}`,
      body: {
        "ProductID": Cypress.env('testProdId'),
        "UserID": Cypress.env('testUserId'),
      }
    }).then((resp) => {
      expect(resp.status).to.eq(200)
      expect(resp.body).to.have.property('ID');
      expect(resp.body).to.have.property('User');
      expect(resp.body).to.have.property('Product');
    })

  })
})

describe('GET wish list', () => {

  it('unauthorized', () => {
    cy.request({
      method: 'GET',
      failOnStatusCode: false,
      url: `http://localhost:1323/wishlist/${Cypress.env('testUserId')}`,

    }).then((resp) => {
      expect(resp.status).to.eq(401);
    })

  })

  it('get wish list by user id', () => {

    cy.request({
      method: 'GET',
      auth: {
        'bearer': Cypress.env('testUserToken')
      },
      url: `http://localhost:1323/wishlist/${Cypress.env('testUserId')}`,
      
    }).then((resp) => {
      expect(resp.status).to.eq(200);

      let testWishlist = resp.body.slice(-1)[0];
      expect(testWishlist.ProductID).to.eq(Cypress.env('testProdId'));
      expect(testWishlist.UserID).to.eq(Cypress.env('testUserId'));
      expect(testWishlist).to.have.property('User');
      expect(testWishlist).to.have.property('Product');
    })

  })


})
