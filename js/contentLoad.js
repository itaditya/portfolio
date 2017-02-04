"use strict";
var elem = document.querySelector('.content');
var footerbtn = document.querySelectorAll('.footer ul li');

function loadHTML(file, callback) {
    var content;
    if (content) {
        callback(content);
    } else {
        var path = 'partials/HTML/' + file + '.html';
        var ajax = new XMLHttpRequest();
        ajax.overrideMimeType("application/html");
        ajax.open('GET', path, true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == '200') {
                sessionStorage.setItem(file, ajax.responseText);
                callback(ajax.responseText);
            }
        };
        ajax.send(null);
    }
}

function init() {
    footerTabSwitch();
    var tabs = ["details", "skills", "achievements", "projects", "contact", "hiring"];
    var hashUrl = document.location.hash;
    var tab = hashUrl.substring(hashUrl.lastIndexOf('#') + 1);
    var tabIndex = tabs.indexOf(tab);
    if (tabIndex == -1) {
        tabIndex = 0;
        tab = tabs[tabIndex];
        document.location.hash = "#details";
        injectJS("details");
    }
    loadHTML(tab, function(response) {
        injectHTML(response);
        document.querySelector(".container").classList.remove("blur");
        footerbtn[tabIndex].click();
    });
    if (screen.width <= 400) {
        toggleFooter();
    }
}
document.addEventListener("DOMContentLoaded", init);

function footerTabSwitch() {
    for (var i = 0; i < footerbtn.length; i++) {
        footerbtn[i].addEventListener('click', switcher);
    }
}

function switcher() {
    var id = this.getAttribute("role").toLowerCase();
    console.log(id);
    // var id = (this.innerHTML).toLowerCase().trim();
    var prevElem = document.querySelector('.active-tab');
    var prevId = prevElem.getAttribute("role").toLowerCase().trim();
    console.log(prevId);
    if (id != prevId) {
        elem.removeChild(elem.children[0]);
        var iconList = {
            details: "icon-newspaper",
            skills: "icon-embed",
            achievements: "icon-trophy",
            projects: "icon-rocket",
            hiring: "icon-briefcase",
            contact: "icon-mug"
        };
        document.querySelector(".container").classList.add("blur");
        document.location.hash = "#" + id;
        var title = document.querySelector('.header .title');
        title.innerHTML = this.getAttribute("role");
        document.querySelector('.header .circle').classList.add(iconList[id]);
        document.querySelector('.header .circle').classList.remove(iconList[prevId]);
        loadHTML(id, function(response) {
            injectHTML(response);
            injectJS(id);
            document.querySelector(".container").classList.remove("blur");
        });
        prevElem.classList.remove('active-tab');
        this.classList.add('active-tab');
        if (screen.width <= 400) {
            toggleFooter();
        }
    }
}