const backdrop = document.querySelector('#successModal');
const closeBtn = document.querySelector('#closeModal');
const modalBtn = document.querySelector('#modalBtn');

export function openModal() {
  backdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  backdrop.classList.add('is-hidden');
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeModal);

modalBtn.addEventListener('click', closeModal);

backdrop.addEventListener('click', e => {
  if (e.target === backdrop) {
    closeModal();
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
  }
});