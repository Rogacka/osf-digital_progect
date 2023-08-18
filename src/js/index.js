const shoppingContainer = document.querySelectorAll(".shopping-container");
const shoppingContainerShow = [...shoppingContainer];

const heartContainer = document.querySelectorAll(".heart-container");
const heartContainerShow = [...heartContainer];

window.addEventListener("load", function () {
  addNumber("shopping", shoppingContainerShow);

  addNumber("liked", heartContainerShow);
});

//function shows and hides header hidden menu
const servises = document.getElementById("servises"); //button services on header desctop
const hiddenMenuDesctop = document.getElementById("hidden-menu-desctop"); //hidden menu on desctop

const buttonOpen = document.getElementById("button-open"); //button opens burger menu
const buttonClose = document.getElementById("button-close"); //button closes burger menu
const hiddenMenuMobile = document.getElementById("hidden-menu-mobile"); //hidden menu on mobile

const arrowServices = document.getElementById("arrow-services"); //arrow servises shows categories and sale
const servicesElements = document.querySelectorAll(".click-service"); //categories and sale

const arrowCategories = document.getElementById("arrow-categories"); //shows categories list
const categoriesMenu = document.getElementById("categories-menu");

const arrowSale = document.getElementById("arrow-sale"); //shows sale list
const saleMenu = document.getElementById("sale-menu");

const elementsToRemoveClass = [arrowServices, arrowCategories, arrowSale];
const elementsToAddClass = [categoriesMenu, saleMenu];

function toggle(num) {
  switch (num) {
    case 1:
      hiddenMenuDesctop.classList.toggle("hide");
      servises.classList.toggle("active");
      break;
    case 2:
      buttonOpen.classList.toggle("hide");
      buttonClose.classList.toggle("hide");
      hiddenMenuMobile.classList.toggle("hide");
      elementsToRemoveClass.forEach((item) =>
        item.classList.remove("rotate-arrow")
      );
      elementsToAddClass.forEach((item) => item.classList.add("hide"));
      servicesElements.forEach((item) => item.classList.add("hide"));
      break;
    case 3:
      arrowCategories.classList.toggle("rotate-arrow");
      categoriesMenu.classList.toggle("hide");
      break;
    case 4:
      arrowSale.classList.toggle("rotate-arrow");
      saleMenu.classList.toggle("hide");
      break;
    default:
      arrowServices.classList.toggle("rotate-arrow");
      servicesElements.forEach((item) => item.classList.toggle("hide"));
      arrowCategories.classList.remove("rotate-arrow");
      arrowSale.classList.remove("rotate-arrow");
      elementsToAddClass.forEach((item) => item.classList.add("hide"));
  }
}
//add current year to footer copyright
document.getElementById("year").append(new Date().getFullYear());

//function shows and hides footer contact, categories, about
const footerArrowContact = document.getElementById("footer-arrow-contact"); //arrow shows and hide contact
const footerAddress = document.getElementById("footer-address");

const footerArrowCategories = document.getElementById(
  "footer-arrow-categories"
); //arrow shows and hide footer categories
const footerCategoriesList = document.getElementById("footer-categories-list");

const footerArrowAbout = document.getElementById("footer-arrow-about"); //arrow shows and hide footer about
const footerAbout = document.getElementById("footer-about");

function footerToggle(num) {
  switch (num) {
    case 1:
      footerArrowContact.classList.toggle("rotate-arrow");
      footerAddress.classList.toggle("hide");
      break;
    case 2:
      footerArrowCategories.classList.toggle("rotate-arrow");
      footerCategoriesList.classList.toggle("hide");
      break;
    default:
      footerArrowAbout.classList.toggle("rotate-arrow");
      footerAbout.classList.toggle("hide");
  }
}

//increase the number of the wish list
const heart = document.querySelectorAll(".button-heart");
const buttonsHeart = [...heart];

buttonsHeart.forEach((item) => {
  item.addEventListener("click", function () {
    const elementChild = item.firstElementChild;
    if (!elementChild?.classList.contains("addedToHeartsList")) {
      elementChild?.classList.add("addedToHeartsList");
      let like = createPoductCard(item);
      addToLocalStorage("liked", like);
      addNumber("liked", heartContainerShow);
    } else {
      elementChild.classList.remove("addedToHeartsList");
      const itemName =
        item.closest(".card").firstElementChild.lastElementChild
          .firstElementChild.textContent;
      console.log(itemName);
      let previousHeartsList = JSON.parse(localStorage.getItem("liked"));
      const filteredHeartslist = previousHeartsList.filter(
        (item) => item.name !== itemName
      );

      localStorage.setItem("liked", JSON.stringify(filteredHeartslist));
      removeNumber("liked", heartContainerShow);
    }
  });
});

//increse the number of the goods
const buy = document.querySelectorAll(".button-buy");
const buttonBuy = [...buy];

buttonBuy.forEach((item) => {
  item.addEventListener("click", function () {
    let good = createPoductCard(item);
    addToLocalStorage("shopping", good);
    addNumber("shopping", shoppingContainerShow);
  });
});

//increse number likes ang shoppings
function addNumber(storageKey, containers) {
  const previousProductsList = JSON.parse(localStorage.getItem(storageKey));
  let previousProductsListCount = 0;
  if (previousProductsList && previousProductsList.length) {
    previousProductsList.forEach((item) => {
      previousProductsListCount += item.count;
      console.log(item.count);
    });
    containers.forEach((el) => {
      el.style.display = "flex";
      el.textContent = `${previousProductsListCount}`;
    });
  }
}

//decreese number likes
function removeNumber(storageKey, containers) {
  const previousProductsList = JSON.parse(localStorage.getItem(storageKey));
  // let previousProductsListCount = 0;
  if (previousProductsList.length === 0) {
    containers.forEach((el) => {
      el.style.display = "none";
    });
  } else {
    containers.forEach((el) => {
      el.style.display = "flex";
      el.textContent = `${previousProductsList.length}`;
    });
  }
}

//create a new product object
function createPoductCard(itemCart) {
  let card = itemCart.closest(".card").firstElementChild;

  let newProduct = {
    name: card.lastElementChild.firstElementChild.textContent,
    image: card.firstElementChild.getAttribute("src"),
    price: card.lastElementChild.lastElementChild.textContent,
    count: 1,
  };

  return newProduct;
}

// add prodacts to local storage
function addToLocalStorage(storageKey, storageProduct) {
  let previousProducts = JSON.parse(localStorage.getItem(storageKey));
  if (previousProducts && previousProducts.length) {
    const productAlreadyExistInStorage = previousProducts.some(
      (item) => item.name === storageProduct.name
    );
    if (productAlreadyExistInStorage) {
      const transformedProductsList = previousProducts.map((item) => {
        if (item.name === storageProduct.name) {
          const newCount = ++item.count;
          return {
            ...item,
            count: storageKey !== "liked" ? newCount : item.count,
          };
        }
        return item;
      });
      localStorage.setItem(storageKey, JSON.stringify(transformedProductsList));
    } else {
      localStorage.setItem(
        storageKey,
        JSON.stringify([...previousProducts, storageProduct])
      );
    }
  } else {
    localStorage.setItem(storageKey, JSON.stringify([storageProduct]));
  }
}
