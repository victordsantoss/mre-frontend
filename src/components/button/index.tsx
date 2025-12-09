'use client'

import './styles.css'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  color?: 'primary' | 'secondary' | 'success' | 'destructive' | 'warning'
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export function Button({
  children,
  color = 'primary',
  variant = 'solid',
  size = 'md',
  onClick,
  className = '',
  disabled,
  ...props
}: IButtonProps) {
  const buttonClasses = [
    'button',
    `button--${color}`,
    `button--${variant}`,
    `button--${size}`,
    disabled && 'button--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
