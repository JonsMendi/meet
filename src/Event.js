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
                <h3 className="start-date">{event.summary}</h3>
                <p className="summary">@{event.summary} | {event.location}</p>
                <p className="location">{event.start.dateTime} ({event.start.timeZone})</p>
                <p className="description">{event.description}</p>
                <button className="show-details" onClick={this.handleOnClick}>{collapsed ? "Show Details" : "Hide Details"}</button>
                {!collapsed && (
                <div className="details-view">
                    <h2 className="details-header">About event:</h2>
                    <a href={event.htmlLink} className='details-link' rel="noreferrer" target='_blank'>See details on Google Calendar</a>
                    <p className='description'>{event.description}</p>
                </div>
                 )}
            </div>
        )
    }
}

export default Event;