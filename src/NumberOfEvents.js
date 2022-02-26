import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: '32'
    }

    handleInputChange = (input) => {
        const value = input.target.value;
        this.setState({ numberOfEvents: value })
    }

    render () {
        return (
            <div>
                <input type="number" className="number-events" value={this.state.numberOfEvents} onChange={this.handleInputChange}/>
            </div>
        )
    }
}

export default NumberOfEvents;