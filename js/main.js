// console.log(JSON.stringify(document.querySelector(".content").innerHTML));   
var fbtn = document.querySelector('.menu');
var footer = fbtn.parentNode;
var fheight = footer.clientHeight;
var fstate = 0;

function toggleFooter() {
    if (fstate == 0) { //the footer was small
        footer.style.height = "70vh"; //footer expanded
        fbtn.innerHTML = "v";
        fstate = 1;
    } else { //footer is expanded
        footer.style.height = fheight + "px"; //footer smalled
        footer.style.overflow = "hidden";
        fbtn.innerHTML = "^";
        fstate = 0;
    }
}

function showPointer(e) {
    var mx = e.pageX,
        my = e.pageY,
        pointer = document.querySelector('.pointer');
    pointer.style.top = my + "px";
    pointer.style.left = mx + "px";
    pointer.style.display = "block";
}
fbtn.addEventListener('click', toggleFooter);

function injectHTML(html) {
    elem.insertAdjacentHTML('beforeend', html);
    document.querySelector(".content").scrollTop = 0;
}

function injectJS(choice) {
    var i;

    function addAnim() {
        var anim_name = "fadeIn";
        var elem = document.querySelector(".content");
        elem.classList.add("animated");
        elem.classList.add(anim_name);
        setTimeout(function () {
            elem.classList.remove(anim_name);
        }, 1800);
    }
    switch (choice) {
    case "details":
        console.log("Details Loaded");
        addAnim();
        break;
    case "skills":
        console.log("Skills Loaded");
        // document.querySelector(".skill-text h4").focus();
        var skill_progress = [80, 60, 90, 80];
        var progress_bars = document.querySelectorAll(".progress-inner");
        var progress_bar_max_width = document.querySelector(".progress-outer").clientWidth;
        // setTimeout(function() {
        for (var j = 0; j < progress_bars.length; j++) {
            progress_bars[j].style.width = parseInt(skill_progress[j]) * progress_bar_max_width / 100 + "px";
        }
        // }, 3000);
        // addAnim();
        break;
    case "projects":
        console.log("Projects Loaded");
        addAnim();
        /*        var a = new SCarousel({
                    element: ".carousel-1",
                    animation: "elastic",
                    automove: true,
                    interval: 5000,
                    // width: "800px",
                    // width: "100%",
                    height: "58vh"
                });*/
        window.addEventListener("resize", function () {
            console.log("test");
        })
        break;
    case "achievements":
        console.log("Achievements Loaded");
        // var scroll = document.querySelector(".content")
        // scroll.addEventListener('scroll', function(event) {
        //     console.log(scroll.getBoundingClientRect());
        // });
        addAnim();
        break;
        // case "hiring" :
    case "contact":
        console.log("Contact Loaded");
        var formD = document.querySelector('.form ul');
        var formSub = document.querySelector('.contact-submit');
        var formBtns = document.querySelectorAll('.enterBtn');
        var formInps = document.querySelectorAll('.form input');
        var editBtns = document.querySelectorAll('.editBtn');
        var noOfbtn = formBtns.length;
        addAnim();
        formD.children[0].classList.add("active");
        formD.children[0].children[1].focus();

        function editInput() {
            var index = this.dataset.index;
            formD.children[index - 1].children[1].focus();
        }

        function inputFocus() {
            var parent = this.parentNode;
            parent.classList.remove("filled");
            parent.classList.add("active");
        }

        function inputBlur() {
            var parent = this.parentNode;
            if (this.value.length > 0) {
                parent.classList.add("filled");
                parent.classList.remove("active");
            }
            var input = parent.querySelector("input:valid");
            if(input){
                parent.classList.add("valid");
            }else{
                parent.classList.remove("valid");
            }
        }

        function attachEvent() {
            for (i = 0; i < noOfbtn; i++) {
                var x = formD.children[i].children[0].dataset.step = i + 1;
                formBtns[i].dataset.index = i + 1;
                editBtns[i].dataset.index = i + 1;
                formInps[i].addEventListener('blur', inputBlur);
                formInps[i].addEventListener('focus', inputFocus);
                editBtns[i].addEventListener('click', editInput);
            }
        }
        attachEvent();
        document.addEventListener('keydown', function (event) {
            var evt = event || window.event;
            if (evt.keyCode == 13) {
                var filled = document.querySelectorAll(".form li.filled");
                if (filled.length === 3) {
                    formSub.click();
                }
            }
        });

        function hireSubmit() {
            formSub.classList.add("btn-clicked");
            var jobpost = {
                name: formD.children[0].children[1].value,
                email: formD.children[1].children[1].value,
                message: formD.children[2].children[1].value
            }
            console.log(jobpost);
            // submitJob(JSON.stringify(jobpost));
            setTimeout(function () {
                formSub.classList.remove("btn-clicked");
            }, 800);
        }
        formSub.addEventListener('click', hireSubmit);
        break;
    default:
        console.log("Go To Hell Binary Idiot");
    }
}

function submitJob(param) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var result = xmlhttp.responseText;
            if (result == 1) {
                console.log('Sent !');
                formSub.dataset.response = "Got Your Message !";;
            } else {
                console.log('Not Sent !');
                formSub.dataset.response = "Sorry ! Your mail is not sent ..Try Later !";
            }
        }
    };
    xmlhttp.open("GET", "send_mail.php?q=" + param, true);
    xmlhttp.send();
}
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
