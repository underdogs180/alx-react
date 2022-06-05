import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Notifications from './Notifications'
import NotificationItem from './NotificationItem';

describe('<Notifications />', () => {
    test('renders without crashing', () => {
	const wrapper = shallow(<Notifications />);

	expect(wrapper.exists());
    });

    describe('displayDrawer is true', () => {
	test('has a close button', () => {
	    const wrapper = shallow(<Notifications displayDrawer={true} />);

	    expect(wrapper.find('img')).to.have.lengthOf(1);
	});
	test('renders a list with three items', () => {
	    const wrapper = shallow(<Notifications displayDrawer={true} />);
	    const listItems = wrapper.find(NotificationItem);

	    expect(listItems).to.have.lengthOf(3);
	});
	test('renders description text', () => {
	    const wrapper = shallow(<Notifications displayDrawer={true} />);
	    const text = wrapper.find('p');

	    expect(wrapper.find('p').first().text()).to.equal('Here is the list of notifications');
	});
	test('menu item is displayed', () => {
	    const wrapper = shallow(<Notifications displayDrawer={true} />);
	    const menuItem = wrapper.find('.menuItem');

	    expect(menuItem).to.have.lengthOf(1);
	});

	test('notifications div is displayed', () => {
	    const wrapper = shallow(<Notifications displayDrawer={true} />);
	    const notifs = wrapper.find('div.Notifications');

	    expect(notifs).to.have.lengthOf(1);
	});
    });

    describe('displayDrawer is false', () => {
	test('menu item is displayed', () => {
	    const wrapper = shallow(<Notifications />);
	    const menuItem = wrapper.find('.menuItem');

	    expect(menuItem).to.have.lengthOf(1);
	});

	test('notifications div is not displayed', () => {
	    const wrapper = shallow(<Notifications />);
	    const notifs = wrapper.find('div.Notifications');

	    expect(notifs).to.have.lengthOf(0);
	});
    });
});
