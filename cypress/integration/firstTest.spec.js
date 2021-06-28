/// <reference types="cypress" />

describe('Our first suite', ()  => {
    
    it('Wszystkie typy wyszukiwania elementow w cypress', () => {

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

    it('poruszanie sie po DOMie', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()


        //traveling in to dome
        cy.get('[data-cy="signInButton"]') //wyszukuje rzeczy po calym domie
        cy.contains('Sign in')
        cy.contains('[status="warning"]','Sign in')
        cy.get('#inputEmail3')
            .parents('form')
            .find('button') //szuka child elementow
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        cy.contains('nb-card', 'Horizontal form') // szuka elementow po tekscie i webselectorze, tylko jeden element moze znalezc
            .find('[type="email"')

    })

    it.only('then and wrap methods', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'email')
    })
    
})

