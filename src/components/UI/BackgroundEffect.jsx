import { motion } from 'framer-motion';

const BackgroundEffect = () => {
  // Reduced stars for better performance (50 instead of 150)
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.6 + 0.3,
  }));

  // Reduced shooting stars (2 instead of 3)
  const shootingStars = Array.from({ length: 2 }, (_, i) => ({
    id: i,
    startX: Math.random() * 100,
    startY: Math.random() * 50,
    delay: i * 10 + Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Static dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-night-sky via-slate-900/40 to-purple-950/30" />

      {/* Moon - simpler version */}
      <div className="absolute top-20 right-24 w-16 h-16">
        {/* Moon glow - reduced blur */}
        <div className="absolute inset-0 rounded-full bg-yellow-100/15 blur-lg" />

        {/* Moon body */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-100 to-slate-300" />

        {/* Crescent shadow */}
        <div
          className="absolute inset-0 rounded-full bg-night-sky/60"
          style={{ clipPath: 'ellipse(55% 100% at 65% 50%)' }}
        />
      </div>

      {/* Twinkling Stars - Optimized */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [star.opacity * 0.4, star.opacity, star.opacity * 0.4],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Shooting Stars - Simplified */}
      {shootingStars.map((star) => (
        <motion.div
          key={`shooting-${star.id}`}
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            boxShadow: '0 0 4px 1px rgba(255, 255, 255, 0.6)',
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, 150, 300],
            y: [0, 100, 200],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: star.delay,
            repeatDelay: 20,
            ease: 'easeOut',
          }}
        >
          {/* Tail */}
          <div
            className="absolute w-12 h-px bg-gradient-to-r from-white to-transparent -left-12"
            style={{ transform: 'rotate(30deg)', top: '50%' }}
          />
        </motion.div>
      ))}

      {/* Ambient glow orbs - Simplified and reduced opacity */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1.15, 1, 1.15],
          opacity: [0.08, 0.05, 0.08],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default BackgroundEffect;
