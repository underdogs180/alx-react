mport React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import { getLatestNotification } from '../utils/utils';
import { StyleSheetTestUtils } from 'aphrodite';

describe('<Notification />', () => {
	  beforeAll(() => {
		      StyleSheetTestUtils.suppressStyleInjection();
		    });
	  afterAll(() => {
		      StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
		    });

	  it('render without crashing', () => {
		      const wrapper = shallow(<Notifications />);
		      expect(wrapper.exists());
		    });

	  it('Notification Item with html', () => {
		      const wrapper = shallow(<Notifications displayDrawer />);
		      const nItem = wrapper.find('NotificationItem');
		      expect(nItem).toBeDefined();
		    });
	  it('Notification with displayDrawer false', () => {
		      const wrapper = shallow(<Notifications />);
		      const dNoti = wrapper.find('div.Notifications');
		      expect(dNoti).toHaveLength(0);
		    });
});

describe('listNotifications with values', () => {
	  beforeAll(() => {
		      StyleSheetTestUtils.suppressStyleInjection();
		    });
	  afterAll(() => {
		      StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
		    });

	  let latestNotification = undefined;
	  let listNotifications = undefined;

	  beforeEach(() => {
		      latestNotification = getLatestNotification();
		      listNotifications = [
			            { id: 1, type: 'default', value: 'New course available' },
			            { id: 2, type: 'urgent', value: 'New resume available' },
			            { id: 3, type: 'urgent', html: { __html: latestNotification } },
			          ];
		    });

	  it('values', () => {
		      const wrapper = shallow(
			            <Notifications displayDrawer listNotifications={listNotifications} />
			          );
		      expect(wrapper.exists());
		      const nItem = wrapper.find('NotificationItem');
		      expect(nItem).toBeDefined();
		      expect(nItem).toHaveLength(3);
		      expect(nItem.at(0).html()).toEqual(
			            '<li data-notification-type="default">New course available</li>'
			          );
		      expect(nItem.at(1).html()).toEqual(
			            '<li data-notification-type="urgent">New resume available</li>'
			          );
		      expect(nItem.at(2).html()).toEqual(
			            `<li data-notification-type="urgent">${latestNotification}</li>`
			          );
		    });
});

describe('listNotifications without values', () => {
	  beforeAll(() => {
		      StyleSheetTestUtils.suppressStyleInjection();
		    });
	  afterAll(() => {
		      StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
		    });

	  let listNotifications = undefined;
	  beforeEach(() => {
		      listNotifications = [];
		    });

	  it('empty', () => {
		      const wrapper = shallow(
			            <Notifications displayDrawer listNotifications={listNotifications} />
			          );
		      expect(wrapper.exists());
		      const nItem = wrapper.find('NotificationItem');
		      expect(nItem).toHaveLength(1);
		      expect(nItem.html()).toEqual(
			            '<li data-notification-type="default">No new notification for now</li>'
			          );
		    });

	  it('without listNotifications', () => {
		      const wrapper = shallow(<Notifications displayDrawer />);
		      const nItem = wrapper.find('NotificationItem');
		      expect(nItem).toHaveLength(1);
		      expect(nItem.html()).toEqual(
			            '<li data-notification-type="default">No new notification for now</li>'
			          );
		    });
});

describe('markAsRead', () => {
	  beforeAll(() => {
		      StyleSheetTestUtils.suppressStyleInjection();
		    });
	  afterAll(() => {
		      StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
		    });

	  it('console.log', () => {
		      const wrapper = shallow(<Notifications displayDrawer />);
		      console.log = jest.fn();
		      const instance = wrapper.instance();
		      const id = 0;
		      instance.markAsRead(id);
		      expect(console.log).toHaveBeenCalledWith(
			            `Notification ${id} has been marked as read`
			          );
		      jest.restoreAllMocks();
		    });
});

describe('updating the props of the component', () => {
	  beforeAll(() => {
		      StyleSheetTestUtils.suppressStyleInjection();
		    });
	  afterAll(() => {
		      StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
		    });

	  it('with the same list, the component doesn’t rerender', () => {
		      const listNotifications = [
			            { id: 1, type: 'default', value: 'New course available' },
			            { id: 2, type: 'urgent', value: 'New resume available' },
			          ];
		      const wrapper = shallow(
			            <Notifications displayDrawer listNotifications={listNotifications} />
			          );
		      const shouldComponentUpdate = jest.spyOn(
			            Notifications.prototype,
			            'shouldComponentUpdate'
			          );
		      wrapper.setProps({ listNotifications: listNotifications });
		      expect(shouldComponentUpdate).toHaveBeenCalled();
		      expect(shouldComponentUpdate).toHaveLastReturnedWith(false);
		      jest.restoreAllMocks();
		    });

	  it('with a longer list, the component does rerender', () => {
		      const listNotifications = [
			            { id: 1, type: 'default', value: 'New course available' },
			            { id: 2, type: 'urgent', value: 'New resume available' },
			          ];
		      let latestNotification;
		      const listNotifications2 = [
			            { id: 1, type: 'default', value: 'New course available' },
			            { id: 2, type: 'urgent', value: 'New resume available' },
			            { id: 3, type: 'urgent', html: { __html: latestNotification } },
			          ];
		      console.log(listNotifications);
		      const wrapper = shallow(
			            <Notifications displayDrawer listNotifications={listNotifications} />
			          );
		      const shouldComponentUpdate = jest.spyOn(
			            Notifications.prototype,
			            'shouldComponentUpdate'
			          );
		      wrapper.setProps({ listNotifications: listNotifications2 });
		      expect(shouldComponentUpdate).toHaveBeenCalled();
		      expect(shouldComponentUpdate).toHaveLastReturnedWith(true);
		      jest.restoreAllMocks();
		    });
});
