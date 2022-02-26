import React from 'react';
import { shallow } from 'enzyme/build';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

describe('<App /> component', () => {

    let AppWrapper;
    
    beforeAll(() => {
        AppWrapper = shallow(<App />)
        /*any code within a beforeAll() function will be executed before each and every one of the tests in your test suite.
        This saves you from having to rewrite it every time.*/
    })

    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    test('render number of events', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    })
});