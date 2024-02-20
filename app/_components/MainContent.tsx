import { Suspense } from 'react';

export const MainContent = () => {
  return (
    <main className="h-screen w-6/12 ml-60">
      <Suspense fallback={<div>로딩중....</div>}></Suspense>
    </main>
  );
};
