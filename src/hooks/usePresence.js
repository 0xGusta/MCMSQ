import { useState, useEffect, useCallback } from 'react';
import { useStateTogether } from 'react-together';

const HEARTBEAT_INTERVAL = 5000;
const ONLINE_TIMEOUT = 5000;

export function usePresence(userId, userInfo) {
  const [presenceState, setPresenceState] = useStateTogether('presence', {});

  useEffect(() => {
    if (!userId) return;

    setPresenceState(prev => ({
     ...prev,
      [userId]: {
        userId,
        userInfo,
        isTyping: false,
        lastSeen: Date.now()
      }
    }));

    const intervalId = setInterval(() => {
      setPresenceState(prev => {
        if (!prev[userId]) return prev;
        return {
         ...prev,
          [userId]: {
           ...prev[userId],
            lastSeen: Date.now()
          }
        };
      });
    }, HEARTBEAT_INTERVAL);

    return () => {
      clearInterval(intervalId);
      setPresenceState(prev => {
        const newState = {...prev };
        delete newState[userId];
        return newState;
      });
    };
  }, [userId, userInfo, setPresenceState]);

  const now = Date.now();
  const allUsers = Object.values(presenceState).map(user => ({
   ...user,
    isOnline: (now - user.lastSeen) < ONLINE_TIMEOUT
  }));

  const onlineCount = allUsers.filter(user => user.isOnline).length;
  const myPresence = allUsers.find(user => user.userId === userId);
  const others = allUsers.filter(user => user.userId!== userId);

  const updateMyPresence = useCallback((dataToUpdate) => {
    if (!userId) return;
    setPresenceState(prev => {
      if (!prev[userId]) return prev;
      return {
       ...prev,
        [userId]: {
         ...prev[userId],
         ...dataToUpdate,
          lastSeen: Date.now()
        }
      };
    });
  }, [userId, setPresenceState]);

  return { myPresence, others, allUsers, updateMyPresence, onlineCount };
}
