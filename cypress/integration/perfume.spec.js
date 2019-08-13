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

  it('The plugin should push the event to the GTM data layer', () => {
    cy.visit('http://localhost:8003');
    cy.window()
      .should("have.property", "dataLayer")
      .then(dataLayer => dataLayer[0])
      .should('contain', { event: "performance" });
  })

  it('The plugin should push the event to a custom GTM data layer', () => {
    cy.visit('http://localhost:8004');
    cy.window()
      .should("have.property", "customDataLayer")
      .then(dataLayer => dataLayer[0])
      .should('contain', { event: "customEventName" });
  })
})
