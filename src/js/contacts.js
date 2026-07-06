import { Notify } from 'notiflix';
import { createOrder } from './api';
import { openModal } from './success-modal';

const form = document.querySelector('#contactForm');

const loader = document.querySelector('#loader');

const buttonText = document.querySelector('.contact-button-text');

const header = document.querySelector("header");

form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(form);

  const data = {
  name: formData.get('name').trim(),
  phone: formData.get('phone').replace(/\D/g, ''),
  message: formData.get('comment').trim(),
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

    header.style.position = "static";

    form.reset();
  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.log(error.response?.data);

    Notify.failure(
      error.response?.data?.message || 'Something went wrong'
    );
  } finally {
    loader.classList.add('hidden');
    buttonText.style.opacity = 1;
  }
}


function validate(data) {
  if (!data.name) {
    console.log(Notify);
    console.log(document.body);

    Notify.failure('Enter your name');
    return false;
  }

  if (data.name.length < 2) {
    Notify.failure('Name is too short');
    return false;
  }

  const digits = data.phone.replace(/\D/g, '');

if (!/^\d{12}$/.test(digits)) {
  Notify.failure('Phone number must contain exactly 12 digits');
  return false;
} 

data.phone = digits;

  return true;
}