import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import meetyourapp from './images/meetyourapp.png';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


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

  /*Under, this method will update the number of events displayed according to the number typed 
  by the user in the NumberOfEvents input. This method is then passed as a prop in NumberOfEvents.
  The errorAlert is defined in the method as well and passed as prop.*/
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

  //Under the method map the locations and filter the events state to check the number of events per city.
  //Then this method is used in the ScatterChart to display the information. 
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  render() {

    return (
      <div className="App">
        <img className='main-image' src={meetyourapp} alt="meet-your-apa_image" />
        {/* --- */}
        <NumberOfEvents 
          numberOfEvents={this.state.numberOfEvents} 
          updateNumberOfEvents={this.updateNumberOfEvents} 
          errorAlert ={this.state.errorAlert}/>
        {/* --- */}
        <CitySearch 
          locations={this.state.locations} 
          updateEvents={this.updateEvents}/>
        {/* --- */}
        {/*Under the WarningAlert is displayed if the user is offline. 'onLine' is using NProgress package */}
        { !navigator.onLine ? (<WarningAlert text='Sorry, you are in offline mode!' />) : (<WarningAlert text=' ' />)}
        {/* --- */}
        {/*Under the chart's are displayed */}
        <div className='data-vis-wrapper'>
          <EventGenre events={this.state.events}/>
          <ResponsiveContainer height={400}>
          <ScatterChart margin={{top: 20, right: 20, bottom: 20, left: 20,}}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#1ba498" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
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
