'use client';

import { ReactNode, useEffect, useState } from 'react';
import { supabase } from '../_supabase/supabaseClient';
import { addLikeActivity } from '../_api/activity';
import { useAuthStore } from '../_store/auth';
import { useQueryClient } from '@tanstack/react-query';
import { GET_ACTIVE_USER } from '../_constant/queryKeys';

const RealTimeProvider = ({ children }: { children: ReactNode }) => {
  const { userInfo } = useAuthStore();
  const [payload, setPayload] = useState<any>();
  const clinet = useQueryClient();

  useEffect(() => {
    const subscription = supabase
      .channel('db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'likes',
        },
        (payload) => {
          console.log(payload);
          setPayload(payload);
          clinet.invalidateQueries({ queryKey: [GET_ACTIVE_USER] });
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [clinet]);

  useEffect(() => {
    if (payload) {
      const likeData = {
        likedPost: payload.new.post_id,
        uuid: userInfo.uid,
        type: payload.table,
      };
      addLikeActivity(likeData);
    }
  }, [payload, userInfo.uid]);

  return <>{children}</>;
};

export default RealTimeProvider;
