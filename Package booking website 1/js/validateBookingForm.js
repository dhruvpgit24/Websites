$(document).ready(function () {
    $.validator.addMethod("futureDate", function (value, element) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var inputDate = new Date(value);
        inputDate.setHours(0, 0, 0, 0);
        return this.optional(element) || inputDate > today;
    }, "The date must be in the future.");

    $.validator.addMethod("greaterThan", function (value, element, params) {
        if ($(params).val()) {
            var arrivalDate = new Date($(params).val());
            var leavingDate = new Date(value);
            arrivalDate.setDate(arrivalDate.getDate() + 1);
            return leavingDate > arrivalDate;
        }
        return false;
    }, 'Leaving date must be at least one day after the arrival date.');

    $("#book-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                digits: true
            },
            address: "required",
            location: "required",
            guests: {
                required: true,
                digits: true,
                min: 1,
                max: 10
            },
            arrivals: {
                required: true,
                futureDate: true
            },
            leaving: {
                required: true,
                greaterThan: "input[name='arrivals']"
            }
        },
        messages: {
            name: {
                required: "Please enter your name",
                minlength: "Your name must be at least 3 characters long"
            },
            email: "Please enter a valid email address",
            phone: "Please enter a valid phone number",
            address: "Please enter your address",
            location: "Please select the destination",
            guests: {
                required: "Please enter the number of guests",
                min: "Must be at least 1 guest",
                max: "Maximum of 10 guests allowed"
            },
            arrivals: "Please enter a correct arrival date",
            leaving: "Leaving date must be at least one day after arrival"
        },
        errorPlacement: function (error, element) {
            element.after(error);
        },
        highlight: function (element) {
            $(element).css('background-color', '');
        },
        unhighlight: function (element) {
            $(element).css('background-color', '');
        },
        submitHandler: function (form) {
            var formData = {
                name: $(form).find('input[name="name"]').val(),
                email: $(form).find('input[name="email"]').val(),
                phone: $(form).find('input[name="phone"]').val(),
                address: $(form).find('input[name="address"]').val(),
                location: $(form).find('select[name="location"]').val(), 
                guests: $(form).find('input[name="guests"]').val(),
                arrivals: $(form).find('input[name="arrivals"]').val(),
                leaving: $(form).find('input[name="leaving"]').val()
            };

            var submitButton = $(form).find('input[type="submit"]');
            submitButton.val('Submitting...').attr('disabled', true).addClass('disabled-cursor');

            fetch('http://localhost:3000/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);

                    setTimeout(function () {
                        submitButton.val('Submit').attr('disabled', false).removeClass('disabled-cursor');
                        form.reset();
                    }, 3000);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    submitButton.val('Submit').attr('disabled', false).removeClass('disabled-cursor');
                });
        }


    });
    $(document).ready(function () {
        $.getJSON('../db.json', function (data) {
            var destinationSelect = $('#destination-select');
            data.packages.forEach(function (package) {
                destinationSelect.append($('<option></option>').val(package.name).html(package.name));
            });
        }).fail(function () {
            console.error("Could not load destinations from the JSON file.");
        });
    });

});
