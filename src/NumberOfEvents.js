import React, { Component } from 'react';

class NumberOfEvents extends Component {
    render () {
        return (
            <div>
                <input 
                    type="number"
                    className="number-events" 
                    value={this.props.numberOfEvents} 
                    onChange={(e) => this.props.updateNumberOfEvents(e)}/>
            </div>
        )
    }
}

export default NumberOfEvents;