import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { END_POINT } from '../_constant/endPoint';

export const useSelect = () => {
  const pathname = usePathname();
  const [select, setSelect] = useState([true, false, false, false]);

  useEffect(() => {
    if (pathname === END_POINT.MAIN) {
      setSelect([true, false, false, false]);
    }
  }, [pathname]);

  const onSelected = (menuNum: number) => {
    const selected = select.map((_, index) => index === menuNum);
    setSelect(selected);
  };
  return { select, onSelected };
};
