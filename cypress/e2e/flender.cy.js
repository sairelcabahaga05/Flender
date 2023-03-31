const timeOut = {
    timeout: 1000000
}

beforeEach(function () { cy.visit('https://flender.beta.reportheld.com/office/main.html?lng=en#sites/false', timeOut) }) // To load the website url before each block

describe('Create Protocol', function () {
    it('Login with Valid Credentials', function () {

        cy.get('#username', timeOut).should('be.visible').type('t-sairel')
        cy.get('#password', timeOut).should('be.visible').type('123')
        cy.get('#login').should('be.visible').click()
    })

    // To test if the login doesn't accept invalid credentials 
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

        cy.wait(80000) // To wait for the payloads to be done before clicking the protocol icon
        cy.get('.scrollable > .protocols', timeOut).should('be.visible').click() // To click Protocol Icon
        cy.contains('Create protocol', timeOut).should('be.visible').click() 

    
        cy.wait(5000) // To make sure that the modal is fully loaded
        cy.get('.button-container.left').first().within(() => { // To click the first selection box that contains Flender
        cy.get('button').click()
        cy.contains('FLENDER').click()
        })

        cy.wait(5000)
        cy.get('.button-container.right').first().within(() => { // To click the first selection box that contains Voerde
        cy.get('button').click()
        cy.contains('Voerde').click()
        })
        cy.contains('Ok', timeOut).should('be.visible').click()

        // Pop up confirmation message
        cy.get('div[class="inner clearfix"]', timeOut).within(() => {
        cy.contains("Are you sure you want to create a new protocol briefcase?").should('be.visible')
        cy.contains('Ok', timeOut).should('be.visible').click()
        })
            
        cy.get('div[class="inner clearfix"]', timeOut).within(() => {
        cy.contains("Briefcase name").should('be.visible')
        cy.get('.black-text-input').should('be.visible').should('include.value', 'Befundbericht')
        cy.contains('Ok', timeOut).should('be.visible').click()
        })

        // Selects the first row in the table and within that first row the 4th column which it will then click that column
        cy.wait(10000)
        cy.get('tbody > tr',timeOut).eq(0).within(() => {
        cy.get('td').eq(3).click()
        })

        // Selects the tbody element and within that tbody element it will select the second row and click that row
        cy.wait(10000)
        cy.get('tbody',timeOut).within(() => {
        cy.get('tr').eq(1).click()
         })

        // Selects all inputs wherein each input field is passed through the each() function which then types the text 'test' into each input field
        cy.wait(10000)
        cy.get('div.runtime-components-generator',timeOut).within(() => {
        cy.get('input:not([type="date"])').each(($input) => {
        cy.wrap($input).type('test', { force: true });

        });
    });
        cy.contains('View report').should('be.visible').click() // To view the reports that you enetered

    })
})