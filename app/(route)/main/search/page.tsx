import SearchResult from '@/app/_components/search/SearchResult';

const SearchPage = () => {
  return (
    <div className="h-full mt-2">
      <div className="min-h-screen">
        <div className="flex flex-col">
          <SearchResult />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
