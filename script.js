
// ===== INTERACTIVE ELEMENTS =====

// Pre-order button functionality
const setupPreorderButtons = () => {
  const buttons = document.querySelectorAll('#preorder-header, #preorder-hero');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Create a modal effect
      showPreorderModal();

      // Add ripple effect
      createRipple(button, event);
    });
  });
};

// Contact Us button functionality
const setupContactUsButton = () => {
  const button = document.querySelector('#contact-us-header');

  if (button) {
    button.addEventListener('click', () => {
      // Create contact modal
      showContactModal();

      // Add ripple effect
      createRipple(button, event);
    });
  }
};

// About Us button functionality
const setupAboutUsButton = () => {
  const button = document.querySelector('#about-us-header');

  if (button) {
    button.addEventListener('click', () => {
      // Create about modal
      showAboutModal();

      // Add ripple effect
      createRipple(button, event);
    });
  }
};

// Create ripple effect on button click
const createRipple = (button, event) => {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');

  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
};

// Add ripple CSS
const addRippleStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
};

// Show preorder modal
const showPreorderModal = () => {
  // Create modal elements
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" aria-label="Close modal">&times;</button>
      <div class="modal-header">
        <h2>Pre-Order Typemaster Keyboard</h2>
        <p>Release Date: May 27, 2027</p>
      </div>
      <div class="modal-body">
        <form class="preorder-form" id="preorder-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name" required placeholder="John Doe">
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" required placeholder="john@example.com">
          </div>
          <div class="form-group">
            <label for="quantity">Quantity</label>
            <input type="number" id="quantity" name="quantity" min="1" max="10" value="1" required>
          </div>
          <div class="form-group">
            <label for="switch-type">Switch Type</label>
            <select id="switch-type" name="switch-type" required>
              <option value="">Select switch type</option>
              <option value="blue">Blue (Clicky)</option>
              <option value="brown">Brown (Tactile)</option>
              <option value="red">Red (Linear)</option>
              <option value="black">Black (Linear)</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary modal-submit">Reserve Now</button>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Add modal styles
  addModalStyles();

  // Animate modal in
  requestAnimationFrame(() => {
    modal.classList.add('active');
  });

  // Close modal functionality
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => closeModal(modal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });

  // Handle form submission
  const form = modal.querySelector('#preorder-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handlePreorderSubmit(form, modal);
  });

  // Prevent body scroll
  document.body.style.overflow = 'hidden';
};

// Show contact modal
const showContactModal = () => {
  // Create modal elements
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" aria-label="Close modal">&times;</button>
      <div class="modal-header">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you!</p>
      </div>
      <div class="modal-body">
        <form class="contact-form" id="contact-form">
          <div class="form-group">
            <label for="contact-name">Full Name</label>
            <input type="text" id="contact-name" name="name" required placeholder="John Doe">
          </div>
          <div class="form-group">
            <label for="contact-email">Email Address</label>
            <input type="email" id="contact-email" name="email" required placeholder="john@example.com">
          </div>
          <div class="form-group">
            <label for="contact-subject">Subject</label>
            <input type="text" id="contact-subject" name="subject" required placeholder="How can we help you?">
          </div>
          <div class="form-group">
            <label for="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows="5" required placeholder="Type your message here..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary modal-submit">Send Message</button>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Add modal styles
  addModalStyles();

  // Animate modal in
  requestAnimationFrame(() => {
    modal.classList.add('active');
  });

  // Close modal functionality
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => closeModal(modal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });

  // Handle form submission
  const form = modal.querySelector('#contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleContactSubmit(form, modal);
  });

  // Prevent body scroll
  document.body.style.overflow = 'hidden';
};

// Show about modal
const showAboutModal = () => {
  // Create modal elements
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content modal-large">
      <button class="modal-close" aria-label="Close modal">&times;</button>
      <div class="modal-header">
        <h2>About Typemaster</h2>
        <p>Pioneering the Future of Mechanical Keyboards</p>
      </div>
      <div class="modal-body about-content">
        <div class="about-section collapsible">
          <div class="about-section-header">
            <div class="about-header-left">
              <div class="about-icon">📜</div>
              <h3>Our History</h3>
            </div>
            <button class="expand-btn" aria-label="Expand section">
              <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
          <div class="about-section-content">
            <p>Founded in 2018, Typemaster emerged from a passion for creating the perfect typing experience. What started as a small workshop in Silicon Valley has grown into a worldwide movement of keyboard enthusiasts and professionals who demand excellence.</p>
            <p>Our journey began when our founders, a team of mechanical engineers and designers, noticed a gap in the market for high-quality, wireless mechanical keyboards that didn't compromise on performance or aesthetics. Since then, we've shipped over 500,000 keyboards to satisfied customers across 65 countries.</p>
          </div>
        </div>
        
        <div class="about-section collapsible">
          <div class="about-section-header">
            <div class="about-header-left">
              <div class="about-icon">🎯</div>
              <h3>Our Mission</h3>
            </div>
            <button class="expand-btn" aria-label="Expand section">
              <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
          <div class="about-section-content">
            <p>To revolutionize the typing experience by combining cutting-edge technology with timeless design. We believe that every keystroke should be a pleasure, whether you're coding, gaming, or writing the next great novel.</p>
            <p>We're committed to creating products that enhance productivity, inspire creativity, and bring joy to millions of users worldwide.</p>
          </div>
        </div>
        
        <div class="about-section collapsible">
          <div class="about-section-header">
            <div class="about-header-left">
              <div class="about-icon">🚀</div>
              <h3>Our Vision</h3>
            </div>
            <button class="expand-btn" aria-label="Expand section">
              <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
          <div class="about-section-content">
            <p>To become the world's most trusted name in mechanical keyboards, setting new standards for quality, innovation, and sustainability. We envision a future where every workspace is equipped with tools that empower people to do their best work.</p>
          </div>
        </div>
        
        <div class="about-section collapsible">
          <div class="about-section-header">
            <div class="about-header-left">
              <div class="about-icon">💎</div>
              <h3>Our Values</h3>
            </div>
            <button class="expand-btn" aria-label="Expand section">
              <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
          <div class="about-section-content">
            <ul class="values-list">
              <li><strong>Quality First:</strong> We never compromise on materials or craftsmanship</li>
              <li><strong>Innovation:</strong> Continuously pushing boundaries in keyboard technology</li>
              <li><strong>Sustainability:</strong> Committed to eco-friendly manufacturing practices</li>
              <li><strong>Community:</strong> Building lasting relationships with our customers</li>
            </ul>
          </div>
        </div>
        
        <div class="about-stats">
          <div class="stat-item">
            <div class="stat-number">500K+</div>
            <div class="stat-label">Keyboards Sold</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">65+</div>
            <div class="stat-label">Countries</div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Add modal styles
  addModalStyles();

  // Animate modal in
  requestAnimationFrame(() => {
    modal.classList.add('active');
  });

  // Setup expand/collapse functionality
  setupAboutSectionToggles(modal);

  // Close modal functionality
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => closeModal(modal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });

  // Prevent body scroll
  document.body.style.overflow = 'hidden';
};

// Setup expand/collapse toggles for About modal sections
const setupAboutSectionToggles = (modal) => {
  const sections = modal.querySelectorAll('.about-section.collapsible');

  sections.forEach(section => {
    const header = section.querySelector('.about-section-header');
    const expandBtn = section.querySelector('.expand-btn');
    const content = section.querySelector('.about-section-content');

    // Initially collapse all sections
    content.style.maxHeight = '0';
    content.style.overflow = 'hidden';
    content.style.transition = 'max-height 0.4s ease, padding 0.4s ease, margin 0.4s ease';
    content.style.paddingTop = '0';
    content.style.paddingBottom = '0';

    // Click handler for the header
    const toggleSection = () => {
      const isExpanded = section.classList.contains('expanded');

      if (isExpanded) {
        // Collapse
        section.classList.remove('expanded');
        content.style.maxHeight = '0';
        content.style.paddingTop = '0';
        content.style.paddingBottom = '0';
        expandBtn.style.transform = 'rotate(0deg)';
      } else {
        // Expand
        section.classList.add('expanded');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.paddingTop = '1rem';
        content.style.paddingBottom = '1rem';
        expandBtn.style.transform = 'rotate(180deg)';
      }
    };

    header.addEventListener('click', toggleSection);
    header.style.cursor = 'pointer';
  });
};

// Close modal
const closeModal = (modal) => {
  modal.classList.remove('active');
  setTimeout(() => {
    modal.remove();
    document.body.style.overflow = '';
  }, 300);
};

// Handle preorder form submission
const handlePreorderSubmit = (form, modal) => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Show success message
  const modalBody = modal.querySelector('.modal-body');
  modalBody.innerHTML = `
    <div class="success-message">
      <div class="success-icon">✓</div>
      <h3>Pre-Order Confirmed!</h3>
      <p>Thank you, ${data.name}! We've received your pre-order.</p>
      <p>A confirmation email will be sent to <strong>${data.email}</strong></p>
      <p class="success-details">
        Quantity: ${data.quantity} × Typemaster Keyboard (${data['switch-type']} switches)
      </p>
      <button class="btn btn-primary" onclick="this.closest('.modal').querySelector('.modal-close').click()">
        Close
      </button>
    </div>
  `;

  // Log to console (in real app, this would be sent to server)
  console.log('Pre-order submitted:', data);
};

// Handle contact form submission
const handleContactSubmit = (form, modal) => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Show success message
  const modalBody = modal.querySelector('.modal-body');
  modalBody.innerHTML = `
    <div class="success-message">
      <div class="success-icon">✓</div>
      <h3>Message Sent Successfully!</h3>
      <p>Thank you, ${data.name}! We've received your message.</p>
      <p>We'll get back to you at <strong>${data.email}</strong> as soon as possible.</p>
      <p class="success-details">
        <strong>Subject:</strong> ${data.subject}<br>
        <strong>Message:</strong> ${data.message}
      </p>
      <button class="btn btn-primary" onclick="this.closest('.modal').querySelector('.modal-close').click()">
        Close
      </button>
    </div>
  `;

  // Log to console (in real app, this would be sent to server)
  console.log('Contact form submitted:', data);
};

// Add modal styles
const addModalStyles = () => {
  if (document.getElementById('modal-styles')) return;

  const style = document.createElement('style');
  style.id = 'modal-styles';
  style.textContent = `
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(30, 43, 58, 0.8);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
      padding: 1rem;
    }
    
    .modal.active {
      opacity: 1;
    }
    
    .modal-content {
      background: white;
      border-radius: 20px;
      max-width: 500px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      transform: scale(0.9);
      transition: transform 0.3s ease;
      position: relative;
    }
    
    .modal.active .modal-content {
      transform: scale(1);
    }
    
    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: transparent;
      border: none;
      font-size: 2rem;
      color: var(--color-text);
      cursor: pointer;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.3s ease;
      z-index: 1;
    }
    
    .modal-close:hover {
      background: var(--color-light-bg);
      color: var(--color-primary);
      transform: rotate(90deg);
    }
    
    .modal-header {
      padding: 2rem 2rem 1rem;
      border-bottom: 2px solid var(--color-light-bg);
    }
    
    .modal-header h2 {
      margin-bottom: 0.5rem;
      color: var(--color-dark);
    }
    
    .modal-header p {
      color: var(--color-text);
      font-weight: 500;
    }
    
    .modal-body {
      padding: 2rem;
    }
    
    .preorder-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .form-group label {
      font-weight: 600;
      color: var(--color-dark);
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 0.875rem 1rem;
      border: 2px solid var(--color-light-bg);
      border-radius: 12px;
      font-size: 1rem;
      font-family: inherit;
      transition: all 0.3s ease;
      background: var(--color-white);
      resize: vertical;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 4px rgba(255, 99, 71, 0.1);
    }
    
    .modal-submit {
      margin-top: 1rem;
      width: 100%;
    }
    
    .success-message {
      text-align: center;
      padding: 2rem 0;
    }
    
    .success-icon {
      width: 80px;
      height: 80px;
      background: var(--gradient-primary);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      margin: 0 auto 1.5rem;
      box-shadow: var(--shadow-glow);
      animation: successPulse 0.6s ease;
    }
    
    @keyframes successPulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }
    
    .success-message h3 {
      margin-bottom: 1rem;
      color: var(--color-dark);
    }
    
    .success-message p {
      color: var(--color-text);
      margin-bottom: 0.5rem;
    }
    
    .success-details {
      background: var(--color-light-bg);
      padding: 1rem;
      border-radius: 12px;
      margin: 1.5rem 0;
      font-weight: 500;
    }
    
    .success-message button {
      margin-top: 1rem;
    }

    /* Desktop Form Styles - BIGGER modals and forms */
    @media (min-width: 1024px) {
      .modal-content {
        max-width: 650px;  /* Increased from 500px */
      }

      .modal-header {
        padding: 2.5rem 3rem 1.5rem;  /* Increased padding */
      }

      .modal-header h2 {
        font-size: 2rem;  /* Larger heading */
      }

      .modal-header p {
        font-size: 1.125rem;  /* Larger subtitle */
      }

      .modal-body {
        padding: 3rem;  /* Increased from 2rem */
      }

      .preorder-form,
      .contact-form {
        gap: 2rem;  /* Increased from 1.5rem */
      }

      .form-group {
        gap: 0.75rem;  /* Increased from 0.5rem */
      }

      .form-group label {
        font-size: 1rem;  /* Increased from 0.875rem */
      }

      .form-group input,
      .form-group select,
      .form-group textarea {
        padding: 1.125rem 1.5rem;  /* Increased padding */
        font-size: 1.125rem;  /* Increased font size */
        border-radius: 14px;  /* Slightly larger radius */
      }

      .form-group textarea {
        min-height: 150px;  /* Larger textarea */
      }

      .modal-submit {
        margin-top: 1.5rem;  /* More spacing */
        padding: 1.25rem 3rem;  /* Bigger button */
        font-size: 1.0625rem;
      }

      .success-message {
        padding: 3rem 1rem;  /* More padding */
      }

      .success-icon {
        width: 100px;  /* Larger success icon */
        height: 100px;
        font-size: 3.5rem;
      }

      .success-message h3 {
        font-size: 1.75rem;  /* Larger heading */
        margin-bottom: 1.25rem;
      }

      .success-message p {
        font-size: 1.125rem;  /* Larger text */
        margin-bottom: 0.75rem;
      }

      .success-details {
        padding: 1.5rem;  /* More padding */
        font-size: 1.0625rem;  /* Larger text */
        margin: 2rem 0;
      }
    }
  `;
  document.head.appendChild(style);
};

// ===== SCROLL ANIMATIONS =====
const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
};

// ===== PARALLAX EFFECT =====
const setupParallax = () => {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image-wrapper');

    if (heroImage) {
      const speed = 0.5;
      heroImage.style.transform = `translateY(${scrolled * speed}px)`;
    }
  });
};

// ===== IMAGE HOVER EFFECTS =====
const setupImageHoverEffects = () => {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.zIndex = '10';
    });

    item.addEventListener('mouseleave', () => {
      item.style.zIndex = '1';
    });
  });
};

// ===== FEATURE CARDS TILT EFFECT =====
const setupFeatureCardTilt = () => {
  const cards = document.querySelectorAll('.feature-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
};

// ===== SMOOTH SCROLL =====
const setupSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// ===== KEYBOARD SHORTCUTS =====
const setupKeyboardShortcuts = () => {
  document.addEventListener('keydown', (e) => {
    // Press 'P' to open pre-order modal
    if (e.key === 'p' || e.key === 'P') {
      if (!document.querySelector('.modal')) {
        showPreorderModal();
      }
    }

    // Press 'C' to open contact modal
    if (e.key === 'c' || e.key === 'C') {
      if (!document.querySelector('.modal')) {
        showContactModal();
      }
    }

    // Press 'A' to open about modal
    if (e.key === 'a' || e.key === 'A') {
      if (!document.querySelector('.modal')) {
        showAboutModal();
      }
    }

    // Press 'Escape' to close modal
    if (e.key === 'Escape') {
      const modal = document.querySelector('.modal');
      if (modal) {
        closeModal(modal);
      }
    }
  });
};

// ===== LOGO ANIMATION =====
const setupLogoAnimation = () => {
  const logo = document.querySelector('.logo');
  let clicks = 0;

  logo.addEventListener('click', (e) => {
    e.preventDefault();
    clicks++;

    if (clicks >= 3) {
      // Easter egg: party mode!
      document.body.style.animation = 'rainbow 3s linear infinite';

      const style = document.createElement('style');
      style.textContent = `
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `;
      document.head.appendChild(style);

      setTimeout(() => {
        document.body.style.animation = '';
        clicks = 0;
      }, 3000);
    }
  });
};

// ===== LOADING ANIMATION =====
const setupLoadingAnimation = () => {
  // Add loading class to images
  const images = document.querySelectorAll('img');

  images.forEach(img => {
    if (!img.complete) {
      img.parentElement.classList.add('loading');

      img.addEventListener('load', () => {
        img.parentElement.classList.remove('loading');
      });
    }
  });
};

// ===== PERFORMANCE OPTIMIZATION =====
const setupPerformanceOptimizations = () => {
  // Lazy loading for images
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }
};

// ===== INITIALIZATION =====
const init = () => {
  // Setup all features
  setupPreorderButtons();
  setupContactUsButton();
  setupAboutUsButton();
  addRippleStyles();
  observeElements();
  setupParallax();
  setupImageHoverEffects();
  setupFeatureCardTilt();
  setupSmoothScroll();
  setupKeyboardShortcuts();
  setupLogoAnimation();
  setupLoadingAnimation();
  setupPerformanceOptimizations();

  // Log initialization
  console.log('🎹 Typemaster Keyboard website initialized!');
  console.log('💡 Tip: Press "P" to open pre-order modal');
  console.log('📧 Tip: Press "C" to open contact modal');
  console.log('ℹ️  Tip: Press "A" to open about modal');
  console.log('🎨 Easter egg: Click the logo 3 times!');
};

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    showPreorderModal,
    closeModal,
    createRipple
  };
}
