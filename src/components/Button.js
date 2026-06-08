export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'border border-gray-300 text-charcoal-text hover:bg-gray-100'
  };
  
  return (
    <button 
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
