import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { shallow } from 'enzyme';
import EventList from "../EventList";
import Event from "../Event";
import { mockData } from "../mock-data";

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

    test('An event element is collapsed by default.', ({ given, when, then }) => {
        given('user hasn’t done anything', () => {

        });
        let EventListWrapper;
        when('an event list is displayed', () => {
            EventListWrapper = shallow(<EventList events={mockData} />);
            expect(EventListWrapper.find('.EventList')).toHaveLength(1);
        });
        let EventWrapper;
        then('the details will be collapsed by default', () => {
            EventWrapper = shallow(<Event event={mockData[0]}/>);
            
            expect(EventWrapper.state('collapsed')).toBe(true);
        });
    });

    test('User can expand an event to see its details.', ({ given, when, then }) => {
        let EventWrapper;
        given('the list of events has been loaded', () => {
            EventWrapper = shallow(<Event event={mockData[0]} />)
            
        });

        when('user clicks on “Show details” button for an event', () => {
            EventWrapper.find('.show-details').simulate('click');
        });

        then('the event element will be expanded to show the event details', () => {
            expect(EventWrapper.state('collapsed')).toBe(false);
        });
    });

    test('User can collapse an event to hide its details.', ({ given, when, and }) => {
        let EventWrapper;
        given('the list of events has been loaded', () => {
            EventWrapper = shallow(<Event event={mockData[0]} />);
            EventWrapper.setState({ collapsed: false });
        });

        when('user clicks on “Hide details” button for an event', () => {
            EventWrapper.find('.show-details').simulate('click');
        });

        and('the event element will hide the event details', () => {
            expect(EventWrapper.state('collapsed')).toBe(true);
        });
    });

});