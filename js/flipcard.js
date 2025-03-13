// Make sure flip cards work with existing modal system
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.flip-card').forEach(card => {
      card.addEventListener('click', function() {
        const newsId = this.getAttribute('data-news-id');
        if (newsId && newsContent[newsId]) {
          // Set modal content
          document.getElementById('newsModalTitle').textContent = newsContent[newsId].title;
          document.getElementById('newsModalBody').innerHTML = newsContent[newsId].content;

          // Set modal color theme
          document.documentElement.style.setProperty('--modal-color', newsContent[newsId].color);

          // Show the modal
          const modal = document.getElementById('newsModal');
          modal.style.display = 'block';

          // Add active class for animation
          setTimeout(() => {
            modal.classList.add('active');
          }, 10);

          // Prevent background scrolling
          document.body.style.overflow = 'hidden';
        }
      });
    });
  })
