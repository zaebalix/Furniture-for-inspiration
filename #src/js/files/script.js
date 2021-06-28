/* ------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------- Обработчик нажатия для тачскринов после загрузки страницы ------------------------------ */
/* ------------- Actions - делегивание события click. e - event. Получаем объект при клике и обрабатываем его ------------- */
/* --------------------- isMobile.any возвращает true, если сайт просматривать с мобилки с тачскрином --------------------- */
/* ---------------- После выполнения условий, получаем ближайшего родителя и меняем классы: нажат/не нажат ---------------- */
/* ------------------ А потом пишем обработку, которая закрывает все подменю по событию клика в пустоту ------------------- */
/* ------------------------------------------------------------------------------------------------------------------------ */

window.onload = function () {
  document.addEventListener("click", documentActions);
  document.addEventListener("touchstart", documentMobileRes);

  function documentActions (e) {
    const targetElement = e.target;

    if (window.innerWidth > 768 && isMobile.any()) {
      if (targetElement.classList.contains('menu__arrow')) {
        targetElement.closest('.menu__item').classList.toggle('_hover');
        console.log('The user clicked on the arrow from a mobile device. Object "menu__item" assigned class _hover');
      }
      // проверяю на клик в пустоту. дословно : проверяю, есть ли вообще объекты с классом _hover.
      if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
        // Если есть, то пишется функция, которая берёт коллекцию и удаляет выбранный класс у выбранных объектов из коллекции
        _removeClasses(document.querySelectorAll('.menu__item._hover'), "_hover");
      }
    }
    if (targetElement.classList.contains('search-form__icon')) {
      // console.log ('работает поиск');
      document.querySelector('.search-form').classList.toggle('_active');
    }
    // проверяю на клик в пустоту. снова тоже самое: если объект, по которому мы кликнули не содержит родителя .search-form, то выбираем потомка с классом _active и удаляем класс _active
    else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
      document.querySelector('.search-form').classList.remove('_active');
    }
  }

/* ----------------------------------------------------------------------------------------------------------------------------------------- */
/* ----------------------------- https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API ----------------------------------- */
/* ----------------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------- Обработчик скролла страницы. Нужен чтобы отслеживать изменения и добавлять классы к .header ---------------------- */
/* ----- Intersection Observer наблюдает и возвращает true, когда выбранный объект ПОЛНОСТЬЮ пересекается с областью видимости браузера ---- */
/* --------------------------------- Область видимости браузера по умолчанию обозначается как root: null ----------------------------------- */
/* ------------------------------ Целевой элемент, за которым будет происходить наблюдение - headerElement. -------------------------------- */
/* -------- Для корректной работы функции, нужно задать размеры целевого объекта, в данном случае это .header { min-height: 40px; } -------- */
/* ------- При пересечении области видимости с элементом вызывается функция callback, которая добавляет класс .scroll, если его нет -------- */
/* --------------------------------------------------------- и удаляет, если есть. --------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------------------------------------------------------- */

const headerElement = document.querySelector ('.header');

const callback = function(entries, observer) {
  if (entries[0].isIntersecting) {
    headerElement.classList.remove ('_scroll');
  } else {
    headerElement.classList.add ('_scroll');
  }
};

const headerObserver = new IntersectionObserver(callback);
headerObserver.observe(headerElement);

// Вывод в консоль изменений состояния целевого элемента
// setInterval(function(){
//   console.log("Сейчас целевой элемент имеет классы:", headerElement.classList.value);
// }, 500);

/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ------------ Обработчик свайпа на устройствах с тачскрином. Нужен чтобы отслеживать изменения и убирать/добавлять что-либо на мобильных устройствах ------------ */
/* ---------- Дословно: получаю коллекцию объектов с классом .slider-main__content, затем проверяю разрешение экрана на соответствие мобильному девайсу ----------- */
/* ------------------------------ После этого циклом forEach просмартиваю каждый элемент и помещаю в массив и выбираю из них атрибуты ----------------------------- */
/* ------- После этого в теле цикла создаю функцию swipeAttributes, которая из каждого элемента массива с атрибутами удаляет атрибут data-swiper-parallax-x ------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */

  var swipeContent = document.querySelectorAll (".slider-main__content");

  function documentMobileRes () {
    if (window.innerWidth < 768 && isMobile.any()) {
/* ----------------------- Удаляю параллакс эффект, дабы не замедлять страницу на мобилках ------------------------- */
      swipeContent
        .forEach(el => Array
        .from(el.attributes)
        .forEach(swipeAttributes => el.removeAttribute("data-swiper-parallax-x"))
      );
    }
  }


}
