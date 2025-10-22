import { motion } from 'framer-motion';

const VolumeSlider = ({ value, onChange, color = '#3b82f6', isActive }) => {
  return (
    <div className="relative w-full">
      <input
        type="range"
        min="0"
        max="100"
        value={value * 100}
        onChange={(e) => onChange(e.target.value / 100)}
        disabled={!isActive}
        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          accentColor: color,
        }}
      />

      {/* Visual volume indicator */}
      {isActive && (
        <motion.div
          className="absolute -top-8 left-0 text-xs text-slate-300 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ left: `${value * 100}%`, transform: 'translateX(-50%)' }}
        >
          {Math.round(value * 100)}%
        </motion.div>
      )}
    </div>
  );
};

export default VolumeSlider;
