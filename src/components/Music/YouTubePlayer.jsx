import { useState, useRef } from 'react';
import YouTube from 'react-youtube';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';
import { LOFI_STREAMS } from '../../utils/constants';
import StreamSelector from './StreamSelector';
import GlassCard from '../UI/GlassCard';
import AnimatedButton from '../UI/AnimatedButton';
import { motion } from 'framer-motion';

const YouTubePlayer = () => {
  const [selectedStreamId, setSelectedStreamId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const playerRef = useRef(null);

  const selectedStream = LOFI_STREAMS.find(s => s.id === selectedStreamId);

  // YouTube player options
  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  // Player ready
  const onReady = (event) => {
    playerRef.current = event.target;
    playerRef.current.setVolume(volume);
  };

  // Play/Pause toggle
  const togglePlay = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  // Volume change
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  // Stream change
  const handleStreamChange = (streamId) => {
    const wasPlaying = isPlaying;
    setIsPlaying(false);
    setSelectedStreamId(streamId);

    // Restart playback if it was playing
    if (wasPlaying) {
      setTimeout(() => {
        if (playerRef.current) {
          playerRef.current.playVideo();
          setIsPlaying(true);
        }
      }, 500);
    }
  };

  return (
    <GlassCard className="w-full">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-2xl">
            🎵
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-100">Lo-Fi Player</h2>
            <p className="text-sm text-slate-400">24/7 chill beats to focus</p>
          </div>
        </div>

        {/* Stream Selector */}
        <StreamSelector
          selectedStream={selectedStreamId}
          onStreamChange={handleStreamChange}
        />

        {/* Current Playing */}
        {selectedStream && (
          <motion.div
            className="glass-strong rounded-lg p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={selectedStreamId}
          >
            <div className="flex items-center gap-3">
              {/* Thumbnail placeholder */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                {isPlaying ? (
                  <motion.div
                    className="text-white text-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  >
                    🎧
                  </motion.div>
                ) : (
                  <div className="text-white text-2xl">🎧</div>
                )}
              </div>

              {/* Stream info */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-100 truncate">
                  {selectedStream.name}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {isPlaying ? 'Now Playing' : 'Paused'}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Controls */}
        <div className="space-y-3">
          {/* Play/Pause Button */}
          <AnimatedButton
            onClick={togglePlay}
            variant="secondary"
            size="lg"
            className="w-full"
            icon={isPlaying ? <FaPause /> : <FaPlay />}
          >
            {isPlaying ? 'Pause Music' : 'Play Music'}
          </AnimatedButton>

          {/* Volume Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <FaVolumeUp />
                <span>Volume</span>
              </div>
              <span className="text-slate-400">{volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: '#a78bfa' }}
            />
          </div>
        </div>

        {/* Hidden YouTube Player */}
        <div className="hidden">
          <YouTube
            videoId={selectedStream?.videoId}
            opts={opts}
            onReady={onReady}
          />
        </div>
      </div>
    </GlassCard>
  );
};

export default YouTubePlayer;
