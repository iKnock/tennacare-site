document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const body = document.body;
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
      body.classList.toggle('menu-open');
    });
  }
  
  // Close mobile menu when clicking on a nav link or button
  document.querySelectorAll('.nav-link, .nav-button').forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });
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