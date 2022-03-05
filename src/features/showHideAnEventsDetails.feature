Feature: Show/Hide event details

    Scenario: An event element is collapsed by default.
        Given user hasn’t done anything
        When an event list is displayed
        Then the details will be collapsed by default

    Scenario: User can expand an event to see its details.
        Given the list of events has been loaded
        When user clicks on “Show details” button for an event
        Then the event element will be expanded to show the event details

    Scenario: User can collapse an event to hide its details.
        Given the list of events has been loaded
        When user clicks on “Hide details” button for an event
        And the event element will hide the event details