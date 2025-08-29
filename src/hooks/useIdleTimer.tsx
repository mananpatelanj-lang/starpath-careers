import { useEffect, useRef } from 'react';

interface UseIdleTimerProps {
  timeout: number; // in milliseconds
  onIdle: () => void;
  enabled?: boolean;
}

export function useIdleTimer({ timeout, onIdle, enabled = true }: UseIdleTimerProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (enabled) {
      timeoutRef.current = setTimeout(onIdle, timeout);
    }
  };

  useEffect(() => {
    if (!enabled) return;

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      resetTimer();
    };

    // Set initial timer
    resetTimer();

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      // Cleanup
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [timeout, onIdle, enabled]);

  return resetTimer;
}