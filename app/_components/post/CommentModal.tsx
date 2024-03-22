'use client';

import { getCurrentUser } from '@/app/_api/user';
import { DEFAULT_PROFIL_IMAGE } from '@/app/_constant/endPoint';
import { GET_SELECTED_POST, GET_USER_PROFILE } from '@/app/_constant/queryKeys';
import { useAuthStore } from '@/app/_store/auth';
import { useQueries } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { getSelectedPost } from '@/app/_api/post';
import Post from './Post';

const AddCommentForm = dynamic(() => import('../post/AddCommentForm'), {
  loading: () => <div>...loading</div>,
  ssr: false,
});

const CommentModal = ({
  modalId,
  postId,
}: {
  modalId: string;
  postId: number;
}) => {
  const { userInfo } = useAuthStore();

  const [user, post] = useQueries({
    queries: [
      {
        queryKey: [GET_USER_PROFILE],
        queryFn: () => getCurrentUser(userInfo.uid),
      },
      {
        queryKey: [GET_SELECTED_POST, postId],
        queryFn: () => getSelectedPost(postId),
      },
    ],
  });

  return (
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="relative modal-box overflow-y-scroll p-5 pt-16 h-full sm:h-auto">
        <h3 className="absolute -top-9 left-52 max-w-24 font-bold text-base  text-white hidden sm:block">
          새로운 댓글
        </h3>
        <div className="max-w-sm">
          <Post post={post.data?.data && post.data?.data} isOpenComment />
        </div>
        <div className="mb-10">
          <div className="avatar flex items-center">
            <div className="w-9 rounded-full">
              <Image
                width={100}
                height={100}
                src={user.data?.avatar_url ?? DEFAULT_PROFIL_IMAGE}
                alt={''}
              />
            </div>
            <p className="ml-3 font-semibold">{user.data?.user_name}</p>
          </div>

          <div className="p-3">
            <AddCommentForm postId={postId} />
          </div>
        </div>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute left-5 top-3">
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
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>닫기</button>
      </form>
    </dialog>
  );
};

export default CommentModal;
