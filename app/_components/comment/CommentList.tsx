'use client';

import { getSelectedPost } from '@/app/_api/post';
import {
  GET_ALL_POSTS,
  GET_COMMENT,
  GET_SELECTED_POST,
} from '@/app/_constant/queryKeys';
import { CommentType, PostType } from '@/app/_types/post';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import Post from '../post/Post';
import { extractNumberFromUrl } from '@/app/_helper/extractNumberFromUrl';
import useInfiniteScroll from '@/app/_hooks/useInfiniteScroll';
import Comment from './Comment';
import { useRouter } from 'next/navigation';
import { END_POINT } from '@/app/_constant/endPoint';
import useScrollToTop from '@/app/_hooks/useScrollTop';
import { useCallback } from 'react';
import { getComments } from '@/app/_api/comment';

const CommentList = () => {
  useScrollToTop();
  const pathname = usePathname();
  const router = useRouter();
  const client = useQueryClient();

  const post = useQuery({
    queryKey: [GET_SELECTED_POST, extractNumberFromUrl(pathname)],
    queryFn: () => getSelectedPost(extractNumberFromUrl(pathname)),
  });

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [GET_COMMENT, extractNumberFromUrl(pathname)],
    queryFn: async ({ pageParam }) => {
      const response = await getComments(
        extractNumberFromUrl(pathname),
        pageParam,
        5,
      );
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      const maxPage = Math.ceil((lastPage.count ?? 0) / 5);
      return nextPage <= maxPage ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  const goBack = () => {
    client.invalidateQueries({ queryKey: [GET_ALL_POSTS] });
    router.push(END_POINT.MAIN);
  };

  const combinReply = useCallback((comments: CommentType[] | null) => {
    if (comments === null) {
      throw new Error('댓글을 불러오는 과정에서 문제가 발생.');
    }

    const idToCommentMap: { [key: number]: CommentType } = {};
    const rootComments: CommentType[] = [];

    comments.forEach((comment) => {
      idToCommentMap[comment.id] = { ...comment, replies: [] };
    });

    comments.forEach((comment: CommentType) => {
      if (comment.parent_id) {
        const parent = idToCommentMap[comment.parent_id];
        if (parent && parent.replies) {
          parent.replies.push(idToCommentMap[comment.id]);
        }
      } else {
        rootComments.push(idToCommentMap[comment.id]);
      }
    });

    return rootComments;
  }, []);

  const postData: PostType = post.data?.data;

  const { loader } = useInfiniteScroll({ fetchNextPage, hasNextPage });

  return (
    <div className="h-full">
      <div className="my-5" onClick={goBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="cursor-pointer transform transition duration-200 hover:scale-125"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
          />
        </svg>
      </div>
      {postData && (
        <Post post={post.data?.data && postData} isOpenComment={false} />
      )}
      {data?.pages.map((comments, i) => (
        <div key={i}>
          {combinReply(comments?.data).map((comment: CommentType) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      ))}
      <div
        className="-translate-y-52"
        ref={loader}
        style={{ visibility: 'hidden' }}
      ></div>
    </div>
  );
};

export default CommentList;
