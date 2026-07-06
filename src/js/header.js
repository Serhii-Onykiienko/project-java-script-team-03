const refs = {
  burgerBtn: document.querySelector('.header-burger'),
  closeBtn: document.querySelector('.mobile-menu-close'),
  mobileMenu: document.querySelector('.mobile-menu'),
  mobileMenuLinks: document.querySelectorAll('.mobile-menu-link'),
};
// ----------open/close menu------------
function openMenu() {
  refs.mobileMenu.classList.add('is-open');
  document.body.classList.add('no-scroll');
  refs.burgerBtn.setAttribute('aria-expanded', 'true');
  refs.mobileMenu.setAttribute('aria-hidden', 'false');
  refs.closeBtn.focus();
}

function closeMenu() {
  refs.burgerBtn.focus();

  refs.mobileMenu.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  refs.burgerBtn.setAttribute('aria-expanded', 'false');
  refs.mobileMenu.setAttribute('aria-hidden', 'true');
}

refs.burgerBtn.addEventListener('click', openMenu);
refs.closeBtn.addEventListener('click', closeMenu);

// ----Close the menu when clicking a navigation item
refs.mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

// ----Close the menu on Escape key press
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && refs.mobileMenu.classList.contains('is-open')) {
    closeMenu();
  }
});
