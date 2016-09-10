//20
function loadMainPage(){
    document.querySelector(".page").classList.add("animated");
    document.querySelector(".page").classList.add("fadeOut");
    document.location.pathname = "/index.html";
}
setTimeout(function(){
  loadMainPage()
},21000);
