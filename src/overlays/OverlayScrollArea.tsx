import React from 'react';

interface OverlayScrollAreaProps {
  children: React.ReactNode;
  className?: string;
}

export const OverlayScrollArea: React.FC<OverlayScrollAreaProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      data-lenis-prevent="true"
      data-lenis-prevent-touch="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className={`w-full h-full overflow-y-auto overflow-x-hidden overscroll-contain ${className}`}
      style={{
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
      }}
    >
      {children}
    </div>
  );
};
