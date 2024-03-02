'use client';

import { ReactNode, useEffect, useState } from 'react';
import { supabase } from '../_supabase/supabaseClient';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../_store/auth';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { setIsAuth, setUserInfo, isAuth } = useAuthStore();

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        if (!session?.user.email || !session?.user.id) {
          throw new Error('로그인중 문제 발생.');
        }
        setIsAuth();
        setUserInfo(session?.user.email, session?.user.id);
        router.push('/success');
      } else if (event === 'SIGNED_OUT') {
        setIsAuth();
        setUserInfo('', '');
        router.push('/');
      }
    });

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, [router, setIsAuth, setUserInfo]);

  console.log(isAuth);

  return <>{children}</>;
};

export default AuthProvider;
