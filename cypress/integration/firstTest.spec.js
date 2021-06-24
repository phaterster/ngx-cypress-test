/// <reference types="cypress" />

describe('Our first suite', ()  => {
    
    it('first test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by tag name
        cy.get('input')

        //by ID
        cy.get('#inputEmail')

        //by Class name
        cy.get('.input-full-width')

        //by attribute
        cy.get('[placeholder]')

        //by attribute name and value
        cy.get('[placeholder="Email"]')

        //by class calue
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by tag name and attribute with value
        cy.get('input[placeholder="Email"]')

        //by two different attributes
        cy.get('[placeholder="Email"][fullwidth]')

        //by tag name, attribute with alue id and class name
        cy.get('input[placeholder="Email"].input-full-width#inputEmail')

        //the most recomended way byc cypress
        cy.get('[data-cy="imputEmail1"]')
    })

})