import { motion } from 'framer-motion';
import VolumeSlider from './VolumeSlider';

const SoundButton = ({
  sound,
  isActive,
  volume,
  onToggle,
  onVolumeChange,
}) => {
  return (
    <motion.div
      className={`
        glass rounded-xl p-4 transition-all duration-300
        ${isActive ? 'ring-2 ring-offset-2 ring-offset-slate-900' : ''}
      `}
      style={{
        ringColor: isActive ? sound.color : 'transparent',
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex flex-col gap-3">
        {/* Sound toggle button */}
        <button
          onClick={onToggle}
          className="flex items-center gap-3 w-full text-left"
        >
          {/* Icon */}
          <motion.div
            className={`
              text-3xl w-12 h-12 flex items-center justify-center rounded-lg
              transition-all duration-200
              ${isActive ? 'bg-white/10' : 'bg-white/5'}
            `}
            animate={{
              scale: isActive ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: isActive ? Infinity : 0,
            }}
          >
            {sound.icon}
          </motion.div>

          {/* Name */}
          <div className="flex-1">
            <div className="font-medium text-slate-100">{sound.name}</div>
            <div className="text-xs text-slate-400">
              {isActive ? 'Playing' : 'Stopped'}
            </div>
          </div>

          {/* Active indicator */}
          {isActive && (
            <motion.div
              className="flex gap-0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full"
                  style={{ backgroundColor: sound.color }}
                  animate={{
                    height: ['8px', '16px', '8px'],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </button>

        {/* Volume slider */}
        <VolumeSlider
          value={volume}
          onChange={onVolumeChange}
          color={sound.color}
          isActive={isActive}
        />
      </div>
    </motion.div>
  );
};

export default SoundButton;
