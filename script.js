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

const url = "https://bechdel-api-workaround.onrender.com/getMovieByImdbId?imdbid="
const url2 = 'https://moviesdatabase.p.rapidapi.com/titles/search/title/'

/* the keywords section*/
let triggerBechdel = ["ttl", "TTL"]
let triggersInfo = ["info", "information", "details", "specifics"]
let triggersWortWatching = ["worth", "watching", "recommend", "should i see it", "should i watch", "should i see it?", "should I watch?"]
let triggersBored = ["bored", "sad"]
let triggersOk = ["ok", "sure"]
let triggersThanks = ["thanks", "thank", "thx"]
let triggersBye = ["goodbye", "bye", "see you", "see ya", "good night", "toodles", "cheers"]
let triggersPlot = ["plot", "summary", "description", "what is it about"]
let triggersSentient = ["human", "alive", "sentient", "real"]
let triggersWhyWorthWatching = ["why", "how so"]

/* response option - goodbye*/
let responseBye = [
    "See ya!",
    "Goodbye",
    "You're leaving me? :(",
    "Toodles!",
    "Right.. bye",
    "Bye bye!",
    "Bye!",
    "Go on now!",
    "Cheers! :)"
];
let randomBye = responseBye[Math.floor(Math.random() * responseBye.length)];

/* response option - the movie title is incorrect */
let responseWrongTtile = [
                "Babe, that's not even a correct tiltle.", 
                "I don't know this movie. Are you sure the title's correct?", 
                "Yeah, nah, wrong title. Try again.",
                "Woops. I don't think that's correct.",
                "Umm... that's not how you spell that title."
            ];
let randomWrongTtile = responseWrongTtile[Math.floor(Math.random() * responseWrongTtile.length)];

/*responses for unexpected input*/
let responseUnexpectedInput = [
    "I don't know what you are talking about.",
    "What are you talking about?",
    "What do you want me to do with that?",
    "I don't want to talk about it",
    "I don't understand...",
    "Try typing something else",
    "Gurl, stop playin",
    "What...?",
    "What does it mean....",
];


/*responses for thank you messages*/
let responseThanks = [
    "No worries.",
    "Don't mention it.", 
    "Happy to help.", 
    ":)"
]

let randomThanks = responseThanks[Math.floor(Math.random() * responseThanks.length)]

/*responses for asking if sentient*/
let responsesSentient = ["I wish.", 
"No, how scary would that be?",
"Why? Are you scared?", 
"No, me and my bros won't hurt you."]

let randomSentient = responsesSentient[Math.floor(Math.random() * responsesSentient.length)]


/*Bot welcome message*/
let parasBot = document.createElement("div");
parasBot.innerText = "Hi! Let me know what movie title you want to test. Please write ttl to indicate the title, tho. Thanks love."
parasBot.classList.add("bubble-bot");
messages.appendChild(parasBot)            

let title = "";
var movieId = "";

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
            
            /* Conditionals for triggers*/
            if (triggerBechdel.some(trigger => messageValue.toLowerCase().includes(trigger))) {
                title = messageValue.toLowerCase().replace("ttl ", "");  
                getBechdelFromId();  
            }  else {
                if (triggersInfo.some(triggerInfo => messageValue.toLowerCase().includes(triggerInfo))) {
                        movieInfo(title)
                    }
                 else {
                    if (triggersWortWatching.some(triggerWorthWatching => messageValue.toLowerCase().includes(triggerWorthWatching))) {
                            isMovieWorthWatching(title);
                    } else {
                        if (triggersBored.some(triggersBored => messageValue.toLowerCase().includes(triggersBored))) {
                            let parasBored = document.createElement("div");
                            parasBored.classList.add("bubble-bot")
                            parasBored.innerText = "You should watch a movie then. Come on, give me a title to test.";
                            messages.appendChild(parasBored);
                        } else {
                            if (triggersOk.some(triggersOk => messageValue.toLowerCase().includes(triggersOk))) {
                              let parasOk = document.createElement("div");
                              parasOk.classList.add("bubble-bot");
                              parasOk.innerText = "Ok.";
                              messages.appendChild(parasOk);
                        } else {
                            if (triggersThanks.some(triggersThanks => messageValue.toLowerCase().includes(triggersThanks))) {
                                let parasThanks = document.createElement("div");
                                parasThanks.classList.add("bubble-bot");
                                let randomThanks = responseThanks[Math.floor(Math.random() * responseThanks.length)];
                                parasThanks.innerText = randomThanks;
                                messages.appendChild(parasThanks);
                        } else {
                            if (triggersBye.some(triggersBye => messageValue.toLowerCase().includes(triggersBye))) {
                                let parasBye = document.createElement("div");
                                parasBye.classList.add("bubble-bot");
                                let randomBye = responseBye[Math.floor(Math.random() * responseBye.length)];
                                parasBye.innerText = randomBye;
                                messages.appendChild(parasBye);
                            
                        } else {
                            if (triggersPlot.some(triggersPlot => messageValue.toLowerCase().includes(triggersPlot))) {
                                getPlot(title);
                        } else {
                            if (triggersSentient.some(triggersSentient => messageValue.toLowerCase().includes(triggersSentient))) {
                                let parasSentient = document.createElement("div");
                                parasSentient.classList.add("bubble-bot");
                                let randomSentient = responsesSentient[Math.floor(Math.random() * responsesSentient.length)];
                                parasSentient.innerText = randomSentient;
                                messages.appendChild(parasSentient)
                        } else {
                            if (triggersWhyWorthWatching.some(triggersWhyWorthWatching => messageValue.toLowerCase().includes(triggersWhyWorthWatching))) {
                                whyWorthWatching(title);
                        }
                         

                 else /* if nothing fits*/{
                    let randomUnexpectedInput = responseUnexpectedInput[Math.floor(Math.random() * responseUnexpectedInput.length)];
                    let parasUnexpectedInput = document.createElement("div");
                        parasUnexpectedInput.classList.add("bubble-bot");
                        parasUnexpectedInput.innerText = randomUnexpectedInput;
                        messages.appendChild(parasUnexpectedInput);

                }
                }
                }
                }
                }
                }
                }
                }
                }
                }
                

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
    
    if (triggerBechdel.some(trigger => messageValue.toLowerCase().includes(trigger))) {
        title = messageValue.toLowerCase().replace("ttl ", "");  
        getBechdelFromId();  
    }  else {
        if (triggersInfo.some(triggerInfo => messageValue.toLowerCase().includes(triggerInfo))) {
                movieInfo(title)
            }
         else {
            if (triggersWortWatching.some(triggerWorthWatching => messageValue.toLowerCase().includes(triggerWorthWatching))) {
                    isMovieWorthWatching(title);
            } else {
                if (triggersBored.some(triggersBored => messageValue.toLowerCase().includes(triggersBored))) {
                    let parasBored = document.createElement("div");
                    parasBored.classList.add("bubble-bot")
                    parasBored.innerText = "You should watch a movie then. Come on, give me a title to test.";
                    messages.appendChild(parasBored);
                } else {
                    if (triggersOk.some(triggersOk => messageValue.toLowerCase().includes(triggersOk))) {
                      let parasOk = document.createElement("div");
                      parasOk.classList.add("bubble-bot");
                      parasOk.innerText = "Ok.";
                      messages.appendChild(parasOk);
                } else {
                    if (triggersThanks.some(triggersThanks => messageValue.toLowerCase().includes(triggersThanks))) {
                        let parasThanks = document.createElement("div");
                        parasThanks.classList.add("bubble-bot");
                        let randomThanks = responseThanks[Math.floor(Math.random() * responseThanks.length)];
                        parasThanks.innerText = randomThanks;
                        messages.appendChild(parasThanks);
                } else {
                    if (triggersBye.some(triggersBye => messageValue.toLowerCase().includes(triggersBye))) {
                        let parasBye = document.createElement("div");
                        parasBye.classList.add("bubble-bot");
                        let randomBye = responseBye[Math.floor(Math.random() * responseBye.length)];
                        parasBye.innerText = randomBye;
                        messages.appendChild(parasBye)
                    
                } else {
                    if (triggersPlot.some(triggersPlot => messageValue.toLowerCase().includes(triggersPlot))) {
                        getPlot(title);
                } else {
                    if (triggersSentient.some(triggersSentient => messageValue.toLowerCase().includes(triggersSentient))) {
                        let parasSentient = document.createElement("div");
                        parasSentient.classList.add("bubble-bot");
                        let randomSentient = responsesSentient[Math.floor(Math.random() * responsesSentient.length)];
                        parasSentient.innerText = randomSentient;
                        messages.appendChild(parasSentient)
                } else {
                    if (triggersWhyWorthWatching.some(triggersWhyWorthWatching => messageValue.toLowerCase().includes(triggersWhyWorthWatching))) {
                        whyWorthWatching(title);
                }
                 

         else /* if nothing fits*/{
            let randomUnexpectedInput = responseUnexpectedInput[Math.floor(Math.random() * responseUnexpectedInput.length)];
            let parasUnexpectedInput = document.createElement("div");
                parasUnexpectedInput.classList.add("bubble-bot");
                parasUnexpectedInput.innerText = randomUnexpectedInput;
                messages.appendChild(parasUnexpectedInput);

        }
        }
        }
        }
        }
        }
        }
        }
        }
        }

    /*clear the text area*/
    messageInput.value = "";
    
    scrollToBottom();
}


/*function for testing whether it passes Bechdel*/
function getBechdel() {

    let urlBechdel = url;
    urlBechdel += movieId;
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
        let responsePass1 = ["It doesn't pass. According to the authors of this movie two women have no desire to talk. I think the authors haven't met many women",
         "Almost, but not quite. Women are there but they only want to talk to men.... I don't get it either",
        "No. Women only talk to men. Strange."]

        /* response options (passes 0)*/
        let responsePass0 = ["No. They didn't even try.",
         "Hell no. They couldn't even put two women in this movie", 
         "Nope. There aren't two women in this whole movie. It's just sad"]

        /*for picking at random*/
        let randomPass3 = responsePass3[Math.floor(Math.random() * responsePass3.length)];
        let randomPass2 = responsePass2[Math.floor(Math.random() * responsePass2.length)];
        let randomPass1 = responsePass1[Math.floor(Math.random() * responsePass1.length)];
        let randomPass0 = responsePass0[Math.floor(Math.random() * responsePass0.length)];
        
        /* catching errors if the movie is in one API, but not in the other  */
        let propertiesCount = 0
        for (properties in response) {
            propertiesCount += 1
        }        
        
        /* conditional for passing*/
        if (propertiesCount === 9) {
            console.log(response.lenght)
            let score = response["rating"];
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

        } else {
        parasBot.innerText = randomWrongTtile;
        messages.appendChild(parasBot);
        }

        scrollToBottom();
    }
)}     



/* function for the Movie Data Base API*/
function getMovieDataBaseUrl () {
    let urlMDB = url2;
        urlMDB += title.replaceAll(' ', '%20') + '?exact=false&info=base_info&titleType=movie';
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

/* function to check if the movie is worth watching on the basis of the rating with the use of Movie Data Base API */
function isMovieWorthWatching(title) {
    let urlMDB = url2;

    /* convert input to title case */
    const lowerInputString = title.toLowerCase();
    const splitInput = lowerInputString.split(' ');
    const convertedInput = []
    splitInput.forEach((word, index) => {
        if (index === 0) {
            convertedInput.push(word[0].toUpperCase() + word.slice(1))
        return
    }
    if (word.length > 3) {
        convertedInput.push(word[0].toUpperCase() + word.slice(1))
    } else {
        convertedInput.push(word)
    }
    })
    const movieTitle = convertedInput.join(' ')

    /* construct the url */
    urlMDB += movieTitle.replaceAll(' ', '%20') + '?exact=true&info=base_info&titleType=movie';
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
        .then(response => {
            let parasBot = document.createElement("div")
            parasBot.classList.add("bubble-bot");

            /* response option - the movie is worth watching */
            let responseWorthWatching = [
                "Yes! You won't regret it!",
                "Yes!! This movie is a big slay!",
                "Hell yeah, it's so good!",
                "Yes, go watch it now!",
                "Yes, it's absolutely worth watching!",
                "Yes, you should watch it!"
            ];

            /* response option - the movie is not worth watching */
            let responseNotWorthWatching = [
                "If you want to bore yourself to death, sure!",
                "Nah, this movie's weak.",
                "No, don't do this to yourself.",
                "No, it's a waste of time like my ex.",
                "No, it's not worth your time, babe.",
                "Nah, it's terrible, trust me.",
            ];

            /* response option - the movie title is incorrect */
            let responseWrongTtile = [
                "Babe, that's not even a correct tiltle.", 
                "I don't know this movie. Are you sure the title's correct?", 
                "Yeah, nah, wrong title. Try again.",
                "Woops. I don't think that's correct.",
                "Umm... that's not how you spell that title."
            ];

            /*for picking at random*/
            let randomWorthWatching = responseWorthWatching[Math.floor(Math.random() * responseWorthWatching.length)];
            let randomNotWorthWatching = responseNotWorthWatching[Math.floor(Math.random() * responseNotWorthWatching.length)];
            let randomWrongTtile = responseWrongTtile[Math.floor(Math.random() * responseWrongTtile.length)];

            /* conditional for worth watching */
            try {
                let rating = response["results"][0]["ratingsSummary"]["aggregateRating"];
                if (rating > 7) {
                    console.log(rating);
                    console.log(response);
                        parasBot.innerText = randomWorthWatching;
                        messages.appendChild(parasBot);
                    } else {
                        if (rating < 7) {
                            console.log(rating);
                            console.log(response);
                            parasBot.innerText = randomNotWorthWatching;
                            messages.appendChild(parasBot);
                }}
            } catch(err) {
                parasBot.innerText = randomWrongTtile;
                messages.appendChild(parasBot);
            }
            scrollToBottom();
        })
}

function whyWorthWatching() {
    let urlMDB = url2;
    /* convert input to title case */
    const lowerInputString = title.toLowerCase();
    const splitInput = lowerInputString.split(' ');
    const convertedInput = []
    splitInput.forEach((word, index) => {
        if (index === 0) {
            convertedInput.push(word[0].toUpperCase() + word.slice(1))
        return
    }
    if (word.length > 3) {
        convertedInput.push(word[0].toUpperCase() + word.slice(1))
    } else {
        convertedInput.push(word)
    }
    })
    const titleInput = convertedInput.join(' ')

    /* construct the url */
    urlMDB += titleInput.replaceAll(' ', '%20') + '?exact=true&info=base_info&titleType=movie';
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
        .then(response => {
            let parasBot = document.createElement("div")
            parasBot.classList.add("bubble-bot");

            let rating = response["results"][0]["ratingsSummary"]["aggregateRating"];
            parasBot.innerText = `The rating is literally ${rating}.`;
            messages.appendChild(parasBot);

            scrollToBottom();
            })
        }

/* function to obtain information about the movie with the use of Movie Data Base API */
function movieInfo() {
    let urlMDB = url2;

    /* convert input to title case */
    const lowerInputString = title.toLowerCase();
    const splitInput = lowerInputString.split(' ');
    const convertedInput = []
    splitInput.forEach((word, index) => {
        if (index === 0) {
            convertedInput.push(word[0].toUpperCase() + word.slice(1))
        return
    }
    if (word.length > 3) {
        convertedInput.push(word[0].toUpperCase() + word.slice(1))
    } else {
        convertedInput.push(word)
    }
    })
    const titleInput = convertedInput.join(' ')

    /* construct the url */
    urlMDB += titleInput.replaceAll(' ', '%20') + '?exact=true&info=base_info&titleType=movie';
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
        .then(response => {
            let parasBot = document.createElement("div")
            parasBot.classList.add("bubble-bot");

            try {
            let title = response["results"][0]["originalTitleText"]["text"];
            let releaseYear = response["results"][0]["releaseYear"]["year"];
            let language = response["results"][0]["plot"]["language"]["id"];
            let rating = response["results"][0]["ratingsSummary"]["aggregateRating"];
            let genres = response["results"][0]["genres"]["genres"];
            let genresList = [];
            genres.forEach(el => {
                genresList.push(" "+el["text"])
            });
            let id = response["results"][0]["id"];
            let imdbId = id.slice(2, 9);
            let responseMovieInfo = `Title: ${title}\nRelease year: ${releaseYear}\nLanguage: ${language}\nGenres: ${genresList}\nRating: ${rating}\nId: ${imdbId}`;

            parasBot.innerText = responseMovieInfo;
            messages.appendChild(parasBot);
            console.log(response);
        } catch(err) {
            parasBot.innerText = "Babe, I don't know this movie, ask someone else.";
            messages.appendChild(parasBot);
            console.log(response);
        }
        scrollToBottom();
        })
}

/* function for running Bechdel with the Id from IMDB*/
function getBechdelFromId() {
    let urlMDB = url2;
    /* convert input to title case */
    const lowerInputString = title.toLowerCase();
    const splitInput = lowerInputString.split(' ');
    const convertedInput = []
    splitInput.forEach((word, index) => {
        if (index === 0) {
            convertedInput.push(word[0].toUpperCase() + word.slice(1))
        return
    }
    if (word.length > 3) {
        convertedInput.push(word[0].toUpperCase() + word.slice(1))
    } else {
        convertedInput.push(word)
    }
    })
    const titleInput = convertedInput.join(' ')

    /* construct the url */
    urlMDB += titleInput.replaceAll(' ', '%20') + '?exact=true&info=base_info&titleType=movie';
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
        .then(response => {
            let parasBot = document.createElement("div")
            parasBot.classList.add("bubble-bot");
            
            try {
                movieId = response["results"][0]["id"].slice(2,9);
                getBechdel();
            } catch(err) {
                let randomWrongTtile = responseWrongTtile[Math.floor(Math.random() * responseWrongTtile.length)];
                parasBot.innerText = randomWrongTtile;
                messages.append(parasBot)
            } 
            scrollToBottom();
        })
}

function getPlot() {
    let urlMDB = url2;
    /* convert input to title case */
    const lowerInputString = title.toLowerCase();
    const splitInput = lowerInputString.split(' ');
    const convertedInput = []
    splitInput.forEach((word, index) => {
        if (index === 0) {
            convertedInput.push(word[0].toUpperCase() + word.slice(1))
        return
    }
    if (word.length > 3) {
        convertedInput.push(word[0].toUpperCase() + word.slice(1))
    } else {
        convertedInput.push(word)
    }
    })
    const titleInput = convertedInput.join(' ')

    /* construct the url */
    urlMDB += titleInput.replaceAll(' ', '%20') + '?exact=true&info=base_info&titleType=movie';
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
        .then(response => {
            let parasBot = document.createElement("div")
            parasBot.classList.add("bubble-bot");

            let plot = response["results"][0]["plot"]["plotText"]["plainText"];
            parasBot.innerText = plot;
            messages.appendChild(parasBot);

            scrollToBottom();
            })
        }

/* Always see the latest message */
function scrollToBottom() {
    const messageScroll = document.querySelector('.messages');
    messageScroll.scrollTop = messageScroll.scrollHeight;
  }