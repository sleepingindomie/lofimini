import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from './components/Layout/MainLayout';
import GlassCard from './components/UI/GlassCard';
import Toast from './components/UI/Toast';
import TimerDisplay from './components/Timer/TimerDisplay';
import TimerControls from './components/Timer/TimerControls';
import TimerSettings from './components/Timer/TimerSettings';
import YouTubePlayer from './components/Music/YouTubePlayer';
import SoundMixer from './components/AmbientSounds/SoundMixer';
import { useTimer } from './hooks/useTimer';
import { useNotification } from './hooks/useNotification';
import { useAmbientSound } from './hooks/useAmbientSound';
import { useClock } from './hooks/useClock';
import { KEYBOARD_SHORTCUTS, SESSION_TYPES } from './utils/constants';

function App() {
  // Hooks
  const timer = useTimer();
  const notification = useNotification();
  const ambientSound = useAmbientSound();
  const { formatTime, formatDate } = useClock();

  // Toast notification state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastContent, setToastContent] = useState({ title: '', message: '' });

  // Request notification permission on mount
  useEffect(() => {
    notification.requestPermission();
  }, [notification]);

  // Register timer completion callback for notifications
  useEffect(() => {
    const handleTimerComplete = (sessionType) => {
      console.log('✅ Timer completed! Session type:', sessionType);

      // Show browser notification + play sound
      notification.showNotification(sessionType);

      // Show toast notification
      let title = '';
      let message = '';

      switch (sessionType) {
        case SESSION_TYPES.WORK:
          title = '🎯 Work Session Complete!';
          message = 'Great job! Time for a well-deserved break.';
          break;
        case SESSION_TYPES.SHORT_BREAK:
          title = '☕ Break Time Over!';
          message = "Ready to get back to work? Let's focus!";
          break;
        case SESSION_TYPES.LONG_BREAK:
          title = '🌟 Long Break Complete!';
          message = "You've earned this rest. Time to continue being productive!";
          break;
        default:
          title = '⏰ Timer Complete!';
          message = 'Your session has ended.';
      }

      setToastContent({ title, message });
      setToastVisible(true);
    };

    timer.onComplete(handleTimerComplete);
  }, [timer.onComplete, notification.showNotification]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore if typing in input
      if (e.target.tagName === 'INPUT') return;

      switch (e.key.toLowerCase()) {
        case KEYBOARD_SHORTCUTS.PLAY_PAUSE:
          e.preventDefault();
          timer.toggle();
          break;
        case KEYBOARD_SHORTCUTS.RESET:
          e.preventDefault();
          timer.reset();
          break;
        case KEYBOARD_SHORTCUTS.SKIP:
          e.preventDefault();
          timer.skip();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [timer]);

  // Stagger animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MainLayout>
      {/* Toast Notification */}
      <Toast
        show={toastVisible}
        title={toastContent.title}
        message={toastContent.message}
        onClose={() => setToastVisible(false)}
        duration={6000}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Timer Section */}
        <motion.div variants={itemVariants}>
          <GlassCard className="max-w-2xl mx-auto">
            <div className="space-y-6">
              {/* Timer Display */}
              <TimerDisplay
                formatTime={timer.formatTime}
                sessionType={timer.sessionType}
                progress={timer.getProgress()}
                isRunning={timer.isRunning}
              />

              {/* Timer Controls */}
              <TimerControls
                isRunning={timer.isRunning}
                onToggle={timer.toggle}
                onReset={timer.reset}
                onSkip={timer.skip}
              />

              {/* Timer Settings */}
              <TimerSettings
                mode={timer.mode}
                onModeChange={timer.changeMode}
                customSettings={timer.customSettings}
                onCustomDurationChange={timer.setCustomDuration}
                autoStart={timer.autoStart}
                onAutoStartChange={timer.setAutoStart}
              />
            </div>
          </GlassCard>
        </motion.div>

        {/* Music & Sounds Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* YouTube Player */}
          <div>
            <YouTubePlayer />
          </div>

          {/* Stats Card */}
          <div>
            <GlassCard>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-100">
                  Focus Stats 📊
                </h3>

                {/* Real-time Clock - Prominent */}
                <div className="glass-strong rounded-lg p-4 text-center">
                  <div className="text-3xl md:text-4xl font-mono font-bold text-blue-400 tracking-wider">
                    {formatTime()}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 uppercase tracking-wide">
                    {formatDate()} • Local Time
                  </div>
                </div>

                {/* Session Counter */}
                {timer.mode === 'pomodoro' && (
                  <div className="glass-strong rounded-lg p-4">
                    <div className="text-sm text-slate-300 text-center">
                      <div className="text-3xl font-bold text-blue-400">
                        {timer.workSessionsCompleted}
                      </div>
                      <div className="text-xs mt-1">
                        Work Sessions Completed
                      </div>
                    </div>
                  </div>
                )}

                {/* Notification Status */}
                {notification.isSupported && (
                  <div className="glass-strong rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Notifications</span>
                      <button
                        onClick={notification.requestPermission}
                        disabled={notification.permission === 'granted'}
                        className={`text-xs px-2 py-1 rounded transition-all ${
                          notification.permission === 'granted'
                            ? 'bg-green-500/20 text-green-400 cursor-default'
                            : 'bg-red-500/20 text-red-400 hover:bg-red-500/30 cursor-pointer'
                        }`}
                      >
                        {notification.permission === 'granted' ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Compact Keyboard Shortcuts */}
                <div className="glass-strong rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-2">⌨️ Shortcuts</div>
                  <div className="flex flex-wrap gap-2 text-[10px]">
                    <div className="flex items-center gap-1">
                      <kbd className="bg-slate-700/50 px-1.5 py-0.5 rounded text-slate-300">Space</kbd>
                      <span className="text-slate-500">Play</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="bg-slate-700/50 px-1.5 py-0.5 rounded text-slate-300">R</kbd>
                      <span className="text-slate-500">Reset</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="bg-slate-700/50 px-1.5 py-0.5 rounded text-slate-300">S</kbd>
                      <span className="text-slate-500">Skip</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>

        {/* Ambient Sounds Section */}
        <motion.div variants={itemVariants}>
          <SoundMixer
            activeSounds={ambientSound.activeSounds}
            volumes={ambientSound.volumes}
            onToggleSound={ambientSound.toggleSound}
            onVolumeChange={ambientSound.setVolume}
          />
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}

export default App;
