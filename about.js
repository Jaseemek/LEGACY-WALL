document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.getElementById("ctaTypingText");
  const ctaButton = document.querySelector(".cta-button");
  const belongSection = document.querySelector(".belong-cta-wrapper");
  const fullText = "You belong with us.\nSince you see yourself here,\nlet's dive deeper and unlock what disciplined trading can mean for you.";
  
  let charIndex = 0;
  let typingStarted = false; // start only once

  function type() {
    if (!typingElement) return;
    if (charIndex <= fullText.length) {
      typingElement.textContent = fullText.slice(0, charIndex);
      charIndex++;
      setTimeout(type, 80);
    } else if (ctaButton) {
      ctaButton.style.opacity = 0;
      ctaButton.style.display = "inline-block";
      let opacity = 0;
      const fadeIn = setInterval(() => {
        opacity += 0.07;
        ctaButton.style.opacity = opacity;
        if (opacity >= 1) clearInterval(fadeIn);
      }, 25);
    }
  }
  
  if ('IntersectionObserver' in window && belongSection) {
    const observer = new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting && !typingStarted) {
        typingStarted = true;
        type();
        obs.unobserve(belongSection);
      }
    }, { threshold: 0.2 });
    observer.observe(belongSection);
  } else {
    type();
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.getElementById("ctaTypingText");
  const ctaButton = document.getElementById("activateSilentBtn");
  const modal = document.getElementById("silentModal");
  const closeBtn = document.getElementById("closeSilentModal");

  const fullText = "You belong with us.\nSince you see yourself here,\nlet's dive deeper and unlock what disciplined trading can mean for you.";

  let charIndex = 0;
  let typingStarted = false;

  function type() {
    if (!typingElement) return;
    if (charIndex <= fullText.length) {
      typingElement.textContent = fullText.slice(0, charIndex);
      charIndex++;
      setTimeout(type, 80);
    } else {
      // Show button after typing finishes
      ctaButton.style.opacity = 0;
      ctaButton.style.display = "inline-block";
      let opacity = 0;
      const fadeIn = setInterval(() => {
        opacity += 0.07;
        ctaButton.style.opacity = opacity;
        if (opacity >= 1) clearInterval(fadeIn);
      }, 25);
    }
  }

  // Start typing when section enters viewport (lazy start)
  const belongSection = document.querySelector('.belong-cta-wrapper');
  if ('IntersectionObserver' in window && belongSection) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !typingStarted) {
          typingStarted = true;
          type();
          obs.unobserve(belongSection);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(belongSection);
  } else {
    // Fallback: start typing immediately
    type();
  }

  // Show modal on button click
  if (modal && ctaButton) {
    ctaButton.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  }

  // Close modal button
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "";
    });
  }

  // Close modal clicking backdrop
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }

  // Close modal with ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});
