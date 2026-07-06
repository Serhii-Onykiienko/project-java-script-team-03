const header = document.querySelector("header")

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('[data-modal]'),
};

if (refs.backdrop) {
  refs.openModalBtn?.addEventListener('click', openModal);
  refs.closeModalBtn?.addEventListener('click', closeModal);
  refs.backdrop.addEventListener('click', onBackdropClick);
}

export function openModal() {
  if (!refs.backdrop) return;

  refs.backdrop.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscKeyPress);
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  if (!refs.backdrop) return;

  refs.backdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.style.overflow = '';
  header.style.position = "sticky";
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
