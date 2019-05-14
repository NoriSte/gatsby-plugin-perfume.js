/// <reference types="Cypress" />

context('Perfume', () => {
  it('With an inlined version, Perfume should be defined', () => {
    cy.visit('http://localhost:8001')
    cy.window().its("Perfume").should("exist");
  })
  it('With an externally loaded version, Perfume should be defined', () => {
    cy.visit('http://localhost:8002')
    cy.window().its("Perfume").should("exist");
  })
})
