import React from 'react';
import { shallow } from 'enzyme/build';
import EventList from '../EventList';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<EventList /> component', () => {

    test('render correct number of events on list', () => {
        const EventListWrapper = shallow(<EventList
             events={mockData} />);
        expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
    })
})