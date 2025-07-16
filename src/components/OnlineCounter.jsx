import React from 'react';
import { usePresence } from '../hooks/usePresence';

const OnlineCounter = () => {
  const userId = 'currentUser123';
  const userInfo = { name: 'Current User' };
  const { onlineCount } = usePresence(userId, userInfo);

  return (
    <div className="online-counter">
      Online: {onlineCount}
    </div>
  );
};

export default OnlineCounter;