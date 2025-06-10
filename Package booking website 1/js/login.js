$(document).ready(function () {
    // Function to check if email exists
    function checkEmail(email) {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/users')
                .then(response => response.json())
                .then(users => {
                    const user = users.find(user => user.email === email || user.username === email);
                    if (user) {
                        resolve(user);
                    } else {
                        reject('Username or Email not found.');
                    }
                })
                .catch(error => {
                    reject('Error fetching user data.');
                });
        });
    }

    // Function to validate login credentials
    function validateLogin(email, password) {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/users')
                .then(response => response.json())
                .then(users => {
                    const user = users.find(user => (user.email === email || user.username === email) && user.password === password);
                    if (user) {
                        resolve(user);
                    } else {
                        reject('Please enter correct password.');
                    }
                })
                .catch(error => {
                    reject('Error fetching user data.');
                });
        });
    }

    // Event listener for login button click
    $('input[type="button"]').on('click', function () {
        const email = $('input[type="text"]').val();
        
        const password = $('input[type="password"]').val();
        // Check if both fields are empty

        $(".errorMessage").remove();
        $(".errorMessage2").remove();
        // Check if email is empty
        if (!email && !password) {
            $('.input-box1').append('<div class="errorMessage">Please enter your username or email.</div>');
            $('.input-box2').append('<div class="errorMessage2">Please enter your password.</div>');
            return; // Stop further execution
        }
        if (!email) {
            $('.input-box1').append('<div class="errorMessage">Please enter your username or email.</div>');
            return; // Stop further execution
        }
        if (!password) {
            $('.input-box2').append('<div class="errorMessage2">Please enter your password.</div>');
            return; // Stop further execution
        }
        // Check if email exists
        
        checkEmail(email)
            .then(() => {
                // Email exists, now validate password
                validateLogin(email, password)
                    .then(user => {
                        window.location.href = 'index.html';
                    })
                    .catch(error => {
                        // Display error message for invalid password
                        $('.errorMessage').remove();
                        $('.input-box2').append('<div class="errorMessage">' + error + '</div>');
                    });
            })
            .catch(error => {
                // Display error message for email not found
                $('.errorMessage').remove();
                $('.input-box1').append('<div class="errorMessage">' + error + '</div>');
            });
    });
    $('.input-box1').on('input', function() {
        $('.errorMessage').remove();
    });

    $('.input-box2').on('input', function() {
        $('.errorMessage2').remove();
    });
});
