var fbtn = document.getElementsByClassName('menu')[0];
var footer = fbtn.parentNode;
var fheight = footer.clientHeight;
var fstate = 0;
function toggleFooter () {
	// console.log("He");
	if (fstate == 0) {          //the footer was small
		footer.style.height = "70vh";  //footer expanded
		fstate = 1;  
	}
	else {       //footer is expanded      
		footer.style.height = fheight + "px";  //footer smalled
		fstate = 0;
		footer.style.overflow = "hidden" ;
	}
	// Also rotate / change the clicking icon
	// Animate this process
}
function showPointer(e) {
	// var e = event ;
	var mx = e.pageX,
	    my = e.pageY,
	    pointer =  document.getElementsByClassName('pointer')[0];
	pointer.style.top = my + "px";
	pointer.style.left = mx + "px";
	pointer.style.display = "block";
	// console.log(mx,my);
}
fbtn.addEventListener('click',toggleFooter);
// document.addEventListener('resize',toggleFooter);
// document.addEventListener('click',showPointer);

/* Hiring form functioning --
 * in starting the attachEvent func adds onclick to all enterbuttons .
 * now on these button click formFill method gets exec
 * this styles the current input field and then focus on the next input field (scrolling)
*/

/* Hiring form features =-->
* scrolls to next input
* works with button as well as return key 
*/

var formD = document.getElementsByClassName('form')[0];
// targets .form

var formSub = document.getElementsByClassName('hire-submit')[0];

function formFill(index) {
	formD.children[0].children[index-1].children[1].style.background = '#d9d9d9';
	formD.children[0].children[index-1].children[1].style.borderRadius = '4px';
	formD.children[0].children[index].children[1].focus();
}
var formBtns = document.getElementsByClassName('enterBtn');
var noOfbtn = formBtns.length;

function attachEvent() {
	for( i = 0 ; i < noOfbtn ; i++ ) {
		var temp = 'formFill('+(i+1)+')' ;
		formBtns[i].setAttribute('onclick', temp);
	}
}
document.addEventListener('mousemove',attachEvent);

// Form Submission

function Job(arr) {
	this.title = arr[0];
	this.location = arr[1];
	this.name = arr[2];
	this.description = arr[3];
	this.contact = arr[4];
}

function hireSubmit() {
	formSub.dataset.response = "Thank You for considering me" ;
	var arr = ['a','b','c','d','e'];
	for( i = 0 ; i < noOfbtn ; i++ ) {
		arr[i] = formD.children[0].children[i].children[1].value;
	}
	var jobpost = new Job(arr);
	submitJob(JSON.stringify(jobpost))
}

function submitJob(param) {
	console.log(param);
}

formSub.addEventListener('click',hireSubmit);

/* Form Submission processing --
 * object constructor Job is defined .
 * on button click hiresubmit func gets called .
 * this function does these -
   ** give response to user
   ** save all the inputted data into an array
   ** create a Job object of this array
   ** pass object as JSON to submitJob func
        which will use some api to mail me the data .
 */



/* -------------- */

/* String new line trimmer*/
function dtrim(s) {
	var len = s.length;
	var space = 0 , copy = '';

	for( i = 0 ; i < len ; i++ ) {

		// console.log(s[i]);

		if (s[i] != '\n') {
			space = 0;
		}
		else {
			space++;
		}
		if (space < 1) {
			copy += s[i];
		};
	}
	return copy ;
}
var r = dtrim(footer.innerHTML);
// console.log(r);

/*----------------------------*/

/* Future --
* Sliding upwards footer.  --done
* Carousel of projects with text.
* tabbed layout with control from footer.  --maybe dynamic content load helps
* icons.
* download resume,go to home buttons in header
*/

// var contbig = document.getElementsByClassName('main')[0];
  
/* Project Bugs -----
* scrollbar unstyled in firefox.
* footer doen't auto small when resized and was expanded before it.
* achievements page responsiveness has to be improved
*/
