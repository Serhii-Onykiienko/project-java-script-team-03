import axios from 'axios';
// import Swiper JS
import Swiper from 'swiper';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ulEl = document.querySelector('.feedbacks-content-list');
const Api = axios.create({
  baseURL: 'https://wedding-photographer.b.goit.study/api',
});

const fetchFeedbacks = async page => {
  try {
    const fetchedData = await Api.get('/feedbacks', {
      params: {
        limit: 9,
        page,
      },
    });
    console.log(fetchedData.data);
    return fetchedData.data;
  } catch (error) {
    console.log(error);
  }
};

const createMarkkUp = arr => {
  return arr
    .map(
      feedback =>
        ` <li class="feedbacks-content-item swiper-slide">
            <div class="feedbacks-content-item-wrapper">
     <p class="feedbacks-content-comment">
          ${feedback.descr}
          </p>
          <p class="feedbacks-content-names">${feedback.name}</p>
          </div>
     
        </li>`
    )
    .join('');
};

const render = async () => {
  ulEl.innerHTML = '';
  try {
    const data = await fetchFeedbacks(1);
    ulEl.insertAdjacentHTML('afterbegin', createMarkkUp(data.feedbacks));
  } catch (error) {
    console.log(error);
  }
};
render();

new Swiper('.swiper', {
  modules: [Navigation, Pagination, Mousewheel, Keyboard],
  // Default parameters
  slidesPerView: 1,
  spaceBetween: 24,
  speed: 2000,

  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      //   spaceBetween: 20
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 3,
      //   spaceBetween: 30
    },
    // when window width is >= 640px
  },
  mousewheel: {
    forceToAxis: true,
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  pagination: {
    el: '.custom-swiper-pagination',
    type: 'bullets',
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.custom-swiper-button-next',
    prevEl: '.custom-swiper-button-prev',
  },
});
