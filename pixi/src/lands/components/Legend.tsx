import clsx from 'clsx';
export default function Legend() {
  const cls =
    "inline-flex items-center before:table before:content-[''] before:w-3.5 before:h-3.5 before:mr-1 before:rounded-1";
  return (
    <div className="flex items-center gap-2">
      <span className={clsx(cls, 'before:bg-blue')}>道路</span>
      <span className={clsx(cls, 'before:bg-green')}>已售出</span>
      <span className={clsx(cls, 'before:bg-yellow')}>出售中</span>
      <span className={clsx(cls, 'before:bg-gray')}>未出售</span>
    </div>
  );
}
