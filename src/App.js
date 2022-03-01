import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32
  }

  /*Under the componentDidMount loads events when the app loads. 
  We'll use componentDidMount in App.js to make the API call and save the initial data to state */
   componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }


  /*Under, updateEvent is created to change the state in 'events' when a user clicks in a 'suggested' city.
  This method will then be passed to CitySearch component as props. 
  Finally this method will be used inside the 'handleItemClicked', in other words, when the user 'clicks' in the city*/
  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, this.state.numberOfEvents),
          currentLocation: location,
        });
      }
    });
  };

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <EventList events={this.state.events} numberOfEvents={this.state.numberOfEvents}/>
        <NumberOfEvents  />
      </div>
    );
  }
}

export default App;
