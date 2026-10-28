'use strict';

const header = document.querySelector('#site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}
menuToggle.addEventListener('click', () => {
  const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(opening));
  menuToggle.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
  mobileNav.hidden = !opening;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!header.contains(event.target)) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 621px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
let scrollQueued = false;
function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 12); }
window.addEventListener('scroll', () => {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(() => { updateHeader(); scrollQueued = false; });
}, { passive: true });
updateHeader();

// CSS builds the glass objects; pointer movement gently changes their perspective.
const art = document.querySelector('#hero-art');
const scene = document.querySelector('#visual-scene');
const motionButton = document.querySelector('#motion-toggle');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(pointer: fine)');
let motionPaused = reduceMotion.matches;
let frame = 0;
let pendingX = 0;
let pendingY = 0;
function resetPerspective() {
  cancelAnimationFrame(frame);
  frame = 0;
  scene.style.removeProperty('--rx');
  scene.style.removeProperty('--ry');
}
function syncMotion() {
  document.body.classList.toggle('motion-paused', motionPaused);
  motionButton.setAttribute('aria-pressed', String(motionPaused));
  motionButton.setAttribute('aria-label', motionPaused ? 'Enable visual motion' : 'Pause visual motion');
  motionButton.querySelector('use').setAttribute('href', motionPaused ? '#play' : '#pause');
  motionButton.querySelector('span').textContent = motionPaused ? 'Motion off' : 'Motion on';
  if (motionPaused) resetPerspective();
}
motionButton.addEventListener('click', () => { motionPaused = !motionPaused; syncMotion(); });
reduceMotion.addEventListener('change', event => { motionPaused = event.matches; syncMotion(); });
art.addEventListener('pointermove', event => {
  if (motionPaused || reduceMotion.matches || !finePointer.matches || event.pointerType === 'touch') return;
  const bounds = art.getBoundingClientRect();
  pendingY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
  pendingX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8;
  if (frame) return;
  frame = requestAnimationFrame(() => {
    scene.style.setProperty('--rx', pendingX.toFixed(2) + 'deg');
    scene.style.setProperty('--ry', pendingY.toFixed(2) + 'deg');
    frame = 0;
  });
});
art.addEventListener('pointerleave', resetPerspective);
syncMotion();

const storyButton = document.querySelector('#project-story');
const dialog = document.querySelector('#project-dialog');
storyButton.addEventListener('click', () => {
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('modal-open');
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  storyButton.focus({ preventScroll: true });
});

const navLinks = Array.from(document.querySelectorAll('.desktop-nav a'));
const mobileLinks = Array.from(document.querySelectorAll('.mobile-nav a'));
const allNavLinks = [...navLinks, ...mobileLinks];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      allNavLinks.forEach(link => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-16% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('#home, #work, #expertise, #experience, #about, #contact').forEach(section => observer.observe(section));
}

const copyButton = document.querySelector('#copy-email');
const copyStatus = document.querySelector('#copy-status');
let copyReset;
copyButton.addEventListener('click', async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('saiful.cse04bauet@gmail.com');
    copyStatus.textContent = 'Email address copied.';
    copyButton.querySelector('use').setAttribute('href', '#check');
    copyButton.setAttribute('aria-label', 'Email address copied');
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('.email-block a'));
    selection.removeAllRanges();
    selection.addRange(range);
    copyStatus.textContent = 'Email selected. Copy it or click the address to say hello.';
  }
  clearTimeout(copyReset);
  copyReset = setTimeout(() => {
    copyStatus.textContent = '';
    copyButton.querySelector('use').setAttribute('href', '#copy');
    copyButton.setAttribute('aria-label', 'Copy email address');
  }, 5000);
});
const clock = document.querySelector('#dhaka-time');
function updateClock() {
  clock.textContent = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date());
}
updateClock();
setInterval(updateClock, 60000);
document.querySelector('#year').textContent = new Intl.DateTimeFormat('en', { timeZone: 'Asia/Dhaka', year: 'numeric' }).format(new Date());
