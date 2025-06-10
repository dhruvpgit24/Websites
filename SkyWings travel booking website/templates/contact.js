// -----------------------------terms and condition----------------------------
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('terms-link').addEventListener('click', function () {
        document.getElementById('popup-overlay').style.display = 'block';
        document.getElementById('terms-popup').style.display = 'block';
    });

    document.getElementById('popup-overlay').addEventListener('click', closePopup);
});

function closePopup() {
    document.getElementById('popup-overlay').style.display = 'none';
    document.getElementById('terms-popup').style.display = 'none';
}
// ------------------------------------t&c date-----------------------------------
document.getElementById('dateInput').valueAsDate = new Date();
//----------------------------------dropdown profile
document.addEventListener("DOMContentLoaded", function () {
    const profileBtn = document.querySelector(".book-trip");
    const dropdown = document.querySelector(".dropdown-menu");
    const arrow = document.querySelector(".dropdown-arrow");

    profileBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const isOpen = dropdown.style.display === "block";
        dropdown.style.display = isOpen ? "none" : "block";
        arrow.style.transform = isOpen ? "rotate(0deg)" : "rotate(90deg)";
    });

    // Close dropdown and reset arrow when clicking outside
    document.addEventListener("click", function (event) {
        if (!profileBtn.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = "none";
            arrow.style.transform = "rotate(0deg)";
        }
    });
});



const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
console.log(localStorage);