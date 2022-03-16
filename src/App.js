import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import meetyourapp from './images/meetyourapp.png';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
    showWelcomeScreen: undefined
  }

  /*Under the componentDidMount loads events when the app loads. 
  We'll use componentDidMount in App.js to make the API call and save the initial data to state.
  What is happening under?
  - First, we're trying to get the token from localStorage (it goes
  to localStorage when the getToken() function in “src/api.js” is called). Then, we’re trying to verify it
  using another function from “src/api.js”—checkToken()—hence why you needed to export it from
  there. If there’s an error in the object returned by checkToken(), the variable isTokenValid will be
  assigned with the value false; otherwise, it will be true. */
   
  async componentDidMount() {
    this.mounted = true;
    // Only attempt to access Google API if online
    if (navigator.onLine & !window.location.href.startsWith('http://localhost')) {
      //Under, check if the accessToken is valid.
      const accessToken = localStorage.getItem('access_token');
      const tokenIsValid = (await checkToken(accessToken)).error ? false : true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');
      //Under, if there are missing a valid code or token the welcome page will be displayed.
      this.setState({ showWelcomeScreen: !(code || tokenIsValid) });
      if ((code || tokenIsValid) && this.mounted) {
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({
              events: events.slice(0, this.state.numberOfEvents),
              locations: extractLocations(events)
            });
          }
        });
      }
    }
    // If offline, display MockData.
    else {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events)
          });
        }
      });
    }
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
    /*The state 'showWelcomeScreen' will be used as a flag to determine when to render the welcome screen
    as follows: true will mean “show the welcome screen,” false will mean “hide it to show the
    other components,” and undefined will be used to render an empty div until the state gets
    either true or false: */
    

    return (
      <div className="App">
        <img className='main-image' src={meetyourapp} alt="meet-your-apa_image" />
        <NumberOfEvents 
          numberOfEvents={this.state.numberOfEvents} 
          updateNumberOfEvents={this.updateNumberOfEvents} 
          errorAlert ={this.state.errorAlert}/>
        <CitySearch 
          locations={this.state.locations} 
          updateEvents={this.updateEvents}/>
        {/* --- */}
        {/*Under the WarningAlert is displayed if the user is offline. 'onLine' is using NProgress package */}
        { !navigator.onLine ? (<WarningAlert text='Sorry, you are in offline mode!' />) : (<WarningAlert text=' ' />)}
        {/* --- */}
        <EventList 
          events={this.state.events} />
        {/* --- */}
        {/*Under, the WelcomeScreen will be displayed only if the user is offline*/}
        {navigator.onLine && <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />}
        {/* --- */}
      </div>
    );
  }
}

export default App;
