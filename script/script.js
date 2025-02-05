document.addEventListener('DOMContentLoaded', function () {

  //header скролл скрытие и возвращение
  let header = document.querySelector('header');
  let timeout;

  function removeActiveClass() {
    header.classList.remove('active');
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      header.classList.add('active');
    }, 3000);
  }

  window.addEventListener('scroll', removeActiveClass);


  /*открытие бургер-меню*/

  const burgerBtn = document.querySelector('.burger')
  const closeBtn = document.querySelector('.close')
  const nav = document.querySelector('.header__bottom')
  const navMobile = document.querySelector('.nav__mob')

  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
      nav.classList.toggle('active')
      navMobile.classList.toggle('active')
      burgerBtn.classList.remove('active')
      closeBtn.classList.add('active')

    })
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      nav.classList.toggle('active')
      navMobile.classList.toggle('active')
      burgerBtn.classList.add('active')
      closeBtn.classList.remove('active')
    })
  }


  // скролл партнеры
  let scrollPosition = 0;
  window.addEventListener('scroll', () => {
    let newPosition = window.scrollY * -0.9; // Регулировка скорости смещения
    let newPositionAdv = window.scrollY * -0.28 // Регулировка скорости смещения
    document.getElementById('partners').style.transform = `translate(-10%, -50%) translateX(${newPosition}px)`;
    document.getElementById('advantages').style.transform = `translate(30%, -50%) translateX(${newPositionAdv}px)`;
  });


  //Калькулятор выбор choise 

  //начальное меню
  document.querySelectorAll(".btn-choise").forEach(button => {
    button.addEventListener("click", function () {
      const slide1 = document.getElementById("slide-1");
      const slide2 = document.getElementById("slide-2");

      slide1.classList.remove("active", "fullscreen");
      slide2.classList.add("active", "fullscreen");
    });
  });

  // Закрытие на крестик
  document.querySelectorAll(".close-icon").forEach(closeBtn => {
    closeBtn.addEventListener("click", function () {
      const slide1 = document.getElementById("slide-1");
      const slide2 = document.getElementById("slide-2");

      slide2.classList.remove("active", "fullscreen");
      slide1.classList.add("active", "fullscreen");
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
    const currentStepRadios = steps[currentStep].querySelectorAll('input[type="radio"]');
    const isSelected = Array.from(currentStepRadios).some(radio => radio.checked);
    nextButtons.forEach(button => {
      button.disabled = !isSelected; // Блокируем кнопку Next, если не выбрана радио-кнопка
    });
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
    const title = formContainer.querySelector(".header-1");
    const description = formContainer.querySelector(".descr");

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Останавливаем стандартную отправку формы

      // Проверяем, прошла ли форма валидацию
      if (form.checkValidity()) {
        // Скрываем форму
        form.style.display = "none";

        // Меняем заголовок и описание
        title.textContent = "Ваша заявка отправлена";
        description.textContent = "Мы свяжемся с вами в течение 30 минут";

        // Закрытие попап через 3 секунд
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




