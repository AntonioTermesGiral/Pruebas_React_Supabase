const { assert } = require("console")

describe('MyVC Tests Test', () => {

    //Puede colocarse dentro o fuera de un contexto, se ejecutara antes de realizar cada test. (si esta dentr o de un contexto se aplicara solo a los de ese contexto.)
    beforeEach(() => {
    })

    context('Log In', () => {

        //Puede colocarse dentro o fuera de un contexto, se ejecutara antes de realizar cada test. (si esta dentr o de un contexto se aplicara solo a los de ese contexto.)
        beforeEach(() => {
        })

        it('Tries to log in with the wrong credentials', () => {

            cy.intercept( 
                {
                  method: 'POST',
                  url: 'https://hdwsktohrhulukpzmike.supabase.co/auth/v1/token?grant_type=password',
                }
              ).as('LogIn') 
          
            cy.visit("http://localhost:3000/")
    
            cy.contains("LD").click()
    
            cy.url()
                .should("include", "/LD")
    
            cy.contains('button', 'Open modal').click()
    
            cy.contains("Log In")
    
            cy.get('input[name="loginEmail"]')
                .type('fake@email.com')
                .should('have.value', 'fake@email.com')
    
            cy.get('input[name="loginPassword"]')
                .type('fakePassword')
                .should('have.value', 'fakePassword')
    
            cy.contains('button', 'ENTER').click()
    
            cy.wait('@LogIn').its('response.statusCode').should('eq', 400)
        })
    
        it('Tries to log in with good credentials', () => {
    
            cy.intercept( 
                {
                    method: 'POST',
                    url: 'https://hdwsktohrhulukpzmike.supabase.co/auth/v1/token?grant_type=password',
                }
                ).as('LogIn') 
    
            cy.contains('button', 'Open modal').click()
    
            cy.contains("Log In")
    
            cy.get('input[name="loginEmail"]')
                .clear()
                .type('supatestmyvc@gmail.com')
                .should('have.value', 'supatestmyvc@gmail.com')
    
            cy.get('input[name="loginPassword"]')
                .clear()
                .type('potato200')
                .should('have.value', 'potato200')
    
            cy.contains('button', 'ENTER').click()
    
            cy.wait('@LogIn').its('response.statusCode').should('eq', 200)
    
            cy.wait(500)
    
            cy.getCookies()
                .should('have.length', 2)
                .then((cookies) => {
                    expect(cookies[0]).to.have.property("name", 'SBAccessToken')
                    expect(cookies[1]).to.have.property("name", 'SBRefreshToken')
                })
        })
    })

    context("Log Out", () => {

        it('Can find and use log out button.', () => {

            cy.get(".css-1pqm26d-MuiAvatar-img").click()
    
            cy.contains("Logout").click()
    
            cy.url()
                .should("include", "/Logout")

            cy.contains("Login")

            cy.contains("User has logged out.")
            cy.get('.css-g3hgs1-MuiBackdrop-root-MuiModal-backdrop').click()
    
            cy.getCookies()
                .should('have.length', 0) //Tambien se puede poner .should('be.empty')
        })
    })

    context("Other", () => {
        it('Other tests.', () => {

            //cy.pause() //Comentado para evitar tener que resumir el test cada vez que se ejecute.
    
            cy.go(-1)
    
            cy.url()
                .should("include", "/LD")
    
            cy.viewport(200, 200)
            //cy.screenshot() //Comentado para evitar llenar todo de imagenes, hace una captura de la pantalla y la guarda en la carpeta ../screenshots/tests/sample_test.js
            cy.wait(500)
    
            cy.viewport(400, 600)
            cy.wait(500)
    
            cy.viewport(1000, 660)
    
            //Otras cosas que probar:
            /**
             * task
             * stub
             * select
             * parentsUntil
             */
    
        })
    })

})