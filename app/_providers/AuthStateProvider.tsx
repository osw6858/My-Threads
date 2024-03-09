'use client';

import { ReactNode, useEffect, useState } from 'react';
import { supabase } from '../_supabase/supabaseClient';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../_store/auth';
import { END_POINT } from '../_constant/endPoint';

const AuthStateProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { setIsAuth, setUserInfo, isAuth } = useAuthStore();

  useEffect(() => {
    // TODO: 블로그에 supabase onAuthStateChange 에 대하여 정리하기
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        if (!session?.user.email || !session?.user.id) {
          throw new Error('로그인중 문제 발생.');
        }

        const maxAge = 100 * 365 * 24 * 60 * 60;
        document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
        document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;

        setIsAuth();
        setUserInfo(session?.user.email, session?.user.id);
        router.push(END_POINT.MAIN);
      } else if (event === 'SIGNED_OUT') {
        // TODO: 추후 테스트 이후 코드 보강이 필요.

        const expires = new Date(0).toUTCString();
        document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
        document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;

        setIsAuth();
        setUserInfo('', '');
        router.push(END_POINT.ROOT);
      }
    });

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, [router, setIsAuth, setUserInfo]);

  return <>{children}</>;
};

export default AuthStateProvider;
