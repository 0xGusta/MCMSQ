// src/hooks/usePresence.js
import { useState, useEffect, useCallback } from 'react';
import { useStateTogether } from 'react-together';

const HEARTBEAT_INTERVAL = 5000; // 5 segundos
const ONLINE_TIMEOUT = 15000;     // 15 segundos

export function usePresence(userId, userInfo) {
  const [presenceState, setPresenceState] = useStateTogether('presence', {});

  // Efeito para adicionar/remover o usuário e implementar o heartbeat
  useEffect(() => {
    if (!userId) return;

    // Adiciona o usuário ao estado de presença
    setPresenceState(prev => ({
     ...prev,
      [userId]: {
        userId,
        userInfo,
        isTyping: false,
        lastSeen: Date.now()
      }
    }));

    // Inicia o heartbeat para o usuário local
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

    // Função de limpeza para remover o usuário
    return () => {
      clearInterval(intervalId);
      setPresenceState(prev => {
        const newState = {...prev };
        delete newState[userId];
        return newState;
      });
    };
  }, [userId, userInfo, setPresenceState]);

  // Deriva o estado de alto nível a partir do presenceState bruto
  const now = Date.now();
  const allUsers = Object.values(presenceState).map(user => ({
   ...user,
    isOnline: (now - user.lastSeen) < ONLINE_TIMEOUT
  }));

  const onlineCount = allUsers.filter(user => user.isOnline).length;
  const myPresence = allUsers.find(user => user.userId === userId);
  const others = allUsers.filter(user => user.userId!== userId);

  // Função para atualizar o estado de presença do usuário
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

  return { myPresence, others, updateMyPresence, onlineCount };
}