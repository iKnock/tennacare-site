console.log('Script loaded');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const body = document.body;
  
  console.log('Menu Toggle Element:', menuToggle);
  console.log('Main Nav Element:', mainNav);
  
  if (menuToggle && mainNav) {
    console.log('Adding event listeners');
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', function(e) {
      console.log('Menu toggle clicked');
      e.preventDefault();
      e.stopPropagation();
      
      const isActive = this.classList.contains('active');
      console.log('Current active state:', isActive);
      
      // Toggle classes
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
      body.classList.toggle('menu-open');
      
      // Update ARIA attributes
      const isNowActive = !isActive;
      this.setAttribute('aria-expanded', isNowActive);
      mainNav.setAttribute('aria-hidden', !isNowActive);
      
      console.log('New active state:', isNowActive);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (mainNav.classList.contains('active') && 
          !mainNav.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        console.log('Clicked outside, closing menu');
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.setAttribute('aria-hidden', 'true');
      }
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