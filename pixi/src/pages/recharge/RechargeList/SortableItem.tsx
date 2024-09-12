import clsx from 'clsx';
import { HolderOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem(props: any) {
  const id = props['data-row-key'];
  const { attributes, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const { style, className } = props;

  const sty = { ...style, transform: CSS.Transform.toString(transform), transition };

  return (
    <tr
      {...props}
      id={id}
      ref={setNodeRef}
      {...attributes}
      className={clsx(className, { 'relative z-10': isDragging })}
      style={sty}
    />
  );
}

export function DragHandler({ id }: { id: number | string }) {
  const { setNodeRef, listeners } = useSortable({ id });
  return (
    <HolderOutlined
      ref={setNodeRef}
      {...listeners}
      style={{ cursor: 'pointer' }}
      className="p-1 rounded transition delay-150 duration-300 ease-in-out hover:bg-blue-300 hover:text-white"
    />
  );
}
