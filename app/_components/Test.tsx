'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getAllUser } from '../_api/user';

export const Test = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['getAllUser'],
    queryFn: getAllUser,
  });

  return (
    <div>
      {data.map((e) => (
        <span key={e.id}>{e.email}</span>
      ))}
    </div>
  );
};
