// Real-Time Prices (Twelve Data)
const ws = new WebSocket("wss://ws.twelvedata.com/v1/quotes/price?apikey=58b25074726f41be8c566dfd31a5afe2");
const symbols = ["XAU/USD", "EUR/USD","USD/JPY", "BTC/USD", "GBP/USD"];
const prices = {};
const tickerContent = document.getElementById("marketTickerContent");

ws.onopen = () => {
  ws.send(JSON.stringify({ action: "subscribe", params: { symbols: symbols.join(",") } }));
};

ws.onmessage = (msg) => {
  const data = JSON.parse(msg.data);
  if (data.event === "price") {
    prices[data.symbol] = `${data.symbol}: ${parseFloat(data.price).toFixed(2)}`;
    tickerContent.innerText = Object.values(prices).join("   |   ");
  }
};

// Trailer Modal Controls
function openTrailer() {
  const container = document.getElementById("youtubeContainer");
  const iframe = document.createElement("iframe");
  iframe.src = "https://www.youtube.com/embed/-3WKURMtI9A?autoplay=1";
  iframe.allow = "autoplay; encrypted-media";
  iframe.className = "w-full h-full";
  iframe.setAttribute("allowfullscreen", "true");
  container.innerHTML = '';
  container.appendChild(iframe);
  document.getElementById("trailerModal").classList.remove("hidden");
}

function closeTrailer() {
  const container = document.getElementById("youtubeContainer");
  container.innerHTML = '';
  document.getElementById("trailerModal").classList.add("hidden");
}

// Hover Sound Effect for Social Icons
document.addEventListener("DOMContentLoaded", () => {
  const hoverSound = document.getElementById("hoverSound");
  if (hoverSound) {
    document.querySelectorAll("[data-sound]").forEach((icon) => {
      icon.addEventListener("mouseenter", () => {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {});
      });
    });
  }
});

// Typing Animation for Hero Text
document.addEventListener("DOMContentLoaded", () => {
  const phrases = ["No fake hype.", "No guessing.", "Controlled growth through discipline."];
  const typingElement = document.getElementById("typingText");
  if (!typingElement) return;

  let i = 0, j = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentPhrase = phrases[i];
    typingElement.textContent = currentPhrase.slice(0, j);

    if (!isDeleting) {
      j++;
      if (j > currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1000);
        return;
      }
    } else {
      j--;
      if (j === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, isDeleting ? 50 : 120);
  }

  typeLoop();
});

// About Popup Toggle
document.addEventListener("DOMContentLoaded", () => {
  const aboutBtn = document.getElementById("aboutBtn");
  const aboutPopup = document.getElementById("aboutPopup");
  if (aboutBtn && aboutPopup) {
    aboutBtn.addEventListener("click", () => {
      aboutPopup.classList.toggle("hidden");
    });
  }
});

// Toggle Gold Box Content
function toggleBox(box) {
  document.querySelectorAll('.gold-box').forEach(el => {
    if (el !== box) {
      el.classList.remove('active');
      const content = el.querySelector('.box-content');
      if(content) content.classList.add('hidden');
    }
  });
  box.classList.toggle('active');
  const content = box.querySelector('.box-content');
  if(content) content.classList.toggle('hidden');
}
// Optional: override default scroll behavior with a JS smooth scroll using easing

function smoothScrollTo(ele, duration = 600) {
  const start = window.scrollY || window.pageYOffset;
  const end = ele.getBoundingClientRect().top + start;
  const distance = end - start;
  let startTime = null;

  function ease(t) {
    return t<0.5 ? 2*t*t : -1+(4-2*t)*t; // easeInOutQuad
  }

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = ease(progress);
    window.scrollTo(0, start + (distance * easedProgress));
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }
  requestAnimationFrame(animation);
}

// Example usage: hook to nav links, buttons, or triggers
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      smoothScrollTo(target, 800);  // 800ms smooth scroll
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const ninja = document.querySelector(".ninja-emoji");
  const reviewsBtn = document.getElementById("reviewsButton");

  if (ninja && reviewsBtn) {
    ninja.style.cursor = "pointer";
    ninja.addEventListener("click", () => {
      reviewsBtn.scrollIntoView({ behavior: "smooth", block: "center" });
      reviewsBtn.focus({ preventScroll: true });
    });
    // Optional: Keyboard activation
    ninja.setAttribute('tabindex', '0');
    ninja.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        reviewsBtn.scrollIntoView({ behavior: "smooth", block: "center" });
        reviewsBtn.focus({ preventScroll: true });
      }
    });
  }
});
