import { PostType } from '@/app/_types/post';
import Image from 'next/image';
import { DEFAULT_PROFIL_IMAGE } from '@/app/_constant/endPoint';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import ImageSlider from '../common/ImageSlider';
import LikeIcon from '../icons/LikeIcon';
import Link from 'next/link';
import parse from 'html-react-parser';
import { useAuthStore } from '@/app/_store/auth';
import { useState } from 'react';
import CommentIcon from '../icons/CommentIcon';

const Post = ({ post }: { post: PostType }) => {
  dayjs.extend(relativeTime);
  dayjs.locale('ko');
  const { userInfo } = useAuthStore();
  const [likeCount, setLikeCount] = useState<number>(post.likes.length);

  const isLiked =
    post.likes.find((like) => like.user_id === userInfo.uid) !== undefined;

  return (
    <div className="relative mb-3">
      <hr className="border-gray-200 dark:border-gray-800 my-5" />
      <div className="flex ">
        <picture className="w-9">
          <Image
            className="rounded-full min-w-9"
            width={100}
            height={100}
            src={post?.users.avatar_url ?? DEFAULT_PROFIL_IMAGE}
            alt={''}
          />
        </picture>
        <div className=" flex flex-col pl-1">
          <div className="pl-2 font-semibold">{post?.users.user_name}</div>
          <div className="text-black dark:text-contentText my-1 pl-2">
            {parse(post.content)}
          </div>
        </div>
        <div className="absolute right-0 mb-4">
          <span className="mr-3 text-sm text-darkFontColor">
            {dayjs(post.created_at).fromNow().replace('전', '')}
          </span>
          <div className="dropdown dropdown-end">
            <span tabIndex={0} role="button">
              ···
            </span>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-28 text-red-600 font-bold"
            >
              <li>
                <Link href={''}>신고하기</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <>
        {post.images.length <= 1 ? (
          post.images.map((image) => (
            <div className="pl-11" key={image.image_id}>
              <picture>
                <Image
                  className="rounded-xl"
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
          <div className="pl-10 pr-4">
            <ImageSlider>
              {post.images.map((image) => (
                <picture className="p-1 aspect-square" key={image.image_id}>
                  <Image
                    className="rounded-xl h-56"
                    width={400}
                    height={400}
                    src={image.image_url}
                    alt={''}
                    priority
                  />
                </picture>
              ))}
            </ImageSlider>
          </div>
        )}
      </>
      <div className="flex pl-10 mt-5 ">
        <LikeIcon
          setLikeCount={setLikeCount}
          isLiked={isLiked}
          postId={post.post_id}
        />
        <CommentIcon />
      </div>
      <div className="pl-10 mt-3 text-sm text-lightFontColor dark:text-darkFontColor">
        {likeCount > 0 && <span>좋아요 {likeCount}개</span>}
      </div>
    </div>
  );
};

export default Post;
