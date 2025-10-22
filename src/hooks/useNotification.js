import { useState, useEffect, useCallback } from 'react';
import { NOTIFICATION_CONFIG, SESSION_TYPES } from '../utils/constants';
import { notificationSound } from '../utils/notificationSound';

export const useNotification = () => {
  const [permission, setPermission] = useState('default');
  const [isSupported, setIsSupported] = useState(false);

  // Check if notifications are supported
  useEffect(() => {
    if ('Notification' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      console.warn('Notifications are not supported in this browser');
      return false;
    }

    if (permission === 'granted') {
      return true;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, [isSupported, permission]);

  // Show notification
  const showNotification = useCallback(
    (sessionType) => {
      // ALWAYS play sound regardless of notification permission
      try {
        notificationSound.playDoubleChime();
      } catch (error) {
        console.error('Error playing notification sound:', error);
      }

      let title = '';
      let body = '';

      switch (sessionType) {
        case SESSION_TYPES.WORK:
          title = '🎯 Work Session Complete!';
          body = 'Great job! Time for a well-deserved break.';
          break;
        case SESSION_TYPES.SHORT_BREAK:
          title = '☕ Break Time Over!';
          body = 'Ready to get back to work? Let\'s focus!';
          break;
        case SESSION_TYPES.LONG_BREAK:
          title = '🌟 Long Break Complete!';
          body = 'You\'ve earned this rest. Time to continue being productive!';
          break;
        default:
          title = '⏰ Timer Complete!';
          body = 'Your session has ended.';
      }

      // Show browser notification if supported and permitted
      if (isSupported && permission === 'granted') {
        try {
          const notification = new Notification(title, {
            body,
            icon: NOTIFICATION_CONFIG.icon,
            badge: NOTIFICATION_CONFIG.icon,
            requireInteraction: false,
            tag: 'lofimini-timer',
            silent: true, // We handle sound ourselves
          });

          // Auto-close after 8 seconds
          setTimeout(() => {
            notification.close();
          }, 8000);

          // Handle click - focus the tab
          notification.onclick = () => {
            window.focus();
            notification.close();
          };
        } catch (error) {
          console.error('Error showing notification:', error);
        }
      } else {
        // Fallback: Show alert if notifications not supported/permitted
        console.log(`Timer Complete: ${title} - ${body}`);
      }
    },
    [isSupported, permission]
  );

  return {
    permission,
    isSupported,
    requestPermission,
    showNotification,
  };
};
