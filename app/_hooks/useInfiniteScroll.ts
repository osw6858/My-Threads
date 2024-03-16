import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useState, useEffect, useRef, MutableRefObject } from 'react';

interface UseInfiniteScrollProps {
  fetchNextPage: () => Promise<InfiniteQueryObserverResult<any, any>>;
  hasNextPage: boolean | undefined;
}

const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
}: UseInfiniteScrollProps) => {
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const loader: MutableRefObject<null | HTMLDivElement> =
    useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting && !isFetchingMore && hasNextPage) {
        setIsFetchingMore(true);
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isFetchingMore, hasNextPage]);

  useEffect(() => {
    if (!isFetchingMore) return;

    fetchNextPage().then(() => setIsFetchingMore(false));
  }, [isFetchingMore, fetchNextPage]);

  return { loader, isFetchingMore };
};

export default useInfiniteScroll;
