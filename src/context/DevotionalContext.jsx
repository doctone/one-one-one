import { createContext, useContext } from 'react';

export const DevotionalContext = createContext(null);

export function useDevotionalContent() {
  const context = useContext(DevotionalContext);
  if (!context) {
    throw new Error('useDevotionalContent must be used within a DevotionalProvider');
  }
  return context;
}
