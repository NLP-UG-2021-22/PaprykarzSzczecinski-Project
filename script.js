var slideshowContainers = document.getElementsByClassName("slideshow-container");
  
for(let s = 0; s < slideshowContainers.length; s++) {  
    var cycle = slideshowContainers[s].dataset.cycle;
    var slides = slideshowContainers[s].querySelectorAll('.mySlides');
    var slideIndex = 0;
    showSlides(slides, slideIndex, cycle);
};
function showSlides(slides, slideIndex, cycle) {
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    };
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    };
    slides[slideIndex - 1].style.display = "block";
    
    setTimeout(function() {
        showSlides(slides, slideIndex, cycle)
    }, cycle);
  };

  const target = window.document.getElementsByTagName('h1')[0]
  const flickerLetter = letter => `<span style="animation: text-flicker-in-glow ${Math.random()*4}s linear both ">${letter}</span>`
  const colorLetter = letter => `<span style="color: hsla(${Math.random()*360}, 100%, 80%, 1);">${letter}</span>`;
  const flickerAndColorText = text => 
    text
      .split('')
      .map(flickerLetter)
      .map(colorLetter)
      .join('');
  const neonGlory = target => target.innerHTML = flickerAndColorText(target.textContent);
  neonGlory(target);
  target.onclick = ({ target }) =>  {
    neonGlory(target);
    const audio = new Audio('neon.mp3');
    const playAudio = audio.play();
  };

  $(window).scroll(function() {
      if ($(document).scrollTop() > 50) {
          $('.nav').addClass('affix');
          console.log("OK");
      } else {
          $('.nav').removeClass('affix');
      }
  });

  $('.navTrigger').click(function () {
  $(this).toggleClass('active');
  console.log("Clicked menu");
  $("#mainListDiv").toggleClass("show_list");
  $("#mainListDiv").fadeIn();

});

const bot = document.getElementById("bot")
let messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const submitButton = document.getElementById("submitButton");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#messageInput").addEventListener("keydown", function(e) {
        if (e.code === "Enter") {
            let messageValue = messageInput.value;
            let paras = document.createElement("div")
            paras.innerText = messageValue;
            messages.appendChild(paras)
            messageInput.value = "";
            let urlModified = url;
            urlModified += messageValue.replaceAll(' ', '+');
            console.log(urlModified);
        }
    })
})

submitButton.onclick = function(event) {
    event.preventDefault();
    let urlModified = url;
    let messageValue = messageInput.value;
    urlModified += messageValue.replaceAll(' ', '+');
    console.log(urlModified);
    let paras = document.createElement("div")
    paras.innerText = messageValue;
    messages.appendChild(paras)
    messageInput.value = "";

}
