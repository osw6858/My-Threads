'use client';

import { searchUser } from '@/app/_api/user';
import { SEARCH_USER } from '@/app/_constant/queryKeys';
import { useDebounce } from '@/app/_hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UserList } from '@/app/_types/user';
import User from '../user/User';
import { useAuthStore } from '@/app/_store/auth';

interface SearchData {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setIsPostSearch: Dispatch<SetStateAction<boolean>>;
}

const SearchInput = ({
  searchQuery,
  setSearchQuery,
  setIsPostSearch,
}: SearchData) => {
  const [visible, setvisible] = useState(false);
  const debounceQuery = useDebounce(searchQuery, 1000);
  const { userInfo } = useAuthStore();

  useEffect(() => {
    if (debounceQuery) {
      setvisible(true);
    } else {
      setvisible(false);
    }
  }, [debounceQuery]);

  const { data } = useQuery({
    queryKey: [SEARCH_USER, debounceQuery],
    queryFn: () => searchUser(debounceQuery),
    enabled: !!debounceQuery,
  });

  const handleSearch = () => {
    setIsPostSearch(true);
    setvisible(false);
  };

  return (
    <div className="relative">
      <div className="">
        <input
          className="relative z-20 bg-lightInput dark:bg-darkInput w-full p-4 pl-14 h-16 rounded-lg outline-none shadow"
          type="text"
          placeholder="검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={() => setIsPostSearch(false)}
        />
        <svg
          aria-label="검색"
          role="img"
          viewBox="0 0 26 26"
          width={16}
          height={16}
          className="z-30 absolute top-6 left-6 text-lightFontColor dark:text-darkFontColor"
        >
          <title>검색</title>
          <path
            clipRule="evenodd"
            d="M3.5 11.5C3.5 7.08172 7.08172 3.5 11.5 3.5C15.9183 3.5 19.5 7.08172 19.5 11.5C19.5 15.9183 15.9183 19.5 11.5 19.5C7.08172 19.5 3.5 15.9183 3.5 11.5ZM11.5 1C5.70101 1 1 5.70101 1 11.5C1 17.299 5.70101 22 11.5 22C13.949 22 16.2023 21.1615 17.9883 19.756L22.3661 24.1339C22.8543 24.622 23.6457 24.622 24.1339 24.1339C24.622 23.6457 24.622 22.8543 24.1339 22.3661L19.756 17.9883C21.1615 16.2023 22 13.949 22 11.5C22 5.70101 17.299 1 11.5 1Z"
            fill="currentColor"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
      {visible && (
        <div className="absolute top-14 z-10 w-full max-h-96 rounded-bl-lg rounded-br-lg overflow-y-scroll px-5 pt-2 bg-white dark:bg-black border border-t-0 border-solid dark:border-darkInput border-neutral-300 flex flex-col">
          <div
            className="relative h-7 w-full my-4 flex items-center cursor-pointer"
            onClick={handleSearch}
          >
            <p className="p-3">{`' ${debounceQuery} '`} 검색</p>
            <svg
              aria-label="계속"
              role="img"
              viewBox="0 0 24 24"
              width={16}
              height={16}
              className="absolute rotate-180 right-0 mr-3 stroke-lightFontColor dark:stroke-darkFontColor"
            >
              <title>계속</title>
              <polyline points="16.502 3 7.498 12 16.502 21"></polyline>
            </svg>
          </div>
          {!!data?.data?.length && (
            <hr className="border-gray-200 dark:border-gray-800 mb-3" />
          )}
          {data?.data?.map((user: UserList) => (
            <div key={user.id}>
              {user.uuid !== userInfo.uid && <User user={user} isSearched />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
