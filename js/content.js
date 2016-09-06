// var obj = document.getElementsByClassName('footer')[0];
// // console.log(obj.innerHTML);
"use strict";
var	elem =  document.querySelector('.content');
var	footerbtn =  document.querySelectorAll('.footer ul li');

var data = "";

function loadJSON(path,callback) {
	var ajax = new XMLHttpRequest();
	ajax.overrideMimeType("application/json");
	ajax.open('GET',path,true);
	ajax.onreadystatechange = function () {
		if(ajax.readyState == 4 && ajax.status == '200') {
			callback(ajax.responseText);
		}
	};
	ajax.send(null);
}

// var load = document.getElementById('load');
// load.addEventListener('click',init);

function init() {
	var path = 'js/JSON/HTMLcontent.json' ;
	loadJSON( path , function(response) {
		data = JSON.parse(response);
		injectHTML(data.details);
		injectJS("details");
		footerTabSwitch(footerbtn);
	});
}
document.addEventListener("DOMContentLoaded", init);

function footerTabSwitch(tabs) {
	for(var i = 0 ; i < tabs.length ; i++) {
		tabs[i].addEventListener('click', switcher);
	}
}

function switcher() {
	var id = (this.innerHTML).toLowerCase();
	var prevElem = document.querySelector('.active-tab');
	var prevId = prevElem.innerHTML.toLowerCase();

	if (id != prevId) {
		elem.removeChild(elem.children[0]);
		var iconList = {
			details : "icon-news" ,
			skills : "icon-embed2" ,
			achievements : "icon-trophy" ,
			projects : "icon-rocket" ,
			hiring : "icon-briefcase"
		};

		var title = document.querySelector('.header .title');
		title.innerHTML = this.innerHTML;
		// 	title.classList.remove("active");


		// setTimeout(function() {
		// title.classList.add("active");

		// },700);

		document.querySelector('.header .circle').classList.add(iconList[id]);
		document.querySelector('.header .circle').classList.remove(iconList[prevId]);

		injectHTML(data[id]);
		injectJS(id);

		prevElem.classList.remove('active-tab');
		this.classList.add('active-tab');
		if(screen.width <= 400) {
			var fbtn = document.querySelector('.menu');
			fbtn.click();
		}
	}

}
// Now data has all the html content and the default page is shown.
// injectHTML(data.details);
// console.log(document.getElementById(id+'-content'));

/*
 * Call injectHTML() to remove previous child and add new one .
*/

/*To do -----------------
 *  on the clicks of footer buttons I have to remove the child of .content and
    add the corresponding one . --done

 *  data is an object having different html templates in them as properties .
 *  data.hiring loads the hiring page template while
    data.details loads the details page template .

*/