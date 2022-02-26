import React from 'react';
import { shallow } from 'enzyme/build';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<EventList /> component', () => {
    
    let EventWrapper;
    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[1]} />);
    });

    test('render event', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1);
    });

    test('render location', () => {
        expect(EventWrapper.find('.location')).toHaveLength(1);
    });

    test('render summary', () => {
        expect(EventWrapper.find('.summary')).toHaveLength(1);
    });

    test('render description', () => {
        expect(EventWrapper.find('.description')).toHaveLength(1);
    });

    test('render event start date', () => {
        expect(EventWrapper.find('.start-date')).toHaveLength(1);
    });

    //Under hide/show button section

    test('render show details button', () => {
        expect(EventWrapper.find('.show-details')).toHaveLength(1);
    });

    test('show details after button clicked', () => {
        EventWrapper.setState({ collapsed: true });
        EventWrapper.find('.show-details').simulate('click');

        expect(EventWrapper.state('collapsed')).toBe(false);
    });

    test('hide details after button clicked', () => {
        EventWrapper.setState({ collapsed: false });
        EventWrapper.find('.show-details').simulate('click');

        expect(EventWrapper.state('collapsed')).toBe(true);
    });

})