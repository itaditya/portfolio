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
        // return;
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
        var flkty = new Flickity('.main-carousel', {
            cellAlign: 'left',
            wrapAround: true,
            setGallerySize: false,
            imagesLoaded: true,
            lazyLoad:true
        });
        document.querySelector(".main-carousel").focus();
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
        var formInp = document.querySelectorAll('.form .input');
        var formSub = document.querySelector('.contact-submit');
        addAnim();
        document.addEventListener('keydown', function (event) {
            var evt = event || window.event;
            if (evt.keyCode == 13) {
                formSub.click();
            }
        });

        function inputFocus(event) {
            this.classList.add("touched");
        }
        for (var i = formInp.length - 1; i >= 0; i--) {
            formInp[i].addEventListener('focus', inputFocus)
        }

        function hireSubmit() {
            var filled = document.querySelectorAll(".form .input:valid");
            setTimeout(function () {
                formSub.classList.remove("form-success");
                formSub.classList.remove("form-error");
            }, 800);
            if (filled.length != 3) {
                formSub.classList.add("form-error")
                return
            }
            formSub.classList.add("form-success");
            var jobpost = {
                name: formInp[0].value,
                email: formInp[1].value,
                message: formInp[2].value
            }
            console.log(jobpost);
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
