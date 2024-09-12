import { Outlet, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { label: 'Ads', key: 'ads' },
  { label: 'Lands', key: 'lands' },
  { label: 'Recharge', key: 'recharge' },
];

export default function BaseLayout() {
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <>
      <div className="absolute w-full z-10 left-0 top-0">
        <Menu className="w-full absolute" onClick={onClick} mode="horizontal" items={items} />
      </div>
      <Outlet />
    </>
  );
}
