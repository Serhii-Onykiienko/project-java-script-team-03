import { Notify } from 'notiflix';
import { createOrder } from './api';
import { openModal } from './success-modal';

const form = document.querySelector('#contactForm');

const loader = document.querySelector('#loader');

const buttonText = document.querySelector('.button-text');

form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(form);

  const data = {
    name: formData.get('name').trim(),
    phone: formData.get('phone').trim(),
    comment: formData.get('comment').trim(),
  };

  if (!validate(data)) {
    return;
  }

  loader.classList.remove('hidden');
  buttonText.style.opacity = 0;

  try {
    await createOrder(data);

    Notify.success('Message sent successfully!');

    openModal();

    form.reset();
  } catch (error) {
    Notify.failure(
      error.response?.data?.message ||
        'Something went wrong'
    );
  } finally {
    loader.classList.add('hidden');
    buttonText.style.opacity = 1;
  }
}


function validate(data) {
  if (!data.name) {
    Notify.failure('Enter your name');
    return false;
  }

  if (data.name.length < 2) {
    Notify.failure('Name is too short');
    return false;
  }

  const phoneRegexp =
    /^\+?[0-9()\-\s]{10,20}$/;

  if (!phoneRegexp.test(data.phone)) {
    Notify.failure('Invalid phone number');
    return false;
  }

  return true;
}