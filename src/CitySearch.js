import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component{
    state = {
        query: '',
        suggestions: [],
        showSuggestions: undefined
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({
            showSuggestions: true
        });
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        /*After the list of suggestion is returned (above), the If condition (under) 
        will check if the list contains the same input name, if not, the InfoText will be show. 
        If there is a suggestion, the InfoText will have an empty string.*/
        if (suggestions.length === 0) {
            this.setState({ 
                query: value,
                showSuggestions: false,
                infoText: 'We can not find the city you are looking for. Please try another city'
            });    
        } else {
            return this.setState({
                query: value,
                suggestions,
                infoText: '',
            });
        } 
    };

    handleItemClicked = (suggestion) => {
        this.setState({
          query: suggestion,
          showSuggestions: false,
          infoText: '',
        });
        /*'suggestion' being passed to handleItemClicked() is the variable that’s being
        passed to the map loop function’s callback.This is a different way to write a
        handler for the onClick event—the handler is the arrow function itself, not handleItemClicked */
        this.props.updateEvents(suggestion);
    }

    render () {
        return (
            <div className="CitySearch">
                <label className="city-search_label">City Search</label>
                <input 
                    type="text" 
                    className="city" 
                    value={this.state.query} 
                    onChange={this.handleInputChanged}
                    onFocus={() => { this.setState({ showSuggestions: true })}} />
                <ul className="suggestions" 
                    style={this.state.showSuggestions ? {} : { display: 'none' }}>
                    {this.state.suggestions.map((suggestion) => (
                        <li 
                        key={suggestion} 
                        onClick={() => this.handleItemClicked(suggestion)}
                        >{suggestion}</li>
                    ))}
                    <li onClick={() => this.handleItemClicked("all")}>
                        <b>See all cities</b>
                    </li>
                </ul>
                <InfoAlert text={this.state.infoText} />
            </div>
        )
    }
}

export default CitySearch;