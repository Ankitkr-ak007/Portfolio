import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  ariaLabel: string;
  children: React.ReactNode;
  contentClassName?: string;
  alignTop?: boolean;
}

export const ModalShell: React.FC<ModalShellProps> = ({
  isOpen,
  onClose,
  ariaLabel,
  children,
  contentClassName = '',
  alignTop = false,
}) => {
  // Lock document scrolling & pause Lenis smoothly
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
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
          className="fixed inset-0 bg-[#050609]/85 backdrop-blur-xl"
        />

        {/* Modal Scroll Container */}
        <div
          data-lenis-prevent="true"
          data-lenis-prevent-touch="true"
          onWheel={(e) => e.stopPropagation()}
          className={`relative z-10 h-[100dvh] w-full overflow-y-auto overflow-x-hidden overscroll-contain flex ${
            alignTop ? 'items-start pt-16 sm:pt-24' : 'items-center'
          } justify-center p-4 sm:p-6 lg:p-10`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className={`relative w-full bg-[#0A0D12] border border-[rgba(120,175,255,0.2)] rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.95)] my-auto max-h-[90dvh] flex flex-col ${contentClassName}`}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
