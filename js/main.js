var fbtn = document.querySelector('.menu');
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
	    pointer =  document.querySelector('.pointer');
	pointer.style.top = my + "px";
	pointer.style.left = mx + "px";
	pointer.style.display = "block";
	// console.log(mx,my);
}

fbtn.addEventListener('click',toggleFooter);
function injectHTML(html) {
	elem.insertAdjacentHTML('beforeend',html);
}

function injectJS(choice) {
	var i;


	function addAnim(anim_name) {
		var elem = document.querySelector(".content");
		elem.classList.add("animated");
		elem.classList.add(anim_name);
		setTimeout(function(){
			elem.classList.remove(anim_name);
		},800);
	}
	switch(choice) {
		case "details" :
			console.log("Details Loaded");
		 	break;
		case "skills" :
			console.log("Skills Loaded");
			document.querySelector(".skill-text h4").focus();

			var skill_progress = [80, 60, 90, 80];

			var progress_bars = document.querySelectorAll(".progress-inner");
			var progress_bar_max_width = document.querySelector(".progress-outer").clientWidth;

			for (var j = 0; j < progress_bars.length; j++) {
				progress_bars[j].style.width = parseInt(skill_progress[j])*progress_bar_max_width/100 + "px";
			}

			break;
		case "projects" :
			console.log("Projects Loaded");
			addAnim("fadeIn");
		 	break;
		case "achievements" :
			console.log("Achievements Loaded");
			addAnim("slideInDown");
		 	break;
		case "hiring" :
			/* Hiring form features =-->
			* scrolls to next input
			* works with button as well as return key
			*/
			console.log("Hiring Loaded");

			var formD = document.querySelector('.form ul');
			var formSub = document.querySelector('.hire-submit');
			var formBtns = document.querySelectorAll('.enterBtn');
			var noOfbtn = formBtns.length;

			addAnim("pulse");


			function formFill() {
				var index = this.dataset.index;
				formD.children[index-1].children[1].style.background = '#d9d9d9';
				formD.children[index-1].children[1].style.borderRadius = '4px';

				formD.children[index-1].classList.remove("active");
				formD.children[index].children[1].focus();
				formD.children[index].classList.add("filled");
				formD.children[index].classList.add("active");
			}

			function attachEvent() {
				for( i = 0 ; i < noOfbtn ; i++ ) {
					formBtns[i].dataset.index = i+1;
					formBtns[i].addEventListener('click', formFill);
				}
				document.removeEventListener('mousemove',attachEvent);
			}
			document.addEventListener('mousemove',attachEvent);

			document.addEventListener('keydown',function(event) {
				var evt = event || window.event;
				// console.log(evt.keyCode);
				if (evt.keyCode == 13) {
					var focusedBtn = document.querySelector(".form li.active button");
					if(focusedBtn)
						focusedBtn.click();
					else
						document.querySelector(".hire-submit").click();
				}
			});

			// Form Submission

			function Job(arr) {
				this.title = arr[0];
				this.location = arr[1];
				this.name = arr[2];
				this.description = arr[3];
				this.contact = arr[4];
			}

			function hireSubmit() {
				var arr = [];
				for( i = 0 ; i < noOfbtn + 1 ; i++ ) {
					arr[i] = formD.children[i].children[1].value;
				}
				var jobpost = new Job(arr);
				var result = submitJob(JSON.stringify(jobpost))
				formSub.dataset.response = result ;
				var toScroll = document.querySelector(".content");
				toScroll.scrollTop = toScroll.scrollHeight;
			}

			function submitJob(param) {
				var xmlhttp = new XMLHttpRequest();
		        xmlhttp.onreadystatechange = function() {
		            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		                var result = xmlhttp.responseText;
		                if(result === '1') {
		                	console.log('Sent !');
		                	return "Thank You for Considering Me !";
		                }
		                else
		                {
		                	console.log('Not Sent !');
		                	return "Sorry ! Your mail is not sent ..Try Later !";
		                }
		            }
		        };
		        xmlhttp.open("GET", "send_mail.php?q="+param, true);
		        xmlhttp.send();
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
		 	break;
		default : console.log("Go To Hell Binary Idiot");
	}
}

// document.addEventListener('resize',toggleFooter);
// document.addEventListener('click',showPointer);

/* Hiring form functioning --
 * in starting the attachEvent func adds onclick to all enterbuttons .
 * now on these button click formFill method gets exec
 * this styles the current input field and then focus on the next input field (scrolling)
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
