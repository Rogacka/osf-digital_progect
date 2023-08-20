const shoppingContainer = document.querySelectorAll(".shopping-container");
const shoppingContainerShow = [...shoppingContainer];

const heartContainer = document.querySelectorAll(".heart-container");
const heartContainerShow = [...heartContainer];

window.addEventListener("load", function () {
  if (this.localStorage.getItem("shopping") !== undefined) {
    addNumber("shopping", shoppingContainerShow);
    // const subtotalFromLocalStorage = JSON.parse(
    //   localStorage.getItem("shopping")
    // );
    // calculateSubtotalAmount(subtotalFromLocalStorage);
  }

  if (this.localStorage.getItem("liked") != undefined) {
    addNumber("liked", heartContainerShow);
  }

  //check cookies
  const cookies = JSON.parse(this.localStorage.getItem("cookies"));
  console.log(cookies);
  if (cookies === null) {
    this.localStorage.setItem("cookies", false);
  }
  if (cookies === false) {
    this.setTimeout(function () {
      console.log(document.getElementById("openCookieModalButton"));
      document.getElementById("openCookieModalButton").click();
    }, 10000);
  }
});

//function add cookies to local storage
const acceptCookies = document.getElementById("accept-cookies");
acceptCookies?.addEventListener("click", function () {
  localStorage.setItem("cookies", true);

  //cart subtotal
  if (localStorage.getItem) {
    const subtotalFromLocalStorage = JSON.parse(
      localStorage.getItem("shopping")
    );
    calculateSubtotalAmount(subtotalFromLocalStorage);
  }
});

function calculateSubtotalAmount(allProduct) {
  let subtotal = 0;
  console.log(subtotal);
  allProduct.forEach((item) => {
    subtotal += +(item.count * item.price.slice(1));
  });
  const shoppingSumAmount = document.querySelector(".shopping-sum-amount");
  shoppingSumAmount.textContent = `${subtotal.toFixed(2)}`;
}
const shoppingSumAmount = document.querySelector(".shopping-sum-amount");

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
const buy = document.querySelectorAll(".button-buy"); //index.html plus button
const buttonBuy = [...buy];

buttonBuy.forEach((item) => {
  item.addEventListener("click", function () {
    let good = createPoductCard(item);
    console.log("good", good);
    addToLocalStorage("shopping", good);
    addNumber("shopping", shoppingContainerShow);
  });
});

//increse number likes ang shoppings
function addNumber(storageKey, containers) {
  let previousProductsList;
  if (localStorage.getItem(storageKey) !== undefined) {
    previousProductsList = JSON.parse(localStorage.getItem(storageKey));
  }
  let previousProductsListCount = 0;
  if (previousProductsList && previousProductsList.length) {
    previousProductsList.forEach((item) => {
      previousProductsListCount += item.count;
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

/**
 * shopping card
 */

const productToBuyList = JSON.parse(localStorage.getItem("shopping"));

const productsWrapper = document.getElementById("products-wrapper");

productToBuyList?.forEach((product) => {
  productsWrapper?.insertAdjacentHTML(
    "beforeend",
    `
  <div class="row align-product">
    <div class="col col-lg-5 product">
      <img src="${product.image}" class="product__image">
      <div>
        <p class="product__title">${product.name}</p>
        <p class="product__price">${product.price}</p>
      </div>
    </div>
    <div class="col col-lg-5 product__counter">
      <div class="input-group">
        <span class="input-group-btn">
          <button class="btn btn-white btn-minuse" type="button">-</button>
        </span>

        <input type="text" class="form-control product__count no-padding add-color text-center height-25" 
        maxlength="3" value="${product.count}">
        
        <span class="input-group-btn">
          <button class="btn btn-red btn-plus" type="button">+</button>
        </span>
      </div>
      <div class="product__amount">
        <span class="product-price">$${
          +product.price.slice(1) * product.count
        }</span>
      </div>
      <div>
        <span class="material-symbols-outlined button-remove">
          cancel
        </span>
      </div>
    </div>
  </div>
 `
  );
});

const buttonsPlus = document.querySelectorAll(".btn-plus"); //plus buttons shopping.html
const increase = [...buttonsPlus];
const buttonMinus = document.querySelectorAll(".btn-minuse"); //minus buttons shopping.html
const decreese = [...buttonMinus];
const innerCount = document.querySelectorAll(".product__count"); //increese number of goods
const newInnerCount = [...innerCount];
const innerPrice = document.querySelectorAll(".product-price"); //increese prise count
const newInnerPrice = [...innerPrice];

// increese product count
increase.forEach((item) => {
  item.addEventListener("click", function () {
    const previousProducts = JSON.parse(localStorage.getItem("shopping"));
    const productName =
      item.closest(".product__counter").previousElementSibling.lastElementChild
        .firstElementChild.textContent;
    console.log(productName);

    const newProducts = previousProducts.map((item, index) => {
      if (item.name === productName) {
        const newAmount = ++item.count;
        const newPrice = (newAmount * item.price.slice(1)).toFixed(2);
        newInnerPrice[index].textContent = `$${newPrice}`;
        newInnerCount[index].value = `${newAmount}`;
        console.log(newInnerCount[index].value);
        return {
          ...item,
          count: newAmount,
        };
      }
      return item;
    });
    localStorage.setItem("shopping", JSON.stringify(newProducts));
    calculateSubtotalAmount(newProducts);
  });
});

//decreese product count
decreese.forEach((item) => {
  item.addEventListener("click", function () {
    const previousProducts = JSON.parse(localStorage.getItem("shopping"));
    const productName =
      item.closest(".product__counter").previousElementSibling.lastElementChild
        .firstElementChild.textContent;

    const newProducts = previousProducts.map((item, index) => {
      if (item.name === productName && item.count > 1) {
        const newAmount = --item.count;
        const newPrice = (newAmount * item.price.slice(1)).toFixed(2);
        newInnerPrice[index].textContent = `$${newPrice}`;
        newInnerCount[index].value = `${newAmount}`;
        return {
          ...item,
          count: newAmount,
        };
      }
      return item;
    });
    localStorage.setItem("shopping", JSON.stringify(newProducts));
    calculateSubtotalAmount(newProducts);
  });
});

//input change
newInnerCount.forEach((item) => {
  item.addEventListener("keydown", function (event) {
    if (!event.key.match(/\d/) && event.key !== "Backspace") {
      event.preventDefault();
    }
  });

  const eventList = ["blur", "keyup"];

  for (events of eventList) {
    item.addEventListener(events, function (event) {
      if (event.target.value === "" && event.key === "Enter") {
        event.target.value = "1";
      }
      const previousProducts = JSON.parse(localStorage.getItem("shopping"));
      const productName =
        item.closest(".product__counter").previousElementSibling
          .lastElementChild.firstElementChild.textContent;

      const newProducts = previousProducts.map((item, index) => {
        if (item.name === productName) {
          const newPrice = (+event.target.value * item.price.slice(1)).toFixed(
            2
          );
          newInnerPrice[index].textContent = `$${newPrice}`;
          return {
            ...item,
            count: event.target.value,
          };
        }
        return item;
      });
      localStorage.setItem("shopping", JSON.stringify(newProducts));
      calculateSubtotalAmount(newProducts);
    });
  }
});

// remove product from shopping card
const buttonsRemove = document.querySelectorAll(".button-remove");
const buttonsRemoveProduct = [...buttonsRemove];
console.log(buttonsRemoveProduct);

buttonsRemoveProduct.forEach((item) => {
  item.addEventListener("click", function () {
    const previousProducts = JSON.parse(localStorage.getItem("shopping"));
    const itemToRemove = item.closest(".product__counter").parentElement;
    const itemToRemoveName =
      itemToRemove.firstElementChild.lastElementChild.firstElementChild
        .textContent;
    console.log(itemToRemoveName);
    itemToRemove.remove();
    const filteredProductList = previousProducts.filter(
      (product) => product.name !== itemToRemoveName
    );

    console.log(filteredProductList);
    localStorage.setItem("shopping", JSON.stringify(filteredProductList));
    calculateSubtotalAmount(filteredProductList);
  });
});

const shoppingSum = document.querySelector(".shopping__sum");
