import { PostType } from '@/app/_types/post';
import Image from 'next/image';
import { DEFAULT_PROFIL_IMAGE, END_POINT } from '@/app/_constant/endPoint';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ImageSlider from '../common/ImageSlider';
import LikeIcon from '../icons/LikeIcon';
import Link from 'next/link';
import parse from 'html-react-parser';
import { useAuthStore } from '@/app/_store/auth';
import { useEffect, useState } from 'react';
import CommentIcon from '../icons/CommentIcon';
import 'dayjs/locale/ko';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  GET_ALL_POSTS,
  GET_USER_POST,
  REMOVE_POST,
  SEARCH_POST,
} from '@/app/_constant/queryKeys';
import { removePost } from '@/app/_api/post';
import { useActive } from '@/app/_hooks/useActive';
import CommentModal from '../comment/CommentModal';
import ImageModal from '../common/ImageModal';
import { openModal } from '@/app/_helper/openModal';

const Post = ({
  post,
  isOpenComment,
}: {
  post: PostType;
  isOpenComment: boolean;
}) => {
  dayjs.extend(relativeTime);
  dayjs.locale('ko');

  const client = useQueryClient();
  const { userInfo } = useAuthStore();
  const { likeCount, setLikeCount, commentCount, setCommentCount } = useActive({
    likeCounts: post?.post_likes?.length,
    commentCounts: post?.comments?.length,
  });
  const [isUsersPost, setIsUserPost] = useState<boolean>();

  useEffect(() => {
    setCommentCount(post?.comments?.length);
    setIsUserPost(post?.users?.uuid === userInfo.uid);
  }, [
    post?.comments?.length,
    post?.users?.uuid,
    setCommentCount,
    userInfo.uid,
  ]);

  const isLiked =
    post?.post_likes?.find((like) => like.user_id === userInfo.uid) !==
    undefined;

  const handleRemovePost = () => {
    if (post.users.uuid !== userInfo.uid) {
      console.log('삭제 중 오류 발생');
      return;
    }

    const removePostData = {
      postId: post.post_id,
      uuid: userInfo.uid,
    };
    mutate(removePostData);
  };

  const { mutate } = useMutation({
    mutationKey: [REMOVE_POST],
    mutationFn: removePost,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [GET_ALL_POSTS] });
      client.invalidateQueries({ queryKey: [GET_USER_POST] });
      client.invalidateQueries({ queryKey: [SEARCH_POST] });
    },
  });

  return (
    <div className="relative mb-3">
      <div className="flex">
        <div className="w-9 flex flex-col">
          <div className="avatar flex items-center">
            <div className="w-9 rounded-full">
              <Link href={`${END_POINT.USER}/${post?.users?.user_name}`}>
                {/**
                 * TODO: 이미지 컴포넌트로 분리시켜 관리하기
                 */}
                <picture>
                  <Image
                    className="rounded-full min-w-9"
                    width={100}
                    height={100}
                    src={post?.users?.avatar_url ?? DEFAULT_PROFIL_IMAGE}
                    alt={''}
                  />
                </picture>
              </Link>
            </div>
          </div>
          {post?.comments?.length > 0 || isOpenComment ? (
            <div className="mx-[17.5px] my-3 w-[2px] h-full bg-gray-200 dark:bg-darkBorder" />
          ) : null}
          {post?.comments?.length > 0 && !isOpenComment ? (
            <div className="w-4 min-h-4 rounded-full bg-gray-200  dark:bg-darkBorder ml-[11px]" />
          ) : null}
        </div>
        <div className="pl-3 max-w-[calc(100%_-_30px)]">
          <div className="flex">
            <div className=" flex flex-col pl-1">
              <Link href={`${END_POINT.USER}/${post?.users?.user_name}`}>
                <div className=" font-semibold">{post?.users?.user_name}</div>
              </Link>
              <div className="text-black dark:text-contentText my-1">
                {post?.content && parse(post.content)}
              </div>
            </div>
            <div className="absolute right-0 mb-4">
              <span className="mr-3 text-sm text-darkFontColor">
                {post?.created_at &&
                  dayjs(post.created_at).fromNow().replace('전', '')}
              </span>
              <div className="dropdown dropdown-end">
                {!isOpenComment && (
                  <span tabIndex={0} role="button">
                    ···
                  </span>
                )}
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-28 text-red-600 font-bold"
                >
                  {isUsersPost ? (
                    <li onClick={handleRemovePost}>
                      <span className="text-darkFontColor dark:text-lightFontColor">
                        삭제
                      </span>
                    </li>
                  ) : (
                    <li>
                      <span>신고하기</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>
            {post?.images?.length <= 1 ? (
              post?.images.map((image) => (
                <div key={image.image_id}>
                  <picture
                    onClick={() => openModal(`open-image-modal${post.post_id}`)}
                    className="cursor-pointer"
                  >
                    <Image
                      className="rounded-xl select-none pointer-events-none"
                      width={350}
                      height={350}
                      src={image.image_url}
                      alt={''}
                      priority
                    />
                  </picture>
                </div>
              ))
            ) : (
              <div
                className="pr-5"
                onClick={() => openModal(`open-image-modal${post.post_id}`)}
              >
                <ImageSlider>
                  {post?.images?.map((image) => (
                    <picture
                      className="p-1 cursor-pointer"
                      key={image.image_id}
                    >
                      <Image
                        className="rounded-xl h-72 object-cover "
                        width={350}
                        height={350}
                        src={image.image_url}
                        alt={''}
                        priority
                      />
                    </picture>
                  ))}
                </ImageSlider>
              </div>
            )}
          </div>
          {!isOpenComment && (
            <>
              <div className="flex  mt-5 ">
                <LikeIcon
                  isComment={false}
                  setLikeCount={setLikeCount}
                  isLiked={isLiked}
                  id={post?.post_id}
                />
                <CommentIcon isReply={false} id={post?.post_id} />
                <CommentModal
                  modalId={`open-comment-modal${post?.post_id}`}
                  post={post}
                />
              </div>
              <div className=" mt-3 text-sm text-lightFontColor dark:text-darkFontColor">
                {likeCount > 0 && <span>좋아요 {likeCount}개</span>}
                <Link
                  className="ml-3"
                  href={`${END_POINT.COMMENT}/${post?.post_id}`}
                >
                  {commentCount > 0 && <span>댓글{commentCount}개</span>}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      {!isOpenComment && (
        <hr className="border-gray-200 dark:border-gray-800 my-5" />
      )}
      <ImageModal
        images={post.images}
        width={800}
        height={800}
        alt={''}
        modalId={`open-image-modal${post.post_id}`}
      ></ImageModal>
    </div>
  );
};

export default Post;
