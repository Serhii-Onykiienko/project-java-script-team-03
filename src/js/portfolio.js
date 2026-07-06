import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from 'axios';

axios.defaults.baseURL = 'https://wedding-photographer.b.goit.study/api';    // URL-путь для запроса

let btnList = document.querySelector(".portfolio-category-ul");
let gallery = document.querySelector(".gallery");
let progresslabel = document.querySelector(".progress-label");
let progressBar = document.querySelector(".loading");
let showMore = document.querySelector(".show-more");
let loader = document.querySelector('.loader');

btnList.addEventListener("click", handleCategoryBtn);
showMore.addEventListener("click", handleShowMore);


let resCategory = null;
let activeBtn = null;
let currentIndex = -1;
let maxPages = 0;
let loadedPhotos = 0;
let totalPhotos = 0;
let currentPage = 0;
let prevLimit = 9;
let moreLimit = 3;
let activeBtnState = false;

activeBtn = btnList.children[0].children[0];
activeBtn.style.border = "2px solid black";

createInitialBtns();
createInitialGallery(currentIndex,prevLimit);

// --------------------- сброс значений инициализации ----------------

function resetValues() {
    currentPage = 0;
    totalPhotos = 0;
    maxPages = 0;
    loadedPhotos = 0;
}

// --------------------- функции рендеринга --------------------------

function createBtns(categories) {                     // создание галереи по данным HTTP-запроса
  const strings = categories
    .map(                                                   // создание массива HTML-фрагментов strings
      category => 
        `<li>
         <button type="button" class="category-btn">${category.category}</button>
       </li>`);
  btnList.insertAdjacentHTML("beforeend",strings.join(" "));               // создание галереи из массива strings
//  lightBox.refresh();                                       // обновление lightBox после построения галереи
}

function createGallery(photos) {                     // создание галереи по данным HTTP-запроса
  const strings = photos
        .map(                                                   // создание массива HTML-фрагментов strings
            photo =>
                `<li class="gallery-item" >
           <img class="gallery-image" src="${photo.img}" alt="${photo.title}" />
        </li>`
  );
  gallery.insertAdjacentHTML("beforeend", strings.join(" "));               // создание галереи из массива strings
}

function clearGallery() {
  gallery.innerHTML = "";
}

function hideProgress() {                        // скрываем прогрессбар
  progresslabel.style.visibility = 'hidden';
  progressBar.style.visibility = 'hidden';
} 

function showProgress() {                        // делаем прогрессбар видимым
  progresslabel.style.visibility = 'visible';
  progressBar.style.visibility = 'visible';
  activeBtnState = true; 
}

function hideShowMore() {
  showMore.style.visibility = 'hidden';
}

function showShowMore() {
  showMore.style.visibility = 'visible';
}

function showLoader() {                        // делаем лоадер видимым
  loader.style.visibility = 'visible';
} 

function hideLoader() {                        // скрываем лоадер
  loader.style.visibility = 'hidden';
} 

function reCalculateProgress(loaded, total) {
  progresslabel.textContent = `Downloaded ${loaded} from ${total}`;
  progresslabel.style.margin = "0 auto";
  progressBar.value = loaded / total * 100;
}

// ----------------------- функции запросов ------------------ 

async function getCategories() {
    const params = {                                        // создаем параметры для запроса
    };
    const urlAXIOS = `/categories`;                     // создаем строку поиска для запроса
    const resCategory = await axios.get(urlAXIOS, { params });
    return resCategory.data; 
}

async function getWeddingPhotos(page, categoryId, per_page) {
    const params = {                                        
        page: page,
        limit: per_page,
    };
    if (categoryId != "") {
        params.categoryId = categoryId;
    }
    const urlAXIOS = `/wedding-photos`;                     // создаем строку поиска для запроса
    const resPhoto = await axios.get(urlAXIOS, { params });
    return resPhoto.data; 
}

// --------------------- функции первоначальной инициализации -------

async function createInitialBtns() {
    try {
        resCategory = await getCategories();
        createBtns(resCategory);
    } catch (error) {
    };
}

async function createInitialGallery(currentIndex, per_page) { 
    let categoryId = currentIndex == -1 ? "" : resCategory[currentIndex]._id;
    showLoader();
    try {
        let resPhoto = await getWeddingPhotos(currentPage + 1, categoryId, per_page);
        if (currentPage == 0 && resPhoto.totalItems == 0) {
            iziToast.error({ position: 'topRight', message: `Sorry, there are no images matching your search query. Please try again!` });
            return;
        }
        currentPage += 1;
        if (currentPage == 1) {
            totalPhotos = resPhoto.totalItems;
            maxPages = Math.ceil((totalPhotos - prevLimit)/moreLimit)+1;
        }
        loadedPhotos += resPhoto.weddingPhotos.length;
        createGallery(resPhoto.weddingPhotos);
        hideLoader();
        reCalculateProgress(loadedPhotos, totalPhotos);
        showProgress();
        if (currentPage < maxPages) {
            showShowMore();
        } else {
            hideShowMore();
            iziToast.info({ position: 'topRight', message: "We're sorry, but you've reached the end of search results." });
        }

    } catch (error) {
        iziToast.error({ position: 'topRight', message: "Something went wrong!" });
        clearGallery();                                                             // очистка галереи
        resetValues();
        hideProgress();
        hideShowMore();
        hideLoader();
    };
}

// ----------------------- обработчики событий ------------------
async function handleCategoryBtn(e) {
    let target = e.target.parentNode;
    let currentTarget = e.currentTarget;
    let index = Array.from(currentTarget.children).indexOf(target) - 1;
    if (currentIndex != index) {
        currentIndex = index;
        activeBtn.style.border = "none";
        e.target.style.border = "2px solid black";
        activeBtn = e.target;
        resetValues();
        clearGallery();
        hideShowMore();
        hideProgress();
        await createInitialGallery(currentIndex, prevLimit);
    }
}


async function handleShowMore() {
    hideShowMore();
//    showLoader();
    await createInitialGallery(currentIndex,Math.min(totalPhotos-loadedPhotos,moreLimit));
}

