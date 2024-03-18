import { PostType } from '@/app/_types/post';
import Post from './Post';

const SearchedPost = ({ postList }: { postList: PostType[] }) => {
  return (
    <div>
      {postList.map((post) => (
        <Post key={post.post_id} post={post} isOpenComment={false} />
      ))}
    </div>
  );
};

export default SearchedPost;
