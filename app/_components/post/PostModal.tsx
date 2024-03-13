'use client';

import dynamic from 'next/dynamic';

interface ModalProps {
  modalId: string;
}

// TODO: 로딩 메시지 개선
const AddPostForm = dynamic(() => import('../post/AddPostForm'), {
  loading: () => <div>...loading</div>,
  ssr: false,
});

// TODO: 유저 정보 불러와서 프로필 이미지 띄우기

const PostModal = ({ modalId }: ModalProps) => {
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box max-w-[620px] overflow-y-visible">
        <h3 className="max-w-24 font-bold text-base -translate-y-16 translate-x-60 text-white">
          새로운 스레드
        </h3>
        <AddPostForm />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>닫기</button>
      </form>
    </dialog>
  );
};

export default PostModal;
