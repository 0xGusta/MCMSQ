import { useState, useEffect, useCallback } from 'react';
import { useStateTogether } from 'react-together';

const STALE_TIMEOUT = 60000;

export function usePresence(userId, userInfo) {
  const [presenceState, setPresenceState] = useStateTogether('presence', {});
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTick(t => t + 1);
    }, STALE_TIMEOUT);
    return () => clearInterval(intervalId);
  }, []);

  const updateMyPresence = useCallback((dataToUpdate) => {
    if (!userId) return;
    setPresenceState(prev => {
      const currentPresence = prev || {};
      return {
        ...currentPresence,
        [userId]: {
          ...(currentPresence[userId] || { userInfo }),
          userId,
          lastSeen: Date.now(),
          ...dataToUpdate
        }
      };
    });
  }, [userId, userInfo, setPresenceState]);

  useEffect(() => {
    if (!userId) return;

    updateMyPresence({ isOnline: true });

    const handleFocus = () => updateMyPresence({ isOnline: true });
    window.addEventListener('focus', handleFocus);
    window.addEventListener('pageshow', handleFocus);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            handleFocus();
        }
    });

    return () => {
      setPresenceState(prev => {
        const newState = { ...(prev || {}) };
        if (newState[userId]) {
          newState[userId].isOnline = false;
          newState[userId].isTyping = false;
        }
        return newState;
      });
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('pageshow', handleFocus);
    };
  }, [userId, updateMyPresence]);

  const now = Date.now();
  const allUsers = Object.values(presenceState || {}).filter(user => {
      
      return (now - (user.lastSeen || 0)) < STALE_TIMEOUT;
  });

  const onlineCount = allUsers.filter(user => user.isOnline).length;
  const myPresence = allUsers.find(user => user.userId === userId);
  const others = allUsers.filter(user => user.userId !== userId);


  return { myPresence, others, allUsers, updateMyPresence, onlineCount };
                                   }
