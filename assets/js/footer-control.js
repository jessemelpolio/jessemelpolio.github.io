document.addEventListener('DOMContentLoaded', function() {
  const footer = document.querySelector('footer.fixed-bottom');
  if (!footer) return;

  let lastScrollTop = 0;
  let isFooterVisible = false;
  let footerTimeout;

  function showFooter() {
    footer.classList.add('footer-visible');
    isFooterVisible = true;
    
    // Auto-hide after 3 seconds of no scrolling
    clearTimeout(footerTimeout);
    footerTimeout = setTimeout(() => {
      hideFooter();
    }, 3000);
  }

  function hideFooter() {
    footer.classList.remove('footer-visible');
    isFooterVisible = false;
    clearTimeout(footerTimeout);
  }

  // Show footer when scrolling up or reaching bottom
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Show footer when scrolling up
    if (scrollTop < lastScrollTop && scrollTop > 100) {
      showFooter();
    }
    // Show footer when near bottom of page
    else if (scrollTop + windowHeight >= documentHeight - 100) {
      showFooter();
    }
    // Hide footer when scrolling down (but not when near bottom)
    else if (scrollTop > lastScrollTop && scrollTop + windowHeight < documentHeight - 100) {
      hideFooter();
    }

    lastScrollTop = scrollTop;
  });

  // Show footer on mouse hover near bottom
  window.addEventListener('mousemove', function(e) {
    const windowHeight = window.innerHeight;
    if (e.clientY > windowHeight - 100) {
      showFooter();
    }
  });

  // Initially hide the footer
  hideFooter();
}); 