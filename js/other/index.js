(function () {
  const currentPage = document.querySelector('body').id;

  // Add function that scroll to need section after click on navigation element
  const anchors = [...document.querySelectorAll('.header__nav a[href*="#"]'), ...document.querySelectorAll('.mobMenu a[href*="#"]')];
  const scrollTopBtn = document.querySelector('.scrollTop');

  for (let anchor of [scrollTopBtn, ...anchors]) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      if (currentPage === 'index') {
        if (anchor.className === 'scrollTop active') {
          anchor.setAttribute('href', '#head')
          document.querySelector('a[href="#intro"]').classList.add('active')
        } else {
          document.querySelector('a[href="#intro"]').classList.remove('active')

        }
      } else {
        if (anchor.className === 'scrollTop active') {
          anchor.setAttribute('href', '#head')
          document.querySelector('*[href="#head"]').classList.add('active')
        } else {
          document.querySelector('*[href="#head"]').classList.remove('active')

        }
      }


      const blockID = anchor.getAttribute('href').substr(1)

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }


  // Event listener on scroll top button
  window.addEventListener('scroll', () => {
    if (pageYOffset >= 200) {
      scrollTopBtn.classList.add('active')
    } else {
      scrollTopBtn.classList.remove('active')
    }
  })



  // Form
  if (currentPage === 'index') {
    const label = document.querySelector('#togglePass');
    const input = document.querySelector('.label-pass input[type=password]');

    label.addEventListener('click', () => {
      label.classList.toggle('show');


      if (label.classList.contains('show')) {
        input.setAttribute('type', 'text');
        label.querySelector('span').textContent = 'Hide';
      } else {
        input.setAttribute('type', 'password');
        label.querySelector('span').textContent = 'Show';
      }
    });

    const form = document.querySelector('.contactUs__form-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const [result, resultArray] = validateForm(form.name, form.email)

      if (!result) {
        resultArray.forEach(el => {
          const selector = `input[name=${el}]`;
          form.querySelector(selector).classList.add('error');
        })
      } else {
        form.querySelectorAll('input').forEach(el => {
          el.classList.remove('error');
          el.value = null
        })
        alert('Success');
      }
    })
  }

  function validateForm(name, mail) {
    const nameValue = name.value, nameRegExp = /[0-9]/g;
    const mailValue = mail.value, mailRegExp = /[\w-]+@([\w-]+\.)+[\w-]+/;

    const errorsList = [];

    if (nameValue.match(nameRegExp)) {
      errorsList.push('name');
    }
    if (!mailValue.match(mailRegExp)) {
      errorsList.push('email');
    }

    return [!errorsList.length, errorsList]
  }

  // Mobile menu
  const menuControls = document.querySelectorAll('.menu-toggle');
  const mobileMenu = document.querySelector('.mobMenu');

  menuControls.forEach(menu => {
    menu.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  })

  if (document.querySelector('audio')) {
    document.querySelector('audio').volume = 0.3;
  }
})();

