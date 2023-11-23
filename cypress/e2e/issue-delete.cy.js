describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
      cy.get('[data-testid="modal:issue-details"]').should('be.visible');

    });
  });

  it('Test case 1: Issue Deletion', () => {

    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="icon:trash"]').should('be.visible');
      cy.get('[data-testid="icon:trash"]').click('');
    });

      cy.get('[data-testid="modal:confirm"]')  
      .should('be.visible')
      .within(() => {
        cy.contains('Delete issue')  
          .should('be.visible')
          .click();
      });
      cy.get('[data-testid="modal:confirm"]').should('not.exist');  
      cy.reload();
      cy.contains('This is an issue of type: Task.').should('not.exist');
      cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1').within(() => {
        cy.get('[data-testid="list-issue"]').should('have.length', '3');
      });
     });
  

  it('Test case 2: Issue Deletion Cancellation', () => {

    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="icon:trash"]').should('be.visible');
      cy.get('[data-testid="icon:trash"]').click('');
    });
    cy.get('[data-testid="modal:confirm"]')  
      .should('be.visible')
      .within(() => {
        cy.contains('Cancel')  
          .should('be.visible')
          .click();   
      });
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
 
      getIssueDetailsModal().within(() => {
      cy.get('[data-testid="icon:close"]').should('be.visible');
      cy.get('[data-testid="icon:close"]').first().click('');  
    });
      cy.contains('This is an issue of type: Task.').should('be.visible');
      
      cy.reload();
      cy.contains('This is an issue of type: Task.').should('be.visible');
      cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1').within(() => {
        cy.get('[data-testid="list-issue"]').should('have.length', '4');
      });
  });

  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
});
