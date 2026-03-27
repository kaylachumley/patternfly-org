import * as React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DropZoneProps {
  id: string;
  span?: number;
}

export const DropZone: React.FunctionComponent<DropZoneProps> = ({ id, span = 1 }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        gridColumn: `span ${span}`,
        minHeight: '200px',
        border: '2px dashed var(--pf-t--global--border--color--default)',
        borderRadius: 'var(--pf-t--global--border--radius--medium)',
        background: isOver
          ? 'var(--pf-t--global--color--blue--default)'
          : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
      }}
    >
      <div
        style={{
          color: isOver
            ? 'var(--pf-t--global--text--color--on-primary)'
            : 'var(--pf-t--global--text--color--subtle)',
          fontSize: 'var(--pf-t--global--font--size--body--default)',
          fontWeight: isOver ? 'var(--pf-t--global--font--weight--body--bold)' : 'normal',
        }}
      >
        {isOver ? 'The drop zone' : 'Potential drop zone'}
      </div>
    </div>
  );
};
