const detailedPageText = document.getElementById("visible-text");

const visibleDetailedPageText =
  detailedPageText.innerText.slice(0, 100) + "...";
const hiddenDetailedPageText = detailedPageText.innerText.slice(100);

detailedPageText.innerHTML = visibleDetailedPageText;

const readMoreButton = document.querySelector(".detailed-page__read-more");
const readLessButton = document.querySelector(".detailed-page__read-less");

/**
 * Toggles the display of the detailed page text between a truncated version and the full text
 * @param {HTMLElement} detailedPageText - the element containing the detailed page text
 * @param {HTMLElement} readMoreButton - the element containing the read more button
 * @param {HTMLElement} readLessButton - the element containing the read less button
 */
[readMoreButton, readLessButton].forEach((button) => {
  button.addEventListener("click", () => {
    if (detailedPageText.innerHTML === visibleDetailedPageText) {
      detailedPageText.innerHTML =
        visibleDetailedPageText + hiddenDetailedPageText;
      readMoreButton.style.display = "none";
      readLessButton.style.display = "block";
    } else {
      detailedPageText.innerHTML = visibleDetailedPageText;
      readMoreButton.style.display = "block";
      readLessButton.style.display = "none";
    }
  });
});

const detailedImageOverlay = document.querySelectorAll(".card-img-overlay");
const imageOverlay = [...detailedImageOverlay];

const detailedPageContainer = document.querySelectorAll(
  ".detailed-page__container"
);
const pageContainers = [...detailedPageContainer];

const detailedPageImage = document.querySelectorAll(".detailed-page__image");
const pageImages = [...detailedPageImage];

/**
 * Adds an event listener to each item in the imageOverlay array to toggle the active-img class
 * and the container-active class on the parent item, and toggle the hide-img class on the
 * corresponding pageImages item.
 * @param {Array} imageOverlay - array of DOM elements
 * @param {Array} pageContainers - array of DOM elements
 * @param {Array} pageImages - array of DOM elements
 */
imageOverlay.forEach((item, index) => {
  item.addEventListener("click", () => {
    pageContainers.forEach((element) =>
      element.classList.remove("container-active")
    );
    imageOverlay.forEach((element) => element.classList.remove("active-img"));
    pageImages.forEach((element) => element.classList.add("hide-img"));

    item.classList.toggle("active-img");
    const parentItem = item.closest(".detailed-page__container");
    parentItem.classList.toggle("container-active");
    pageImages[index].classList.toggle("hide-img");
  });
});

const resizeButton = document.querySelector(".detailed-page__resize-container");
const biggestContainer = document.querySelector(".biggest-container");
/**
 * Resizes the biggest container on the page when the resize button is clicked
 * @param {HTMLElement} resizeButton - The resize button element
 * @param {HTMLElement} biggestContainer - The biggest container element
 * @param {Array} pageImages - An array of the page images
 */
resizeButton.addEventListener("click", () => {
  pageImages.forEach((element) => {
    if (!element.classList.contains("hide-img")) {
      biggestContainer.classList.toggle("biggest-container__hide");
      biggestContainer.firstElementChild.style.backgroundImage = `url(${element.getAttribute(
        "src"
      )})`;
    }
  });
});

/**
 * Adds an event listener to the biggestContainer element to toggle the class 'biggest-container__hide'
 */
biggestContainer.addEventListener("click", () => {
  biggestContainer.classList.toggle("biggest-container__hide");
});

const btnDecrease = document.querySelector(".btn-decrease");
const btnIncrease = document.querySelector(".btn-increase");
const inputValue = document.querySelector(".input-count");

/**
 * Decreases the value of the input field when the decrease button is clicked
 * @param {Event} btnDecrease - the decrease button
 * @param {Element} inputValue - the input field element
 */
btnDecrease.addEventListener("click", () => {
  inputValue.value--;
  if (inputValue.value < 1) {
    inputValue.value = 1;
  }
});

/**
 * Increases the value of the input field when the increase button is clicked
 * @param {HTMLElement} btnIncrease - The increase button element
 * @param {HTMLElement} inputValue - The input field element
 */

btnIncrease.addEventListener("click", () => {
  inputValue.value++;
});

/**
 * Adds event listeners to the inputValue element
 * @param {Array} eventList - list of events to add listeners to
 * @param {Object} inputValue - the target element to add event listeners to
 * @returns {undefined}
 */
const eventList = ["keydown", "blur", "keyup"];
for (events of eventList) {
  inputValue.addEventListener(events, function (event) {
    if (!event.key.match(/\d/) && event.key !== "Backspace") {
      event.preventDefault();
    }
    if (
      (event.target.value === "" || event.target.value === "0") &&
      event.key === "Enter"
    ) {
      event.target.value = "1";
    }
  });
}

/**
 * Adds product to local storage and updates the shopping cart icon
 * @param {HTMLElement} addToCart - the add to cart button
 * @param {Object} product - product object containing name, image, price, and count
 * @param {Function} addToLocalStorage - function to add product to local storage
 * @param {String} shopping - key for local storage
 * @param {Function} addNumber - function to update the shopping cart icon
 * @param {String} shoppingContainerShow - key for shopping cart icon
 */
const addToCart = document.querySelector(".btn-success");

addToCart.addEventListener("click", () => {
  const product = {
    name: document.getElementById("product-name").innerText,
    image: document.getElementById("main-img").getAttribute("src"),
    price: document.querySelector(".detailed-page__price").textContent,
    count: parseInt(inputValue.value),
  };
  addToLocalStorage("shopping", product);
  addNumber("shopping", shoppingContainerShow);
});

/**
 * Prints the current page
 */
function printPage() {
  detailedPageText.innerHTML = visibleDetailedPageText + hiddenDetailedPageText;
  window.print();
  detailedPageText.innerHTML = visibleDetailedPageText;
}
