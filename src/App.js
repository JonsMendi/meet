import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import meetyourapp from './images/meetyourapp.png';
import { WarningAlert } from './Alert';



class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
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
  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === "all") 
      ? events
      : events.filter((event) => event.location === location);
      if( this.mounted){
        this.setState({
        events: locationEvents.slice(0, this.state.numberOfEvents),//the events that will be display are added by the slice() that joins the other(numberOfEvents) state.
        currentLocation: location
        });

      }   
    });
  };

  updateNumberOfEvents = (eventCount) => {
    const updateNumber = eventCount.target.value;
    
    if (updateNumber < 1 || updateNumber > 32) {
      this.setState({
        numberOfEvents: updateNumber,
        errorAlert: 'Please choose a number between 1 and 32' 
      })
    } else {
    this.setState({
      errorAlert:'', 
      numberOfEvents: updateNumber
      
    });
    this.updateEvents(this.state.currentLocation, this.state.numberOfEvents);
    }
  };

  render() {
    return (
      <div className="App">
        { !navigator.onLine ? (<WarningAlert text='Sorry, you are in offline mode!' />) : (<WarningAlert text=' ' />)}
        <img className='main-image' src={meetyourapp} alt="meet-your-apa_image" />
        <NumberOfEvents 
          numberOfEvents={this.state.numberOfEvents} 
          updateNumberOfEvents={this.updateNumberOfEvents} 
          errorAlert ={this.state.errorAlert}/>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
