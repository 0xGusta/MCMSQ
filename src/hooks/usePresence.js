import { useState, useEffect, useCallback } from 'react';
import { useStateTogether } from 'react-together';

const HEARTBEAT_INTERVAL = 5000;
const ONLINE_TIMEOUT = 10000;

export function usePresence(userId, userInfo) {
  const [presenceState, setPresenceState] = useStateTogether('presence', {});
  const [, setTick] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTick(t => t + 1);
    }, 5000); 

    return () => clearInterval(intervalId);
  }, []);

  const updateMyPresenceState = useCallback(() => {
    if (!userId) return;
    setPresenceState(prev => {
      const currentPresence = prev || {}; 
      return {
        ...currentPresence,
        [userId]: {
          ...(currentPresence[userId] || {}),
          userId,
          userInfo,
          lastSeen: Date.now()
        }
      };
    });
  }, [userId, userInfo, setPresenceState]);

  useEffect(() => {
    if (!userId) return;

    updateMyPresenceState();
    const intervalId = setInterval(updateMyPresenceState, HEARTBEAT_INTERVAL);

    const handleActivity = () => {
      updateMyPresenceState();
    };

    window.addEventListener('focus', handleActivity);
    document.addEventListener('visibilitychange', handleActivity);
    window.addEventListener('pageshow', handleActivity);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', handleActivity);
      document.removeEventListener('visibilitychange', handleActivity);
      window.removeEventListener('pageshow', handleActivity);

      setPresenceState(prev => {
        const currentPresence = prev || {};
        const newState = { ...currentPresence };
        delete newState[userId];
        return newState;
      });
    };
  }, [userId, updateMyPresenceState]);

  const now = Date.now();
  const allUsers = Object.values(presenceState || {}).map(user => ({ 
    ...user,
    isOnline: (now - (user.lastSeen || 0)) < ONLINE_TIMEOUT
  }));

  const onlineCount = allUsers.filter(user => user.isOnline).length;
  const myPresence = allUsers.find(user => user.userId === userId);
  const others = allUsers.filter(user => user.userId !== userId);

  const updateMyPresence = useCallback((dataToUpdate) => {
    if (!userId) return;
    setPresenceState(prev => {
      const currentPresence = prev || {};
      if (!currentPresence[userId]) return currentPresence; 

      return {
        ...currentPresence,
        [userId]: {
          ...currentPresence[userId],
          ...dataToUpdate,
          lastSeen: Date.now()
        }
      };
    });
  }, [userId, setPresenceState]);

  return { myPresence, others, allUsers, updateMyPresence, onlineCount };
}
