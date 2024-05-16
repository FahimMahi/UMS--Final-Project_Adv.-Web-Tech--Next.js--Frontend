import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant: 'solid' | 'outline';
  color: string; // Tailwind CSS classes
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, variant, color, onClick }) => {
  const baseStyle = "px-4 py-2 rounded focus:outline-none transition duration-300 ease-in-out transform active:scale-95";
  const variantStyle = variant === 'solid' ? `bg-${color.split(' ')[0]} text-white` : `border-2 border-${color.split(' ')[0]} text-${color.split(' ')[0]}`;

  return (
    <button className={`${baseStyle} ${variantStyle}`} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
