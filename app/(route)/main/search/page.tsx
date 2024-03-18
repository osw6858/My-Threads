import SearchInput from '@/app/_components/search/SearchInput';
import UserList from '@/app/_components/user/UserList';

const SearchPage = () => {
  return (
    <div className="h-full mt-2">
      <div className="min-h-screen">
        <div className="flex flex-col">
          <SearchInput />
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
