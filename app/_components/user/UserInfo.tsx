'use client';

import { extractUserName } from '@/app/_helper/extractUserName';
import { usePathname } from 'next/navigation';

const UserInfo = () => {
  const pathname = usePathname();
  const userName = extractUserName(pathname);
  console.log(userName);
  return <div>sdfdsfdsf</div>;
};

export default UserInfo;
