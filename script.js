
// ===== INTERACTIVE ELEMENTS =====

// Pre-order button functionality
const setupPreorderButtons = () => {
  const buttons = document.querySelectorAll('#preorder-header, #preorder-hero, #preorder-footer');

  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      showPreorderModal();
      createRipple(button, event);
    });
  });
};

// Contact Us button functionality
const setupContactUsButton = () => {
  const buttons = document.querySelectorAll('#contact-us-header, #contact-us-footer');

  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      showContactModal();
      createRipple(button, event);
    });
  });
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
        <h2>Pre-order options</h2>
        <p>Demo only. Orders aren't submitted or stored.</p>
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
          <button type="submit" class="btn btn-primary modal-submit">Preview reservation</button>
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
    handlePreorderSubmit(modal);
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
    handleContactSubmit(modal);
  });

  // Prevent body scroll
  document.body.style.overflow = 'hidden';
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
const handlePreorderSubmit = (modal) => {
  const modalBody = modal.querySelector('.modal-body');
  modalBody.innerHTML = `
    <div class="success-message" role="status" aria-live="polite">
      <div class="success-icon" aria-hidden="true">i</div>
      <h3>Pre-order preview</h3>
      <p>This demo doesn't send or save requests yet, so no order has been placed.</p>
      <button class="btn btn-primary" onclick="this.closest('.modal').querySelector('.modal-close').click()">
        Close
      </button>
    </div>
  `;
};

// Handle contact form submission
const handleContactSubmit = (modal) => {
  const modalBody = modal.querySelector('.modal-body');
  modalBody.innerHTML = `
    <div class="success-message" role="status" aria-live="polite">
      <div class="success-icon" aria-hidden="true">i</div>
      <h3>Contact form preview</h3>
      <p>This demo doesn't send or save messages yet. No message was sent.</p>
      <button class="btn btn-primary" onclick="this.closest('.modal').querySelector('.modal-close').click()">
        Close
      </button>
    </div>
  `;
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
    if (e.key === 'Escape') {
      const modal = document.querySelector('.modal');
      if (modal) {
        closeModal(modal);
      }
      return;
    }

    if (e.target.matches('input, textarea, select, [contenteditable="true"]')) {
      return;
    }

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
  addRippleStyles();
  observeElements();
  setupImageHoverEffects();
  setupSmoothScroll();
  setupKeyboardShortcuts();
  setupLoadingAnimation();
  setupPerformanceOptimizations();

  // Log initialization
  console.log('🎹 Typemaster Keyboard website initialized!');
  console.log('💡 Tip: Press "P" to open pre-order modal');
  console.log('📧 Tip: Press "C" to open contact modal');
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
