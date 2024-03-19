import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { END_POINT } from '../_constant/endPoint';

export const useSelect = () => {
  const pathname = usePathname();
  const [select, setSelect] = useState([false, false, false, false]);

  useEffect(() => {
    switch (pathname) {
      case END_POINT.MAIN:
        setSelect([true, false, false, false]);
        break;
      case END_POINT.SEARCH:
        setSelect([false, true, false, false]);
        break;
      case END_POINT.ACTIVITY:
        setSelect([false, false, true, false]);
        break;
      case END_POINT.USER:
        setSelect([false, false, false, true]);
        break;
    }
  }, [pathname]);

  const onSelected = (menuNum: number) => {
    const selected = select.map((_, index) => index === menuNum);
    setSelect(selected);
  };
  return { select, onSelected };
};
