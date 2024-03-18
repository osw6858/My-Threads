import TopPostBar from '@/app/_components/main/TopPostBar';
import PostList from '@/app/_components/post/PostList';

const MainPage = () => {
  return (
    <div className="h-full">
      <TopPostBar />
      <PostList />
    </div>
  );
};

export default MainPage;
