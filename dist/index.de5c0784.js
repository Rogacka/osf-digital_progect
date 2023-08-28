document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector("#carouselExampleControls");
    if (carousel) {
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 2000,
            wrap: true
        });
    }
});
const shoppingContainer = document.querySelectorAll(".shopping-container");
const shoppingContainerShow = [
    ...shoppingContainer
];
const heartContainer = document.querySelectorAll(".heart-container");
const heartContainerShow = [
    ...heartContainer
];
const formCheck = document.querySelectorAll(".form-check-input");
const formCheckInput = [
    ...formCheck
];
window.addEventListener("load", function() {
    if (this.localStorage.getItem("shopping") !== undefined) addNumber("shopping", shoppingContainerShow);
    if (this.localStorage.getItem("liked") !== undefined) addNumber("liked", heartContainerShow);
    //check cookies
    const cookies = JSON.parse(this.localStorage.getItem("cookies"));
    if (cookies === null) this.localStorage.setItem("cookies", false);
    if (cookies === false) this.setTimeout(function() {
        document.getElementById("openCookieModalButton").click();
    }, 10000);
    //cart subtotal
    const checkLocalStorage = JSON.parse(this.localStorage.getItem("shopping"));
    if (checkLocalStorage !== null && checkLocalStorage !== undefined && checkLocalStorage !== "[]") {
        chooseHandling(formCheckInput[0]);
        calculateSubtotalAmount(checkLocalStorage);
        calculateFinalPurchaseAmount(checkLocalStorage);
    }
// if (
//   this.localStorage.getItem("shopping") !== undefined &&
//   this.localStorage.getItem("shopping") !== null &&
//   this.localStorage.getItem("shopping") !== "[]"
// ) {
//   const subtotalFromLocalStorage = JSON.parse(
//     localStorage.getItem("shopping")
//   );
//   chooseHandling(formCheckInput[0]);
//   calculateSubtotalAmount(subtotalFromLocalStorage);
//   calculateFinalPurchaseAmount(subtotalFromLocalStorage);
// }
});
//function add cookies to local storage
const acceptCookies = document.getElementById("accept-cookies");
acceptCookies?.addEventListener("click", function() {
    localStorage.setItem("cookies", true);
});
//check email
const formControlInput = document.getElementById("exampleFormControlInput1");
formControlInput.addEventListener("blur", function() {
    const email = formControlInput.value;
    const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegEx.test(email)) {
        formControlInput.classList.remove("is-invalid");
        formControlInput.classList.add("is-valid");
        document.getElementById("sing-in__submit").disabled = false;
    } else {
        formControlInput.classList.remove("is-valid");
        formControlInput.classList.add("is-invalid");
        document.getElementById("sing-in__submit").disabled = true;
    }
});
//check password
const formControlPassword = document.getElementById("inputPassword");
formControlPassword.addEventListener("blur", function() {
    const password = formControlPassword.value;
    const passwordRegEx = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{6,}$/;
    if (passwordRegEx.test(password)) {
        formControlPassword.classList.remove("is-invalid");
        formControlPassword.classList.add("is-valid");
        document.getElementById("sing-in__submit").disabled = false;
    } else {
        formControlPassword.classList.remove("is-valid");
        formControlPassword.classList.add("is-invalid");
        document.getElementById("sing-in__submit").disabled = true;
    }
});
//show and hide password
const passwordIcon = document.querySelector(".password--icon");
passwordIcon?.addEventListener("click", function() {
    if (formControlPassword.type === "password") {
        formControlPassword.type = "text";
        passwordIcon.firstElementChild.style.opacity = "0";
    } else {
        formControlPassword.type = "password";
        passwordIcon.firstElementChild.style.opacity = "1";
    }
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
const elementsToRemoveClass = [
    arrowServices,
    arrowCategories,
    arrowSale
];
const elementsToAddClass = [
    categoriesMenu,
    saleMenu
];
function toggle(num) {
    switch(num){
        case 1:
            hiddenMenuDesctop.classList.toggle("hide");
            servises.classList.toggle("active");
            break;
        case 2:
            buttonOpen.classList.toggle("hide");
            buttonClose.classList.toggle("hide");
            hiddenMenuMobile.classList.toggle("hide");
            elementsToRemoveClass.forEach((item)=>item.classList.remove("rotate-arrow"));
            elementsToAddClass.forEach((item)=>item.classList.add("hide"));
            servicesElements.forEach((item)=>item.classList.add("hide"));
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
            servicesElements.forEach((item)=>item.classList.toggle("hide"));
            arrowCategories.classList.remove("rotate-arrow");
            arrowSale.classList.remove("rotate-arrow");
            elementsToAddClass.forEach((item)=>item.classList.add("hide"));
    }
}
//add current year to footer copyright
document.getElementById("year").append(new Date().getFullYear());
//function shows and hides footer contact, categories, about
const footerArrowContact = document.getElementById("footer-arrow-contact"); //arrow shows and hide contact
const footerAddress = document.getElementById("footer-address");
const footerArrowCategories = document.getElementById("footer-arrow-categories"); //arrow shows and hide footer categories
const footerCategoriesList = document.getElementById("footer-categories-list");
const footerArrowAbout = document.getElementById("footer-arrow-about"); //arrow shows and hide footer about
const footerAbout = document.getElementById("footer-about");
function footerToggle(num) {
    switch(num){
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
const buttonsHeart = [
    ...heart
];
buttonsHeart.forEach((item)=>{
    item.addEventListener("click", function() {
        const elementChild = item.firstElementChild;
        if (!elementChild?.classList.contains("addedToHeartsList")) {
            elementChild?.classList.add("addedToHeartsList");
            let like = createPoductCard(item);
            addToLocalStorage("liked", like);
            addNumber("liked", heartContainerShow);
        } else {
            elementChild.classList.remove("addedToHeartsList");
            const itemName = item.closest(".card").firstElementChild.lastElementChild.firstElementChild.textContent;
            let previousHeartsList = JSON.parse(localStorage.getItem("liked"));
            const filteredHeartslist = previousHeartsList.filter((item)=>item.name !== itemName);
            localStorage.setItem("liked", JSON.stringify(filteredHeartslist));
            removeNumber("liked", heartContainerShow);
        }
    });
    // Restore addedToHeartsList state on page reload
    const itemName = item.closest(".card").firstElementChild.lastElementChild.firstElementChild.textContent;
    const previousHeartsList = JSON.parse(localStorage.getItem("liked"));
    if (previousHeartsList) {
        const isLiked = previousHeartsList.some((item)=>item.name === itemName);
        if (isLiked) item.firstElementChild?.classList.add("addedToHeartsList");
    }
});
//increse the number of the goods
const buy = document.querySelectorAll(".button-buy"); //index.html plus button
const buttonBuy = [
    ...buy
];
buttonBuy.forEach((item)=>{
    item.addEventListener("click", function() {
        if (item.getAttribute("id") === null) {
            let good = createPoductCard(item);
            addToLocalStorage("shopping", good);
            addNumber("shopping", shoppingContainerShow);
        } else if (item.getAttribute("id") === "add-to-card") {
            const btnBuyNow = document.getElementById("add-to-card");
            const product = {
                name: document.getElementById("img-2").getAttribute("alt"),
                image: document.getElementById("img-2").getAttribute("src"),
                price: btnBuyNow.previousElementSibling.innerText,
                count: 1
            };
            addToLocalStorage("shopping", product);
            addNumber("shopping", shoppingContainerShow);
        } else {
            const btnBuyNowSmallScreen = document.getElementById("add-to-card-small");
            const product = {
                name: document.getElementById("img-3").getAttribute("alt"),
                image: document.getElementById("img-3").getAttribute("src"),
                price: btnBuyNowSmallScreen.previousElementSibling.innerText,
                count: 1
            };
            addToLocalStorage("shopping", product);
            addNumber("shopping", shoppingContainerShow);
        }
    });
});
//increse number likes ang shoppings
function addNumber(storageKey, containers) {
    let previousProductsList;
    if (localStorage.getItem(storageKey) !== undefined) previousProductsList = JSON.parse(localStorage.getItem(storageKey));
    let previousProductsListCount = 0;
    if (previousProductsList && previousProductsList.length) {
        previousProductsList.forEach((item)=>{
            previousProductsListCount += item.count;
        });
        containers.forEach((el)=>{
            el.style.display = "flex";
            el.textContent = `${previousProductsListCount}`;
        });
    }
}
//decreese number likes
function removeNumber(storageKey, containers) {
    const previousProductsList = JSON.parse(localStorage.getItem(storageKey));
    if (previousProductsList.length === 0) containers.forEach((el)=>{
        el.style.display = "none";
    });
    else containers.forEach((el)=>{
        el.style.display = "flex";
        el.textContent = `${previousProductsList.length}`;
    });
}
//create a new product object
function createPoductCard(itemCart) {
    let card = itemCart.closest(".card").firstElementChild;
    let newProduct = {
        name: card.lastElementChild.firstElementChild.textContent,
        image: card.firstElementChild.getAttribute("src"),
        price: card.lastElementChild.lastElementChild.textContent,
        count: 1
    };
    return newProduct;
}
// add prodacts to local storage
function addToLocalStorage(storageKey, storageProduct) {
    let previousProducts = JSON.parse(localStorage.getItem(storageKey));
    if (previousProducts && previousProducts.length) {
        const productAlreadyExistInStorage = previousProducts.some((item)=>item.name === storageProduct.name);
        if (productAlreadyExistInStorage) {
            const transformedProductsList = previousProducts.map((item)=>{
                if (item.name === storageProduct.name && +storageProduct.count === 1) {
                    const newCount = ++item.count;
                    return {
                        ...item,
                        count: storageKey !== "liked" ? newCount : item.count
                    };
                } else if (item.name === storageProduct.name && +storageProduct.count > 1) return {
                    ...item,
                    count: +item.count + +storageProduct.count
                };
                return item;
            });
            localStorage.setItem(storageKey, JSON.stringify(transformedProductsList));
        } else localStorage.setItem(storageKey, JSON.stringify([
            ...previousProducts,
            storageProduct
        ]));
    } else localStorage.setItem(storageKey, JSON.stringify([
        storageProduct
    ]));
}
/**
 * shopping card
 */ const productToBuyList = JSON.parse(localStorage.getItem("shopping"));
const productsWrapper = document.getElementById("products-wrapper");
productToBuyList?.forEach((product)=>{
    productsWrapper?.insertAdjacentHTML("beforeend", `
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
        <span class="product-price">$${(+product.price.slice(1) * product.count).toFixed(2)}</span>
      </div>
      <div>
        <span class="material-symbols-outlined button-remove">
          cancel
        </span>
      </div>
    </div>
  </div>
 `);
});
const buttonsPlus = document.querySelectorAll(".btn-plus"); //plus buttons shopping.html
const increase = [
    ...buttonsPlus
];
const buttonMinus = document.querySelectorAll(".btn-minuse"); //minus buttons shopping.html
const decreese = [
    ...buttonMinus
];
const innerCount = document.querySelectorAll(".product__count"); //increese number of goods
const newInnerCount = [
    ...innerCount
];
const innerPrice = document.querySelectorAll(".product-price"); //increese price count
const newInnerPrice = [
    ...innerPrice
];
// increese product count
increase.forEach((item)=>{
    item.addEventListener("click", function() {
        const previousProducts = JSON.parse(localStorage.getItem("shopping"));
        const productName = item.closest(".product__counter").previousElementSibling.lastElementChild.firstElementChild.textContent;
        const newProducts = previousProducts.map((item, index)=>{
            if (item.name === productName) {
                const newAmount = ++item.count;
                const newPrice = (newAmount * item.price.slice(1)).toFixed(2);
                newInnerPrice[index].textContent = `$${newPrice}`;
                newInnerCount[index].value = `${newAmount}`;
                return {
                    ...item,
                    count: newAmount
                };
            }
            return item;
        });
        localStorage.setItem("shopping", JSON.stringify(newProducts));
        calculateSubtotalAmount(newProducts);
        calculateFinalPurchaseAmount(newProducts);
    });
});
//decreese product count
decreese.forEach((item)=>{
    item.addEventListener("click", function() {
        const previousProducts = JSON.parse(localStorage.getItem("shopping"));
        const productName = item.closest(".product__counter").previousElementSibling.lastElementChild.firstElementChild.textContent;
        const newProducts = previousProducts.map((item, index)=>{
            if (item.name === productName && item.count > 1) {
                const newAmount = --item.count;
                const newPrice = (newAmount * item.price.slice(1)).toFixed(2);
                newInnerPrice[index].textContent = `$${newPrice}`;
                newInnerCount[index].value = `${newAmount}`;
                return {
                    ...item,
                    count: newAmount
                };
            }
            return item;
        });
        localStorage.setItem("shopping", JSON.stringify(newProducts));
        calculateSubtotalAmount(newProducts);
        calculateFinalPurchaseAmount(newProducts);
    });
});
//input change
newInnerCount.forEach((item)=>{
    item.addEventListener("keydown", function(event) {
        if (!event.key.match(/\d/) && event.key !== "Backspace") event.preventDefault();
    });
    const eventList = [
        "blur",
        "keyup"
    ];
    for (events of eventList)item.addEventListener(events, function(event) {
        if (event.target.value === "" && event.key === "Enter") event.target.value = "1";
        const previousProducts = JSON.parse(localStorage.getItem("shopping"));
        const productName = item.closest(".product__counter").previousElementSibling.lastElementChild.firstElementChild.textContent;
        const newProducts = previousProducts.map((item, index)=>{
            if (item.name === productName) {
                const newPrice = (+event.target.value * item.price.slice(1)).toFixed(2);
                newInnerPrice[index].textContent = `$${newPrice.toFixed(2)}`;
                return {
                    ...item,
                    count: event.target.value
                };
            }
            return item;
        });
        localStorage.setItem("shopping", JSON.stringify(newProducts));
        calculateSubtotalAmount(newProducts);
        calculateFinalPurchaseAmount(newProducts);
    });
});
// remove product from shopping card
const buttonsRemove = document.querySelectorAll(".button-remove");
const buttonsRemoveProduct = [
    ...buttonsRemove
];
buttonsRemoveProduct.forEach((item)=>{
    item.addEventListener("click", function() {
        const previousProducts = JSON.parse(localStorage.getItem("shopping"));
        const itemToRemove = item.closest(".product__counter").parentElement;
        const itemToRemoveName = itemToRemove.firstElementChild.lastElementChild.firstElementChild.textContent;
        itemToRemove.remove();
        const filteredProductList = previousProducts.filter((product)=>product.name !== itemToRemoveName);
        localStorage.setItem("shopping", JSON.stringify(filteredProductList));
        calculateSubtotalAmount(filteredProductList);
        calculateFinalPurchaseAmount(filteredProductList);
    });
});
//function calculate sub total amount
function calculateSubtotalAmount(allProduct) {
    let subtotal = 0;
    allProduct.forEach((item)=>{
        subtotal += +(item.count * item.price.slice(1));
    });
    const shoppingSumAmount = document.querySelector(".shopping-sum-amount");
    if (shoppingSumAmount) shoppingSumAmount.textContent = `${subtotal.toFixed(2)}`;
}
//function calculate handling
const finalPurchaseAmount = document.querySelector(".final-purchase-amount");
let finalPurchaseAmountValue = finalPurchaseAmount?.textContent;
formCheckInput.forEach((item)=>{
    item.addEventListener("click", function() {
        chooseHandling(item);
        calculateFinalPurchaseAmount(JSON.parse(localStorage.getItem("shopping")));
    });
});
let shippingAndHandling = 0;
function chooseHandling(item) {
    const handling = item?.nextElementSibling?.firstElementChild;
    if (handling !== null && finalPurchaseAmount) {
        finalPurchaseAmount.textContent = handling?.textContent?.slice(1);
        shippingAndHandling = +handling?.textContent?.slice(1);
    } else if (finalPurchaseAmount) {
        finalPurchaseAmount.innerHTML = finalPurchaseAmountValue;
        shippingAndHandling = 0;
    }
}
//function calculate final purchase amount
function calculateFinalPurchaseAmount(allProducts) {
    let subtotal = 0;
    allProducts.forEach((item)=>{
        subtotal += +(item.count * item.price.slice(1));
    });
    if (finalPurchaseAmount) finalPurchaseAmount.innerHTML = (subtotal + shippingAndHandling).toFixed(2);
}
// show more products
const showMoreCard = document.getElementById("show-more-card");
showMoreCard?.addEventListener("click", function() {
    fetch("https://fakestoreapi.com/products?limit=4").then((response)=>{
        console.log(response);
        return response.json();
    }).then((data)=>{
        console.log(data);
        const popularItem = document.querySelector(".popular__item");
        data.forEach((item)=>{
            popularItem.insertAdjacentHTML("beforeend", `
        <div class="card">
              <div class="card__main">
                <img
                  class="card__img"
                  src="${item.image}"
                  alt="Kristina Dam Oak Table With White Marble Top"
                />
                <div class="card__info">
                  <p>${item.title}</p>
                  <p>$${item.price}</p>
                </div>
              </div>
              <div class="card__overlay">
                <div class="card__buttons">
                  <div class="card__button button-buy">
                    <i class="fa fa-plus plus"></i>
                  </div>
                  <div class="card__button button-heart">
                    <i class="fa fa-heart heart"></i>
                  </div>
                </div>
              </div>
            </div>
        `);
        });
    }).catch((error)=>{
        console.log(error);
    });
});
const closeModalSingIn = document.getElementById("exampleModal");
closeModalSingIn.addEventListener("keydown", (event)=>{
    if (event.key === "Escape") closeModalSingIn.classList.remove("show");
});
const hideFilterServices = document.querySelector(".hide-filter");
const filterServices = document.querySelector(".filter-services");
if (hideFilterServices) hideFilterServices.addEventListener("click", function() {
    filterServices.classList.toggle("hide");
    hideFilterServices.firstElementChild.classList.toggle("hide");
    hideFilterServices.lastElementChild.classList.toggle("hide");
    hideFilterServices.style.marginBottom = "0";
});

//# sourceMappingURL=index.de5c0784.js.map
