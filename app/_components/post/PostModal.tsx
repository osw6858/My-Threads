'use client';

import { getCurrentUser } from '@/app/_api/user';
import { DEFAULT_PROFIL_IMAGE } from '@/app/_constant/endPoint';
import { GET_USER_PROFILE } from '@/app/_constant/queryKeys';
import { useAuthStore } from '@/app/_store/auth';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Image from 'next/image';

interface ModalProps {
  modalId: string;
}

// TODO: 로딩 메시지 개선
const AddPostForm = dynamic(() => import('../post/AddPostForm'), {
  loading: () => <div>...loading</div>,
  ssr: false,
});

const PostModal = ({ modalId }: ModalProps) => {
  const { userInfo } = useAuthStore();

  const { data } = useQuery({
    queryKey: [GET_USER_PROFILE],
    queryFn: () => getCurrentUser(userInfo.uid),
  });

  return (
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="relative modal-box overflow-y-visible p-5 h-screen sm:h-auto">
        <h3 className="absolute -top-9 left-52 max-w-24 font-bold text-base  text-white hidden sm:block">
          새로운 스레드
        </h3>
        <div className="avatar flex items-center">
          <div className="w-9 rounded-full">
            <Image
              width={100}
              height={100}
              src={data?.avatar_url ?? DEFAULT_PROFIL_IMAGE}
              alt={''}
            />
          </div>
          <p className="ml-3 font-semibold">{data?.user_name}</p>
        </div>
        <div className="ml-8">
          <AddPostForm />
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>닫기</button>
      </form>
    </dialog>
  );
};

export default PostModal;
