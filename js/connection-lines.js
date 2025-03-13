document.addEventListener('DOMContentLoaded', function() {
    // Make updateLinePositions globally available
    window.updateLinePositions = function() {
        // Remove all existing lines and dots
        document.querySelectorAll('.timeline-container').forEach(el => el.remove());
        document.querySelectorAll('.connector-dot').forEach(el => el.remove());
        
        // Recreate the lines
        setTimeout(function() {
            createConnectionLines();
        }, 500);
    };
    
    // Function to create SVG lines between cards
    function createConnectionLines() {
        // Get all news sections
        const newsSections = document.querySelectorAll('.news_list');
        
        newsSections.forEach(section => {
            // Create a container for the timeline with absolute positioning
            const timelineContainer = document.createElement('div');
            timelineContainer.className = 'timeline-container';
            section.style.position = 'relative'; // Ensure parent has relative positioning
            section.appendChild(timelineContainer);
            
            // Get all cards in this section
            const cards = section.querySelectorAll('li');
            
            if (cards.length < 2) return; // Need at least 2 cards for a line
            
            // Create SVG container
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.style.position = 'absolute';
            svg.style.left = '0';
            svg.style.top = '0';
            svg.style.pointerEvents = 'none';
            svg.style.zIndex = '5';
            timelineContainer.appendChild(svg);
            
            // Connect cards with lines
            for (let i = 0; i < cards.length - 1; i++) {
                // Add connector dot to the current card
                const dot1 = document.createElement('div');
                dot1.className = 'connector-dot';
                cards[i].appendChild(dot1);
                
                // Add connector dot to the next card
                const dot2 = document.createElement('div');
                dot2.className = 'connector-dot';
                cards[i+1].appendChild(dot2);
                
                // Position the dots and draw line
                setTimeout(() => {
                    const card1Rect = cards[i].getBoundingClientRect();
                    const card2Rect = cards[i+1].getBoundingClientRect();
                    const sectionRect = section.getBoundingClientRect();
                    
                    // Position dots
                    dot1.style.left = '50%';
                    dot1.style.bottom = '0';
                    dot1.style.transform = 'translate(-50%, 50%)';
                    
                    dot2.style.left = '50%';
                    dot2.style.top = '0';
                    dot2.style.transform = 'translate(-50%, -50%)';
                    
                    // Create line between dots
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('class', 'connection-line');
                    
                    // Calculate positions relative to the section
                    const x1 = card1Rect.left + card1Rect.width/2 - sectionRect.left;
                    const y1 = card1Rect.bottom - sectionRect.top;
                    
                    const x2 = card2Rect.left + card2Rect.width/2 - sectionRect.left;
                    const y2 = card2Rect.top - sectionRect.top;
                    
                    line.setAttribute('x1', x1);
                    line.setAttribute('y1', y1);
                    line.setAttribute('x2', x2);
                    line.setAttribute('y2', y2);
                    
                    svg.appendChild(line);
                }, 1000); // Increased delay to ensure elements are rendered
            }
            
            // Add a final dot to the last card if needed
            const lastDot = document.createElement('div');
            lastDot.className = 'connector-dot';
            cards[cards.length-1].appendChild(lastDot);
            lastDot.style.left = '50%';
            lastDot.style.bottom = '0';
            lastDot.style.transform = 'translate(-50%, 50%)';
        });
    }
    
    // Simple debounce function to avoid excessive updates
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    // Initial creation with delay to ensure DOM is fully loaded and rendered
    setTimeout(createConnectionLines, 2000);
    
    // Update positions on window resize
    window.addEventListener('resize', debounce(window.updateLinePositions, 250));
    
    // Also update on any animation completion or image load that might affect layout
    window.addEventListener('load', function() {
        setTimeout(window.updateLinePositions, 1000);
    });
    
    // Update positions when animations complete
    document.addEventListener('animationend', function(e) {
        if (e.target.classList.contains('wow')) {
            setTimeout(window.updateLinePositions, 500);
        }
    });
});