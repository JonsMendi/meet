import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    render () {
        return (
            <div className="numberOfEvents">
                <label>Number of Events</label>
                <input 
                    type="number"
                    className="number-events" 
                    value={this.props.numberOfEvents} 
                    onChange={(e) => this.props.updateNumberOfEvents(e)}/>
                <ErrorAlert text={this.props.errorAlert} />    
            </div>
        )
    }
}

export default NumberOfEvents;