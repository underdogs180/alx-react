import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './Notifications.css';
import { getLatestNotification } from '../Utils/utils';
import closeIcon from '../close-icon.png';

import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

export const Notification = ({ displayDrawer, listNotifications }) => {
    return (
	    <div className='notifications-wrapper'>
	    <div className='menuItem'>Your Notifications</div>
	    {displayDrawer && (
		    <div className='Notifications'>
		    {listNotifications.length ? (
			    <Fragment>
			    <p>Here is the list of notifications</p>
			    <ul>
			    {listNotifications.map(({ id, type, value, html }) => (
				    <NotificationItem
				key={id}
				type={type}
				value={value}
				html={html}
				    />
			    ))}
			</ul>
			    </Fragment>
		    ) : (
			    <p>No new notifications for now</p>
		    )}
		    <button
		className='close-icon'
		aria-label='Close'
		onClick={() => console.log('Close button has been clicked')}
		    >
		    <img
		src={closeIcon}
		alt='Close'
		style={{ height: '20px', width: '20px' }}
		    />
		    </button>
		    </div>
	    )}
	</div>
    );
};

Notification.propTypes = {
    displayDrawer: PropTypes.bool,
    listNotifications: PropTypes.arrayOf(NotificationItemShape)
};

Notification.defaultProps = {
    displayDrawer: false,
    listNotifications: []
};

export default Notification;
