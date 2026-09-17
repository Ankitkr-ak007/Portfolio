import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useScrollLock } from './useScrollLock';
import { useOverlayNavigation } from './useOverlayNavigation';
import { OverlayScrollArea } from './OverlayScrollArea';

interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
  backdropClassName?: string;
}

export const ModalShell: React.FC<ModalShellProps> = ({
  isOpen,
  onClose,
  ariaLabel,
  children,
  className = '',
  backdropClassName = 'bg-[#030407]/90 backdrop-blur-2xl',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollLock(isOpen);
  useOverlayNavigation({ isOpen, onClose, containerRef });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        ref={containerRef}
        className="fixed inset-0 z-50 h-[100dvh] w-full overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className={`fixed inset-0 ${backdropClassName}`}
        />

        {/* Dedicated Modal Scroll Container */}
        <OverlayScrollArea className="relative z-10 flex items-center justify-center p-4 sm:p-6 lg:p-10">
          <div className={className}>
            {children}
          </div>
        </OverlayScrollArea>
      </div>
    </AnimatePresence>
  );
};
