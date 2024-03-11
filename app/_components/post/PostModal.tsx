import AddPostForm from './AddPostForm';

interface ModalProps {
  modalId: string;
}

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
        <button>close</button>
      </form>
    </dialog>
  );
};

export default PostModal;
