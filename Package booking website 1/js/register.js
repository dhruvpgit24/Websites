$(document).ready(function () {
    // Custom validation for password match
    $.validator.addMethod("passwordMatch", function (value, element) {
        return value === $("#passwordInput").val();
    }, "Passwords do not match.");

    // Initialize the form validation
    $("#registrationForm").validate({
        rules: {
            username: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 5
            },
            confirmPassword: {
                required: true,
                minlength: 5,
                passwordMatch: true
            }
        },
        messages: {
            username: {
                required: "Please enter your username",
                minlength: "Your username must be at least 3 characters long"
            },
            email: "Please enter a valid email address",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            confirmPassword: {
                required: "Please confirm your password",
                minlength: "Your password must be at least 5 characters long",
                passwordMatch: "Passwords do not match"
            }
        },
        errorPlacement: function (error, element) {
            element.after(error);
        },
        highlight: function (element) {
            $(element).css('background-color', '#ffdddd');
        },
        unhighlight: function (element) {
            $(element).css('background-color', '');
        },
        submitHandler: function (form) {
            var formData = {
                username: $("#usernameInput").val(),
                email: $("#emailInput").val(),
                password: $("#passwordInput").val()
            };

            var submitButton = $(form).find('input[type="submit"]');
            submitButton.val('Registering...').attr('disabled', true).addClass('disabled-cursor');

            // Fetch existing users
            fetch('http://localhost:3000/users')
                .then(response => response.json())
                .then(users => {
                    var usernameExists = users.some(user => user.username === formData.username);
                    var emailExists = users.some(user => user.email === formData.email);

                    // Remove previous error messages
                    $(".errorMessage").remove();
                    $(".errorMessage2").remove();

                    if (usernameExists) {
                        $("#usernameInput").after('<div class="errorMessage">Username already exists.</div>');
                        submitButton.val('Register Now').attr('disabled', false).removeClass('disabled-cursor');
                        if (emailExists) {
                            $("#emailInput").after('<div class="errorMessage2">Email already exists.</div>');
                            submitButton.val('Register Now').attr('disabled', false).removeClass('disabled-cursor');
                            return;
                        }
                        return;
                    }

                    if (emailExists) {
                        $("#emailInput").after('<div class="errorMessage">Email already exists.</div>');
                        submitButton.val('Register Now').attr('disabled', false).removeClass('disabled-cursor');
                        return;
                    }

                    // If no conflicts, add new user
                    fetch('http://localhost:3000/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                            alert('Registration successful!');

                        
                            setTimeout(function () {
                                submitButton.val('Register Now').attr('disabled', false).removeClass('disabled-cursor');
                                form.reset();
                            }, 3000);
                            
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                            alert('Registration failed! Please try again.');

                            submitButton.val('Register Now').attr('disabled', false).removeClass('disabled-cursor');
                        });
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                    submitButton.val('Register Now').attr('disabled', false).removeClass('disabled-cursor');
                });
        }
    });
     // Remove error message on input
     $('#usernameInput').on('input', function() {
        $('.errorMessage').remove();
    });

    $('#emailInput').on('input', function() {
        $('.errorMessage2').remove();
    });
    
});
