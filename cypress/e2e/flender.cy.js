const timeOut = {
    timeout: 1000000
}

beforeEach(function () { cy.visit('https://flender.beta.reportheld.com/office/main.html?lng=en#sites/false', timeOut) })

describe('Create Protocol', function () {
    it('Login with Valid Credentials', function () {

        cy.get('#username', timeOut).should('be.visible').type('t-sairel')
        cy.get('#password', timeOut).should('be.visible').type('123')
        cy.get('#login').should('be.visible').click()
    })
})