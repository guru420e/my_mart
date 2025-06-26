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

// make sure that the menu is closed when the window is > 568px
window.addEventListener("resize", () => {
  const innderWidth = window.innerWidth;
  if (innderWidth > 568) {
    mobileMenu.style.display = "none";
  }
});
