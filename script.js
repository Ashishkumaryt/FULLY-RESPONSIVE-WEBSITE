// Burger menu toggle for mobile
const burger = document.getElementById('burger');
const nav = document.querySelector('nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  burger.classList.toggle('open');
});

// Highlight nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// Fade in animation on scroll
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Form submission with spinner
const form = document.getElementById('orderForm');
const responseMsg = document.getElementById('responseMsg');
const btnSubmit = form.querySelector('.btn-submit');
const btnSpinner = btnSubmit.querySelector('.btn-spinner');
const btnText = btnSubmit.querySelector('.btn-text');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const address = form.address.value.trim();
  const packageDetails = form.package.value.trim();

  if (!name || !phone || !address || !packageDetails) {
    alert('Please fill all fields.');
    return;
  }

  // Show spinner and disable button
  btnSpinner.classList.remove('hidden');
  btnText.textContent = 'Submitting...';
  btnSubmit.disabled = true;

  // Simulate async request
  setTimeout(() => {
    btnSpinner.classList.add('hidden');
    btnText.textContent = 'Submit Order';
    btnSubmit.disabled = false;

    responseMsg.textContent = `Thanks ${name}! Your order has been received. We will contact you soon.`;
    responseMsg.style.color = 'green';

    form.reset();
  }, 2000);
});
