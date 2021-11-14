// Slider

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
const testimonials = document.querySelector(".testimonials");

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add("dots__dot--active");
};
activateDot(0);

let curSlide = 0;
let maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%`)
  );
};
goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  activateDot(curSlide);
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  activateDot(curSlide);
  goToSlide(curSlide);
};

btnLeft.addEventListener("click", prevSlide);
btnRight.addEventListener("click", nextSlide);

// Arrows key to change slide
document.addEventListener("keydown", function (e) {
  e.key === "ArrowLeft" && prevSlide();
  e.key === "ArrowRight" && nextSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

// To mobile usage
testimonials.addEventListener("click", nextSlide);

if(screen.width <= 375) {
	const startX = 0; // start position
	const distance = 100; // 100 px de swipe to change slide
	// first contact
	testimonials.addEventListener("touchstart", function(evt) {
		// get keys
		const touches = evt.changedTouches[0];
		startX = touches.pageX;
		between = 0;
	}, false);

	// when contact points move
	testimonials.addEventListener("touchmove", function(evt) {
		// to limit error
		evt.preventDefault();
		evt.stopPropagation();
	}, false);

	// when contact stop
	testimonials.addEventListener("touchend", function(evt) {
		const touches = evt.changedTouches[0];
		const between = touches.pageX - startX;

		// detect direction
		if(between > 0) {
			const orientation = "ltr";
		} else {
			const orientation = "rtl";
		}

		// change slide previous or next
		if(Math.abs(between) >= distance && orientation == "ltr") {
      prevSlide();
		}
		if(Math.abs(between) >= distance && orientation == "rtl") {
      nextSlide()
		}
  }, false);
}


// Form validation

const form = document.getElementsByTagName('form')[0];
const email = document.getElementById('email');
const error = document.querySelector('.footer__form__error');

email.addEventListener("input", function(event) {
  if(email.validity.valid) {
    error.innerHTML = "";
    error.className = "footer__form__error";
    email.classList.remove('invalid');
  }
}, false);

form.addEventListener("submit", function(event) {
  if(!email.validity.valid) {
    error.innerHTML = "Please insert a valid email";
    error.className = "footer__form__error active";
    email.classList.add('invalid');
    event.preventDefault();
  }
}, false);


// Mobile Menu
const menu  = document.querySelector('.header__sidebar');
const overlay  = document.querySelector('.overlay');

function openMobileMenu() {
    menu.style.display = "block";
    overlay.style.visibility = "visible";
}

function closeMobileMenu() {
  menu.style.display = "none";
  overlay.style.visibility = "hidden";
}

overlay.addEventListener('click', closeMobileMenu);
menu.addEventListener('click', closeMobileMenu);