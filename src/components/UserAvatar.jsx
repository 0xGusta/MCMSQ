import React from 'react';
import './UserAvatar.css';

const UserAvatar = ({ user }) => {
  if (!user ||!user.userInfo) {
    return null;
  }

  const { userInfo, isOnline } = user;
  return (
    <div className="avatar-container">
      <img
        src={userInfo.avatarUrl || 'default-avatar.png'}
        alt={userInfo.name}
        className="avatar-image"
      />
      {isOnline && <div className="status-dot online"></div>}
    </div>
  );
};

export default UserAvatar;