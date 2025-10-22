import { useState, useEffect, useRef, useCallback } from 'react';
import {
  TIMER_MODES,
  SESSION_TYPES,
  POMODORO_SETTINGS,
  CUSTOM_TIMER_DEFAULTS,
} from '../utils/constants';

export const useTimer = () => {
  // Timer mode: pomodoro or custom
  const [mode, setMode] = useState(TIMER_MODES.POMODORO);

  // Current session type
  const [sessionType, setSessionType] = useState(SESSION_TYPES.WORK);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(POMODORO_SETTINGS[SESSION_TYPES.WORK] * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(POMODORO_SETTINGS[SESSION_TYPES.WORK] * 60);

  // Custom timer settings
  const [customSettings, setCustomSettings] = useState(CUSTOM_TIMER_DEFAULTS);

  // Sessions counter for long break
  const [workSessionsCompleted, setWorkSessionsCompleted] = useState(0);

  // Auto-start next session
  const [autoStart, setAutoStart] = useState(true);

  // Ref for interval
  const intervalRef = useRef(null);
  const onCompleteCallbackRef = useRef(null);

  // Get duration based on mode and session type
  const getDuration = useCallback((type) => {
    if (mode === TIMER_MODES.POMODORO) {
      return POMODORO_SETTINGS[type] * 60;
    } else {
      // Custom mode
      if (type === SESSION_TYPES.WORK) {
        return customSettings.work * 60;
      } else {
        return customSettings.break * 60;
      }
    }
  }, [mode, customSettings]);

  // Initialize timer with current session
  const initializeTimer = useCallback(() => {
    const duration = getDuration(sessionType);
    setTimeLeft(duration);
    setInitialTime(duration);
  }, [sessionType, getDuration]);

  // Start timer
  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  // Pause timer
  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Toggle play/pause
  const toggle = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  // Reset timer to initial state
  const reset = useCallback(() => {
    setIsRunning(false);
    initializeTimer();
  }, [initializeTimer]);

  // Skip to next session
  const skip = useCallback(() => {
    setIsRunning(false);

    if (mode === TIMER_MODES.POMODORO) {
      // Pomodoro mode cycle: Work -> Short Break -> Work -> Short Break -> Work -> Long Break
      if (sessionType === SESSION_TYPES.WORK) {
        const completedSessions = workSessionsCompleted + 1;
        setWorkSessionsCompleted(completedSessions);

        // Every 4 work sessions, take a long break
        if (completedSessions % 4 === 0) {
          setSessionType(SESSION_TYPES.LONG_BREAK);
        } else {
          setSessionType(SESSION_TYPES.SHORT_BREAK);
        }
      } else {
        // After any break, go back to work
        setSessionType(SESSION_TYPES.WORK);
      }
    } else {
      // Custom mode: just toggle between work and break
      setSessionType((prev) =>
        prev === SESSION_TYPES.WORK ? SESSION_TYPES.SHORT_BREAK : SESSION_TYPES.WORK
      );
    }
  }, [mode, sessionType, workSessionsCompleted]);

  // Set custom timer durations
  const setCustomDuration = useCallback((work, breakTime) => {
    setCustomSettings({ work, break: breakTime });
    if (mode === TIMER_MODES.CUSTOM) {
      initializeTimer();
    }
  }, [mode, initializeTimer]);

  // Change mode
  const changeMode = useCallback((newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setSessionType(SESSION_TYPES.WORK);
    setWorkSessionsCompleted(0);
  }, []);

  // Register callback for timer completion
  const onComplete = useCallback((callback) => {
    onCompleteCallbackRef.current = callback;
  }, []);

  // Timer tick effect
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer completed
            setIsRunning(false);

            // Call completion callback (for notifications)
            if (onCompleteCallbackRef.current) {
              onCompleteCallbackRef.current(sessionType);
            }

            // Auto-start next session if enabled
            if (autoStart) {
              setTimeout(() => {
                skip();
                setIsRunning(true);
              }, 1000);
            } else {
              skip();
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, sessionType, autoStart, skip]);

  // Re-initialize when session type changes
  useEffect(() => {
    initializeTimer();
  }, [sessionType, initializeTimer]);

  // Re-initialize when mode changes
  useEffect(() => {
    initializeTimer();
  }, [mode]);

  // Format time as MM:SS
  const formatTime = useCallback(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return {
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      total: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
    };
  }, [timeLeft]);

  // Calculate progress percentage
  const getProgress = useCallback(() => {
    return ((initialTime - timeLeft) / initialTime) * 100;
  }, [timeLeft, initialTime]);

  return {
    // State
    mode,
    sessionType,
    timeLeft,
    isRunning,
    workSessionsCompleted,
    autoStart,
    customSettings,

    // Actions
    start,
    pause,
    toggle,
    reset,
    skip,
    changeMode,
    setAutoStart,
    setCustomDuration,
    onComplete,

    // Helpers
    formatTime,
    getProgress,
  };
};
