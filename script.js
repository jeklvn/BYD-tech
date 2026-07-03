let selectedAssetId = null;
let selectedAssetName = '';

// Fallback demo assets if API fails
const fallbackAssets = [
  {
    _id: 'demo-1',
    name: 'BYD Seal',
    category: 'Electric Vehicle',
    price: 15000,
    roi: 8.2,
    minimumInvestment: 500,
    availability: 'Available',
    imageUrl: 'images/BYD-Seal-asset.jpg',
  },
  {
    _id: 'demo-2',
    name: 'BYD ATTO',
    category: 'Electric SUV',
    price: 18000,
    roi: 8.2,
    minimumInvestment: 500,
    availability: 'Available',
    imageUrl: 'images/BYD-ATTO.jpg',
  },
  {
    _id: 'demo-3',
    name: 'BYD Dolphin',
    category: 'Compact EV',
    price: 12000,
    roi: 8.2,
    minimumInvestment: 300,
    availability: 'Available',
    imageUrl: 'images/BYD_Dolphin.jpg',
  },
  {
    _id: 'demo-4',
    name: 'BYD Manufacturing Factory',
    category: 'Industrial Asset',
    price: 45000,
    roi: 9.0,
    minimumInvestment: 2000,
    availability: 'Limited',
    imageUrl: 'images/BYD-Car-factory.png',
  },
];

const assetContainer = document.querySelector('.investment-container');
const investModal = document.getElementById('invest-modal');
const investForm = document.getElementById('invest-form');
const investMessage = document.getElementById('invest-message');
const investAmountInput = document.getElementById('invest-amount');
const closeInvestModal = document.getElementById('close-invest-modal');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const contactForm = document.getElementById('contact-form');
const contactInfos = document.querySelector('.contact-infos');

const services = [
  { icon: 'fa-car', title: 'Smart Mobility', description: 'Leading global manufacturer of sustainable, high-performance electric passenger and commercial vehicles.' },
  { icon: 'fa-microchip', title: 'Electronics', description: 'Advanced precision manufacturing solutions for global tech leaders and infrastructure.' },
  { icon: 'fa-bolt', title: 'New Energy', description: 'Proprietary battery technology powering large-scale storage and clean energy ecosystems.' },
  { icon: 'fa-train', title: 'Rail Transit', description: 'Zero-emission urban monorail systems designed for efficient, modern city transportation.' },
];

const contactInfo = [
  { icon: 'fa-regular fa-envelope', infoName: 'Email', info: 'info-BYD@gmail.com' },
  { icon: 'fa-solid fa-location-dot', infoName: 'Headquarter', info: 'Beijing, China' },
  { icon: 'fa-solid fa-phone', infoName: 'Telephone', info: '+1 234 5678 900' },
  { icon: 'fa-regular fa-clock', infoName: 'Working Hours', info: 'Mon-Fri, 9am-6pm' },
];

const renderServices = () => {
  const container = document.querySelector('.service-card-container');
  if (!container) return;
  container.innerHTML = services
    .map(
      (service) => `
        <div class="service-card">
          <div class="service-icon">
            <i class="fa-solid ${service.icon}"></i>
          </div>
          <div class="service-text-container">
            <h3>${service.title}</h3>
            <p class="service-description">${service.description}</p>
          </div>
        </div>
      `
    )
    .join('');
};

const renderContactCards = () => {
  if (!contactInfos) return;
  contactInfos.innerHTML = contactInfo
    .map(
      (info) => `
        <div class="contact-card">
          <div class="contact-icon-container">
            <i class="${info.icon}"></i>
          </div>
          <div class="contact-info-container">
            <h3>${info.infoName}</h3>
            <span>${info.info}</span>
          </div>
        </div>
      `
    )
    .join('');
};

const showMessage = (element, message, success = true) => {
  if (!element) return;
  element.textContent = message;
  element.classList.add('active');
  element.style.borderColor = success ? 'dodgerblue' : '#f44336';
  element.style.color = success ? '#055160' : '#b71c1c';
  element.style.backgroundColor = success ? '#e1f4ff' : '#fdecea';
};

const hideMessage = (element) => {
  if (!element) return;
  element.classList.remove('active');
};

// No backend: render built-in assets
const fetchAssets = () => {
  renderAssetCards(fallbackAssets);
};

const renderAssetCards = (assets) => {
  if (!assetContainer) return;
  assetContainer.innerHTML = assets
    .map(
      (asset) => `
      <div class="investment-card" data-id="${asset._id}">
        <span class="asset-name">${asset.name}</span>
        <img src="${asset.imageUrl || 'images/car-1.jpg'}" alt="${asset.name}" class="asset-image">
        <div class="investment-info">
          <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center;">
            <span><strong>Projected Yield:</strong> ${asset.roi}% APY</span>
            <span><strong>Token Price:</strong> $${asset.price}</span>
          </div>
          <div class="asset-cta-container" style="text-align: center;">
            <span><strong>Asset Status:</strong> ${asset.availability || 'Available'}</span>
            <a href="#" class="asset-cta" data-id="${asset._id}">Invest Now</a>
          </div>
        </div>
      </div>
    `
    )
    .join('');
};

const openInvestModal = (assetId) => {
  selectedAssetId = assetId;
  investAmountInput.value = '';
  const assetEl = assetContainer.querySelector(`[data-id="${assetId}"] .asset-name`);
  selectedAssetName = assetEl ? assetEl.textContent.trim() : '';
  hideMessage(investMessage);
  investModal.classList.remove('hidden');
};

const closeInvest = () => {
  investModal.classList.add('hidden');
};

const handleAssetClick = (event) => {
  const target = event.target;
  if (target.matches('.asset-cta')) {
    event.preventDefault();
    const assetId = target.dataset.id;
    openInvestModal(assetId);
  }
};

const handleInvestSubmit = async (event) => {
  event.preventDefault();
  const amount = investAmountInput.value;
  if (!amount || Number(amount) <= 0) {
    showMessage(investMessage, 'Enter a valid investment amount.', false);
    return;
  }
  // Build a Telegram share link so admins can handle investment on Telegram
  const text = `Investment Request\nAsset: ${selectedAssetName || selectedAssetId}\nAmount: ${amount}\nPage: ${location.href}`;
  const tgUrl = `https://t.me/share/url?url=&text=${encodeURIComponent(text)}&to=@Brandon_Lake_fan`;
  window.open(tgUrl, '_blank');
  showMessage(investMessage, 'Opening Telegram to complete request...');
};

const handleContactSubmit = async (event) => {
  event.preventDefault();
  const form = event.target;
  const name = document.querySelector('.name-input').value.trim();
  const email = document.querySelector('.email-input').value.trim();
  const message = document.querySelector('.message-input').value.trim();
  const contactMessage = document.getElementById('contact-message');
  if (!name || !email || !message) {
    showMessage(contactMessage, 'Please fill every field before submitting.', false);
    return;
  }

  const formAction = form.action || 'https://formspree.io/f/mbdenlgj';
  const formData = new FormData(form);
  showMessage(contactMessage, 'Sending your message...');

  try {
    const response = await fetch(formAction, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      showMessage(contactMessage, 'Your message has been sent successfully!');
      form.reset();
    } else {
      const data = await response.json();
      const errorMessage = data?.error || 'Failed to send your message. Please try again.';
      showMessage(contactMessage, errorMessage, false);
    }
  } catch (error) {
    showMessage(contactMessage, 'Network error: message could not be sent.', false);
  }
};

const setupScrollAnimations = () => {
  const sectionEls = document.querySelectorAll('section:not(#hero-page)');
  const heroEls = document.querySelectorAll('#hero-page .hero-heading, #hero-page .hero-subhead, #hero-page .cta-container');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('in-view');
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -12% 0px' });

  sectionEls.forEach((el, idx) => {
    el.classList.add('animate', idx % 2 === 0 ? 'slide-left' : 'slide-right');
    observer.observe(el);
  });

  if (heroEls.length) {
    heroEls.forEach((h) => h.classList.add('hero-animate'));
    const heroObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          heroEls.forEach((h, idx) => {
            h.style.transitionDelay = `${idx * 180}ms`;
            h.classList.add('in-view');
          });
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    const heroSection = document.querySelector('#hero-page');
    if (heroSection) heroObserver.observe(heroSection);
  }
};

const init = () => {
  renderServices();
  renderContactCards();
  fetchAssets();
  if (assetContainer) {
    assetContainer.addEventListener('click', handleAssetClick);
  }
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }
  if (closeInvestModal) {
    closeInvestModal.addEventListener('click', closeInvest);
  }
  if (investForm) {
    investForm.addEventListener('submit', handleInvestSubmit);
  }
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
  // Initialize scroll-triggered animations
  setupScrollAnimations();
};

window.addEventListener('DOMContentLoaded', init);
