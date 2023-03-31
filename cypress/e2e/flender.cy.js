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

    it('Login with Invalid Credentials', function () {

        cy.get('#username', timeOut).should('be.visible').type('user123') 
        cy.get('#password', timeOut).should('be.visible').type('00000')  
        cy.get('#login').should('be.visible').click()
        cy.get('.toast-message').should('contain', 'Access denied') 
    })

    it.only('Create Protocol', function () {

        cy.get('#username', timeOut).should('be.visible').type('t-sairel')
        cy.get('#password', timeOut).should('be.visible').type('123')
        cy.get('#login').should('be.visible').click()

        cy.wait(80000)
        cy.get('.scrollable > .protocols', timeOut).should('be.visible').click() 
        cy.contains('Create protocol', timeOut).should('be.visible').click() 

        cy.wait(5000)
        cy.get('.button-container.left').first().within(() => {
        cy.get('button').click()
        cy.contains('FLENDER').click()
        })

        cy.wait(5000)
        cy.get('.button-container.right').first().within(() => {
        cy.get('button').click()
        cy.contains('Voerde').click()
        })
    
        cy.contains('Ok', timeOut).should('be.visible').click()
    })
})