import { motion } from 'framer-motion';

const GlassCard = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
  ...props
}) => {
  const variants = {
    default: 'glass',
    strong: 'glass-strong',
  };

  const hoverEffect = hover ? {
    scale: 1.02,
    transition: { duration: 0.2 }
  } : {};

  return (
    <motion.div
      className={`${variants[variant]} rounded-2xl p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverEffect}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
