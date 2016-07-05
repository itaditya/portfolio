// var obj = document.getElementsByClassName('footer')[0];
// // console.log(obj.innerHTML);
// console.log(JSON.stringify(obj.innerHTML));
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
function injectHTML(id,html) {    
	elem.insertAdjacentHTML('beforeend',html);
}

// var load = document.getElementById('load');
// load.addEventListener('click',init);

function init() {
	var path = 'js/JSON/HTMLcontent.json' ;
	loadJSON( path , function(response) {
		data = JSON.parse(response);
		injectHTML('details',data.details);
	});
}
init();

function footerTabSwitch(elems) {
	for(var i = 0 ; i < elems.length ; i++) {
		
		elems[i].addEventListener('click',function() {
			var id = (this.innerHTML).toLowerCase();
			elem.removeChild(elem.children[0]);

			var prevElem = document.querySelector('.active-tab');
			prevElem.classList.remove('active-tab');

			document.querySelector('.header .title').innerHTML = this.innerHTML;
			injectHTML(id,data[id]);
			// console.log(this);
			this.classList.add('active-tab');

			// .innerHTML = this.innerHTML;
		})
	}
}

footerTabSwitch(footerbtn);
// Now data has all the html content and the default page is shown.
// injectHTML('details',data.details);
// id='hiring';
// console.log(document.getElementById(id+'-content'));

/*
 * Call injectHTML() to remove previous child and add new one .
*/

/*To do -----------------
 *  on the clicks of footer buttons I have to remove the child of .content and 
    add the corresponding one .

 *  data is an object having different html templates in them as properties .
 *  data.hiring loads the hiring page template while
    data.details loads the details page template .

*/