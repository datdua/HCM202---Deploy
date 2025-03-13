document.addEventListener('DOMContentLoaded', function () {
    // Get all elements
    const slides = document.querySelectorAll('.slider-slide');
    const slideButtons = document.querySelectorAll('.slide-btn');
    const drawers = document.querySelectorAll('.history-drawer');
    const drawerCloseButtons = document.querySelectorAll('.drawer-close');
    const overlay = document.querySelector('.drawer-overlay');
    const radioInputs = document.querySelectorAll('input[name="history-slider"]');
    
    // Initialize current slide index
    let currentSlide = 0;
    const totalSlides = 3;

    // Add slide indicators functionality
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            document.getElementById(`slide${index + 1}`).checked = true;
            currentSlide = index;
        });
    });

    // Open corresponding drawer when a slide button is clicked
    slideButtons.forEach((btn, index) => {
        btn.addEventListener('click', function (e) {
            // Get the associated slide
            const slide = slides[index];
            
            // Get the data-period attribute
            const periodId = slide.getAttribute('data-period');
            
            // Find the corresponding drawer
            const drawer = document.getElementById(`${periodId}-drawer`);
            
            console.log('Button clicked:', index);
            console.log('Period ID:', periodId);
            console.log('Looking for drawer with ID:', `${periodId}-drawer`);
            
            // Open the drawer if found
            if (drawer) {
                drawer.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                console.error(`Drawer with ID "${periodId}-drawer" not found`);
            }
            
            // Prevent the event from bubbling up
            e.stopPropagation();
        });
    });

    // Close drawer when close button or overlay is clicked
    function closeDrawer() {
        drawers.forEach(drawer => drawer.classList.remove('active'));
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    drawerCloseButtons.forEach(btn => {
        btn.addEventListener('click', closeDrawer);
    });

    overlay.addEventListener('click', closeDrawer);

    // Update current slide index on radio button change
    radioInputs.forEach((radio, index) => {
        radio.addEventListener('change', function () {
            if (this.checked) {
                currentSlide = index;
            }
        });
    });

    // Add keyboard support for drawer closing
    document.addEventListener('keydown', function (e) {
        // ESC key to close drawer
        if (e.key === 'Escape') {
            closeDrawer();
        }
    });

    // Add sliding animation support for touch devices
    let touchStartX = 0;
    let touchEndX = 0;

    // Use the slider-wrapper class since that's what's in the HTML
    const sliderWrapper = document.querySelector('.slider-wrapper');

    if (sliderWrapper) {
        sliderWrapper.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        sliderWrapper.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }

    function handleSwipe() {
        const threshold = 50; // Minimum distance required for swipe

        // Left swipe (next slide)
        if (touchStartX - touchEndX > threshold) {
            const nextSlide = (currentSlide + 1) % totalSlides;
            document.getElementById(`slide${nextSlide + 1}`).checked = true;
            currentSlide = nextSlide;
        }

        // Right swipe (previous slide)
        if (touchEndX - touchStartX > threshold) {
            const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            document.getElementById(`slide${prevSlide + 1}`).checked = true;
            currentSlide = prevSlide;
        }
    }

    // Style the slide buttons to make them more clickable
    slideButtons.forEach(btn => {
        btn.style.cursor = 'pointer';
        btn.style.display = 'inline-block';
        btn.style.padding = '10px 15px';
        btn.style.backgroundColor = '#e54b4b';
        btn.style.color = 'white';
        btn.style.borderRadius = '4px';
        btn.style.fontWeight = 'bold';
    });
});