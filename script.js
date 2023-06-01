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

const url = "https://bechdel-api-workaround.onrender.com/getMoviesByTitle?title="
const url2 = 'https://moviesdatabase.p.rapidapi.com/titles/search/title/'


/*Bot welcome message*/
let parasBot = document.createElement("div");
parasBot.innerText = "Hi! Let me know what movie title you want to test."
parasBot.classList.add("bubble-bot");
messages.appendChild(parasBot)            


/* ON ENTER*/
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#messageInput").addEventListener("keydown", function(e) {
        if (e.code === "Enter") {
            e.preventDefault();
            let messageValue = messageInput.value;


            /*this section displays input in the window*/
            let paras = document.createElement("div")
            paras.innerText = messageValue;
            paras.classList.add("bubble-user");
            messages.appendChild(paras)
            
            /*Construct url for Bechdel from input*/
            getBechdel(messageValue);

            /*Construct url for Movie Data Base from input*/
            getMovieDataBaseUrl(messageValue);

            /*clear the text area*/
            messageInput.value = "";

            scrollToBottom();
            
        }
    })
})



/* ON SUBMIT*/
submitButton.onclick = function(event) {
    event.preventDefault();
    let messageValue = messageInput.value;


    /*display input in window*/
    let paras = document.createElement("div")
    paras.innerText = messageValue;
    paras.classList.add("bubble-user");
    messages.appendChild(paras)
    

    /*Construct url for Bechdel from input*/
    getBechdel(messageValue);

    /*Construct url for Movie Data Base from input*/
    getMovieDataBaseUrl(messageValue);

    /*clear the text area*/
    messageInput.value = "";
    
    scrollToBottom();
}


/*function for testing whether it passes Bechdel*/
function getBechdel(messageValue) {

    let urlBechdel = url;
    urlBechdel += messageValue.replaceAll(' ', '+');
    console.log(urlBechdel);
    fetch(urlBechdel) 
    .then(response => response.json())
    .then(response => {
        let parasBot = document.createElement("div")
        parasBot.classList.add("bubble-bot");


        
        /* response options (passing) */
        let responsePass3 = ["Hell yeah, it passes.", "Yup. It does.", "Fun! It passes. Good to know."]
        /*response options (passes two)*/
        let responsePass2 = ["Well, women talk, but it's about a guy. Honestly, there are so many topics that are more interesting. I don't get it.",
         "Yeah, it doesn't. They only talk about men. Don't ask me why.",
         "Nope. It seems that they have been written to only care about men"
        ]
        /* response options (passes one)*/
        let responsePass1 = ["It doesn't pass. According to the authors of this movie two women have no desire to talk. I think the authorhs haven't met many women",
         "Almost, but not quite. Women are there but they only want to talk to men.... I don't get it either",
        "No. Women only talk to men. Strange."]

        /* response options (passes 0)*/
        let responsePass0 = ["No. They didn't even try.",
         "Hell no. They couldn't even put two women in this movie", 
         "Nope. There aren't two women in this whole movie. It's just sad"]

        /*response options (wrong title) */
        let responseWrongTtile = ["Not a title babe.", 
        "I know many thing, but that I do not.", 
        "Yeah, nah. Try again.",
        "Woops. I don't think that's correct.",
        "That's not how you spell that title. Did you talk to MojitoMan before this?"]

        /*for picking at random*/
        let randomPass3 = responsePass3[Math.floor(Math.random() * responsePass3.length)];
        let randomPass2 = responsePass2[Math.floor(Math.random() * responsePass2.length)];
        let randomPass1 = responsePass1[Math.floor(Math.random() * responsePass1.length)];
        let randomPass0 = responsePass0[Math.floor(Math.random() * responsePass0.length)];
        let randomWrongTtile = responseWrongTtile[Math.floor(Math.random() * responseWrongTtile.length)];
       
/* conditional for passing*/
        try {
                    let score = response[0]["rating"];
                    if (score == 3) {
                        console.log(score);
                        parasBot.innerText = randomPass3;
                        messages.appendChild(parasBot);
                    } else {
                        if (score == 2) {
                            console.log(score);
                            parasBot.innerText = randomPass2;
                            messages.appendChild(parasBot);
                        } else {
                            if (score == 1) {
                                console.log(score);
                                parasBot.innerText = randomPass1;
                                messages.appendChild(parasBot);
                            } else {
                                if (score == 0) {
                                    console.log(score);
                                    parasBot.innerText = randomPass0;
                                    messages.appendChild(parasBot);
                                }
                            }
                    } 

                    }
 
            } catch(err) {
            parasBot.innerText = randomWrongTtile;
            messages.appendChild(parasBot);
        }

        scrollToBottom();
    }

   
    
)}

   


/* function for the Movie Data Base API*/
function getMovieDataBaseUrl () {
    let messageValue = messageInput.value;
    let urlMDB = url2;
        urlMDB += messageValue.replaceAll(' ', '%20') + '?exact=false&info=base_info&titleType=movie';
        console.log(urlMDB)
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'f22efb155emshd153236925f83c7p19b8c5jsn378a0a9c82e9',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        };
        
        fetch(urlMDB, options)
        .then(response => response.json())
        .then(response => console.log(response))   
}

/* Always see the latest message */
function scrollToBottom() {
    const messageScroll = document.querySelector('.messages');
    messageScroll.scrollTop = messageScroll.scrollHeight;
  }