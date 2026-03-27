import * as React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Flex, FlexItem } from '@patternfly/react-core';
import { GripVerticalIcon, TimesIcon } from '@patternfly/react-icons';
import { ResizeHandle } from './ResizeHandle';

interface DraggableCardProps {
  id: string;
  children: React.ReactNode;
  onRemove?: (id: string) => void;
  onResize?: (id: string, columns: number) => void;
  currentColumns: number;
}

export const DraggableCard: React.FunctionComponent<DraggableCardProps> = ({
  id,
  children,
  onRemove,
  onResize,
  currentColumns
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [isResizing, setIsResizing] = React.useState(false);
  const [showHandles, setShowHandles] = React.useState(false);
  const [resizeSize, setResizeSize] = React.useState<{ width: number; height: number } | null>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const startSizeRef = React.useRef<{ width: number; height: number; mouseX: number; mouseY: number } | null>(null);
  const startColumnsRef = React.useRef<number>(1);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    startSizeRef.current = {
      width: rect.width,
      height: rect.height,
      mouseX: e.clientX,
      mouseY: e.clientY,
    };
    startColumnsRef.current = currentColumns;

    setIsResizing(true);
  };

  React.useEffect(() => {
    if (!isResizing || !startSizeRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!startSizeRef.current) return;

      const deltaX = e.clientX - startSizeRef.current.mouseX;
      const deltaY = e.clientY - startSizeRef.current.mouseY;

      const newWidth = Math.max(200, startSizeRef.current.width + deltaX);
      const newHeight = Math.max(150, startSizeRef.current.height + deltaY);

      setResizeSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);

      // Snap to column size based on final width
      if (resizeSize && onResize) {
        let columns = 1;
        if (resizeSize.width > 700) columns = 3;
        else if (resizeSize.width > 400) columns = 2;

        if (columns !== currentColumns) {
          onResize(id, columns);
        }
      }

      // Clear resize size to return to grid-based layout
      setResizeSize(null);
      startSizeRef.current = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, id, onResize, currentColumns, resizeSize]);

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (node) {
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: isResizing ? 'none' : transition,
        gridColumn: `span ${currentColumns}`,
        alignSelf: resizeSize ? 'start' : undefined,
        justifySelf: resizeSize ? 'start' : undefined,
        position: 'relative',
        border: isDragging ? '1px solid var(--pf-t--global--color--blue--default)' : 'none',
        borderRadius: 'var(--pf-t--global--border--radius--medium)',
        boxShadow: isDragging ? 'var(--pf-t--global--box-shadow--lg)' : 'none',
        width: resizeSize ? `${resizeSize.width}px` : undefined,
        height: resizeSize ? `${resizeSize.height}px` : undefined,
        maxHeight: resizeSize ? `${resizeSize.height}px` : undefined,
        minHeight: resizeSize ? `${resizeSize.height}px` : undefined,
        zIndex: resizeSize ? 1000 : undefined,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={() => setShowHandles(true)}
      onMouseLeave={() => !isResizing && setShowHandles(false)}
    >
      {/* Resize Handles */}
      {showHandles && !isDragging && (
        <>
          <ResizeHandle
            position="top-left"
            onMouseDown={handleResizeStart}
            isResizing={isResizing}
          />
          <ResizeHandle
            position="top-right"
            onMouseDown={handleResizeStart}
            isResizing={isResizing}
          />
          <ResizeHandle
            position="bottom-left"
            onMouseDown={handleResizeStart}
            isResizing={isResizing}
          />
          <ResizeHandle
            position="bottom-right"
            onMouseDown={handleResizeStart}
            isResizing={isResizing}
          />
        </>
      )}

      {/* Drag Handle and Remove Button */}
      <div style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        zIndex: 10,
      }}>
        <Flex gap={{ default: 'gapXs' }}>
          <FlexItem>
            <Button
              variant="plain"
              aria-label="Drag to reorder"
              {...attributes}
              {...listeners}
              style={{
                cursor: isDragging ? 'grabbing' : 'grab',
                padding: '4px 8px',
                minWidth: 'auto'
              }}
            >
              <GripVerticalIcon />
            </Button>
          </FlexItem>
          {onRemove && (
            <FlexItem>
              <Button
                variant="plain"
                aria-label="Remove widget"
                onClick={() => onRemove(id)}
                style={{
                  padding: '4px 8px',
                  minWidth: 'auto'
                }}
              >
                <TimesIcon />
              </Button>
            </FlexItem>
          )}
        </Flex>
      </div>

      {/* Card Content */}
      {children}
    </div>
  );
};
