import * as React from 'react';

interface ResizeHandleProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  onMouseDown: (e: React.MouseEvent) => void;
  isResizing: boolean;
}

export const ResizeHandle: React.FunctionComponent<ResizeHandleProps> = ({
  position,
  onMouseDown,
  isResizing,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const getPositionStyles = (): React.CSSProperties => {
    const borderColor = isResizing
      ? 'var(--pf-t--global--border--color--brand--clicked)'
      : isHovered
      ? 'var(--pf-t--global--border--color--brand--hover)'
      : 'var(--pf-t--global--border--color--default)';

    const baseStyles: React.CSSProperties = {
      position: 'absolute',
      width: '24px',
      height: '24px',
      cursor: getCursor(),
      transition: 'border-color 0.2s ease',
      zIndex: 10,
      pointerEvents: 'auto',
    };

    switch (position) {
      case 'top-left':
        return {
          ...baseStyles,
          top: '0',
          left: '0',
          borderTop: `3px solid ${borderColor}`,
          borderLeft: `3px solid ${borderColor}`,
          borderTopLeftRadius: 'var(--pf-t--global--border--radius--medium)',
        };
      case 'top-right':
        return {
          ...baseStyles,
          top: '0',
          right: '0',
          borderTop: `3px solid ${borderColor}`,
          borderRight: `3px solid ${borderColor}`,
          borderTopRightRadius: 'var(--pf-t--global--border--radius--medium)',
        };
      case 'bottom-left':
        return {
          ...baseStyles,
          bottom: '0',
          left: '0',
          borderBottom: `3px solid ${borderColor}`,
          borderLeft: `3px solid ${borderColor}`,
          borderBottomLeftRadius: 'var(--pf-t--global--border--radius--medium)',
        };
      case 'bottom-right':
        return {
          ...baseStyles,
          bottom: '0',
          right: '0',
          borderBottom: `3px solid ${borderColor}`,
          borderRight: `3px solid ${borderColor}`,
          borderBottomRightRadius: 'var(--pf-t--global--border--radius--medium)',
        };
      default:
        return baseStyles;
    }
  };

  const getCursor = (): string => {
    switch (position) {
      case 'top-left':
      case 'bottom-right':
        return 'nwse-resize';
      case 'top-right':
      case 'bottom-left':
        return 'nesw-resize';
      default:
        return 'default';
    }
  };

  return (
    <div
      style={getPositionStyles()}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};
