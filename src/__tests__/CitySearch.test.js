import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

describe('<CitySearch /> component', () => {

    let locations, CitySearchWrapper;
    beforeAll(() => {
        locations = extractLocations(mockData);
        CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}} />);   
    })
    

    test('Render text box in CitySearch', () => {
        //Under we expect to find a '.city' in the input.
        expect(CitySearchWrapper.find('.city')).toHaveLength(1);
    });

    test('Render a list of suggestions', () => {
        //Under we define '.suggestions' that will generate a city according to what the User type in input.
        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
    });

    test('Render text input correctly', () => {
        const query = CitySearchWrapper.state('query');
        /*Here we create a 'query' const that will be the state of the component.
        Under it expects that it will 'show' a '.city' equal to the one the user is writing (what is written by the user changes the state.
        The input value is the query.state)*/
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
    });

    test('Change state when input changes', () => {
        //Under was defined a state 'Munich' to simulate the change.
        CitySearchWrapper.setState({ query: 'Munich' });
        //Under, regarding 'calendar.events.list' in 'handler.js' was defined an eventObject to simulate the change.
        const eventObject = { target: { value: 'Berlin' } };

        CitySearchWrapper.find('.city').simulate('change', eventObject);
        expect(CitySearchWrapper.state('query')).toBe('Berlin');
    });

    test('Render list of suggestion correctly', () => {
       const locations = extractLocations(mockData);

        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');

        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
        for (let i=0; i < suggestions.length; i += 1) {
            expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
        }
    });

    test('suggestion list match the query when changed', () => {
        CitySearchWrapper.setState({ query: '', suggestions: [] });
        CitySearchWrapper.find('.city').simulate('change', { target: { value: "Berlin" } });
        
        const query = CitySearchWrapper.state('query');
        const filteredLocations = locations.filter((location) => {
            return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
        });

        expect(CitySearchWrapper.state('suggestions')).toEqual(filteredLocations);
    });

    test('selecting a suggestion should change query state', () => {
        CitySearchWrapper.setState({ query: 'Berlin' });
        const suggestions = CitySearchWrapper.state('suggestions');
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');

        expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);
    });


    test('selecting CitySearch input reveals the suggestion list', () => {
        
        CitySearchWrapper.find('.city').simulate('focus');
        expect(CitySearchWrapper.state('showSuggestions')).toBe(true);
        expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({ display: 'none' });
    });

    test('selecting the suggestion should hide the suggestion list', () => {

        CitySearchWrapper.setState({ query: 'Berlin', showSuggestions: undefined });
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state('showSuggestions')).toBe(false);
        expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({ display: 'none' })
    })
});