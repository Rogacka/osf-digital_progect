const detailedPageText = document.getElementById("visible-text");

const visibleDetailedPageText =
  detailedPageText.innerText.slice(0, 100) + "...";
const hiddenDetailedPageText = detailedPageText.innerText.slice(100);

detailedPageText.innerHTML = visibleDetailedPageText;

const readMoreButton = document.querySelector(".detailed-page__read-more");
const readLessButton = document.querySelector(".detailed-page__read-less");

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

//resize image
const resizeButton = document.querySelector(".detailed-page__resize-container");
const biggestContainer = document.querySelector(".biggest-container");

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

biggestContainer.addEventListener("click", () => {
  biggestContainer.classList.toggle("biggest-container__hide");
});

const btnDecrease = document.querySelector(".btn-decrease");
const btnIncrease = document.querySelector(".btn-increase");
const inputValue = document.querySelector(".input-count");

//decrease amount of the product
btnDecrease.addEventListener("click", () => {
  inputValue.value--;
  if (inputValue.value < 1) {
    inputValue.value = 1;
  }
});

//increase amount of the product
btnIncrease.addEventListener("click", () => {
  inputValue.value++;
});

//increase or decrease amount of the product with input
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

//created this product and add it to local storage
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

//print page
function printPage() {
  detailedPageText.innerHTML = visibleDetailedPageText + hiddenDetailedPageText;
  window.print();
  detailedPageText.innerHTML = visibleDetailedPageText;
}
