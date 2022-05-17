describe('CLEAN user cart', () => {
  it('clean cart', () => {

    cy.request('POST', `http://localhost:1323/payment/${Cypress.env('testUserId')}`)
      .then((resp) => {
        expect(resp.status).to.eq(200);
      })

  })
})

describe('CLEAN user wishlist', () => {
  it('clean wishlist', () => {

    cy.request('DELETE', `http://localhost:1323/wishlist/${Cypress.env('testUserId')}`)
      .then((resp) => {
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
