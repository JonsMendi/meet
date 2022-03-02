import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';


describe('<NumberOfEvents /> component', () => {

    let NumberOfEventsWrapper;
    let spy;

    beforeAll(() => {
        spy = jest.spyOn({updateNumberOfEvents: ()=>{}}, "updateNumberOfEvents");
        NumberOfEventsWrapper = shallow(<NumberOfEvents numberOfEvents={32} updateNumberOfEvents={ spy } />);
    });

    test('render text input', () => {
        expect(NumberOfEventsWrapper.find('.number-events')).toHaveLength(1);
    });

    test('render text input correctly', () => {
        

        expect(NumberOfEventsWrapper.find('.number-events').prop('value')).toBe(32);
    })

    test('change state according input number', () => {
        
        const eventNumber = {target: { value: '2' }};
        NumberOfEventsWrapper.find('.number-events').simulate('change', eventNumber);

        expect(spy).toBeCalled();
    })
})