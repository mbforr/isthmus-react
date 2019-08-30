import React, { useState } from 'react';
import '@carto/airship-style';

const Avatar = ({ size, icon, alt }) => {
    const [finalSize, setFinalSize] = useState(null)

        let avatarSize
        if (size === 'l' || size === 'xl') {
            avatarSize = `as-avatar as-avatar--${size}`
        } else {
            avatarSize = `as-avatar`
        }

    // setFinalSize(avatarSize)


return (
    <img
        className={avatarSize}
        src={icon}
        alt={alt}
    >
    </img>      
)
}
export default Avatar;
