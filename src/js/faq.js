import Accordion from 'accordion-js';

new Accordion('.faq-list', {
  duration: 300,
  showMultiple: false,
  elementClass: 'faq-item',
  triggerClass: 'faq-trigger',
  panelClass: 'faq-panel',
  activeClass: 'faq-item--active',
});
