export const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow-sm border border-gray-100 rounded-xl p-6 ${className}`}>
    {children}
  </div>
);

export const Label = ({ children, className = '', ...props }) => (
  <label className={`block text-xs font-semibold text-gray-700 mb-1.5 ${className}`} {...props}>
    {children}
  </label>
);

export const Input = ({ className = '', ...props }) => (
  <input 
    className={`w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 ${className}`} 
    {...props} 
  />
);

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = "px-4 py-2 rounded-md font-medium transition text-sm text-center";
  const variants = {
    primary: "bg-violet-600 text-white hover:bg-violet-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    disabled: "bg-gray-200 text-gray-400 cursor-not-allowed"
  };
  
  // Menggunakan variant disabled jika properti disabled true
  const appliedVariant = props.disabled ? 'disabled' : variant;

  return (
    <button className={`${base} ${variants[appliedVariant]} ${className}`} {...props}>
      {children}
    </button>
  );
};