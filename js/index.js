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
      elementsToRemoveClass.forEach(item => item.classList.remove("rotate-arrow"));
      elementsToAddClass.forEach(item => item.classList.add('hide'));
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
      elementsToAddClass.forEach(item => item.classList.add('hide'));
  }
}
//add current year to footer copyright
document.getElementById("year").append(new Date().getFullYear());

//function shows and hides footer contact, categories, about
const footerArrowContact = document.getElementById('footer-arrow-contact');//arrow shows and hide contact
const footerAddress = document.getElementById('footer-address');

const footerArrowCategories = document.getElementById('footer-arrow-categories');//arrow shows and hide footer categories
const footerCategoriesList = document.getElementById('footer-categories-list');

const footerArrowAbout = document.getElementById('footer-arrow-about');//arrow shows and hide footer about
const footerAbout = document.getElementById('footer-about');

function footerToggle(num) {
  switch (num) {
    case 1:
      footerArrowContact.classList.toggle('rotate-arrow');
      footerAddress.classList.toggle('hide');
      break;
    case 2:
      footerArrowCategories.classList.toggle('rotate-arrow');
      footerCategoriesList.classList.toggle('hide');
      break;
    default:
      footerArrowAbout.classList.toggle('rotate-arrow');
      footerAbout.classList.toggle('hide');
  }
}