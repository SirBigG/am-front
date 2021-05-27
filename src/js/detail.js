// require("jquery/src/event/alias");
require("jquery/src/event/trigger");
require("jquery/src/ajax");
require("jquery/src/attributes/attr");
// require("popper.js/dist/popper");
const Fingerprint2 = require("fingerprintjs2/fingerprint2");
require("bootstrap/js/src/dropdown");

// require("bootstrap/js/src/carousel");


function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function usefull(status, post_id) {
    Fingerprint2.get(function (components) {
        const fingerprint = Fingerprint2.x64hash128(components.map(function (pair) {
            return pair.value;
        }).join(), 31);
        $.ajax({
            type: 'POST',
            beforeSend: function (request) {
                request.setRequestHeader("X-CSRFToken", getCookie("csrftoken"),);
            },
            url: '/api/post/useful/',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "fingerprint": fingerprint,
                "post_id": post_id,
                "is_useful": status
            }),
            success: function (res) {
                $('#useful__wrapper').html('<span class="h6 text-success">Дякуємо за відгук! Ваш голос буде враховано при публікації контенту.</span>');
            },
            error: function (res) {
                console.log(res)
            }
        });
    });
}

function post_view(post_id) {
    $.ajax({
        type: 'POST',
        url: '/api/post/view/',
        beforeSend: function (request) {
            request.setRequestHeader("X-CSRFToken", getCookie("csrftoken"),);
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            "post_id": post_id
        }),
        success: function (res) {
            console.log("success view");
        }
        ,
        error: function (res) {
            console.log(res);
        }
    })
    ;
}

document.addEventListener("DOMContentLoaded", function (event) {
        let post_id = $('.post_id_value').attr('id');
        $('body').on('click', '#useful', function () {
            usefull(true, post_id)
        });
        $('body').on('click', '#notuseful', function () {
            usefull(false, post_id)
        });
        post_view(post_id);
    }
);
