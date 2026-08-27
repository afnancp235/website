/**
 * Save the Date Web Application Logic — Murshid & Shahana
 */

document.addEventListener("DOMContentLoaded", () => {
  const config = window.WEDDING_CONFIG;
  if (!config) return;

  // Initialize UI content from config
  initDynamicContent(config);

  // Initialize Canvas Gold Dust Particles
  initGoldParticles();

  // Setup Scroll Animations
  initScrollAnimations();

  // Setup RSVP Modal & Form
  initRSVPModal(config);

  // Setup Map Modal
  initMapModal(config);

  // Setup Audio Player Toggle
  initAudioPlayer(config.audio);
});

/** Populate dynamic text elements from config */
function initDynamicContent(config) {
  // Couple Names & Monogram
  document.querySelectorAll(".groom-name").forEach(el => el.textContent = config.couple.groom);
  document.querySelectorAll(".bride-name").forEach(el => el.textContent = config.couple.bride);
  document.querySelectorAll(".monogram-initials").forEach(el => el.textContent = config.couple.monogramText);
  document.querySelectorAll(".hero-tagline").forEach(el => el.textContent = config.couple.tagline);

  // Date & Hero Details
  const heroDateLocation = document.getElementById("hero-date-location");
  if (heroDateLocation) {
    heroDateLocation.innerHTML = `
      <span>${config.nikkah.dateFormatted.toUpperCase()}</span>
      <span class="hero-date-dot"></span>
      <span>${config.nikkah.venueName.toUpperCase()}</span>
    `;
  }

  // Islamic Verse
  document.getElementById("verse-arabic").textContent = config.verse.arabic;
  document.getElementById("verse-translation").textContent = config.verse.translation;
  document.getElementById("verse-source").textContent = config.verse.source;

  // Nikkah Card
  document.getElementById("nikkah-date").textContent = config.nikkah.dateFormatted;
  document.getElementById("nikkah-time").textContent = config.nikkah.timeFormatted;
  document.getElementById("nikkah-venue").textContent = config.nikkah.venueName;
  document.getElementById("nikkah-address").textContent = config.nikkah.address;
  document.getElementById("nikkah-attire").textContent = `Attire: ${config.nikkah.attire}`;
}

/** Scroll IntersectionObserver for soft gold fade-in */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".fade-in-up").forEach((el) => observer.observe(el));
}

/** Floating Gold Dust Particles Canvas */
function initGoldParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 45;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      speedY: -Math.random() * 0.4 - 0.1,
      speedX: Math.random() * 0.3 - 0.15,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(197, 160, 89, ${p.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#D4AF37";
      ctx.fill();

      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/** RSVP Modal Handling */
function initRSVPModal(config) {
  const rsvpModal = document.getElementById("rsvp-modal");
  const openBtns = document.querySelectorAll(".open-rsvp-btn");
  const closeBtn = document.getElementById("close-rsvp-btn");
  const rsvpForm = document.getElementById("rsvp-form");
  const rsvpEventsSelect = document.getElementById("rsvp-attendance");

  // Populate events in form select
  if (rsvpEventsSelect && config.rsvp.events) {
    rsvpEventsSelect.innerHTML = config.rsvp.events
      .map(ev => `<option value="${ev.id}">${ev.label}</option>`)
      .join("");
  }

  openBtns.forEach(btn => btn.addEventListener("click", () => rsvpModal.classList.add("active")));
  if (closeBtn) closeBtn.addEventListener("click", () => rsvpModal.classList.remove("active"));

  if (rsvpModal) {
    rsvpModal.addEventListener("click", (e) => {
      if (e.target === rsvpModal) rsvpModal.classList.remove("active");
    });
  }

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const guestName = document.getElementById("rsvp-name").value;
      const guestCount = document.getElementById("rsvp-guests").value;
      const attendance = document.getElementById("rsvp-attendance").value;

      // Save locally
      const rsvpData = { guestName, guestCount, attendance, date: new Date().toISOString() };
      localStorage.setItem(`rsvp_${Date.now()}`, JSON.stringify(rsvpData));

      // Show Thank You Feedback
      rsvpForm.innerHTML = `
        <div style="text-align:center; padding: 20px 0;">
          <div style="font-size: 2.5rem; color: var(--gold-primary); margin-bottom: 12px;">❖</div>
          <h3 style="font-size: 1.8rem; margin-bottom: 12px;">JazakAllah Khair!</h3>
          <p style="color: var(--text-muted); font-size: 1.05rem;">
            Thank you, <strong>${guestName}</strong>! Your RSVP has been received with warm gratitude.
          </p>
          <button onclick="document.getElementById('rsvp-modal').classList.remove('active')" class="btn-primary" style="margin-top: 24px;">Close</button>
        </div>
      `;
    });
  }
}

/** Map Modal Handling */
function initMapModal(config) {
  const mapModal = document.getElementById("map-modal");
  const openMapBtns = document.querySelectorAll(".open-map-btn");
  const closeMapBtn = document.getElementById("close-map-btn");
  const mapIframe = document.getElementById("map-iframe");
  const googleMapDirect = document.getElementById("google-maps-direct");
  const appleMapDirect = document.getElementById("apple-maps-direct");

  openMapBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const eventType = btn.dataset.event || "nikkah";
      const targetVenue = config[eventType] || config.nikkah;

      if (mapIframe) mapIframe.src = config.mapEmbedUrl;
      if (googleMapDirect) googleMapDirect.href = targetVenue.googleMapsUrl;
      if (appleMapDirect) appleMapDirect.href = targetVenue.appleMapsUrl;

      mapModal.classList.add("active");
    });
  });

  if (closeMapBtn) closeMapBtn.addEventListener("click", () => mapModal.classList.remove("active"));
  if (mapModal) {
    mapModal.addEventListener("click", (e) => {
      if (e.target === mapModal) mapModal.classList.remove("active");
    });
  }
}



/** Ambient Sound Audio Controller */
function initAudioPlayer(audioConfig) {
  const audioBtn = document.getElementById("audio-toggle-btn");
  if (!audioBtn || !audioConfig.enabled) return;

  const audio = new Audio(audioConfig.src);
  audio.loop = true;
  audio.volume = 0.4;

  let isPlaying = false;

  audioBtn.addEventListener("click", () => {
    if (!isPlaying) {
      audio.play().then(() => {
        isPlaying = true;
        audioBtn.innerHTML = `<span class="audio-icon">♪</span> Sound: On`;
        audioBtn.style.borderColor = "var(--gold-primary)";
      }).catch(err => console.log("Audio play blocked by browser policy"));
    } else {
      audio.pause();
      isPlaying = false;
      audioBtn.innerHTML = `<span class="audio-icon">🔇</span> Sound: Off`;
      audioBtn.style.borderColor = "var(--gold-border)";
    }
  });
}
