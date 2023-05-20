import _a from "popper.js/dist/popper";
import Fingerprint2 from "fingerprintjs2/fingerprint2";
import _ from "bootstrap.native/dist/bootstrap-native-v4";


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
        var http = new XMLHttpRequest();
        http.open('POST', '/api/post/useful/', true);
        http.setRequestHeader("X-CSRFToken", getCookie("csrftoken"),);
        http.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
                document.getElementById('useful__wrapper').innerHTML = '<span class="h6 text-success">Дякуємо за відгук! Ваш голос буде враховано при публікації контенту.</span>';
            } else {
                console.log(http.status);
            }
        }
        http.send(JSON.stringify({
            "fingerprint": fingerprint,
            "post_id": post_id,
            "is_useful": status
        }));
    });
}

function post_view(post_id) {
    Fingerprint2.get(function (components) {
        "use strict";
        const fingerprint = Fingerprint2.x64hash128(components.map(function (pair) {
            return pair.value;
        }).join(), 31);
        console.log(fingerprint);
        var http = new XMLHttpRequest();
        http.open('POST', '/api/post/view/', true);
        http.setRequestHeader("X-CSRFToken", getCookie("csrftoken"),);
        http.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
                console.log("success view");
            } else {
                console.log(http.status);
            }
        }
        http.send(JSON.stringify({
            "fingerprint": fingerprint,
            "post_id": post_id
        }));
    });
}

document.addEventListener("DOMContentLoaded", function (event) {
        let post_id = document.getElementsByClassName('post_id_value')[0].id;
        let useful = document.getElementById('useful');
        useful.addEventListener('click', function () {
            usefull(true, post_id)
        });
        let notuseful = document.getElementById('notuseful');
        notuseful.addEventListener('click', function () {
            usefull(false, post_id)
        });
        post_view(post_id);
    }
);
