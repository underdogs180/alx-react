import React from 'react';
import { shallow } from 'enzyme';

import CourseList from './CourseList';
import CourseListRow from './CourseListRow';

describe('CourseList', () => {
    test('renders without crashing', () => {
	const wrapper = shallow(<CourseList />);

	expect(wrapper.exists()).toBe(true);
    });

    test('renders 5 rows', () => {
	const wrapper = shallow(<CourseList />);
	const rows = wrapper.find(CourseListRow);

	expect(rows.length).toBe(5);
    });
});
