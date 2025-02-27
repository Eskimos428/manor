document.addEventListener('DOMContentLoaded', function () {

  let header = document.querySelector('header');
  let timeout;
  let lastScrollTop = 0; // Последняя позиция скролла
  const screenThreshold = window.innerHeight * 0.7; // 90% от высоты экрана

  function handleHeaderVisibility() {
    const currentScrollTop = window.scrollY; // Текущая позиция скролла

    // Если пользователь находится в пределах 90% высоты экрана, хедер всегда виден
    if (currentScrollTop <= screenThreshold) {
      header.classList.add('active');
      return;
    }

    // Если пользователь скроллит вверх, показать хедер
    if (currentScrollTop < lastScrollTop) {
      header.classList.add('active');
    } else {
      // Если пользователь скроллит вниз, скрыть хедер
      header.classList.remove('active');
    }

    // Обновление последней позиции скролла
    lastScrollTop = currentScrollTop;

    // Если скролл прекратился, через 3 секунды показать хедер
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      header.classList.add('active');
    }, 3000);
  }

  window.addEventListener('scroll', handleHeaderVisibility);



  /*открытие бургер-меню*/

  const burgerBtn = document.querySelector('.burger')
  const closeBtn = document.querySelector('.close')
  const nav = document.querySelector('.header__bottom')
  const headerOpen = document.querySelector('.header')

  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
      nav.classList.toggle('active')
      burgerBtn.classList.remove('active')
      closeBtn.classList.add('active')

      headerOpen.classList.add('h-height')

    })
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      nav.classList.toggle('active')
      burgerBtn.classList.add('active')
      closeBtn.classList.remove('active')
      headerOpen.classList.remove('h-height')
    })
  }


  // Скролл партнеры
  let scrollPosition = 0;
  window.addEventListener('scroll', () => {
    let speed = window.innerWidth < 500 ? -0.4 : -0.9; // для мобилы снижаем скорость прокручивания для лого
    let speedText = window.innerWidth < 500 ? -0.65 : -0.9; // для мобилы снижаем скорость прокручивания для текста
   
    let newPosition = window.scrollY * speed;// Регулировка скорости смещения лого
    let newPositionAdv = window.scrollY * speedText; // Регулировка скорости смещения текст

    const partnersElement = document.getElementById('partners');
    const advantagesElement = document.getElementById('advantages');

    if (partnersElement) {
      partnersElement.style.transform = `translate(20%, 0%) translateX(${newPosition}px)`;
    }

    if (advantagesElement) {
      const translateXValue = window.innerWidth <= 550 ? "translate(160%, 0%)" : "translate(120%, 0%)";
      advantagesElement.style.transform = `${translateXValue} translateX(${newPositionAdv}px)`;
    }

  });



  //Калькулятор выбор choise 

  // Получаем все popUpContainers заранее
  const popUpContainers = document.querySelectorAll('.popup__container');

  // Начальное меню
  document.querySelectorAll(".btn-choise").forEach(button => {
    button.addEventListener("click", function () {
      const slide1 = document.getElementById("slide-1");
      const slide2 = document.getElementById("slide-2");

      // Показываем slide-2 и сбрасываем шаги калькулятора
      slide1.classList.remove("active", "fullscreen");
      slide2.classList.add("active", "fullscreen");
      resetSteps(); // Сбрасываем шаги калькулятора на первый
    });
  });

  // Закрытие на крестик
  document.querySelectorAll(".close-icon").forEach(closeBtn => {
    closeBtn.addEventListener("click", function () {
      const slide1 = document.getElementById("slide-1");
      const slide2 = document.getElementById("slide-2");

      if (slide2) {
        slide2.classList.remove("active", "fullscreen");
      }

      if (slide1) {
        slide1.classList.add("active", "fullscreen");
      }

      // Убираем класс fullscreen со всех popUpContainers
      popUpContainers.forEach(container => {
        container.classList.remove("fullscreen");
      });

      resetSteps(); // Сбрасываем шаги калькулятора на первый
    });
  });

  // переключение слайдов калькулятора и отправка формы
  let currentStep = 0;
  const steps = document.querySelectorAll(".step");
  const nextButtons = document.querySelectorAll(".next");
  const prevButtons = document.querySelectorAll(".prev");

  const userSelections = {}; // Хранение данных

  // Функция для обновления состояния шагов
  function updateStep() {
    // Переключение активного шага
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === currentStep);
    });

    // Восстановление состояния радио-кнопок на каждом шаге
    steps.forEach(step => {
      const radios = step.querySelectorAll('input[type="radio"]');
      radios.forEach(radio => {
        if (userSelections[radio.name] === radio.value) {
          radio.checked = true;
        }
      });
    });

    // Проверка, чтобы на текущем шаге была выбрана радио-кнопка
    if (steps[currentStep]) { // Проверяем, существует ли текущий шаг
      const currentStepRadios = steps[currentStep].querySelectorAll('input[type="radio"]');
      const isSelected = Array.from(currentStepRadios).some(radio => radio.checked);

      nextButtons.forEach(button => {
        button.disabled = !isSelected; // Блокируем кнопку Next, если не выбрана радио-кнопка
      });
    }

  }

  // Функция для активации кнопок на изменении радио-кнопок
  function enableNextButton() {
    // Сохранение выбранных радио-кнопок
    const selectedRadios = document.querySelectorAll(`.step.active input[type="radio"]:checked`);
    selectedRadios.forEach(radio => {
      userSelections[radio.name] = radio.value;
    });

    // Логирование выбора пользователя в консоль
    console.log("Выбранные данные:", userSelections);

    // Проверка, чтобы на текущем шаге была выбрана радио-кнопка
    const currentStepRadios = steps[currentStep].querySelectorAll('input[type="radio"]');
    const isSelected = Array.from(currentStepRadios).some(radio => radio.checked);
    nextButtons.forEach(button => {
      button.disabled = !isSelected; // Блокируем кнопку Next, если не выбрана радио-кнопка
    });
  }

  // Функция сброса шагов калькулятора
  function resetSteps() {
    currentStep = 0; // Возвращаемся к первому шагу
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === 0); // Активируем только первый шаг
    });
    // Сбрасываем выбор радио-кнопок
    Object.keys(userSelections).forEach(key => delete userSelections[key]);
    updateStep(); // Обновляем состояние интерфейса
  }

  // Обработчик для кнопок "Next"
  nextButtons.forEach(button => {
    button.addEventListener("click", function () {
      if (currentStep < steps.length - 1) {
        currentStep++;
        updateStep();
      }
    });
  });

  // Обработчик для кнопок "Previous"
  prevButtons.forEach(button => {
    button.addEventListener("click", function () {
      if (currentStep > 0) {
        currentStep--;
        updateStep();
      }
    });
  });

  // Добавляем обработчики изменения состояния радио-кнопок
  steps.forEach(step => {
    const radios = step.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
      radio.addEventListener('change', enableNextButton);
    });
  });

  // Инициализация первого шага
  updateStep();



  //Замена текста у формы при успешной отправке
  document.querySelectorAll(".form-change").forEach(formContainer => {
    const form = formContainer.querySelector("form");
    const submitButton = form.querySelector(".form__btn");
    const formLeft = formContainer.querySelector(".form__left");

    // Добавляем класс space-between к .form__left
    if (formLeft) {
      formLeft.classList.add("space-between");
    }

    const title = formContainer.querySelector(".header-1");
    const description = formContainer.querySelector(".descr");

    // Создаем обертку для заголовка и описания
    const textWrapper = document.createElement("div");
    textWrapper.classList.add("text-wrapper");

    if (title && description) {
      title.parentNode.insertBefore(textWrapper, title);
      textWrapper.appendChild(title);
      textWrapper.appendChild(description);
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Останавливаем стандартную отправку формы

      if (form.checkValidity()) {
        // Скрываем только input и checkbox внутри текущей формы
        form.querySelectorAll(".input, .checkbox__container").forEach(element => {
          element.style.display = "none";
        });

        // Меняем заголовок и описание
        title.textContent = "Ваша заявка отправлена";
        description.textContent = "Мы свяжемся с вами в течение 30 минут";

        // Создаем новый контейнер с кнопкой-ссылкой
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn__container");

        const homeLink = document.createElement("a");
        homeLink.href = "index.html";
        homeLink.classList.add("form__btn", "btn"); 
        homeLink.textContent = "Вернуться на главную";

        btnContainer.appendChild(homeLink);

        // Вставляем новый контейнер вместо кнопки
        submitButton.replaceWith(btnContainer);


        // Закрытие попапа через 3 секунды
        setTimeout(() => {
          const slide2 = document.getElementById("slide-2");
          if (slide2) {
            slide2.classList.remove("active", "fullscreen");
          }
        }, 3000);
      } else {
        form.reportValidity(); // Показываем встроенные ошибки браузера
      }
    });
  });




  //Работа открытия попап формы для всех страниц
  const formPopupOpenButtons = document.querySelectorAll('.form-popup-open');

  // Добавляем обработчик клика для каждого элемента
  formPopupOpenButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Находим элемент с id="slide-2"
      const slide2 = document.getElementById('slide-2');

      // Добавляем класс fullscreen
      if (slide2) {
        slide2.classList.add('fullscreen');
      }
    });
  });


  //slider-swiper
  const swiper = new Swiper('.swiper', {
    loop: true,


    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  });

  //маска телефон
  const phoneInputs = document.querySelectorAll('.phone-mask');

  phoneInputs.forEach(input => {
    const maskOptions = {
      mask: '+7(000)000-00-00',
      lazy: true
    };

    const mask = new IMask(input, maskOptions);

    input.addEventListener('focus', () => {
      mask.updateOptions({ lazy: false }); // Показываем маску при фокусе
    });

    input.addEventListener('blur', () => {
      if (!input.value.trim()) {
        mask.updateOptions({ lazy: true }); // Прячем маску, если поле пустое
      }
    });
  });

  //Анимация

  const animItems = document.querySelectorAll('.anim__items')

  if (animItems.length > 0) {

    window.addEventListener('scroll', animOnScroll)

    function animOnScroll() {
      for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];

        const animItemHeight = animItem.offsetHeight
        const animItemOffset = offset(animItem).top
        const animStart = 4

        let animItemPoint = window.innerHeight - animItemHeight / animStart

        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart
        }

        if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
          animItem.classList.add('active')
        }
        else {

          if (!animItem.classList.contains('anim-no-hide')) {
            animItem.classList.remove('active')
          }
        }
      }
    }

    function offset(el) {
      const rect = el.getBoundingClientRect()
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      scrollTop = window.pageYOffset || document.documentElement.scrollTop

      return {
        top: rect.top + scrollTop, left: rect.left + scrollLeft
      }
    }

    setTimeout(() => {
      animOnScroll
    }, 100);

    window.onload = function () {
      animOnScroll();
    }

  }


  //ТАБЫ

  const tabs = document.querySelectorAll('.tabs');
  const arrows = document.querySelectorAll('.arrow-down');

  tabs.forEach(tab => {
    const tabContentId = tab.getAttribute('data-tab');
    const tabContent = document.querySelector(`.bottom[data-tab="${tabContentId}"]`);

    tab.addEventListener('click', () => {
      tabs.forEach(tab => tab.classList.remove('active'));
      tab.classList.add('active');

      arrows.forEach(arrow => arrow.classList.remove('active'));
      const arrow = tab.querySelector('.arrow-down'); // Находим стрелку для текущей вкладки
      arrow.classList.add('active');


      document.querySelectorAll('.bottom').forEach(content => content.classList.remove('active'));
      tabContent.classList.add('active');
    });
  });
});




