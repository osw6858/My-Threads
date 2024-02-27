'use client';

import { ReactNode, useEffect } from 'react';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // TODO: zustans로 관리하는 인증상태를 가져와 검증하는 로직 추가
  useEffect(() => {}, []);

  return <>{children}</>;
};

export default AuthProvider;
