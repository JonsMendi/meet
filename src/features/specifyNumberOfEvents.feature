Feature: Specify number of events

    Scenario: When user hasn’t specified a number, 32 is the default number.
        Given the user hasn’t specified a number.
        When being on the main page.
        Then the default number of thirty two will be.

    Scenario: User can change the number of events they want to see.
        Given the list of events.
        When user changed the number of events.
        Then the number of events will be changed according the typed number.
