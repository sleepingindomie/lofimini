import { useState } from 'react';
import { TIMER_MODES, SESSION_TYPES } from '../../utils/constants';
import AnimatedButton from '../UI/AnimatedButton';
import { motion } from 'framer-motion';

const TimerSettings = ({
  mode,
  onModeChange,
  customSettings,
  onCustomDurationChange,
  autoStart,
  onAutoStartChange,
}) => {
  const [workMinutes, setWorkMinutes] = useState(customSettings.work);
  const [breakMinutes, setBreakMinutes] = useState(customSettings.break);
  const [showCustomInputs, setShowCustomInputs] = useState(false);

  const handleModeChange = (newMode) => {
    onModeChange(newMode);
    if (newMode === TIMER_MODES.CUSTOM) {
      setShowCustomInputs(true);
    } else {
      setShowCustomInputs(false);
    }
  };

  const handleApplyCustom = () => {
    onCustomDurationChange(workMinutes, breakMinutes);
    setShowCustomInputs(false);
  };

  return (
    <div className="space-y-4">
      {/* Mode Selection */}
      <div className="flex gap-2 justify-center">
        <AnimatedButton
          onClick={() => handleModeChange(TIMER_MODES.POMODORO)}
          variant={mode === TIMER_MODES.POMODORO ? 'primary' : 'ghost'}
          size="sm"
        >
          Pomodoro (25/5/15)
        </AnimatedButton>
        <AnimatedButton
          onClick={() => handleModeChange(TIMER_MODES.CUSTOM)}
          variant={mode === TIMER_MODES.CUSTOM ? 'primary' : 'ghost'}
          size="sm"
        >
          Custom Timer
        </AnimatedButton>
      </div>

      {/* Custom Timer Inputs */}
      {mode === TIMER_MODES.CUSTOM && showCustomInputs && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="glass rounded-lg p-4 space-y-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Work (min)
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={workMinutes}
                onChange={(e) => setWorkMinutes(Number(e.target.value))}
                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Break (min)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(Number(e.target.value))}
                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
          <AnimatedButton
            onClick={handleApplyCustom}
            variant="primary"
            size="sm"
            className="w-full"
          >
            Apply
          </AnimatedButton>
        </motion.div>
      )}

      {/* Auto-start Toggle */}
      <div className="flex items-center justify-center gap-2 text-sm">
        <span className="text-slate-300">Auto-start next session</span>
        <button
          onClick={() => onAutoStartChange(!autoStart)}
          className={`
            relative w-12 h-6 rounded-full transition-colors duration-200
            ${autoStart ? 'bg-blue-500' : 'bg-slate-600'}
          `}
        >
          <motion.div
            className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full"
            animate={{ x: autoStart ? 24 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
      </div>
    </div>
  );
};

export default TimerSettings;
