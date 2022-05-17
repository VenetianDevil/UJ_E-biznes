describe('POST products', () => {
  it('add product', () => {
    // cy.visit('http://localhost:3000')
    
    cy.request('POST', 'http://localhost:1323/products', {
      "name": "testProd",
      "description": "testDesc",
      "price": 100,
      "categoryID": Cypress.env('testCatId'),

    })
      .then((resp) => {
        expect(resp.status).to.eq(200);
                
        expect(resp.body).to.have.property('Category');
        expect(resp.body).to.have.property('ID');
        Cypress.env('testProdId', resp.body.ID);
      })
  })
})

describe('GET products', () => {
  it('get products', () => {

    cy.request('GET', 'http://localhost:1323/products')
      .then((resp) => {
        expect(resp.status).to.eq(200);
        
        const testProd = resp.body.slice(-1)[0];
        expect(testProd.ID).to.eq(Cypress.env('testProdId'));
        expect(testProd.Name).to.eq("testProd");
        expect(testProd.Description).to.eq("testDesc");
        expect(testProd.Price).to.eq(100);
        expect(testProd.CategoryID).to.eq(Cypress.env('testCatId'));
        expect(testProd).to.have.property('Category');
      })

  })
})
