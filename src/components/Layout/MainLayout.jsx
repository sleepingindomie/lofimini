import BackgroundEffect from '../UI/BackgroundEffect';
import { motion } from 'framer-motion';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Background Effect */}
      <BackgroundEffect />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          className="py-6 px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-4xl">🎧</div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    LofiMini
                  </h1>
                  <p className="text-xs md:text-sm text-slate-400">
                    Focus Mode Timer with Lo-Fi Beats
                  </p>
                </div>
              </div>

              {/* Version badge */}
              <div className="glass rounded-full px-3 py-1.5 text-xs text-slate-300">
                v1.0
              </div>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <main className="container mx-auto max-w-7xl px-4 pb-8">
          {children}
        </main>

        {/* Footer */}
        <motion.footer
          className="py-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="container mx-auto max-w-7xl px-4">
            <div className="glass rounded-lg p-4 text-center relative">
              <p className="text-sm text-slate-400">
                Built with React, Tailwind CSS, Framer Motion & Web Audio API
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Perfect for studying, working, and staying focused
              </p>

              {/* Subtle watermark */}
              <div className="absolute bottom-2 right-3 text-[10px] text-slate-600/40 font-mono">
                Dp
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default MainLayout;
