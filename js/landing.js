
function loadMainPage(){
    document.querySelector(".page").classList.add("animated");
    document.querySelector(".page").classList.add("fadeOut");
    document.location.pathname = "/main";
}
setTimeout(function(){
  loadMainPage();
  document.querySelector(".transparent-img").style.opacity = 0.2;
},26000);
