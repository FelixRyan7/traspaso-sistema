import { useEffect, useState } from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export type AlertProps = {
  type: AlertType;
  children: React.ReactNode;

  icon?: React.ReactNode;

  /** si true muestra botón de cerrar */
  closable?: boolean;

  /** auto cierre en ms (opcional) */
  autoClose?: number;

  onClose?: () => void;

  className?: string;
};

const colorVariants: Record<AlertType, string> = {
  success: 'bg-success-soft text-success font-semibold',
  error: 'bg-error-soft text-error font-semibold',
  warning: 'bg-warning-soft text-warning-strong font-semibold',
  info: 'bg-primary-soft text-primary font-semibold',
};

export const Alert = ({
  type,
  children,
  icon,
  closable = false,
  autoClose,
  onClose,
  className,
}: AlertProps) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!autoClose) return;

    const timer = setTimeout(() => {
      handleClose();
    }, autoClose);

    return () => clearTimeout(timer);
  }, [autoClose]);

  const handleClose = () => {
    setExiting(true);

    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  return (
    <div
      className={`
        flex items-center justify-between gap-3 p-4 rounded-lg shadow
        transition-all duration-300 ease-in-out
        ${colorVariants[type]}
        ${exiting ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}
        ${className ?? ''}
      `}
    >
      <div className="flex items-center gap-2">
        {icon && <span>{icon}</span>}
        <span>{children}</span>
      </div>

      {closable && (
        <button
          type="button"
          onClick={handleClose}
          className="ml-4 font-bold"
          aria-label="Cerrar alerta"
        >
          ✕
        </button>
      )}
    </div>
  );
};