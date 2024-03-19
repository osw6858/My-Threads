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
      <div className="relative modal-box overflow-y-visible p-5 h-4/6 sm:h-auto">
        <h3 className="absolute -top-9 left-52 max-w-24 font-bold text-base  text-white hidden sm:block">
          새로운 댓글
        </h3>
        <div className="max-w-sm">
          <Post post={post.data?.data && post.data?.data} isOpenComment />
        </div>
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
      <form method="dialog" className="modal-backdrop">
        <button>닫기</button>
      </form>
    </dialog>
  );
};

export default CommentModal;
