import { AMBIENT_SOUNDS } from '../../utils/constants';
import SoundButton from './SoundButton';
import GlassCard from '../UI/GlassCard';

const SoundMixer = ({
  activeSounds,
  volumes,
  onToggleSound,
  onVolumeChange,
}) => {
  return (
    <GlassCard className="w-full">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-100">Ambient Sounds</h2>
            <p className="text-sm text-slate-400 mt-1">
              Mix and match sounds for perfect focus
            </p>
          </div>

          {/* Active sounds counter */}
          <div className="glass-strong rounded-full px-4 py-2">
            <span className="text-sm font-medium text-slate-300">
              {Object.values(activeSounds).filter(Boolean).length} active
            </span>
          </div>
        </div>

        {/* Sound Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {AMBIENT_SOUNDS.map((sound) => (
            <SoundButton
              key={sound.id}
              sound={sound}
              isActive={activeSounds[sound.id] || false}
              volume={volumes[sound.id] || 0.5}
              onToggle={() => onToggleSound(sound.id)}
              onVolumeChange={(volume) => onVolumeChange(sound.id, volume)}
            />
          ))}
        </div>

        {/* Tip */}
        <div className="glass-strong rounded-lg p-3 text-xs text-slate-400 text-center">
          💡 Tip: Click on a sound to toggle it, adjust volume with the slider below
        </div>
      </div>
    </GlassCard>
  );
};

export default SoundMixer;
