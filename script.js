const texts = [
  { word: "a Student", color: " #ffd700;"},
  { word: "a Developer", color: " #ffd700;" },
  { word: "a Designer", color: " #ffd700;" },
  { word: "a Freelancer", color: " #ffd700;" }
];

let count = 0;
let index = 0;
let currentText = "";
let isDeleting = false;

function type() {
  let displayText = texts[count].word;
  let color = texts[count].color;

  if (isDeleting) {
    currentText = displayText.substring(0, index--);
  } else {
    currentText = displayText.substring(0, index++);
  }

  const typingElement = document.querySelector(".typing");
  typingElement.textContent = currentText;
  typingElement.style.color = color;

  let typingSpeed = isDeleting ? 80 : 150;

  if (!isDeleting && index === displayText.length + 1) {
    isDeleting = true;
    typingSpeed = 1000; // pause before deleting
  } else if (isDeleting && index === 0) {
    isDeleting = false;
    count = (count + 1) % texts.length;
    typingSpeed = 500; // pause before next word
  }

  setTimeout(type, typingSpeed);
}

type();
const aboutElements = document.querySelectorAll('.about-left, .about-right');

window.addEventListener('scroll', () => {
  aboutElements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    if (position < window.innerHeight - 150) {  // triggers a bit earlier
      el.classList.add('show');
    } else {
      el.classList.remove('show'); // optional: hides when scrolling up
    }
  });
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, { threshold: 0.1 }); // 10% visibility triggers animation

aboutElements.forEach(el => observer.observe(el));


// Scroll reveal for contact cards
const contactCards = document.querySelectorAll('.contact-card');

window.addEventListener('scroll', () => {
  contactCards.forEach(card => {
    const position = card.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      card.classList.add('show');
    }
  });
});
// Skill animation
const skillCards = document.querySelectorAll('.skill-card');
window.addEventListener('scroll', () => {
  skillCards.forEach(card => {
    const position = card.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      card.classList.add('show');
    } else {
      card.classList.remove('show'); // optional: hide on scroll up
    }
  });
});
const projectCards = document.querySelectorAll('.project-card');

window.addEventListener('scroll', () => {
  projectCards.forEach(card => {
    const position = card.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      card.classList.add('show');
    }
  });
});



