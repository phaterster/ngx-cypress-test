/// <reference types="cypress" />

describe('Cypress nauka', ()  => {
    
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

    it('then and wrap methods', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        //selenium
        // const firstForm = cy.contain(nb, ab)
        // const secondForm = cy.contains(nb, ba)

        // firstForm.find('nb fff')

        //cypress style

        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst)

                //konwertowanie do cypress format .wrap
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')

            })
        })
    })

    it('invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2
        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label.text()).to.equal('Email address')
        })

        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            .should('contain', 'checked') //first
            .then(classValue => { //second
                expect(classValue).to.contain('checked')
            })

    })

    it('assert property, date, funkcje, ify parametry', () => {

        function selectDayFromCurrent(day){
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('default', {month: 'short'})
            let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute =>{
                if(!dateAttribute.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                } else{
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            }) 
            return dateAssert
        } 

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', "Common Datepicker")
            .find('input')
            .then(input => {
                cy.wrap(input).click()
                let dateAssert = selectDayFromCurrent(40)
                cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)

            })
    })

    it('radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons)
                .first()
                .check({force: true})
                .should('be.checked')

            cy.wrap(radioButtons)
                .eq(1)
                .check({force: true})

            cy.wrap(radioButtons)
                .eq(0)
                .should('not.be.checked')

            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')
        })

    })
    it('check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})
        cy.get('[type="checkbox"]').eq(1).check({force: true})

    })

    it('lists and dropdowns, szukanie w css, .each', () => {
        cy.visit('/')

        //1
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        //2
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((ListItem, index) => {
                const itemText = ListItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(ListItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if(index < 3){
                    cy.wrap(dropdown).click()
                }
               
            })
        })
    })
    it('Web tables, czyszczenie clear, if else each', () =>{

    
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1
     //   cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            // cy.wrap(tableRow).find('.nb-edit')
            // cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            // cy.wrap(tableRow).find('.nb-checkmark').click()
            // cy.wrap(tableRow).find('td').eq(6).should('contain', '25')

        //2
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow =>{
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bondar')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Artem')
            cy.wrap(tableColumns).eq(3).should('contain', 'Bondar')
        })

        //3
        const age = [20, 30, 40, 200]

        cy.wrap(age).each(age =>{
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
                
            })
        })

        })
    })

    it('Tooltip', () =>{
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')

    })
    it.only('Dialog box', () =>{
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', (confirm) =>{
            expect(confirm).to.equal('Are you sure you want to delete?')
        })

        //2
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

         //3
         cy.get('tbody tr').first().find('.nb-trash').click()
         cy.on('window:confirm', () => false)
         })


    })





