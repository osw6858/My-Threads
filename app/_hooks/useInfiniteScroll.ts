import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  useCallback,
} from 'react';

interface UseInfiniteScrollProps {
  fetchNextPage: () => Promise<InfiniteQueryObserverResult<any, any>>;
  hasNextPage: boolean | undefined;
}

const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
}: UseInfiniteScrollProps) => {
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const loader = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isFetchingMore && hasNextPage) {
        setIsFetchingMore(true);
      }
    },
    [isFetchingMore, hasNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  useEffect(() => {
    if (!isFetchingMore) return;

    const fetchData = async () => {
      await fetchNextPage();
      setIsFetchingMore(false);
    };

    fetchData();
  }, [isFetchingMore]);

  return { loader };
};

export default useInfiniteScroll;
