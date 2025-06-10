// // ---------------------edit pfp img----------------
document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const addPhotoBtn = document.getElementById("addPhotoBtn");
    const profileImg = document.getElementById("profileImg");

    addPhotoBtn.addEventListener("click", () => {
        fileInput.click(); // Open file selector when button is clicked
    });

    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                profileImg.src = e.target.result; // Set the new image
            };

            reader.readAsDataURL(file);
        }
    });
});
// --------------------------------------pf-form-----------------------------------
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    let city = document.getElementById("city").value;
    let dob = document.getElementById("dob").value;
    let dobDate = new Date(dob);
    let today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    let m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    
    if (city === "") {
      alert("Please select a city!");
      event.preventDefault();
    }
    if (dob === "" || age < 18) {
      alert("You must be at least 18 years old to register.");
      event.preventDefault();
    }
});
//   --------------------------profile complete--------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const progressBar = document.querySelector(".pfbar");
    const progressText = document.querySelector(".pfbarperp b");
    const profileImg = document.getElementById("profileImg");
    const fileInput = document.getElementById("fileInput");

    const radioInputs = document.querySelectorAll("input[type='radio']");
    const otherInputs = document.querySelectorAll("input:not([type='radio']), select");

    let totalFields = 8;
    let isProfileUploaded = false;

    radioInputs.forEach(radio => {
        radio.checked = false;
    });

    function updateProgressBar() {
        let filledFields = 0;

        let radioChecked = [...radioInputs].some(radio => radio.checked);
        if (radioChecked) {
            filledFields = 1;
        }

        otherInputs.forEach(input => {
            if (input.value.trim() !== "") {
                filledFields++;
            }
        });

        if (isProfileUploaded) {
            filledFields++;
        }

        let completionPercentage = Math.round((filledFields / totalFields) * 100);

        if (!radioChecked && filledFields === 0) {
            completionPercentage = 0;
        }

        completionPercentage = Math.min(completionPercentage, 100);

        progressBar.style.width = `${completionPercentage}%`;
        progressText.textContent = `${completionPercentage}%`;
    }

    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            isProfileUploaded = true;
            updateProgressBar();
        }
    });

    setTimeout(updateProgressBar, 100);

    form.addEventListener("input", updateProgressBar);
});

// -----------------------------------visa-------------------------------------
function toggleVisaDetails() {
    let form = document.querySelector(".visa-form");
    let arrow = document.querySelector(".arrow");

    if (form.style.display === "none" || form.style.display === "") {
        form.style.display = "block";
        arrow.style.transform = "rotate(90deg)";
    } else {
        form.style.display = "none";
        arrow.style.transform = "rotate(0deg)";
    }
}
// --------------------min-max dob in form------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const dobInput = document.getElementById("dob");
    const currentYear = new Date().getFullYear();
    dobInput.min = "1950-01-01";
    dobInput.max = `${currentYear}-12-31`;
});

// ---------------------------co-traveller-----------------------------------
function toggleForm() {
    let form = document.getElementById("cotraveler-form");
    let arrow = document.getElementById("cotraveler-arrow");

    if (form.style.display === "none" || form.style.display === "") {
        form.style.display = "block";
        arrow.innerHTML = "v";
    } else {
        form.style.display = "none";
        arrow.innerHTML = ">";
    }
}
// ----------------------------------------------------------------------------
let nameInput = document.getElementById("cotraveler-name").value;
let nameError = document.getElementById("cotraveler-name-error");
if (!/^[A-Za-z\s]+$/.test(nameInput)) {
    nameError.style.display = "block";
    isValid = false;
} else {
    nameError.style.display = "none";
}
// -----------------------------------------------------------------------------
let dobInput = document.getElementById("cotraveler-dob").value;
let dobError = document.getElementById("cotraveler-dob-error");
if (dobInput) {
    let birthYear = new Date(dobInput).getFullYear();
    let currentYear = new Date().getFullYear();
    if (birthYear < 1995 || birthYear > currentYear) {
        dobError.style.display = "block";
        isValid = false;
    } else {
        dobError.style.display = "none";
    }
} else {
    dobError.style.display = "block";
    isValid = false;
}
// ---------------------------------------------------------------------------





// // -----------------------------------if change permenent-----------------------------
// // document.addEventListener("DOMContentLoaded", function () {
// //     const profileImage = document.getElementById("profileImage");
// //     const imageUpload = document.getElementById("imageUpload");

// //     // Load saved image from local storage
// //     const savedImage = localStorage.getItem("profileImage");
// //     if (savedImage) {
// //         profileImage.src = savedImage;
// //     }

// //     imageUpload.addEventListener("change", function (event) {
// //         const file = event.target.files[0];
// //         if (file) {
// //             const reader = new FileReader();
// //             reader.onload = function () {
// //                 const imageURL = reader.result;
// //                 profileImage.src = imageURL;
                
// //                 // Save the image URL in local storage
// //                 localStorage.setItem("profileImage", imageURL);
// //             };
// //             reader.readAsDataURL(file);
// //         }
// //     });
// // });
