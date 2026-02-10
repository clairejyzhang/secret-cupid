// confetti.js — Valentines emoji confetti (desktop + mobile)

(function () {
    const EMOJIS = ["💗", "💖", "💞", "💕", "✨", "🌸"];
  
    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    function getLayer() {
      let layer = document.getElementById("emoji-confetti-layer");
      if (!layer) {
        layer = document.createElement("div");
        layer.id = "emoji-confetti-layer";
        document.body.appendChild(layer);
      }
      return layer;
    }
  
    function spawn(x, y, count) {
      const layer = getLayer();
  
      for (let i = 0; i < count; i++) {
        const el = document.createElement("span");
        el.className = "emoji-confetti";
        el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  
        const size = rand(16, 28);
        const dur = rand(900, 1600);
        const dx = rand(-40, 40) + "px";
        const dy = rand(120, 220) + "px";
        const rot = rand(-120, 120) + "deg";
  
        el.style.setProperty("--x", x + rand(-10, 10) + "px");
        el.style.setProperty("--y", y + rand(-10, 10) + "px");
        el.style.setProperty("--dx", dx);
        el.style.setProperty("--dy", dy);
        el.style.setProperty("--rot", rot);
        el.style.setProperty("--dur", dur + "ms");
        el.style.setProperty("--size", size + "px");
  
        layer.appendChild(el);
        setTimeout(() => el.remove(), dur + 50);
      }
    }
  
    /* desktop mouse sprinkle */

    let lastSpawn = 0;
    let lastX = 0;
    let lastY = 0;
  
    window.addEventListener(
      "mousemove",
      (e) => {
        const now = performance.now();
        const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        lastX = e.clientX;
        lastY = e.clientY;
  
        if (now - lastSpawn > 30) {
          lastSpawn = now;
          const intensity = Math.min(6, Math.max(2, dist / 18));
          spawn(e.clientX, e.clientY, intensity);
        }
      },
      { passive: true }
    );
  
    /* mobile falling from top */
    
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    let running = true;
  
    function particleCount() {
      const layer = document.getElementById("emoji-confetti-layer");
      return layer ? layer.childElementCount : 0;
    }
  
    if (isMobile) {
      const intervalMs = 240; // increase for calmer (300–400 = very soft)
      const maxParticles = 60;
  
      document.addEventListener("visibilitychange", () => {
        running = !document.hidden;
      });
  
      setInterval(() => {
        if (!running) return;
        if (particleCount() > maxParticles) return;
  
        const x = rand(0, window.innerWidth);
        spawn(x, -12, 1);
      }, intervalMs);
    }
  })();
  