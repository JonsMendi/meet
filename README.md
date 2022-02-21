## MEET APP

- To build a serverless, progressive web application (PWA) with React using a
  test-driven development (TDD) technique. The application uses the Google
  Calendar API to fetch upcoming events.

### Key Features

- Filter events by city.
- Show/hide event details.
- Specify number of events.
- Use the app when offline.
- Add an app shortcut to the home screen.
- View a chart showing the number of upcoming events by city.

### User Stories & Scenarios

**FEATURE 1: FILTER EVENTS BY CITY**

- User Stories: As a user I should be able to filter the events by cities, so that I can see the list of events by cities.
- Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
- Scenario 2: User should see a list of suggestions when they search for a city.
- Scenario 3: User can select a city from the suggested list.

**FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS**

- User Stories: As a user I should be able to click in a button so that I can hide/show the details.
- Scenario 1: An event element is collapsed by default.
- Scenario 2: User can expand an event to see its details.
- Scenario 3: User can collapse an event to hide its details.

**FEATURE 3: SPECIFY NUMBER OF EVENTS**

- User Stories: As a user I should be able to specify a number of events, so that I can decide the desire number of events possibles to see.
- Scenario 1: When user hasn’t specified a number, 32 is the default number.
- Scenario 2: User can change the number of events they want to see.

**FEATURE 4: USE THE APP WHEN OFFLINE**

- User Stories: As a user I should be able to use the app offline, so that I can see the cached information without internet.
- Scenario 1: Show cached data when there’s no internet connection.
- Scenario 2: Show error when user changes the settings (city, time range).

**FEATURE 5: DATA VISUALIZATION**

- User Stories: As a user I should be able to check the upcoming events, so that I can filter it for each city.
- Scenario 1: Show a chart with the number of upcoming events in each city.
