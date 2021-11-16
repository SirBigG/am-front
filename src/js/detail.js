const Fingerprint2 = require("fingerprintjs2/fingerprint2");
require("bootstrap/js/src/dropdown");


function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function usefull(status, post_id) {
    Fingerprint2.get(function (components) {
        const fingerprint = Fingerprint2.x64hash128(components.map(function (pair) {
            return pair.value;
        }).join(), 31);
        let httpRequest = new XMLHttpRequest()
        httpRequest.open('POST', '/api/post/useful/')
        httpRequest.setRequestHeader("X-CSRFToken", getCookie("csrftoken"))
        httpRequest.setRequestHeader("Content-Type", "application/json; charset=utf-8")
        httpRequest.send(JSON.stringify({
            "fingerprint": fingerprint,
            "post_id": post_id,
            "is_useful": status
        }))
        httpRequest.onreadystatechange = function () {
            // Process the server response here.
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    document.getElementById('useful__wrapper').innerHTML = '<span class="h6 text-success">Дякуємо за відгук! Ваш голос буде враховано при публікації контенту.</span>';
                } else {
                    console.log('There was a problem with the request.');
                }
            }
        }
    });
}

function post_view(post_id) {
    let httpRequest = new XMLHttpRequest()
    httpRequest.open('POST', '/api/post/view/')
    httpRequest.setRequestHeader("X-CSRFToken", getCookie("csrftoken"))
    httpRequest.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    httpRequest.send(JSON.stringify({
        "post_id": post_id
    }))
}

document.addEventListener("DOMContentLoaded", function (event) {
        let post_id = document.getElementsByClassName('post_id_value')[0].id;
        const y_button = document.getElementById('useful');
        y_button.addEventListener('click', event => {
            usefull(true, post_id)
        });
        const n_button = document.getElementById('notuseful');
        n_button.addEventListener('click', event => {
            usefull(false, post_id)
        });
        post_view(post_id);
    }
);
