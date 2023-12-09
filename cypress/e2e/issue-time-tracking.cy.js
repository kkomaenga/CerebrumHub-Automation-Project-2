describe('Time-tracking functionality', () => {
    beforeEach(() => {
        navigateToIssueDetailsModal()
        });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const Estimation = () => cy.get('[placeholder="Number"]');
    const EstimatedTime = () => cy.get('.sc-rBLzX.irwmBe div:last-child');
    const TimeLoggingButton = () => cy.get('[data-testid="icon:stopwatch"]');
    const TrackingModal = () => cy.get('[data-testid="modal:tracking"]');
    const LoggedTime = () => cy.get('.sc-rBLzX.irwmBe div:first-child');
    const CloseIssueDetailModal = () => cy.get('[data-testid="icon:close"]').first().click();
    const CheckNumberPlaceholderVisibility = () => cy.get('input[placeholder="Number"]').should('be.visible');


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
            //adding Remaining Time
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

    it('Test case: Add estimation; Update estimation; Remove estimation', () => {

        getIssueDetailsModal().within(() => {
            Estimation()
                .click()
                .clear()
                .should('be.visible')
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
            CloseIssueDetailModal();
        });
       
        cy.contains('This is an issue of type: Task.').click();
        getIssueDetailsModal().within(() => {
            Estimation()
                .should('be.visible') 
                .should('have.value', '10');
            EstimatedTime()
                .should('be.visible')
                .should('have.text', '10h estimated');
            Estimation()
                .click()
                .clear()
                .type('20');
            CloseIssueDetailModal();
        });
        cy.contains('This is an issue of type: Task.').click();
        getIssueDetailsModal().within(() => {
            Estimation()
                .should('be.visible') 
                .should('have.value', '20');
            EstimatedTime()
                .should('be.visible')
                .should('have.text', '20h estimated');
            Estimation()
                .click()
                .clear();
            CloseIssueDetailModal();
        });
        cy.contains('This is an issue of type: Task.').click();
        getIssueDetailsModal().within(() => {
            Estimation()
                .click()
                .clear()
                .should('have.value', '');
            EstimatedTime().should('not.contain', '8h estimated');
            CheckNumberPlaceholderVisibility();
            CloseIssueDetailModal();
        });
    });

    it('Test case: Log Time; Remove logged time', () => {

        getIssueDetailsModal().within(() => {
            Estimation()
                .click()
                .clear()
                .should('be.visible')
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
            getTimeTrackingModal()
        });
        checkTrackingModalVisibility();
        TrackingModal().within(()=> {
            Estimation()
                .first()
                .click()
                .clear()
                .type('2');
            //adding Remaining Time
            Estimation()
                .eq(1).click()
                .type('5');
            cy.contains('button', 'Done')
                .click()
                .should('not.exist');
        });
        getIssueDetailsModal().within(() => {
            EstimatedTime()
                .should('be.visible')
                .should('have.text', '5h remaining');
            LoggedTime()
                .should('be.visible')
                .should('have.text', '2h logged')
                .should('not.contain', 'No time logged');
            getTimeTrackingModal()
        });
        checkTrackingModalVisibility();
        TrackingModal().within(()=> {
            Estimation()
                .first()
                .click()
                .clear();
            //adding Remaining Time
            Estimation()
                .eq(1).click()
                .clear();
            cy.contains('button', 'Done')
                .click()
                .should('not.exist');
        });
        getIssueDetailsModal().within(() => {
            EstimatedTime()
                .should('be.visible')
                .should('have.text', '10h estimated');
            LoggedTime()
                .should('be.visible')
                .should('have.text', 'No time logged')
                .should('not.contain', '2h logged');
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
