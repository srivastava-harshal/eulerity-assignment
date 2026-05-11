import { useCallback, useEffect, useMemo, useState } from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import Toolbar from '../../components/Toolbar/Toolbar';
import ImageList from '../../components/ImageList/ImageList';
import useInfiniteScroll from '../../hooks/useInfinitescroll';
import useDebounce from '../../hooks/useDebounce';

const PAGE_SIZE = 8;

function Home({ pets, loading, error }) {
     const [query, setQuery] = useState('');
     const [sort, setSort] = useState('');
     const [page, setPage] = useState(1);
     const debouncedQuery = useDebounce(query);

     useEffect(() => {
          setPage(1);
     }, [debouncedQuery, sort]);

     const processedPets = useMemo(() => {
          let result = [...pets];

          if (debouncedQuery) {
               const q = debouncedQuery.toLowerCase();
               result = result.filter(
                    (pet) =>
                         pet.title.toLowerCase().includes(q) ||
                         pet.description.toLowerCase().includes(q)
               );
          }

          if (sort === 'AZ') result.sort((a, b) => a.title.localeCompare(b.title));
          if (sort === 'ZA') result.sort((a, b) => b.title.localeCompare(a.title));
          if (sort === 'NEW')
               result.sort((a, b) => +new Date(b.created) - +new Date(a.created));
          if (sort === 'OLD')
               result.sort((a, b) => +new Date(a.created) - +new Date(b.created));

          return result;
     }, [pets, debouncedQuery, sort]);

     const paginatedPets = useMemo(() => {
          return processedPets.slice(0, page * PAGE_SIZE);
     }, [processedPets, page]);

     const hasMore = paginatedPets.length < processedPets.length;

     const loadMore = useCallback(() => {
          setPage((p) => p + 1);
     }, []);

     const sentinelRef = useInfiniteScroll({
          hasMore,
          onLoadMore: loadMore,
     });

     return (
          <div>
               <SearchBar query={query} setQuery={setQuery} />
               <Toolbar
                    pets={processedPets}
                    sort={sort}
                    setSort={setSort}
               />
               <ImageList pets={paginatedPets} loading={loading} error={error} />
               <div ref={sentinelRef} style={{ height: '20px' }} />
               {hasMore && <p>Loading more...</p>}
          </div>
     );
}

export default Home;