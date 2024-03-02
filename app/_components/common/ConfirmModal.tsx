interface ModalProps {
  modalId: string;
  title?: string;
  content?: string;
  confirmText: string;
}

const ConfirmModal = ({ title, content, confirmText, modalId }: ModalProps) => {
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{content}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">{confirmText}</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmModal;
