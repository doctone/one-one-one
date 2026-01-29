import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'devotional-weekly-progress';

/**
 * Get the Monday of the current week (week starts on Monday)
 */
function getWeekStart(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  // Adjust so Monday = 0, Sunday = 6
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split('T')[0];
}

/**
 * Get the current day index (0 = Monday, 6 = Sunday)
 */
function getDayIndex(date = new Date()) {
  const day = date.getDay();
  // Convert: Sunday (0) -> 6, Monday (1) -> 0, etc.
  return day === 0 ? 6 : day - 1;
}

/**
 * Hook for tracking weekly devotional progress
 * @returns {{ completed: boolean[], markToday: () => void, resetWeek: () => void }}
 */
export function useWeeklyProgress() {
  const [completed, setCompleted] = useState([false, false, false, false, false, false, false]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        const currentWeekStart = getWeekStart();

        // If it's a new week, reset progress
        if (data.weekStart !== currentWeekStart) {
          const fresh = { weekStart: currentWeekStart, completed: [false, false, false, false, false, false, false] };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
          setCompleted(fresh.completed);
        } else {
          setCompleted(data.completed);
        }
      } catch {
        // Invalid data, reset
        const fresh = { weekStart: getWeekStart(), completed: [false, false, false, false, false, false, false] };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      }
    } else {
      // Initialize fresh
      const fresh = { weekStart: getWeekStart(), completed: [false, false, false, false, false, false, false] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    }
  }, []);

  const markToday = useCallback(() => {
    const todayIndex = getDayIndex();

    setCompleted(prev => {
      if (prev[todayIndex]) return prev; // Already marked

      const updated = [...prev];
      updated[todayIndex] = true;

      const data = { weekStart: getWeekStart(), completed: updated };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      return updated;
    });
  }, []);

  const resetWeek = useCallback(() => {
    const fresh = { weekStart: getWeekStart(), completed: [false, false, false, false, false, false, false] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    setCompleted(fresh.completed);
  }, []);

  return { completed, markToday, resetWeek };
}
