//**** MOBILE NAV MENU ****/

const navMenu = document.querySelector(".header__nav ul");
const navLinks = document.querySelectorAll(".header__nav-links li");
const navButtonOpen = document.querySelector(".header__icon-open");
const navButtonClose = document.querySelector(".header__icon-close");
const BgOverlay = document.querySelector(".overlay");

navButtonOpen.addEventListener("click", () => {
	openMenu();
});

navButtonClose.addEventListener("click", () => {
	closeMenu();
});

function openMenu() {
	navButtonOpen.setAttribute("aria-expanded", "true");
	navMenu.setAttribute("data-state", "opened");
	BgOverlay.style.opacity = "1";
	document.body.classList.add("disable-scroll");
}

function closeMenu() {
	navButtonOpen.setAttribute("aria-expanded", "false");
	navMenu.setAttribute("data-state", "closing");
	BgOverlay.style.opacity = "0";
	document.body.classList.remove("disable-scroll");

	navMenu.addEventListener(
		"animationend",
		() => {
			navMenu.setAttribute("data-state", "closed");
		},
		{ once: true },
	);
}
// Close Menu by clicking on nav links
navLinks.forEach(e => {
	e.addEventListener("click", function () {
		const isOpened = navButtonOpen.getAttribute("aria-expanded") === "true";
		if (isOpened) {
			closeMenu();
		}
	});
});
// Close Menu by clicking outside of it
window.addEventListener("click", function (e) {
	const isOpened = navButtonOpen.getAttribute("aria-expanded") === "true";

	if (!navMenu.contains(e.target) && !navButtonOpen.contains(e.target)) {
		if (isOpened) {
			closeMenu();
		}
	}
});

//**** IMG & TEXT SLIDER ****/

const imgTrack = document.querySelector(".grid__img-slider-wrapper");
const txtTrack = document.querySelector(".grid__txt-slider-wrapper");
const imgSlide = Array.from(imgTrack.children);
const txtSlide = Array.from(txtTrack.children);
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".previous");

// Arrange slides next to eachother //
const slidePositionImg = (slide, index) => {
	slide.style.left = "100" * index + "%";
};
const slidePositionTxt = (slide, index) => {
	slide.style.right = "100" * index + "%";
};

imgSlide.forEach(slidePositionImg);
txtSlide.forEach(slidePositionTxt);

const moveToSlide = (
	imgTrack,
	txtTrack,
	currentSlideImg,
	currentSlideTxt,
	targetSlideImg,
	targetSlideTxt,
) => {
	imgTrack.style.transform = "translateX(-" + targetSlideImg.style.left + ")";
	txtTrack.style.transform = "translateX(" + targetSlideTxt.style.right + ")";
	currentSlideImg.classList.remove("current-slide");
	targetSlideImg.classList.add("current-slide");
	currentSlideTxt.classList.remove("current-slide");
	setTimeout(() => {
		targetSlideTxt.classList.add("current-slide");
	}, 300);
};

const updateArrows = (imgSlide, txtSlide, prevButton, nextButton, targetIndex) => {
	if (targetIndex === 0) {
		prevButton.classList.add("inactive");
		nextButton.classList.remove("inactive");
	} else if (targetIndex === imgSlide.length - 1 && targetIndex === txtSlide.length - 1) {
		prevButton.classList.remove("inactive");
		nextButton.classList.add("inactive");
	} else {
		prevButton.classList.remove("inactive");
		nextButton.classList.remove("inactive");
	}
};

// When click on next button move slides to the left
nextButton.addEventListener("click", e => {
	const currentSlideImg = imgTrack.querySelector(".current-slide");
	const currentSlideTxt = txtTrack.querySelector(".current-slide");
	const nextSlideImg = currentSlideImg.nextElementSibling;
	const nextSlideTxt = currentSlideTxt.nextElementSibling;
	const nextIndexImg = imgSlide.findIndex(slide => slide === nextSlideImg);
	const nextIndexITxt = txtSlide.findIndex(slide => slide === nextSlideTxt);

	moveToSlide(imgTrack, txtTrack, currentSlideImg, currentSlideTxt, nextSlideImg, nextSlideTxt);
	updateArrows(imgSlide, txtSlide, prevButton, nextButton, nextIndexImg, nextIndexITxt);
});

prevButton.addEventListener("click", e => {
	const currentSlideImg = imgTrack.querySelector(".current-slide");
	const currentSlideTxt = txtTrack.querySelector(".current-slide");
	const prevSlideImg = currentSlideImg.previousElementSibling;
	const prevSlideTxt = currentSlideTxt.previousElementSibling;
	const prevIndexImg = imgSlide.findIndex(slide => slide === prevSlideImg);
	const prevIndexITxt = txtSlide.findIndex(slide => slide === prevSlideTxt);

	moveToSlide(imgTrack, txtTrack, currentSlideImg, currentSlideTxt, prevSlideImg, prevSlideTxt);
	updateArrows(imgSlide, txtSlide, prevButton, nextButton, prevIndexImg, prevIndexITxt);
});
