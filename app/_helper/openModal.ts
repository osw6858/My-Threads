export const openModal = (modalName: string) => {
  const modal = document.getElementById(modalName) as HTMLDialogElement;
  modal.showModal();
};
