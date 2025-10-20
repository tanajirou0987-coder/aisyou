import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'kawaii'
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
}

export function Input({ 
  variant = 'default', 
  label, 
  error,
  helperText,
  icon,
  className = '',
  ...props 
}: InputProps) {
  const variantClasses = {
    default: 'w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors',
    kawaii: 'input-kawaii'
  }
  
  const classes = `${variantClasses[variant]} ${className}`
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input 
          className={`${classes} ${icon ? 'pl-10' : ''}`}
          {...props} 
        />
      </div>
      {error && (
        <p className="text-[#D63384] text-sm mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-gray-500 text-sm mt-1">{helperText}</p>
      )}
    </div>
  )
}