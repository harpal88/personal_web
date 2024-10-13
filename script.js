function scrollToFooter(event) {
    event.preventDefault(); // Prevent default anchor behavior
    const footer = document.querySelector('#footer');
    footer.scrollIntoView({
        behavior: 'smooth', // Smooth scroll behavior
        block: 'start'      // Aligns the footer to the top of the viewport
    });

}


// Event listener for the "Discover Work" button for smooth scrolling to #projects
document.querySelector('.hero-button-container .hero-button').addEventListener('click', function (e) {
    e.preventDefault();

    // Detect if the screen width is for mobile or desktop
    const isMobile = window.innerWidth <= 480; // Adjust the breakpoint as needed

    // Modify the target ID based on the device type (mobile or desktop)
    let href = isMobile ? '#projects-mobile' : '#projects';

    // Find the target element using the adjusted href
    const target = document.querySelector(href);

    // Use LocomotiveScroll to smooth scroll to the target section if it exists
    if (target) {
        scroll.scrollTo(target);
    }
});



// <!-- loader effect -->

function textShuffle(element, options) {
    const chars = options.chars || '!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const finalTexts = options.finalTexts || [element.textContent];
    const charTime = options.charTime || 50;
    const shuffleDuration = options.shuffleDuration || 3000;
    const floatDistance = options.floatDistance || 10; // Amount of floating

    let currentIndex = 0;
    const maxIndex = Math.max(...finalTexts.map(text => text.length));

    const shuffleInterval = setInterval(() => {
        element.innerHTML = ''; // Clear previous content

        finalTexts.forEach((finalText) => {
            const lineContainer = document.createElement('div');
            lineContainer.style.position = 'relative'; // Allow floating effect

            for (let i = 0; i < finalText.length; i++) {
                const span = document.createElement('span');

                if (options.erase) {
                    // Opacity animation for erasing text
                    span.textContent = finalText[i];
                    span.style.opacity = (i < currentIndex) ? '0.05' : '1'; // Fade out each letter
                    span.style.transition = `opacity ${charTime}ms ease`; // Smooth opacity change

                    // Add subtle floating effect
                    span.style.transform = `translateY(${(i < currentIndex) ? -floatDistance : 0}px)`;
                    span.style.transition += `, transform ${charTime}ms ease-out`; // Smooth float effect
                } else {
                    // Shuffle effect for Section 2
                    span.textContent = (i < currentIndex)
                        ? finalText[i]
                        : chars[Math.floor(Math.random() * chars.length)];
                    span.style.color = (i < currentIndex) ? 'white' : 'inherit';
                }

                lineContainer.appendChild(span);
            }

            element.appendChild(lineContainer); // Add line as a block element
        });

        currentIndex++;

        if (currentIndex > maxIndex) {
            clearInterval(shuffleInterval);
            if (options.onComplete) options.onComplete();
        }
    }, charTime);
}

document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('loader');
    const section1 = document.getElementById('section1');
    const section2 = document.getElementById('section2');
    const section3 = document.getElementById('section3');

    const animationDuration = 3000; // Total duration for the loader animation

    // Shuffle and erase for section1 (multi-line with floating effect)
    textShuffle(section1, {
        finalTexts: [
            'ABCDEFG',
            '1234567890XYZ'
        ], // Different text for each line
        chars: '!<>-_\\/[]{}—=+*^?#________',
        charTime: 100,
        shuffleDuration: animationDuration,
        erase: true, // Erase with opacity and floating
        floatDistance: 15, // Float up by 15px
    });

    // Shuffle and convert text for section2 (Convert to "HARPAL" and "WEB DEVELOPER")
    textShuffle(section2, {
        finalTexts: ['HARPAL', 'WEB DEVELOPER'], // Unique transformation for this section
        chars: '!<>-_\\/[]{}—=+*^?#________',
        charTime: 100,
        shuffleDuration: animationDuration,
    });

    // Shuffle and erase for section3 (multi-line with floating effect)
    textShuffle(section3, {
        finalTexts: [
            'ZXCVBN',
            '9876543210ABC'
        ], // Different text for each line
        chars: '!<>-_\\/[]{}—=+*^?#________',
        charTime: 100,
        shuffleDuration: animationDuration,
        erase: true, // Erase with opacity and floating
        floatDistance: 15, // Float up by 15px
        onComplete: () => {
            // Fade out the loader smoothly
            setTimeout(() => {
                loader.style.transition = 'opacity 1s ease';
                loader.style.opacity = '0.1';

                // Remove loader from display after fade-out
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 1000); // 1s fade-out duration
            }, 500); // Short delay before fade-out starts
        }
    });
});

// <!-- navbar text effect -->

document.querySelectorAll('.navbar-link').forEach(link => {
    const originalText = link.textContent.trim();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Check if the link has text (ignoring SVG)
    if (originalText.length === 0) return;

    link.addEventListener('mouseenter', () => {
        let shuffleInterval = setInterval(() => {
            const shuffledText = originalText.split('').map(() => {
                return characters.charAt(Math.floor(Math.random() * characters.length));
            }).join('');
            link.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent = shuffledText;
                }
            });
        }, 150); // Speed of shuffling

        // Restore original text after a brief period
        setTimeout(() => {
            clearInterval(shuffleInterval);
            link.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent = originalText;
                }
            });
        }, 400); // Duration for shuffling
    });

    link.addEventListener('mouseleave', () => {
        link.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = originalText; // Revert to original text
            }
        });
    });
});



// .progress-percentage

document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector('.container'); // Use the Locomotive Scroll container
    const progressWrap = document.querySelector('.unique-progress-wrap');
    const progressPath = progressWrap ? progressWrap.querySelector('path') : null;
    const progressPercentage = document.querySelector('.progress-percentage');

    if (!progressWrap || !progressPath) {
        console.error("Progress wrap or path not found.");
        return;
    }

    const pathLength = progressPath.getTotalLength();

    // Set up progress path styling
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
        'stroke-dashoffset 10ms linear';

    // Function to update progress
    const updateProgress = function (instance) {
        const scroll = instance.scroll.y;
        const height = instance.limit.y;
        const progress = pathLength - (scroll * pathLength / height);
        const percentage = Math.round((scroll / height) * 100);

        progressPath.style.strokeDashoffset = progress;
        progressPercentage.textContent = `${percentage}%`;

        if (scroll > 50) {
            progressWrap.classList.add('active-progress');
        } else {
            progressWrap.classList.remove('active-progress');
        }
    };

    // Check if Locomotive Scroll is initialized
    if (typeof scroll !== 'undefined') {
        scroll.on('scroll', updateProgress); // Bind the scroll event to update progress

        // Add event listener for clicking the progress wrap to scroll to the top
        progressWrap.addEventListener('click', function (event) {
            event.preventDefault();
            scroll.scrollTo(0, {
                duration: 550
            });
        });
    } else {
        console.error('Locomotive Scroll is not initialized.');
    }
});


// Initialize Locomotive Scroll

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('.container'), // Ensure this targets your scroll container
    smooth: true,
    multiplier: 1,
    class: 'is-reveal',
});

// Synchronize ScrollTrigger with Locomotive Scroll updates
scroll.on("scroll", ScrollTrigger.update);

// Use Locomotive Scroll as the scroller for ScrollTrigger
ScrollTrigger.scrollerProxy(".container", {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    pinType: document.querySelector(".container").style.transform ? "transform" : "fixed"
});

// Horizontal scroll effect for .about-section-title
// Example of a responsive check










// Ensure ScrollTrigger and Locomotive Scroll remain synchronized
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();




// Detect if it's mobile or desktop
const Mobile = window.matchMedia("(max-width: 1300px)").matches;

// Function to create horizontal scrolling effect using GSAP
function enableDesktopScroll() {
    const wrapper = document.querySelector('.skill-card-container');
    const scrollWidth = wrapper.scrollWidth;
    const containerWidth = window.innerWidth;

    // Use GSAP to move the `.skills-card-wrapper` horizontally as the page scrolls
    gsap.to(wrapper, {
        x: () => -(scrollWidth - containerWidth), // Scroll based on the width difference
        scrollTrigger: {
            trigger: '.skills-section', // Adjust based on the section you are targeting
            scroller: '[data-scroll-container]', // Locomotive Scroll container
            scrub: 0.1, // Smooth scrolling effect
            start: 'top top', // Start when the top of the section hits the top of the screen
            end: `+=${scrollWidth}`, // Adjust the end based on scroll width
            pin: true, // Pin the section during the scroll
            anticipatePin: 1,
        },
        ease: 'none' // No easing for a continuous scrolling effect
    });

    // Ensure ScrollTrigger and Locomotive Scroll stay synchronized
    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    ScrollTrigger.refresh();
}

// Initialize based on screen size
if (!Mobile) {
    enableDesktopScroll();
}






// Event listeners for navbar links for smooth scrolling
document.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Detect if the screen width is for mobile or desktop
        const isMobile = window.innerWidth <= 480; // Adjust the breakpoint as needed

        // Modify the href based on the device type (mobile or desktop)
        let href = link.getAttribute('href');

        if (href === '#home') {
            // If the link is pointing to the home section, adjust for mobile or desktop
            href = isMobile ? '#home-mobile' : '#home-pc';
        }

        // Find the target element using the adjusted href
        const target = document.querySelector(href);

        // Use LocomotiveScroll to smooth scroll to the target section if it exists
        if (target) {
            scroll.scrollTo(target);
        }
    });
});



// navbar-link


// Function to detect if it's a desktop device
function isDesktop() {
    return window.innerWidth > 1024; // Adjust this width if necessary
}

// Horizontal Scroll Initialization Function
function initHorizontalScroll(sectionId) {
    if (isDesktop()) { // Check if it's a desktop device
        const pinWrap = document.querySelector(`#${sectionId} .pin-wrap`);
        const horizontalScrollLength = pinWrap.scrollWidth - window.innerWidth;

        gsap.to(`#${sectionId} .pin-wrap`, {
            scrollTrigger: {
                trigger: `#${sectionId}`,
                scroller: ".container",
                scrub: 1,
                pin: true,
                start: "top top",
                end: `+=${horizontalScrollLength}`,
                anticipatePin: 1
            },
            x: -horizontalScrollLength,
            ease: "power2.out"
        });
    }
}

// Initialize horizontal scrolling sections on desktop devices only
initHorizontalScroll("sectionPin1");
initHorizontalScroll("sectionPin2");

// Optionally, add a resize event listener to recheck device type when resizing
window.addEventListener('resize', () => {
    if (isDesktop()) {
        initHorizontalScroll("sectionPin1");
        initHorizontalScroll("sectionPin2");
    }
});


// apply3DTiltEffect

function apply3DTiltEffect() {
    document.querySelectorAll(".pin-wrap img").forEach(image => {
        let isMouseOver = false;
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        let requestId;

        image.addEventListener("mousemove", (e) => {
            const rect = image.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            targetX = ((centerY - y) / centerY) *
                30; // Slightly increased for more noticeable effect
            targetY = ((x - centerX) / centerX) * 30;

            if (!isMouseOver) {
                isMouseOver = true;
                requestId = requestAnimationFrame(() => updateTransform(image));
            }
        });

        image.addEventListener("mouseleave", () => {
            isMouseOver = false;
            cancelAnimationFrame(requestId);
            image.style.transition =
                "transform 0.2s ease-out"; // Smooth transition back to normal
            image.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
        });

        function updateTransform(image) {
            if (!isMouseOver) return;

            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;

            image.style.transform =
                `perspective(1000px) rotateX(${currentX}deg) rotateY(${currentY}deg) scale(1)`; // Slight scale for depth effect
            requestId = requestAnimationFrame(() => updateTransform(image));
        }
    });
}

apply3DTiltEffect();


ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();


gsap.from("h1 .ui-design, h1 .gallery", {
    scrollTrigger: {
        trigger: "h1",
        scroller: ".container",
        start: "top 90%",
        end: "bottom 10%",
        scrub: 2,
        toggleActions: "play none none reset"
    },
    y: 100,
    opacity: 0,
    rotationX: 90, // Adds a 3D flip effect
    stagger: {
        each: 0.2,
        from: "start", // Starts staggering from the first element
        ease: "back.out(1.7)" // Bounces out a bit for a more playful effect
    },
    ease: "power1.out",
    color: "#e3857a", // Changes color during the animation
    duration: 1.5 // Slows down the animation slightly
});

gsap.from(".ui-p", {
    scrollTrigger: {
        trigger: ".ui-p",
        scroller: ".container",
        start: "top 90%",
        end: "bottom 60%",
        toggleActions: "play none none reset"
    },
    y: 50,
    opacity: 0,
    scale: 0.9, // Adds a slight scale effect for a pop-in feel
    ease: "elastic.out(1, 0.5)", // Adds a springy effect to the animation
    duration: 1.2 // Extends the duration slightly
});



gsap.from(".sectionPin1-h2, .sectionPin2-h2", {
    scrollTrigger: {
        trigger: ".sectionPin1-h2, .sectionPin2-h2",
        scroller: ".container", // Sync with Locomotive Scroll
        start: "top 90%", // Start animation when the section is 90% down the viewport
        end: "bottom 10%", // End animation when it's 10% from the bottom
        scrub: 2, // Smooth scrolling effect
        toggleActions: "play none none reset",
        markers: false // You can turn this on for debugging
    },
    opacity: 0, // Start fully transparent
    scale: 0.8, // Start slightly zoomed out
    rotationX: -45, // Start with a 3D rotation effect
    y: 50, // Slide up from 50px down
    ease: "elastic.out(1, 0.5)", // Elastic easing for a bouncy effect
    duration: 4 // Longer duration for a more fluid motion
});


// timeline

document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.9 // Trigger when 60% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const target = entry.target;
            const timelineDot = target.querySelector(
                '.timeline-dot'); // Only target the dots

            if (entry.isIntersecting) {
                if (timelineDot) {
                    timelineDot.style.opacity = '1'; // Show the timeline dot
                }
            } else {
                if (timelineDot) {
                    timelineDot.style.opacity = '0'; // Hide the timeline dot
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-item').forEach(item => observer.observe(item));
});





// skill-item .skill-box

document.addEventListener('DOMContentLoaded', () => {
    const skillBoxes = document.querySelectorAll('.skill-item .skill-box');
    const skillSeparators = document.querySelectorAll('.skill-item .skill-separator');
    const container = document.querySelector('.skills-wrapper');

    const imageMap = {
        '.skill-box-1': 'image2.jpg',
        '.skill-box-2': 'image6.jpg',
        '.skill-box-3': 'image3.jpg',
        '.skill-box-4': 'image4.jpg',
        '.skill-box-5': 'image5.jpg',
        '.skill-box-6': 'image.jpg',
    };

    const colorMap = {
        '.skill-box-1': '#ffcccc',
        '.skill-box-2': '#ccffcc',
        '.skill-box-3': '#ccccff',
        '.skill-box-4': '#ffffcc',
        '.skill-box-5': '#ffccff',
        '.skill-box-6': '#ccffff',
    };

    const separatorColorMap = {
        '.skill-separator-1': '#ffcccc',
        '.skill-separator-2': '#ccffcc',
        '.skill-separator-3': '#ccccff',
        '.skill-separator-4': '#ffffcc',
        '.skill-separator-5': '#ffccff',
        '.skill-separator-6': '#ccffff',
    };

    const handleMouseOver = (event) => {
        const target = event.currentTarget;
        const index = Array.from(skillBoxes).indexOf(target) + 1;
        const separatorIndex = Array.from(skillSeparators).indexOf(target) + 1;

        const className = `.skill-box-${index}`;
        const separatorClassName = `.skill-separator-${separatorIndex}`;
        const imageUrl = imageMap[className];
        const backgroundColor = colorMap[className];
        const separatorBackgroundColor = separatorColorMap[separatorClassName];

        if (imageUrl) {
            container.style.backgroundImage = `url(${imageUrl})`;
            container.style.backgroundSize = 'cover';
            container.style.backgroundPosition = 'center';
            container.style.transition = 'background-image ease';
        }

        if (backgroundColor) {
            target.style.backgroundColor = backgroundColor;
            target.style.color = 'white';
            target.style.transition = 'background-color 0.2s ease';
        }

        if (separatorBackgroundColor) {
            target.style.backgroundColor = separatorBackgroundColor;
            target.style.color = 'white';
            target.style.transition = 'background-color 0.2s ease';
        }
    };

    const handleMouseOut = (event) => {
        const target = event.currentTarget;

        target.style.backgroundColor = '';
        target.style.color = '';
        target.style.transition = 'background-color 2s ease';

        container.style.backgroundImage = '';
        container.style.transition = 'background-image 3s ease';
    };

    skillBoxes.forEach(box => {
        box.addEventListener('mouseover', handleMouseOver);
        box.addEventListener('mouseout', handleMouseOut);
    });

    skillSeparators.forEach(separator => {
        separator.addEventListener('mouseover', handleMouseOver);
        separator.addEventListener('mouseout', handleMouseOut);
    });

    container.addEventListener('mouseover', () => {
        container.classList.add('hovered');
    });

    container.addEventListener('mouseout', () => {
        container.classList.remove('hovered');
    });
});

// Select the toggle button and navbar menu

// Select the toggle button and navbar menu
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const navbarLinks = document.querySelectorAll('.navbar-link'); // Select all navbar links

// Function to close the menu
const closeMenu = () => {
    navbarMenu.classList.remove('active'); // Remove the 'active' class to hide the menu
    navbarToggle.classList.remove('active'); // Remove the 'active' class to hide the menu
};

// Function to toggle the menu
const toggleMenu = () => {
    navbarMenu.classList.toggle('active'); // Toggle the 'active' class to show/hide the menu
    navbarToggle.classList.toggle('active'); // Toggle active state for the toggle button
};

// Toggle the menu when the hamburger is clicked
navbarToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the document
    toggleMenu(); // Toggle the menu open/close
});

// Collapse the menu when any link is clicked
navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarMenu.classList.contains('active')) {
            closeMenu(); // Collapse the menu
        }
    });
});

// Collapse the menu when clicking outside of the navbar
document.addEventListener('click', (e) => {
    if (!navbarMenu.contains(e.target) && !navbarToggle.contains(e.target)) {
        if (navbarMenu.classList.contains('active')) {
            closeMenu(); // Collapse the menu
        }
    }
});



document.getElementById('minimalistic-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    // Simple form validation
    if (!name || !email || !message) {
        showMessage("Nah, it's not working lol. Just email me at hpc7984@gmail.com", 'success');
        return;
    }

    // Simulate a successful form submission
    showMessage("Nah, it's not working lol. Just email me at hpc7984@gmail.com", 'success');
    
    // Optionally clear the form after submission
    document.getElementById('minimalistic-form').reset();
});

function showMessage(message, type) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.textContent = message;
    messageContainer.className = `message-container ${type}`;
    messageContainer.style.display = 'block';

    // Hide message after 5 seconds
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 5000);
}
