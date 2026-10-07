/* =========================================================
   ELEMENTS
========================================================= */

const openingScreen =
    document.getElementById("openingScreen");

const openButton =
    document.getElementById("openButton");

const audio =
    document.getElementById("dildaara");

const heartsContainer =
    document.getElementById("heartsContainer");


/* =========================================================
   PAGE START
========================================================= */

document.body.classList.add("locked");


/* =========================================================
   OPEN SURPRISE
========================================================= */

if (openButton) {

    openButton.addEventListener(
        "click",
        function () {

            /*
             * This click is the user's interaction,
             * so the browser allows Dildaara to start.
             */

            if (audio) {

                audio.volume = 0.5;

                audio.currentTime = 0;

                const playPromise =
                    audio.play();

                if (playPromise !== undefined) {

                    playPromise
                        .then(function () {

                            musicPlaying = true;

                        })
                        .catch(function (error) {

                            console.log(
                                "Audio could not start:",
                                error
                            );

                        });

                }

            }


            /*
             * Unlock the website.
             */

            document.body.classList.remove(
                "locked"
            );


            openingScreen.classList.add(
                "hide"
            );


            /*
             * Start some floating hearts.
             */

            for (
                let i = 0;
                i < 8;
                i++
            ) {

                setTimeout(
                    createHeart,
                    i * 180
                );

            }

        }
    );

}


/* =========================================================
   MUSIC STATE
========================================================= */

let musicPlaying = false;


/* =========================================================
   IF SONG ENDS
========================================================= */

if (audio) {

    audio.addEventListener(
        "ended",
        function () {

            musicPlaying = false;

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(
    function (element) {

        revealObserver.observe(element);

    }
);


/* =========================================================
   FLOATING HEARTS
========================================================= */

function createHeart() {

    if (!heartsContainer) {
        return;
    }

    const heart =
        document.createElement("span");


    heart.classList.add(
        "floating-heart"
    );


    heart.innerHTML =
        Math.random() > 0.5
            ? "♡"
            : "♥";


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (8 + Math.random() * 14) + "px";


    heart.style.animationDuration =
        (7 + Math.random() * 7) + "s";


    heartsContainer.appendChild(
        heart
    );


    setTimeout(
        function () {

            heart.remove();

        },
        16000
    );

}


setInterval(
    createHeart,
    1900
);


/* =========================================================
   BAAT KHATAM
========================================================= */

const baatButton =
    document.getElementById(
        "baatButton"
    );

const baatResponse =
    document.getElementById(
        "baatResponse"
    );


if (baatButton) {

    baatButton.addEventListener(
        "click",
        function () {

            const responses = [

                "Okay fine. Baat khatam. 😭",

                "You win. Baat khatam. ♡",

                "No arguments. Only Navya. 🤝",

                "Fineeeee. BAAT KHATAM.",

                "Roro has officially surrendered.",

                "As always… baat khatam."

            ];


            const response =
                responses[
                    Math.floor(
                        Math.random() *
                        responses.length
                    )
                ];


            baatResponse.textContent =
                response;


            baatResponse.animate(

                [
                    {
                        opacity: 0,
                        transform:
                            "translateY(10px)"
                    },

                    {
                        opacity: 1,
                        transform:
                            "translateY(0)"
                    }

                ],

                {
                    duration: 450,

                    easing: "ease-out"
                }

            );

        }
    );

}


/* =========================================================
   VIDEO
========================================================= */

const coupleVideo =
    document.getElementById(
        "coupleVideo"
    );

let videoHasBeenPlayed = false;


if (coupleVideo) {

    coupleVideo.addEventListener(
        "play",
        function () {

            /*
             * The first time the video is played,
             * permanently stop Dildaara.
             */

            if (!videoHasBeenPlayed) {

                videoHasBeenPlayed = true;

                if (audio) {

                    audio.pause();

                    audio.currentTime = 0;

                }

            }

        }
    );

}

/* =========================================================
   HERO PARALLAX
========================================================= */

const heroContent =
    document.querySelector(
        ".hero-content"
    );


window.addEventListener(
    "scroll",
    function () {

        if (!heroContent) {
            return;
        }


        const scroll =
            window.scrollY;


        if (
            scroll <
            window.innerHeight
        ) {

            heroContent.style.transform =
                `translateY(${scroll * 0.18}px)`;


            heroContent.style.opacity =
                Math.max(
                    0,
                    1 - scroll / 650
                );

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   IMAGE TILT
========================================================= */

const imageCards =
    document.querySelectorAll(
        ".photo-card, .memory-card"
    );


imageCards.forEach(
    function (card) {


        card.addEventListener(
            "mousemove",
            function (event) {

                if (
                    window.innerWidth < 800
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) * -2;


                const rotateY =
                    ((x - centerX) /
                        centerX) * 2;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform =
                    "perspective(1000px) rotateX(0) rotateY(0)";

            }
        );

    }
);


/* =========================================================
   FINAL HEART
========================================================= */

const finalHeart =
    document.getElementById(
        "finalHeart"
    );


if (finalHeart) {

    finalHeart.addEventListener(
        "click",
        function () {

            for (
                let i = 0;
                i < 15;
                i++
            ) {

                setTimeout(
                    createHeart,
                    i * 80
                );

            }

        }
    );

}


/* =========================================================
   PREVENT IMAGE DRAGGING
========================================================= */

document
    .querySelectorAll("img")
    .forEach(
        function (image) {

            image.addEventListener(
                "dragstart",
                function (event) {

                    event.preventDefault();

                }
            );

        }
    );


/* =========================
   PIXEL HEART CURSOR
========================= */

const pixelHeartCursor = document.createElement("div");

pixelHeartCursor.className = "pixel-heart-cursor";

document.body.appendChild(pixelHeartCursor);

document.addEventListener("mousemove", function (event) {

    pixelHeartCursor.style.left =
        event.clientX + "px";

    pixelHeartCursor.style.top =
        event.clientY + "px";

    pixelHeartCursor.style.opacity = "1";

});

document.addEventListener("mouseleave", function () {

    pixelHeartCursor.style.opacity = "0";

});

document.addEventListener("mouseenter", function () {

    pixelHeartCursor.style.opacity = "1";

});

const heartHoverElements = document.querySelectorAll(
    "button, a, video, .photo-card, .memory-card"
);

heartHoverElements.forEach(function (element) {

    element.addEventListener("mouseenter", function () {

        pixelHeartCursor.classList.add("hovering");

    });

    element.addEventListener("mouseleave", function () {

        pixelHeartCursor.classList.remove("hovering");

    });

});

/* =========================================================
   FINAL SURPRISE VIDEO
========================================================= */

const wishingButton =
    document.getElementById("wishingButton");

const wishingVideoContainer =
    document.getElementById("wishingVideoContainer");


if (
    wishingButton &&
    wishingVideoContainer
) {

    wishingButton.addEventListener(
        "click",
        function () {
            wishingButton.classList.add("fade-out");

            /*
             * Prevent creating the video multiple times.
             */

            if (
                wishingVideoContainer
                .querySelector("video")
            ) {
                return;
            }


            /*
             * Create the video.
             */

            const wishingVideo =
                document.createElement("video");


            wishingVideo.className =
                "wishing-video";


            wishingVideo.id =
                "wishingVideo";


            wishingVideo.controls =
                true;


            wishingVideo.playsInline =
                true;


            /*
             * Local video file.
             */

            const source =
                document.createElement("source");


            source.src =
                "/static/video/wishing-navya.mp4";


            source.type =
                "video/mp4";


            wishingVideo.appendChild(
                source
            );


            /*
             * Add video to the page.
             */

            wishingVideoContainer.appendChild(
                wishingVideo
            );


            /*
             * Reveal it.
             */

            requestAnimationFrame(
                function () {

                    wishingVideoContainer.classList.add(
                        "show"
                    );

                }
            );


            /*
             * Start playing immediately.
             * The browser allows this because
             * the video was created from a
             * user click.
             */

            wishingVideo.play().catch(
                function (error) {

                    console.log(
                        "Wishing video could not autoplay:",
                        error
                    );

                }
            );


            /*
             * Scroll naturally to the new video.
             */

            setTimeout(
                function () {

                    wishingVideo.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                },
                300
            );

        }
    );

}
