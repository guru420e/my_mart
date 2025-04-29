const mobileMenu = document.querySelector("#mobile-menu");
const mobileMenuButton = document.querySelector("#mobile-menu-btn");

// might want to add a class to the button to change its appearance when the menu is open
// to have more control over the button's appearance
mobileMenuButton.addEventListener("click", function () {
  if (getComputedStyle(mobileMenu).display === "none") {
    mobileMenu.style.display = "flex";
  } else {
    mobileMenu.style.display = "none";
  }
});
