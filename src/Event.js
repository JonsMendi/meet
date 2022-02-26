import React, { Component } from 'react';

class Event extends Component {
    state = {
        collapsed: true
    }

    handleOnClick = () => {
        this.setState({ collapsed: !this.state.collapsed });
    }

    render () {
        const { event } = this.props;
        const { collapsed } = this.state;
        return (
            <div className="event">
                <h3 className="start-date">{event.start.timeZone}</h3>
                <p className="location">{event.location}</p>
                <p className="summary">{event.summary}</p>
                <p className="description">{event.description}</p>
                <button className="show-details" onClick={this.handleOnClick}>{collapsed ? "Show Details" : "Hide Details"}</button>
            </div>
        )
    }
}

export default Event;