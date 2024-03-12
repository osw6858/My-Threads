interface ModalProps {
  modalId: string;
  title?: string;
  content?: string;
  confirmText: string;
  onConfirm?: () => void;
}

const ConfirmModal = ({
  title,
  content,
  confirmText,
  modalId,
  onConfirm,
}: ModalProps) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{content}</p>
        <div className="modal-action">
          <form method="dialog">
            <button onClick={handleConfirm} className="btn">
              {confirmText}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmModal;
