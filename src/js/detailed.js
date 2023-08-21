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

const detailedPageContainers = document.querySelectorAll(".card-img-overlay");
const imageOverlay = [...detailedPageContainers];
console.log(imageOverlay);

imageOverlay.forEach((item) => {
  item.addEventListener("click", () => {
    console.log(item);
    item.classList.toggle("active");
  });
});
