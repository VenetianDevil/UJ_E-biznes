describe('POST cart', () => {
  it('unauthorized', () => {

    cy.request({
      method: 'POST',
      failOnStatusCode: false,
      url: `http://localhost:1323/cart/${Cypress.env('testUserId')}`,
      body: {
        "ProductID": Cypress.env('testProdId'),
        "UserID": Cypress.env('testUserId'),
      }
    }).then((resp) => {
      expect(resp.status).to.eq(401)
    })
  })

  it('add to cart', () => {

    cy.request({
      method: 'POST',
      auth: {
        'bearer': Cypress.env('testUserToken')
      },
      url: `http://localhost:1323/cart/${Cypress.env('testUserId')}`,
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

describe('GET cart by user id', () => {
  it('unauthorized', () => {

    cy.request({
      method: 'GET',
      failOnStatusCode: false,
      url: `http://localhost:1323/cart/${Cypress.env('testUserId')}`,

    }).then((resp) => {
      expect(resp.status).to.eq(401);
    })

  })
  it('get cart', () => {

    cy.request({
      method: 'GET',
      auth: {
        'bearer': Cypress.env('testUserToken')
      },
      url: `http://localhost:1323/cart/${Cypress.env('testUserId')}`,

    }).then((resp) => {
      expect(resp.status).to.eq(200);

      let testCart = resp.body.slice(-1)[0];
      expect(testCart.ProductID).to.eq(Cypress.env('testProdId'));
      expect(testCart.UserID).to.eq(Cypress.env('testUserId'));
      expect(testCart).to.have.property('User');
      expect(testCart).to.have.property('Product');
    })

  })
})
