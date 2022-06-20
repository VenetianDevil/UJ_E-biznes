describe('CLEAN user cart', () => {
  it('unauthorized', () => {
    cy.request({
      method: 'POST',
      failOnStatusCode: false,
      url: `http://localhost:1323/order/${Cypress.env('testUserId')}`,

    }).then((resp) => {
      expect(resp.status).to.eq(401);
    })

  })

  it('clean cart', () => {

    cy.request({
      method: 'POST',
      auth: {
        'bearer': Cypress.env('testUserToken')
      },
      url: `http://localhost:1323/order/${Cypress.env('testUserId')}`,

    }).then((resp) => {
      expect(resp.status).to.eq(200);
    })

  })
 
})

describe('CLEAN user wishlist', () => {
  it('unauthorized', () => {
    cy.request({
      method: 'DELETE',
      failOnStatusCode: false,
      url: `http://localhost:1323/wishlist/${Cypress.env('testUserId')}`,

    }).then((resp) => {
      expect(resp.status).to.eq(401);
    })

  })

  it('clean wishlist', () => {

    cy.request({
      method: 'DELETE',
      auth: {
        'bearer': Cypress.env('testUserToken')
      },
      url: `http://localhost:1323/wishlist/${Cypress.env('testUserId')}`,

    }).then((resp) => {
      expect(resp.status).to.eq(200);
    })

  })

})

describe('DELETE product', () => {
  it('delete product', () => {

    cy.request('DELETE', `http://localhost:1323/products/${Cypress.env('testProdId')}`)
      .then((resp) => {
        expect(resp.status).to.eq(200);
      })

  })

  it('delete not existing product', () => {

    cy.request({
      method: 'DELETE',
      failOnStatusCode: false,
      url: `http://localhost:1323/products/${Cypress.env('testProdId')}`,
    })
      .then((resp) => {
        expect(resp.status).to.eq(404);
      })

  })
})

describe('DELETE category', () => {
  it('delete category', () => {

    cy.request('DELETE', `http://localhost:1323/categories/${Cypress.env('testCatId')}`)
      .then((resp) => {
        expect(resp.status).to.eq(200);
      })

  })

  it('delete not existing category', () => {
    cy.request({
      method: 'DELETE',
      failOnStatusCode: false,
      url: `http://localhost:1323/categories/${Cypress.env('testCatId')}`,
    })
      .then((resp) => {
        expect(resp.status).to.eq(404);
      })

  })
})

describe('DELETE user', () => {
  it('delete user', () => {

    cy.request('DELETE', `http://localhost:1323/users/${Cypress.env('testUserId')}`)
      .then((resp) => {
        expect(resp.status).to.eq(200);
      })

  })

  it('delete not existing user', () => {

    cy.request({
      method: 'DELETE',
      failOnStatusCode: false,
      url: `http://localhost:1323/users/${Cypress.env('testUserId')}`,
    })
      .then((resp) => {
        expect(resp.status).to.eq(404);
      })

  })
})
