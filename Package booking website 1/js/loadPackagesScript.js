$(document).ready(function() {
    $.ajax({
        url: './db.json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            loadPackages(data.packages);
        },
        error: function(error) {
            console.error('Error loading the package data:', error);
        }
    });

    function loadPackages(packages) {
        const container = $('#package-container');
        container.empty();
        packages.forEach((pkg, index) => {
            const packageHTML = `
                <div class="box" style="display: ${index < 3 ? 'block' : 'none'};">
                    <div class="image">
                        <img src="${pkg.image}" alt="${pkg.name}">
                    </div>
                    <div class="content">
                        <h3>${pkg.name}</h3>
                        <p>${pkg.description}</p>
                        <a href="book.html" class="btn">book now</a>
                    </div>
                </div>
            `;
            container.append(packageHTML);
        });

        let currentItem = 3;
        $('.packages .load-more .btn').off('click').on('click', function() {
            let boxes = $('.packages .box-container .box');
            for (var i = currentItem; i < currentItem + 3; i++) {
                if (boxes[i]) {
                    $(boxes[i]).css('display', 'block');
                }
            }
            currentItem += 3;
            if (currentItem >= boxes.length) {
                $(this).css('display', 'none');
            }
        });
    }
});