// document.querySelector("head").insertAdjacentHTML("afterBegin",'<link type="text/css" rel="stylesheet" href="css/carousel.css"/>');
function SCarousel(prefs) {
    var element = document.querySelector(prefs.element),
        sliderScroller = element.querySelector(".carousel-view"),
        slider = element.querySelector(".carousel-images"),
        cimgno = slider.children.length,
        cprev = element.querySelector("#cprev"),
        cnext = element.querySelector("#cnext"),
        cradiobox = element.querySelector(".radio-container"),
        activeRadio,
        cwidth = 0,
        currentIndex = 0,
        anims = {
            simple: " .4s ease-in-out",
            elastic: ".4s cubic-bezier(0.6, -0.28, 0.74, 0.05)",
            a: ".4s cubic-bezier(0.39, 0.58, 0.57, 1)"
        },
        activeElem = slider.querySelector(".active"),
        interval = prefs.interval || 2000,
        direction = prefs.moveDirection || "forward",
        toMove = 0,
        that = this;
    this.init = function() {
        prefs.width = prefs.width || "600px";
        that.setWidth();
        that.setHeight();
        cwidth = sliderScroller.clientWidth;
        slider.style.width = (cwidth * cimgno) + "px";
        var anim = anims[prefs.animation];
        if (anim) {
            slider.style.transition = anim;
        }
        var slide = slider.children;
        var src = "";
        var radioHtmlOpen = '<input type="radio" name="' + prefs.element + '-radio" value="';
        var radioHtmlClose = '"/>\n\t';
        var radioHtml = "";
        for (var i = slide.length - 1; i >= 0; i--) {
            slide[i].style.width = prefs.width;
            src = slide[i].dataset.src;
            if (src) {
                slide[i].style.background = 'url(' + src + ')';
            }
            slide[i].dataset.index = i;
            radioHtml += radioHtmlOpen + (cimgno - i - 1) + radioHtmlClose;
        }
        if (!activeElem) {
            slider.children[0].classList.add("active");
            activeElem = slider.children[0];
        }
        currentIndex = parseInt(activeElem.dataset.index) || 0;
        if (cradiobox) {
            cradiobox.insertAdjacentHTML("beforeEnd", radioHtml);
            cradiobox.children[currentIndex].classList.add("active");
            activeRadio = cradiobox.children[currentIndex];
            activeRadio.checked = true;
            cradiobox.addEventListener("click", function() {
                that.radiomove(event.target);
            });
        }
        toMove = (currentIndex * cwidth) || 0;
        that.translate();
        if (prefs.automove) {
            that.automove();
        }
    }
    this.setWidth = function() {
        var width = prefs.width;
        sliderScroller.style.width = width;
    }
    this.setHeight = function() {
        var height = prefs.height || "400px";
        sliderScroller.style.height = height;
    }
    this.getIndex = function() {
        return currentIndex;
    }
    this.translate = function() {
        slider.style.transform = "translateX(-" + toMove + "px)";
        activeElem.classList.remove("active");
        activeElem = slider.children[currentIndex];
        activeElem.classList.add("active");
        if (cradiobox) {
            activeRadio.classList.remove("active");
            activeRadio.checked = false;
            activeRadio = cradiobox.children[currentIndex];
            activeRadio.classList.add("active");
            activeRadio.checked = true;
        }
    }
    this.next = function() {
        if (currentIndex < cimgno - 1) {
            currentIndex += 1;
            toMove += cwidth;
        } else {
            toMove = 0;
            currentIndex = 0;
        }
        that.translate();
    }
    this.prev = function() {
        if (currentIndex != 0) {
            currentIndex -= 1;
            toMove -= cwidth;
        } else {
            currentIndex = cimgno - 1;
            toMove = (cimgno - 1) * cwidth;
        }
        that.translate();
    }
    if (cnext) {
        cnext.addEventListener("click", function() {
            that.next();
        });
    }
    if (cprev) {
        cprev.addEventListener("click", function() {
            that.prev();
        });
    }
    //Sliding through arrow keys
    document.addEventListener('keydown', function() {
        var keyno = event.keyCode;
        if (keyno == 39) {
            // key = "Right";
            that.next();
        }
        if (keyno == 37) {
            // key = "Left";
            that.prev();
        }
    });
    this.automove = function() {
        var func = that.next;
        if (direction === "backward") {
            func = that.prev;
        }
        window.setInterval(function() {
            func();
        }, interval);
    }
    this.radiomove = function(target) {
        if ((typeof target.value) === "string") {
            var value = parseInt(target.value),
                diff = value - currentIndex;
            toMove += cwidth * diff;
            currentIndex = value;
            if (diff != 0) {
                that.translate();
            }
        }
    }
    this.init();
}