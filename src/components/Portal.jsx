import React, { useEffect } from 'react';

const Portal = ({ open = false, duration = 1500 }) => {
  useEffect(() => {
    if (!open) return;

    let audio;
    let synthCtx;
    let stopTimer;

  // Intento reproducir un mp3; si el navegador bloquea reproducción automática
  // usamos un sintetizador de WebAudio como fallback para no romper la UX.
  const playFallbackSynth = () => {
      try {
        synthCtx = new (window.AudioContext || window.webkitAudioContext)();
        const o = synthCtx.createOscillator();
        const g = synthCtx.createGain();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(800, synthCtx.currentTime);
        g.gain.setValueAtTime(0.0001, synthCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.12, synthCtx.currentTime + 0.02);
        o.connect(g);
        g.connect(synthCtx.destination);
        o.start();
        g.gain.exponentialRampToValueAtTime(0.0001, synthCtx.currentTime + duration / 1000);

        stopTimer = setTimeout(() => {
          try { o.stop(); } catch { void 0; }
          try { synthCtx.close(); } catch { void 0; }
        }, duration + 50);
      } catch { void 0; }
    };

    try {
      audio = new Audio('/assets/portal-sound.mp3');
      audio.volume = 0.25;
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {
          playFallbackSynth();
        });
      }
      
      stopTimer = setTimeout(() => {
        try { audio.pause(); audio.currentTime = 0; } catch { void 0; }
      }, duration + 100);
    } catch {
      playFallbackSynth();
    }

    return () => {
      try {
        if (audio) { audio.pause(); audio.currentTime = 0; }
      } catch { void 0; }
      try { clearTimeout(stopTimer); } catch { void 0; }
      try { if (synthCtx) synthCtx.close(); } catch { void 0; }
    };
  }, [open, duration]);


  useEffect(() => {
    try {
      if (open) {
        document.body.classList.add('portal-open');
        document.body.style.setProperty('--portal-duration', `${duration}ms`);
      } else {
        document.body.classList.remove('portal-open');
        document.body.style.removeProperty('--portal-duration');
      }
    } catch (err) {

    }

    return () => {
      try {
        document.body.classList.remove('portal-open');
        document.body.style.removeProperty('--portal-duration');
      } catch { void 0; }
    };
  }, [open, duration]);

  if (!open) return null;

  return (
    <div className="portal-overlay" role="dialog" aria-hidden={!open}>
      <div className="portal">
        <div className="portal-ring ring-back" />
        <div className="portal-ring ring-mid" />
        <div className="portal-core">
          <img src="/assets/rickAndMortyPortal.png" alt="Portal" className="portal-image" />
        </div>
        <div className="portal-ring ring-front" />
      </div>
    </div>
  );
};

export default Portal;
