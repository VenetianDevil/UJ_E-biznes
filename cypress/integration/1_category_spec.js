describe('POST category', () => {
  it('add category', () => {
    // cy.visit('http://localhost:3000')

    cy.request('POST', 'http://localhost:1323/categories', {
      "name": "Testowa kategoria",
    })
      .then((resp) => {
        expect(resp.status).to.eq(200)
        expect(resp.body).to.have.property('ID');

        let testCat = resp.body;
        Cypress.env('testCatId', testCat.ID);
      })
  })

  it('add duplicate category', () => {
    // cy.visit('http://localhost:3000')
    cy.request({
      method: 'POST',
      failOnStatusCode: false,
      url: 'http://localhost:1323/categories',
      body: {
        "name": "Testowa kategoria",
      }
    })
      .then((resp) => {
        expect(resp.status).to.eq(409)

      })
  })
})

describe('GET categories', () => {
  it('get categories', () => {

    cy.request('GET', 'http://localhost:1323/categories')
      .then((resp) => {
        expect(resp.status).to.eq(200);

        let testCat = resp.body.slice(-1)[0];
        expect(testCat.Name).to.eq("Testowa kategoria");
        expect(testCat.ID).to.eq(Cypress.env('testCatId'));
      })

  })
})
