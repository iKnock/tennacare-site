// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
  
  // Mobile menu elements
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const menuOverlay = document.querySelector('.menu-overlay');
  const body = document.body;
  
  // Check if elements exist
  if (!menuToggle || !mainNav || !menuOverlay) {
    return;
  }
  
  // Set initial ARIA attributes
  menuToggle.setAttribute('aria-expanded', 'false');
  mainNav.setAttribute('aria-hidden', 'true');
  
  // Function to close menu
  const closeMenu = () => {
    menuToggle.classList.remove('active');
    mainNav.classList.remove('active');
    menuOverlay.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mainNav.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
    document.documentElement.style.overflow = '';
  };
  
  // Toggle menu on button click
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    
    const currentState = this.getAttribute('aria-expanded') === 'true';
    const newState = !currentState;
    
    // Toggle classes
    this.classList.toggle('active', newState);
    mainNav.classList.toggle('active', newState);
    
    // Update ARIA attributes
    this.setAttribute('aria-expanded', newState);
    mainNav.setAttribute('aria-hidden', !newState);
    
    // Toggle body scroll and overlay
    body.style.overflow = newState ? 'hidden' : '';
    document.documentElement.style.overflow = newState ? 'hidden' : '';
    menuOverlay.classList.toggle('active', newState);
  });
  
  // Close menu when clicking on a nav link or button
  document.querySelectorAll('.nav-link, .nav-button').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Close menu when clicking on overlay
  menuOverlay.addEventListener('click', closeMenu);
  
  // Close menu on window resize if it becomes desktop view
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
        closeMenu();
      }
    }, 250);
  });
  
  // Handle keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
      closeMenu();
      menuToggle.focus();
    }
  });
  
  // Header scroll effect
  const header = document.querySelector('.main-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.classList.remove('scrolled');
      return;
    }
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
      
      // Hide header when scrolling down, show when scrolling up
      if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.add('scroll-down');
        header.classList.remove('scroll-up');
      } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
      }
    } else {
      header.classList.remove('scrolled', 'scroll-down', 'scroll-up');
    }
    
    lastScroll = currentScroll;
  });
  
  // Add active class to current section in viewport
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');
  
  function setActiveNavItem() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', setActiveNavItem);
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Keep the original getStarted function
function getStarted() {
  alert("You will be redirected to the app download page.");
  // In a real implementation, you would redirect to the app store or signup page
}