import { motion, AnimatePresence } from 'framer-motion';
import ProgressRing from './ProgressRing';
import { SESSION_TYPES } from '../../utils/constants';

const TimerDisplay = ({ formatTime, sessionType, progress, isRunning }) => {
  const { minutes, seconds } = formatTime();

  // Session type labels
  const sessionLabels = {
    [SESSION_TYPES.WORK]: 'Focus Time',
    [SESSION_TYPES.SHORT_BREAK]: 'Short Break',
    [SESSION_TYPES.LONG_BREAK]: 'Long Break',
  };

  // Session type colors
  const sessionColors = {
    [SESSION_TYPES.WORK]: 'text-blue-400',
    [SESSION_TYPES.SHORT_BREAK]: 'text-green-400',
    [SESSION_TYPES.LONG_BREAK]: 'text-purple-400',
  };

  // Digit animation variant
  const digitVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Progress Ring */}
      <div className="relative">
        <ProgressRing progress={progress} sessionType={sessionType} size={300} />

        {/* Timer in the center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Session Type Label */}
          <motion.div
            className={`text-sm font-medium mb-2 ${sessionColors[sessionType]}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={sessionType}
          >
            {sessionLabels[sessionType]}
          </motion.div>

          {/* Timer Digits */}
          <div className="flex items-center gap-1 text-6xl md:text-7xl font-bold text-slate-100 tabular-nums">
            {/* Minutes */}
            <AnimatePresence mode="popLayout">
              <motion.span
                key={minutes}
                variants={digitVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                {minutes}
              </motion.span>
            </AnimatePresence>

            <span className={isRunning ? 'animate-pulse' : ''}>:</span>

            {/* Seconds */}
            <AnimatePresence mode="popLayout">
              <motion.span
                key={seconds}
                variants={digitVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                {seconds}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Running indicator */}
          {isRunning && (
            <motion.div
              className="mt-3 flex gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
