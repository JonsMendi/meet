import { loadFeature, defineFeature } from "jest-cucumber";
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    test('When user hasn’t specified a number, 32 is the default number.', ({ given, when, then }) => {
        
        given('the user hasn’t specified a number.', () => {
            
        });
        let AppWrapper;
        when('being on the main page.', () => {
            AppWrapper = mount(<App />);
        });

        then('the default number of thirty two will be.', () => {
            expect(AppWrapper.state('numberOfEvents')).toBe(32);
        });
    });

    test('User can change the number of events they want to see.', ({ given, when, then }) => {
        let AppWrapper;
        given('the list of events.', () => {
            AppWrapper = mount(<App />);
        });

        when('user changed the number of events.', () => {
            const inputNumber = { target: { value: 1 } };
            AppWrapper.find('.number-events').simulate('change', inputNumber);
        });

        then('the number of events will be changed according the typed number.', () => {
            const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            NumberOfEventsWrapper.setState({ numberOfEvents: 1 });
            expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(1)
        });
    });

});