import React from 'react';
import styles from './Button.module.css';

/**
 * Reusable Button component
 * @param {object} props
 * @param {'primary' | 'secondary'} [props.variant='primary'] - The button variant.
 * @param {React.ElementType} [props.as='a'] - The component to render as (e.g., 'a', 'button').
 * @param {string} [props.className] - Additional classes to apply.
 * @param {React.ReactNode} props.children - The content of the button.
 */
export default function Button({
  children,
  variant = 'primary',
  as: Component = 'a',
  className,
  ...props
}) {
  const variantClass = variant === 'primary' ? styles.primary : styles.secondary;
  const combinedClassName = [styles.btn, variantClass, className].filter(Boolean).join(' ');

  return (
    <Component className={combinedClassName} {...props}>
      <span>{children}</span>
    </Component>
  );
}
