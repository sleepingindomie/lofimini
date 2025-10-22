import { FaPlay, FaPause, FaRedo, FaStepForward } from 'react-icons/fa';
import AnimatedButton from '../UI/AnimatedButton';

const TimerControls = ({ isRunning, onToggle, onReset, onSkip }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Play/Pause Button */}
      <AnimatedButton
        onClick={onToggle}
        variant="primary"
        size="lg"
        icon={isRunning ? <FaPause /> : <FaPlay />}
        className="w-32"
      >
        {isRunning ? 'Pause' : 'Start'}
      </AnimatedButton>

      {/* Reset Button */}
      <AnimatedButton
        onClick={onReset}
        variant="ghost"
        size="icon"
        icon={<FaRedo />}
        title="Reset (R)"
      />

      {/* Skip Button */}
      <AnimatedButton
        onClick={onSkip}
        variant="ghost"
        size="icon"
        icon={<FaStepForward />}
        title="Skip to next session (S)"
      />
    </div>
  );
};

export default TimerControls;
