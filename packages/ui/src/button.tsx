'use client';

import { useRef, useCallback, type ReactNode, type ComponentProps } from 'react';

export interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  className?: string;
  appName?: string;
  onClick?: () => void | Promise<void>;
  isLoading?: boolean;
  debounceMs?: number;
}

const LoadingSpinner = () => (
  <div
    className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
    role="status"
    aria-label="Loading"
  />
);

export const Button = ({
  children,
  className = '',
  onClick,
  isLoading = false,
  debounceMs = 300,
  disabled,
  ...props
}: ButtonProps) => {
  const lastClickTime = useRef<number>(0);

  const handleClick = useCallback(() => {
    const now = Date.now();
    if (now - lastClickTime.current < debounceMs) {
      return;
    }
    lastClickTime.current = now;
    onClick?.();
  }, [onClick, debounceMs]);

  const isDisabled = disabled || isLoading;

  return (
    <button
      className={`bg-black-100 hover:bg-black-100/80 active:bg-black-100/80 flex h-12 w-[335px] cursor-pointer flex-row items-center justify-center gap-1.5 rounded-xl border-none p-3 text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      onClick={handleClick}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
};
