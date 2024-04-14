import LikeIcon from './LikeIcon';
import CommentIcon from './CommentIcon';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { END_POINT } from '@/app/_constant/endPoint';

interface Activity {
  setLikeCount: Dispatch<SetStateAction<number>>;
  isLiked: boolean;
  postId: number;
  likeCount: number;
  commentCount: number;
}

const ActiveIconNav = ({
  setLikeCount,
  isLiked,
  postId,
  likeCount,
  commentCount,
}: Activity) => {
  return (
    <>
      <div className="flex  mt-5 ">
        <LikeIcon
          setLikeCount={setLikeCount}
          isLiked={isLiked}
          postId={postId}
        />
        <CommentIcon postId={postId} />
      </div>
      <div className=" mt-3 text-sm text-lightFontColor dark:text-darkFontColor">
        {likeCount > 0 && <span>좋아요 {likeCount}개</span>}
        <Link className="ml-3" href={`${END_POINT.COMMENT}/${postId}`}>
          {commentCount > 0 && <span>댓글{commentCount}개</span>}
        </Link>
      </div>
    </>
  );
};

export default ActiveIconNav;
