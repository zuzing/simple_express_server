const burger = document.querySelector(".navbar-burger");
const navMenu = document.querySelector(".navbar-menu");
const navLink = document.querySelectorAll("[href]");
const navDivider = document.querySelectorAll(".navbar-divider");

//open menu upon clicking burger
burger.addEventListener("click", mobileMenu);

function mobileMenu() {
    burger.classList.toggle("is-active");
    navMenu.classList.toggle("is-active");
    navDivider.forEach(divider => {
        divider.style.display = "block";
    });
}


//close menu after clicking a link
navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    burger.classList.remove("is-active");
    navMenu.classList.remove("is-active");
}