import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  padding = 'md',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl border border-gray-200 shadow-sm'
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const cardClasses = `${baseClasses} ${paddings[padding]} ${className}`
  
  if (hover) {
    return (
      <motion.div
        whileHover={{ 
          y: -2,
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
        }}
        transition={{ duration: 0.2 }}
        className={cardClasses}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  )
}

export default Card