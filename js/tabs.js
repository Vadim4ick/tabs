document.addEventListener("DOMContentLoaded", () => {
  //Забираем самый основной класс, таб
  const tabs = document.querySelector(".tabs");
  //Забираем все кнопки табов
  const tabsBtn = document.querySelectorAll(".tabs__btn");
  //Забираем все содержимые всех табов
  const tabsContent = document.querySelectorAll(".tabs__content");

  //Если у нас есть основной класс, то
  if (tabs) {
    //Делаем клик по нему и если клик идет на кнопку табов,то
    tabs.addEventListener("click", (e) => {
      if (e.target.classList.contains("tabs__btn")) {
        //Получаем data кликнутого таба
        const tabsPath = e.target.dataset.tabsPath;

        //Перебираем все кнопки табов и удаляем у всех активный класс
        tabsBtn.forEach((el) => {
          el.classList.remove("tabs__btn--active");
        });
        tabs
          .querySelector(`[data-tabs-path="${tabsPath}"]`)
          .classList.add("tabs__btn--active");

        //Запускаем функцию с передачей data
        tabsHandlerContent(tabsPath);
      }

      //Если клик произошел по кнопке назад, то
      if (e.target.classList.contains("tabs__arrow--prev")) {
        //находим активный таб
        let activeTab = tabs.querySelector(".tabs__btn--active");
        //Находим родителя активного таба
        let activeTabParent = activeTab.closest(".tabs__item");
        //Находим предыдущий элемент активного таба
        let prevArrow = activeTabParent.previousElementSibling;

        //Если предыдущий элемент активного таба есть, то
        if (prevArrow) {
          //Находим таб (кнопку) активного элемента
          const activeArrow = prevArrow.querySelector(".tabs__btn");

          //Перебираем все табы и удаляем активный элемент
          tabsBtn.forEach((el) => {
            el.classList.remove("tabs__btn--active");
          });

          //Добавляем активный класс кнопке активного элемента
          activeArrow.classList.add("tabs__btn--active");

          //Передаем data активного элемента
          const path = activeArrow.dataset.tabsPath;

          //Запускаем функцию с переключением контента передавая ей data
          tabsHandlerContent(path);
        }
      }

      //Все тоже самое, только по кнопке вперед
      if (e.target.classList.contains("tabs__arrow--next")) {
        let activeTab = tabs.querySelector(".tabs__btn--active");
        let activeTabParent = activeTab.closest(".tabs__item");
        let nextArrow = activeTabParent.nextElementSibling;

        if (nextArrow) {
          const activeArrow = nextArrow.querySelector(".tabs__btn");

          tabsBtn.forEach((el) => {
            el.classList.remove("tabs__btn--active");
          });

          activeArrow.classList.add("tabs__btn--active");

          const path = activeArrow.dataset.tabsPath;

          tabsHandlerContent(path);
        }
      }
    });

    //Создадим функцию с передачей data
    function tabsHandlerContent(path) {
      //Перебираем все содержимые всех табов
      tabsContent.forEach((el) => {
        //удаляем у всего контента класс актив
        el.classList.remove("tabs__content--active");
      });
      //Добавляем класс актив нажатому элементу
      tabs
        .querySelector(`[data-tabs-target="${path}"]`)
        .classList.add("tabs__content--active");
    }
  }
});
