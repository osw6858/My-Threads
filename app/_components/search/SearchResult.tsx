'use client';

import { useState } from 'react';
import UserList from '../user/UserList';
import SearchInput from './SearchInput';
import SearchedPost from '../post/SearchedPost';
import { useQuery } from '@tanstack/react-query';
import { SEARCH_POST } from '@/app/_constant/queryKeys';
import { searchPost } from '@/app/_api/post';

const SearchResult = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPostSearch, setIsPostSearch] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: [SEARCH_POST, searchQuery],
    queryFn: () => searchPost(searchQuery),
    enabled: isPostSearch,
  });

  return (
    <div>
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsPostSearch={setIsPostSearch}
      />
      {isPostSearch ? (
        <SearchedPost postList={data?.data ?? []} />
      ) : (
        <UserList />
      )}
    </div>
  );
};

export default SearchResult;
