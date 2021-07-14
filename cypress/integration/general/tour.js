describe('Make sure site loads', () => {
  it('Page loads', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('threesam')
    expect(true).to.equal(true)
  })
})