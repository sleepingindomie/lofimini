import { motion } from 'framer-motion';

const AnimatedButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon,
  ...props
}) => {
  const variants = {
    primary: 'bg-primary-blue hover:bg-blue-600 text-white glow-blue',
    secondary: 'bg-secondary-purple hover:bg-purple-500 text-white glow-purple',
    accent: 'bg-accent-cyan hover:bg-cyan-600 text-white glow-cyan',
    ghost: 'bg-white/10 hover:bg-white/20 text-slate-100 border border-white/20',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-3',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-lg
        font-medium
        transition-all
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${className}
      `}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
