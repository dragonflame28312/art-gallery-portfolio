// Carousel functionality for the gallery
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    const nav = document.querySelector('.carousel-nav');
    const dots = Array.from(nav.children);
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange slides next to each other horizontally
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    /**
     * Moves the carousel track so that the target slide is visible
     * @param {Element} track - The track element containing slides
     * @param {Element} currentSlide - The slide currently visible
     * @param {Element} targetSlide - The slide to be displayed
     */
    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    /**
     * Updates the navigation dots to reflect the current slide
     * @param {Element} currentDot - The currently active dot
     * @param {Element} targetDot - The dot corresponding to the target slide
     */
    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    };

    /**
     * Shows or hides navigation arrows based on the slide index
     * @param {Array<Element>} slides - An array of slide elements
     * @param {Element} prevButton - The previous arrow button
     * @param {Element} nextButton - The next arrow button
     * @param {number} targetIndex - The index of the target slide
     */
    const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
        if (targetIndex === 0) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'block';
        } else if (targetIndex === slides.length - 1) {
            prevButton.style.display = 'block';
            nextButton.style.display = 'none';
        } else {
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';
        }
    };

    // Click event for previous button
    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        if (!prevSlide) return;
        const currentDot = nav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide => slide === prevSlide);

        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
        hideShowArrows(slides, prevButton, nextButton, prevIndex);
    });

    // Click event for next button
    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        if (!nextSlide) return;
        const currentDot = nav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide);

        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
        hideShowArrows(slides, prevButton, nextButton, nextIndex);
    });

    // Click event for navigation dots
    nav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;
        const currentSlide = track.querySelector('.current-slide');
        const currentDot = nav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        hideShowArrows(slides, prevButton, nextButton, targetIndex);
    });

    // Autoplay functionality
    let autoIndex = 0;
    setInterval(() => {
        autoIndex = (autoIndex + 1) % slides.length;
        const currentSlide = track.querySelector('.current-slide');
        const currentDot = nav.querySelector('.current-slide');
        const nextSlide = slides[autoIndex];
        const nextDot = dots[autoIndex];
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
        hideShowArrows(slides, prevButton, nextButton, autoIndex);
    }, 5000);
});
