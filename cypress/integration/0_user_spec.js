describe('POST user', () => {
  it('add user', () => {
    // cy.visit('http://localhost:3000')

    cy.request('POST', 'http://localhost:1323/users', {
      "Username": "TestUser",
      "PasswordHash": "test",
    })
      .then((resp) => {
        expect(resp.status).to.eq(200)
        expect(resp.body).to.have.property('ID');

        let testUser = resp.body;
        Cypress.env('testUserId', testUser.ID);
      })
  })

  it('add duplicate user', () => {
    // cy.visit('http://localhost:3000')

    cy.request({
      method: 'POST',
      failOnStatusCode: false,
      url: 'http://localhost:1323/users',
      body: {
        "Username": "TestUser",
        "PasswordHash": "test",
      }
    })
      .then((resp) => {
        expect(resp.status).to.eq(409)
      })
  })
})

describe('GET users', () => {
  it('get users', () => {

    cy.request('GET', 'http://localhost:1323/users')
      .then((resp) => {
        expect(resp.status).to.eq(200);

        let testUser = resp.body.slice(-1)[0];
        expect(testUser.Username).to.eq("TestUser");
        expect(testUser.ID).to.eq(Cypress.env('testUserId'));
      })

  })
})
