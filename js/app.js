"use strict";


/* =========================================
   ELEMENTS
========================================= */

const header =
    document.getElementById("siteHeader");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileNavigation =
    document.getElementById("mobileNavigation");

const backToTop =
    document.getElementById("backToTop");

const searchButton =
    document.getElementById("searchButton");

const searchOverlay =
    document.getElementById("searchOverlay");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("searchInput");

const newsletterForm =
    document.getElementById("newsletterForm");

const particles =
    document.getElementById("particles");


/* =========================================
   PARTICLES
========================================= */

function createParticles() {

    if (!particles) return;

    const amount =
        window.innerWidth < 600
            ? 20
            : 45;

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.className =
            "particle";

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.animationDuration =
            `${8 + Math.random() * 14}s`;

        particle.style.animationDelay =
            `${Math.random() * -15}s`;

        particle.style.opacity =
            `${0.2 + Math.random() * 0.8}`;

        if (Math.random() > 0.55) {

            particle.style.background =
                "#a855ff";

            particle.style.boxShadow =
                "0 0 10px #a855ff";
        }

        particles.appendChild(particle);
    }
}

createParticles();


/* =========================================
   HEADER SCROLL
========================================= */

function updateHeader() {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }
}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* =========================================
   MOBILE MENU
========================================= */

mobileMenuButton.addEventListener(
    "click",
    () => {

        const open =
            mobileNavigation.classList.toggle(
                "open"
            );

        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(open)
        );


        const lines =
            mobileMenuButton.querySelectorAll(
                "span"
            );


        if (open) {

            lines[0].style.transform =
                "translateY(6px) rotate(45deg)";

            lines[1].style.opacity =
                "0";

            lines[2].style.transform =
                "translateY(-6px) rotate(-45deg)";

        } else {

            lines[0].style.transform =
                "";

            lines[1].style.opacity =
                "";

            lines[2].style.transform =
                "";

        }

    }
);


/* =========================================
   CLOSE MOBILE MENU
========================================= */

document
    .querySelectorAll(".mobile-nav-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileNavigation.classList.remove(
                    "open"
                );

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const lines =
                    mobileMenuButton.querySelectorAll(
                        "span"
                    );

                lines.forEach(line => {

                    line.style.transform =
                        "";

                    line.style.opacity =
                        "";

                });

            }
        );

    });


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );

navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navLinks.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });

            link.classList.add(
                "active"
            );

        }
    );

});


/* =========================================
   SEARCH
========================================= */

function openSearch() {

    searchOverlay.classList.add(
        "open"
    );

    document.body.style.overflow =
        "hidden";

    setTimeout(
        () => searchInput.focus(),
        200
    );
}

function closeSearchOverlay() {

    searchOverlay.classList.remove(
        "open"
    );

    document.body.style.overflow =
        "";
}

searchButton.addEventListener(
    "click",
    openSearch
);

closeSearch.addEventListener(
    "click",
    closeSearchOverlay
);

searchOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target === searchOverlay
        ) {

            closeSearchOverlay();

        }

    }
);

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeSearchOverlay();

        }

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            openSearch();

        }

    }
);


/* =========================================
   BACK TO TOP
========================================= */

backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================
   NEWSLETTER
========================================= */

newsletterForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const input =
            newsletterForm.querySelector(
                "input"
            );

        const button =
            newsletterForm.querySelector(
                "button"
            );

        if (!input.value.trim()) {
            return;
        }

        const original =
            button.textContent;

        button.textContent =
            "✓";

        button.style.color =
            "#00ffaa";

        input.value =
            "";

        setTimeout(
            () => {

                button.textContent =
                    original;

                button.style.color =
                    "";

            },
            2500
        );

    }
);


/* =========================================
   SMOOTH ANCHOR NAVIGATION
========================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================
   CARD REVEAL
========================================= */

const revealItems =
    document.querySelectorAll(
        ".demo-card"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealItems.forEach(
    (item, index) => {

        item.style.opacity =
            "0";

        item.style.transform =
            "translateY(30px)";

        item.style.transition =
            `
            opacity .7s ease ${index * 120}ms,
            transform .7s cubic-bezier(.2,.8,.2,1) ${index * 120}ms,
            border-color .4s ease,
            box-shadow .4s ease
            `;

        revealObserver.observe(
            item
        );

    }
);


/* =========================================
   MOUSE PARALLAX
========================================= */

const hero =
    document.querySelector(
        ".hero"
    );

document.addEventListener(
    "mousemove",
    event => {

        if (
            window.innerWidth < 800 ||
            !hero
        ) {
            return;
        }

        const x =
            (event.clientX /
                window.innerWidth -
                0.5) * 10;

        const y =
            (event.clientY /
                window.innerHeight -
                0.5) * 10;

        hero.style.setProperty(
            "--mouse-x",
            `${x}px`
        );

        hero.style.setProperty(
            "--mouse-y",
            `${y}px`
        );

    },
    { passive: true }
);
