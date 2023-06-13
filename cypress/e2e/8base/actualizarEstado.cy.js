describe('actualizar estado', () => {
  it('estado completado', () => {
    cy.visit('http://localhost:3000')
    
    cy.origin('https://dev-eq0a8e8zrutb587b.us.auth0.com', 
    { args: { username: 'root@gmail.com', password: 'Johann2022.' } }, 
    ({username, password}) => {
      cy.get('#username').type(username)
      cy.get('#password').type(password)
      
      cy.get('.cf772ffae > .c89f1057d').as('submitButton'); cy.get('@submitButton').click()
    })
    
    cy.visit('http://localhost:3000')
    cy.get('.css-k8uk13-MuiStack-root > .MuiButtonBase-root').as('nuevaTarea'); cy.get('@nuevaTarea').click()
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #outlined-basec').type('Tarea Prueba')
    cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > #outlined-basec').type('Descripción de Prueba')
    cy.get('.MuiDialogContent-root > .MuiStack-root > .MuiButtonBase-root').as('guardarTarea'); cy.get('@guardarTarea').click()
    cy.get('[data-estado="tarea-1"]:first .Tareas_tareasButtonOpcion__kbhJc > .MuiButtonBase-root').as('menuItem'); cy.get('@menuItem').click()
    cy.get('.MuiList-root > :nth-child(3)').as('optionCompletado'); cy.get('@optionCompletado').click()
  })
})