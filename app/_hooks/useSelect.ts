import { useState } from 'react';

export const useSelect = () => {
  const [select, setSelect] = useState([true, false, false, false]);

  const onSelected = (menuNum: number) => {
    const selected = select.map((_, index) => index === menuNum);
    setSelect(selected);
  };
  return { select, onSelected };
};
