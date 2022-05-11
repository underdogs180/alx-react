mport React from 'react';
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

	  describe('listNotifications is empty', () => {
		      test('renders correctly if empty array is passed', () => {
			            const wrapper = shallow(<Notifications />);
			            const notifs = wrapper.find(NotificationItem);

			            expect(notifs).to.have.lengthOf(0);
			          });

		      test('renders correctly if listNotifications prop not specified', () => {
			            const wrapper = shallow(<Notifications />);
			            const notifs = wrapper.find(NotificationItem);

			            expect(notifs).to.have.lengthOf(0);
			          });
		    });

	  describe('listNotifications is not empty', () => {
		      const testNotifs = [
			            { id: 0, type: 'default', value: 'New project available' },
			            {
					            id: 1,
					            type: 'urgent',
					            html: { __html: '<strong>Project Deadline Approaching</strong>' }
					          }
			          ];

		      const wrapper = shallow(
			            <Notifications listNotifications={testNotifs} displayDrawer={true} />
			          );
		      const notifs = wrapper.find(NotificationItem);

		      test('renders correct amount of notifications', () => {
			            expect(notifs).to.have.lengthOf(2);
			          });

		      test('renders notifications with correct attributes', () => {
			            const notif0 = notifs.at(0);
			            const notif1 = notifs.at(1);

			            expect(notif0.props()).to.have.property('type', 'default');
			            expect(notif0.props()).to.have.property('value', 'New project available');
			            expect(notif0.props()).to.have.property('html', undefined);

			            expect(notif1.props()).to.have.property('type', 'urgent');
			            expect(notif1.props()).to.have.property('value', '');
			            expect(notif1.props()).to.have.property('html', {
					            __html: '<strong>Project Deadline Approaching</strong>'
					          });
			          });
		    });

	  describe('message displays properly', () => {
		      const wrapper = shallow(<Notifications displayDrawer={true} />);
		      const noNewNotifs = wrapper.find('.Notifications p');

		      expect(noNewNotifs).to.have.lengthOf(1);
		      expect(noNewNotifs.text()).to.equal('No new notifications for now');
		    });
});
