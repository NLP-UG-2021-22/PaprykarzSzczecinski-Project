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

  document.addEventListener("scroll", (event) => {
    if (window.scrollY > 50) {
        document.querySelector(".nav").classList.add('affix');
    } else {
      document.querySelector(".nav").classList.remove('affix');
    }
  })


const navTrigger = document.querySelector(".navTrigger")
const mainListDiv = document.getElementById("mainListDiv")

navTrigger.addEventListener("click", function() {
    this.classList.toggle('active');
    mainListDiv.classList.toggle("show_list");
})

const bot = document.getElementById("bot")
let messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const submitButton = document.getElementById("submitButton");

const url = "https://bechdeltest.com/api/v1/getMoviesByTitle?title="

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#messageInput").addEventListener("keydown", function(e) {
        if (e.code === "Enter") {
            e.preventDefault();
            let messageValue = messageInput.value;
            let paras = document.createElement("div")
            paras.innerText = messageValue;
            paras.classList.add("bubble-user");
            messages.appendChild(paras)
            messageInput.value = "";
            let urlModified = url;
            urlModified += messageValue.replaceAll(' ', '+');
            console.log(urlModified);
            fetch(urlModified) 
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
        }
    })
})

submitButton.onclick = function(event) {
    event.preventDefault();
    let messageValue = messageInput.value;
    let paras = document.createElement("div")
    paras.innerText = messageValue;
    messages.appendChild(paras)
    messageInput.value = "";
    let urlModified = url;
    urlModified += messageValue.replaceAll(' ', '+');
    console.log(urlModified);
    fetch(urlModified) 
    .then(response => response.json())
    .then(response => {
        console.log(response)
    })

}
