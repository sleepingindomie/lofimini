import { motion } from 'framer-motion';
import { SESSION_TYPES } from '../../utils/constants';

const ProgressRing = ({ progress, sessionType, size = 300 }) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // Color based on session type
  const colors = {
    [SESSION_TYPES.WORK]: '#3b82f6', // Blue
    [SESSION_TYPES.SHORT_BREAK]: '#10b981', // Green
    [SESSION_TYPES.LONG_BREAK]: '#a78bfa', // Purple
  };

  const strokeColor = colors[sessionType] || colors[SESSION_TYPES.WORK];

  return (
    <svg
      width={size}
      height={size}
      className="transform -rotate-90"
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{
          filter: `drop-shadow(0 0 8px ${strokeColor})`,
        }}
      />
    </svg>
  );
};

export default ProgressRing;
