describe('Time-tracking functionality', () => {
    beforeEach(() => {
        navigateToIssueDetailsModal()
        });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const Estimation = () => cy.get('[placeholder="Number"]');
    const EstimatedTime = () => cy.get('.sc-rBLzX.irwmBe div:last-child');
    const TimeLoggingButton = () => cy.get('.sc-bMvGRv.IstSR');
    const TrackingModal = () => cy.get('[data-testid="modal:tracking"]');
    const LoggedTime = () => cy.get('.sc-rBLzX.irwmBe div:first-child');

    it('Test case 1: Time Estimation Functionality', () => {

        getIssueDetailsModal().within(() => {
            Estimation()
                .click()
                .clear()
                .type('8')
                .should('be.visible') 
                .should('have.value', '8');
            EstimatedTime()
                .should('be.visible')
                .should('have.text', '8h estimated');
            Estimation()
                .click()
                .clear()
                .should('have.value', '');
            EstimatedTime().should('not.contain', '8h estimated');
            Estimation()
                .click()
                .type('10')
                .should('be.visible') 
                .should('have.value', '10');
            EstimatedTime()
                .should('be.visible')
                .should('have.text', '10h estimated');
        });
    });

    it('Test case 2: Time Logging Functionality', () => {

        getIssueDetailsModal().within(() => {
            Estimation()
                .click()
                .clear()
                .type('8')
                .should('be.visible') 
                .should('have.value', '8');
            EstimatedTime()
                .should('be.visible')
                .should('have.text', '8h estimated');
            getTimeTrackingModal()
        });
        checkTrackingModalVisibility();
        TrackingModal().within(()=> {
            Estimation()
                .first()
                .click()
                .clear()
                .type('8');
            cy.contains('button', 'Done')
                .click()
                .should('not.exist');
        });

        getIssueDetailsModal().within(() => {
            LoggedTime()
                .should('be.visible')
                .should('have.text', '8h logged');
            getTimeTrackingModal()
        });
        checkTrackingModalVisibility();
        TrackingModal().within(()=> {
            Estimation()
                .first()
                .click()
                .clear()
                .should('have.value', '');
            cy.contains('button', 'Done')
                .click()
                .should('not.exist');
        });
        getIssueDetailsModal().within(() => {
            EstimatedTime()
                .should('be.visible')
                .should('have.text', '8h estimated');
            LoggedTime()
                .should('be.visible')
                .should('have.text', 'No time logged');
            Estimation()
                .click()
                .clear()
                .type('10')
                .should('be.visible') 
                .should('have.value', '10');
            getTimeTrackingModal()
        });
        checkTrackingModalVisibility();
        TrackingModal().within(()=> {
            Estimation()
                .first()
                .click()
                .type('9');
            //adding Remaining time
            Estimation()
                .eq(1).click()
                .type('1');
            cy.contains('button', 'Done')
                .click()
                .should('not.exist');
        });
        getIssueDetailsModal().within(() => {
            EstimatedTime()
                .should('be.visible')
                .should('have.text', '1h remaining');
            LoggedTime()
                .should('be.visible')
                .should('have.text', '9h logged');
        });
    });

        function navigateToIssueDetailsModal(){
            cy.visit('/');
            cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
                cy.visit(url + '/board');
                cy.contains('This is an issue of type: Task.').click();
                getIssueDetailsModal().should('be.visible');
            }); 
        };

        function getTimeTrackingModal(){
            TimeLoggingButton().click();
        };

        function checkTrackingModalVisibility(){
            TrackingModal().should('be.visible');
        }
});
