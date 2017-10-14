import React from 'react'
import Icon from '../common/Icon'
import notificationicon from '../common/notificationicon.svg'


const NotificationButton = props =>
    <Icon
        className="notification-icon"
        imgSrc={(notificationicon && notificationicon.src) || notificationicon}
        alt="N"
        {...props}
    />

export default NotificationButton
