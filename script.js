/* =====================================================
   ELEMENTS
===================================================== */

const introScreen = document.getElementById("introScreen");
const enterButton = document.getElementById("enterButton");
const mainWebsite = document.getElementById("mainWebsite");

const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

const envelope = document.getElementById("envelope");
const letterButton = document.getElementById("letterButton");

const interactiveHeart = document.getElementById("interactiveHeart");
const heartMessage = document.getElementById("heartMessage");


/* =====================================================
   ENTER WEBSITE
===================================================== */

enterButton.addEventListener("click", () => {

    // Hide intro
    introScreen.classList.add("hide");

    // Show main website
    mainWebsite.classList.add("active");

    // Try to start music
    music.play()
        .then(() => {
            musicIcon.textContent = "❚❚";
            musicPlaying = true;
        })
        .catch(() => {
            // Browser blocked autoplay
            musicIcon.textContent = "♪";
            musicPlaying = false;
        });

});


/* =====================================================
   MUSIC
===================================================== */

let musicPlaying = false;

musicToggle.addEventListener("click", () => {

    if (!musicPlaying) {

        music.play()
            .then(() => {
                musicIcon.textContent = "❚❚";
                musicPlaying = true;
            })
            .catch(() => {
                console.log("Music could not be played.");
            });

    } else {

        music.pause();

        musicIcon.textContent = "♪";

        musicPlaying = false;

    }

});


/* =====================================================
   SMOOTH SCROLL
===================================================== */

function scrollToSection(id) {

    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   FLOATING HEARTS
===================================================== */

function createFloatingHeart() {

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    const symbols = [
        "♥",
        "♡",
        "✦",
        "✧"
    ];

    heart.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        (10 + Math.random() * 18) + "px";

    heart.style.animationDuration =
        (6 + Math.random() * 7) + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 14000);

}

setInterval(createFloatingHeart, 700);


/* =====================================================
   LOVE COUNTER
===================================================== */

/*
    CHANGE THIS DATE.

    Example:
    September 20, 2025

    JavaScript months start at 0:

    January = 0
    February = 1
    March = 2
    etc.
*/

const relationshipDate = new Date(2025, 9, 21);


function updateCounter() {

    const now = new Date();

    const difference = now - relationshipDate;

    if (difference < 0) return;

    const seconds = Math.floor(difference / 1000);

    const minutes = Math.floor(seconds / 60);

    const hours = Math.floor(minutes / 60);

    const days = Math.floor(hours / 24);


    document.getElementById("days").textContent =
        days.toLocaleString();

    document.getElementById("hours").textContent =
        String(hours % 24).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes % 60).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds % 60).padStart(2, "0");

}

updateCounter();

setInterval(updateCounter, 1000);


/* =====================================================
   LETTER
===================================================== */

letterButton.addEventListener("click", () => {

    envelope.classList.toggle("open");

    if (envelope.classList.contains("open")) {

        letterButton.textContent =
            "Close my letter 💌";

    } else {

        letterButton.textContent =
            "Open my letter 💌";

    }

});


/* =====================================================
   HEART MESSAGES
===================================================== */

const messages = [

    "I love you. ❤️",

    "You make me so happy. 🥹",

    "You're my favourite person. 💗",

    "I'd choose you again. 💕",

    "You're stuck with me now. 😌",

    "You have my whole heart. 💖",

    "I hope you know how special you are. 🫶",

    "More memories please. 💞",

    "Us, always. ❤️"

];

let messageIndex = 0;


interactiveHeart.addEventListener("click", () => {

    messageIndex++;

    if (messageIndex >= messages.length) {
        messageIndex = 0;
    }

    heartMessage.textContent =
        messages[messageIndex];

    heartExplosion();

});


/* =====================================================
   HEART EXPLOSION
===================================================== */

function heartExplosion() {

    const rect =
        interactiveHeart.getBoundingClientRect();

    const centerX =
        rect.left + rect.width / 2;

    const centerY =
        rect.top + rect.height / 2;


    for (let i = 0; i < 18; i++) {

        const particle =
            document.createElement("div");

        particle.textContent = "♥";

        particle.style.position = "fixed";

        particle.style.left =
            centerX + "px";

        particle.style.top =
            centerY + "px";

        particle.style.color = "#ed6fa6";

        particle.style.fontSize =
            (10 + Math.random() * 18) + "px";

        particle.style.pointerEvents = "none";

        particle.style.zIndex = "99999";


        document.body.appendChild(particle);


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            80 + Math.random() * 180;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;


        particle.animate(

            [
                {
                    transform:
                        "translate(-50%, -50%) scale(1)",

                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        ) scale(0)`,

                    opacity: 0
                }
            ],

            {
                duration:
                    900 + Math.random() * 400,

                easing:
                    "cubic-bezier(.17,.67,.83,.67)"
            }

        );


        setTimeout(() => {
            particle.remove();
        }, 1400);

    }

}


/* =====================================================
   IMAGE FALLBACK
===================================================== */

document
    .querySelectorAll(".memory-image img")
    .forEach(img => {

        img.addEventListener("error", () => {

            img.style.display = "none";

            img.parentElement.style.background =
                "linear-gradient(135deg, #ffd1e3, #ed6fa6)";

        });

    });