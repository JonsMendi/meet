import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {

    let NumberOfEventsWrapper;

    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test('render text input', () => {
        expect(NumberOfEventsWrapper.find('.number-events')).toHaveLength(1);
    });

    test('render text input correctly', () => {
        const numberOfEvents = NumberOfEventsWrapper.state('numberOfEvents');

        expect(NumberOfEventsWrapper.find('.number-events').prop('value')).toBe(numberOfEvents);
    })

    test('change state according input number', () => {
        NumberOfEventsWrapper.setState({ numberOfEvents: '32' });
        const eventNumber = {target: { value: '2' }};
        NumberOfEventsWrapper.find('.number-events').simulate('change', eventNumber);

        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe('2')
    })
})