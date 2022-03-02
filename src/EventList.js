import React, { Component } from 'react';
import Event from './Event';
import meetyourapp from './images/meetyourapp.png';

class EventList extends Component {

    render() {
        const { events } = this.props

        return (
            <ul className='EventList' >
                    <img className='main-image' src={meetyourapp} alt="ola" />
                {events.map(event => 
                    <li key={event.id}>
                        <Event event={event} />
                    </li>
                )}
            </ul>
        );
    }
}

export default EventList;