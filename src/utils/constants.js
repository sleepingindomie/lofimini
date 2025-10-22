// Timer Presets
export const TIMER_MODES = {
  POMODORO: 'pomodoro',
  CUSTOM: 'custom',
};

export const SESSION_TYPES = {
  WORK: 'work',
  SHORT_BREAK: 'short_break',
  LONG_BREAK: 'long_break',
};

// Pomodoro Standard Timings (in minutes)
export const POMODORO_SETTINGS = {
  [SESSION_TYPES.WORK]: 25,
  [SESSION_TYPES.SHORT_BREAK]: 5,
  [SESSION_TYPES.LONG_BREAK]: 15,
};

// Custom Timer Defaults
export const CUSTOM_TIMER_DEFAULTS = {
  work: 30,
  break: 10,
};

// Lo-Fi Music Streams
export const LOFI_STREAMS = [
  {
    id: 1,
    name: 'Lofi Girl - beats to relax/study to',
    videoId: 'jfKfPfyJRdk',
    thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/default.jpg',
  },
  {
    id: 2,
    name: 'Lofi Girl - beats to sleep/chill to',
    videoId: 'rUxyKA_-grg',
    thumbnail: 'https://i.ytimg.com/vi/rUxyKA_-grg/default.jpg',
  },
  {
    id: 3,
    name: 'ChilledCow - jazzhop cafe',
    videoId: '5qap5aO4i9A',
    thumbnail: 'https://i.ytimg.com/vi/5qap5aO4i9A/default.jpg',
  },
  {
    id: 4,
    name: 'The Bootleg Boy - lofi hip hop radio',
    videoId: '7NOSDKb0HlU',
    thumbnail: 'https://i.ytimg.com/vi/7NOSDKb0HlU/default.jpg',
  },
  {
    id: 5,
    name: 'Chillhop Music - lofi hip hop radio',
    videoId: '5yx6BWlEVcY',
    thumbnail: 'https://i.ytimg.com/vi/5yx6BWlEVcY/default.jpg',
  },
];

// Ambient Sound Types
export const AMBIENT_SOUNDS = [
  {
    id: 'rain',
    name: 'Rain',
    icon: '🌧️',
    color: '#3b82f6',
  },
  {
    id: 'thunder',
    name: 'Thunder',
    icon: '⛈️',
    color: '#6366f1',
  },
  {
    id: 'cafe',
    name: 'Cafe',
    icon: '☕',
    color: '#a78bfa',
  },
  {
    id: 'fireplace',
    name: 'Fireplace',
    icon: '🔥',
    color: '#f97316',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    icon: '🌊',
    color: '#06b6d4',
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: '🌲',
    color: '#10b981',
  },
  {
    id: 'keyboard',
    name: 'Keyboard',
    icon: '⌨️',
    color: '#8b5cf6',
  },
];

// Notification Settings
export const NOTIFICATION_CONFIG = {
  title: 'LofiMini Timer',
  icon: '/vite.svg',
  requireInteraction: false,
};

// Keyboard Shortcuts
export const KEYBOARD_SHORTCUTS = {
  PLAY_PAUSE: ' ', // Space
  RESET: 'r',
  SKIP: 's',
};

// Animation Durations (in seconds)
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
};

// Color Palette
export const COLORS = {
  background: '#0f172a',
  glass: '#1e293b80',
  primary: '#3b82f6',
  secondary: '#a78bfa',
  accent: '#06b6d4',
  text: '#f1f5f9',
  textDim: '#94a3b8',
};
