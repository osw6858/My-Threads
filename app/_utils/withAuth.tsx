'use client';

import { ComponentType, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAuthStore } from '../_store/auth';
import { END_POINT } from '../_constant/endPoint';

export default function withAuth<P extends JSX.IntrinsicAttributes>(
  Component: ComponentType<P>,
) {
  return function WithAuth(props: P) {
    // TODO: 블로그에 HOC(higherOrderComponent)에 대하여 더 공부하고 정리하기
    const { isAuth } = useAuthStore();

    useEffect(() => {
      if (!isAuth) {
        return redirect(END_POINT.ROOT);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isAuth) {
      return null;
    }

    return <Component {...props} />;
  };
}
