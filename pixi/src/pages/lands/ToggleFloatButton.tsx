import { useState } from 'react';
import { FloatButton, Tooltip, type FloatButtonProps, type TooltipProps } from 'antd';
import clsx from 'clsx';

type ToggleFloatButtonProps = {
  disabled?: boolean;
  onClick?: (bool: boolean) => void;
  tooltip?: TooltipProps;
} & Pick<FloatButtonProps, 'icon'>;

export default ({ onClick, icon, tooltip }: ToggleFloatButtonProps) => {
  const [active, setActive] = useState(false);

  const onInnerClick = () => {
    const act = !active;
    setActive(act);
    onClick?.(act);
  };

  return (
    <Tooltip {...tooltip}>
      <FloatButton
        icon={icon}
        //className={clsx({ active, disabled: !disabled })}
        className={clsx({ active })}
        onClick={onInnerClick}
        //{...(disabled ? { onClick: onInnerClick } : {})}
      />
    </Tooltip>
  );
};
