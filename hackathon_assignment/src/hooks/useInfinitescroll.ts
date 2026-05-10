import { useEffect, useRef } from 'react';

export default function useInfiniteScroll({ hasMore, onLoadMore }) {
     const ref = useRef<HTMLDivElement | null>(null);
     const isFetchingRef = useRef(false);

     useEffect(() => {
          if (!hasMore) return;

          const observer = new IntersectionObserver((entries) => {
               const entry = entries[0];

               if (entry.isIntersecting && !isFetchingRef.current) {
                    isFetchingRef.current = true;
                    onLoadMore();
               }
          });

          const el = ref.current;
          if (el) observer.observe(el);

          return () => {
               if (el) observer.unobserve(el);
          };
     }, [hasMore, onLoadMore]);

     useEffect(() => {
          isFetchingRef.current = false;
     });

     return ref;
}