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

const PostModal = ({ modalId }: ModalProps) => {
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box max-w-[620px] overflow-y-visible">
        <h3 className="max-w-24 font-bold text-base -translate-y-16 translate-x-60">
          새로운 스레드
        </h3>
        <AddPostForm />
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">게시</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>닫기</button>
      </form>
    </dialog>
  );
};

export default PostModal;
