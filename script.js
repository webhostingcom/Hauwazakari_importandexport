/* =========================================
   wallform CONSTRUCTION
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            const isOpen = mobileMenu.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            const lines = menuButton.querySelectorAll("span");

            if (lines.length >= 3) {

                if (isOpen) {

                    lines[0].style.transform =
                        "translateY(7px) rotate(45deg)";

                    lines[1].style.opacity = "0";

                    lines[2].style.transform =
                        "translateY(-7px) rotate(-45deg)";

                } else {

                    lines[0].style.transform = "";
                    lines[1].style.opacity = "";
                    lines[2].style.transform = "";

                }
            }

        });


        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const lines =
                    menuButton.querySelectorAll("span");

                if (lines.length >= 3) {

                    lines[0].style.transform = "";
                    lines[1].style.opacity = "";
                    lines[2].style.transform = "";

                }

            });

        });

    }


    /* =========================================
       SERVICE ACCORDIONS
       SECOND WHAT WE DO SECTION
    ========================================== */

    const serviceCards =
        document.querySelectorAll(
            "#second-services .service-card"
        );

    serviceCards.forEach((card) => {

        const header =
            card.querySelector(".service-header");

        if (!header) return;

        header.addEventListener("click", () => {

            const wasActive =
                card.classList.contains("active");

            serviceCards.forEach((item) => {
                item.classList.remove("active");
            });

            if (!wasActive) {
                card.classList.add("active");
            }

        });

    });


    /* =========================================
       BUILD WITH CONFIDENCE ACCORDIONS
    ========================================== */

    const guideItems =
        document.querySelectorAll(".guide-item");

    guideItems.forEach((item) => {

        const header =
            item.querySelector(".guide-header");

        if (!header) return;

        header.addEventListener("click", () => {

            const wasActive =
                item.classList.contains("active");

            guideItems.forEach((guide) => {
                guide.classList.remove("active");
            });

            if (!wasActive) {
                item.classList.add("active");
            }

        });

    });


    /* =========================================
       QUOTE FORM PROGRESS
    ========================================== */

    const quoteForm =
        document.getElementById("quoteForm");

    const progressBar =
        document.getElementById("formProgress");

    if (quoteForm && progressBar) {

        const fields =
            quoteForm.querySelectorAll(
                "input:not([type='hidden']), select, textarea"
            );

        function updateProgress() {

            if (!fields.length) {
                progressBar.style.width = "0%";
                return;
            }

            let completed = 0;

            fields.forEach((field) => {

                if (field.value.trim() !== "") {
                    completed++;
                }

            });

            const percentage =
                (completed / fields.length) * 100;

            progressBar.style.width =
                percentage + "%";

        }

        fields.forEach((field) => {

            field.addEventListener(
                "input",
                updateProgress
            );

            field.addEventListener(
                "change",
                updateProgress
            );

        });

        updateProgress();


        /* =========================================
           FORMSPREE SUBMISSION
        ========================================== */

        quoteForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();

                const submitButton =
                    quoteForm.querySelector(".submit-button");

                const message =
                    document.getElementById("formMessage");

                if (!submitButton || !message) {
                    return;
                }

                const originalText =
                    submitButton.innerHTML;

                submitButton.disabled = true;
                submitButton.innerHTML = "Sending...";

                message.textContent = "";
                message.style.color = "";

                try {

                    const formData =
                        new FormData(quoteForm);

                    const response =
                        await fetch(
                            quoteForm.action,
                            {
                                method: "POST",
                                body: formData,
                                headers: {
                                    Accept:
                                        "application/json"
                                }
                            }
                        );

                    if (!response.ok) {
                        throw new Error(
                            "Form submission failed."
                        );
                    }

                    message.textContent =
                        "Thank you. Your request has been sent successfully.";

                    message.style.color =
                        "#3d8b40";

                    quoteForm.reset();

                    updateProgress();

                    submitButton.innerHTML =
                        "Request Sent ✓";

                    setTimeout(() => {

                        submitButton.innerHTML =
                            originalText;

                        submitButton.disabled =
                            false;

                    }, 4000);

                } catch (error) {

                    console.error(error);

                    message.textContent =
                        "Something went wrong. Please try again or call us directly.";

                    message.style.color =
                        "#b42318";

                    submitButton.innerHTML =
                        originalText;

                    submitButton.disabled =
                        false;

                }

            }
        );

    }


    /* =========================================
       SMOOTH SCROLL
    ========================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbar =
                document.querySelector(".navbar");

            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================== */

    const navbar =
        document.querySelector(".navbar");

    if (navbar) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 40) {

                    navbar.style.background =
                        "rgba(5, 5, 5, 0.97)";

                } else {

                    navbar.style.background =
                        "rgba(8, 8, 8, 0.9)";

                }

            },
            { passive: true }
        );

    }


    /* =========================================
       IMAGE ERROR HANDLING
    ========================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Image could not be loaded:",
                    image.src
                );

                image.style.background =
                    "#222";

            }
        );

    });


    /* =========================================
       HERO / BACKGROUND VIDEO FALLBACK
    ========================================== */

    const video =
        document.querySelector(".video-section video");

    if (video) {

        video.addEventListener(
            "error",
            () => {

                console.warn(
                    "Background video could not be loaded."
                );

            }
        );

    }


    /* =========================================
       wallform VIDEO INSIDE TEXT
    ========================================== */

    const wallformVideo =
        document.getElementById(
            "wallformTextVideo"
        );

    const wallformCanvas =
        document.getElementById(
            "wallformTextCanvas"
        );

    if (
        wallformVideo &&
        wallformCanvas
    ) {

        const ctx =
            wallformCanvas.getContext("2d");

        let animationStarted = false;


        function resizewallformCanvas() {

            const width =
                Math.min(
                    window.innerWidth - 40,
                    1400
                );

            const height =
                width * 0.38;

            const dpr =
                window.devicePixelRatio || 1;

            wallformCanvas.width =
                width * dpr;

            wallformCanvas.height =
                height * dpr;

            wallformCanvas.style.width =
                width + "px";

            wallformCanvas.style.height =
                height + "px";

            ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );

        }


        function drawwallformText() {

            const width =
                wallformCanvas.clientWidth;

            const height =
                wallformCanvas.clientHeight;

            if (!width || !height) {
                requestAnimationFrame(
                    drawwallformText
                );
                return;
            }


            ctx.clearRect(
                0,
                0,
                width,
                height
            );


            /* -----------------------------------------
               DRAW wallform TEXT FIRST
            ----------------------------------------- */

            ctx.save();

            const fontSize =
                Math.min(
                    width * 0.18,
                    230
                );

            ctx.font =
                `900 ${fontSize}px Arial, sans-serif`;

            ctx.textAlign =
                "center";

            ctx.textBaseline =
                "middle";

            ctx.fillStyle =
                "#ffffff";

            ctx.fillText(
                "wallform",
                width / 2,
                height / 2
            );

            ctx.restore();


            /* -----------------------------------------
               VIDEO ONLY INSIDE THE TEXT
            ----------------------------------------- */

            ctx.globalCompositeOperation =
                "source-in";


            if (
                wallformVideo.readyState >= 2 &&
                wallformVideo.videoWidth > 0 &&
                wallformVideo.videoHeight > 0
            ) {

                const videoWidth =
                    wallformVideo.videoWidth;

                const videoHeight =
                    wallformVideo.videoHeight;

                const videoRatio =
                    videoWidth / videoHeight;

                const canvasRatio =
                    width / height;

                let drawWidth;
                let drawHeight;
                let offsetX;
                let offsetY;


                if (
                    videoRatio > canvasRatio
                ) {

                    drawHeight =
                        height;

                    drawWidth =
                        height * videoRatio;

                    offsetX =
                        (width - drawWidth) / 2;

                    offsetY =
                        0;

                } else {

                    drawWidth =
                        width;

                    drawHeight =
                        width / videoRatio;

                    offsetX =
                        0;

                    offsetY =
                        (height - drawHeight) / 2;

                }


                ctx.drawImage(
                    wallformVideo,
                    offsetX,
                    offsetY,
                    drawWidth,
                    drawHeight
                );

            }


            ctx.globalCompositeOperation =
                "source-over";


            requestAnimationFrame(
                drawwallformText
            );

        }


        function startwallformVideo() {

            resizewallformCanvas();

            wallformVideo
                .play()
                .catch(() => {});


            if (!animationStarted) {

                animationStarted = true;

                requestAnimationFrame(
                    drawwallformText
                );

            }

        }


        wallformVideo.addEventListener(
            "loadeddata",
            startwallformVideo
        );


        wallformVideo.addEventListener(
            "canplay",
            startwallformVideo
        );


        window.addEventListener(
            "resize",
            resizewallformCanvas
        );


        resizewallformCanvas();


        if (
            wallformVideo.readyState >= 2
        ) {

            startwallformVideo();

        }

    }


    /* =========================================
       NUMBER COUNTERS
    ========================================== */

    const counters =
        document.querySelectorAll(
            ".stat-number"
        );

    function startCounter(counter) {

        const target =
            Number(
                counter.dataset.target
            );

        if (!Number.isFinite(target)) {
            return;
        }

        const duration = 1600;

        const start =
            performance.now();

        function update(currentTime) {

            const progress =
                Math.min(
                    (currentTime - start) /
                    duration,
                    1
                );

            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );

            const value =
                Math.floor(
                    target * eased
                );

            counter.textContent =
                value;

            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            } else {

                counter.textContent =
                    target;

            }

        }

        requestAnimationFrame(
            update
        );

    }


    if (counters.length) {

        const counterObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            startCounter(
                                entry.target
                            );

                            counterObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach((counter) => {

            counterObserver.observe(
                counter
            );

        });

    }

});


    /* =================================================
       TESTIMONIALS
    ================================================= */

    autoMoveCards(
        ".testimonials-section .horizontal-wrapper",
        0.25
    );
