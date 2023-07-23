describe('CRUD tests', function()  {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    cy.visit('http://localhost:3001');
  });

  it('GET all entries', function() {
    cy.contains('Arto Hellas');
    cy.contains('Ada Lovelace');
    cy.contains('Dan Abramov');
  });

  it('POST an entry', function() {
    cy.get('#name_input').type('test-person');
    cy.get('#number_input').type('123-123123');
    cy.get('button').contains('add').click();

    cy.contains('Added test-person');
    cy.contains('123-123123');
  });

  it('DELETE an entry', function() {
    cy.get('#040-123456').contains('delete').click();

    cy.contains('Deleted Arto Hellas');

    cy.get('#persons').should('not.contain','040-123456');
  });

  it('UPDATE an entry', function() {
    cy.get('#name_input').type('Ada Lovelace');
    cy.get('#number_input').type('999-999999');
    cy.get('button').contains('add').click();

    cy.contains('999-999999');
    cy.get('#persons').should('not.contain', '394-5323523');
  });
});