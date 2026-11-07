/* ==========================================================
       1. ALWAYS-ALIVE ANALOG MARGIN RAILS (IDLE + SCROLL BOOST)
       ========================================================== */
    const leftRail = document.getElementById('leftRailSwitches');
    const rightRail = document.getElementById('rightRailMorphs');
    const railFluxBadge = document.getElementById('railFluxBadge');

    // Generate 9 left mini-switches
    if (leftRail) {
      for (let i = 0; i < 9; i++) {
        const item = document.createElement('div');
        item.className = "flex flex-col items-center gap-0.5 mini-switch-unit";
        item.innerHTML = `
          <div class="mini-keycap w-7 h-2 rounded-t bg-[#D8D0BF] border border-[#C5BDAA] transition-transform duration-75"></div>
          <div class="mini-housing w-8 h-4 rounded-b bg-paper-surface border border-paper-border flex items-center justify-center relative overflow-hidden">
            <div class="mini-magnet w-3 h-2 rounded-sm bg-accent-sage transition-all duration-100"></div>
          </div>
        `;
        leftRail.appendChild(item);
      }
    }

    // Generate 7 right morphing shapes
    if (rightRail) {
      for (let i = 0; i < 7; i++) {
        const shape = document.createElement('div');
        shape.className = "mini-morph-shape w-6 h-6 border-2 border-accent-sage rounded-full transition-all duration-100";
        rightRail.appendChild(shape);
      }
    }

    let railPhase = 0;
    let lastScrollY = window.scrollY || 0;
    let scrollSpeedBoost = 0;
    let scrollDirection = 1;
    let lastFrameTime = performance.now();

    window.addEventListener('scroll', () => {
      const currentY = window.scrollY || 0;
      const dy = currentY - lastScrollY;
      lastScrollY = currentY;
      if (Math.abs(dy) > 0.5) {
        scrollDirection = dy >= 0 ? 1 : -1;
        scrollSpeedBoost = Math.min(14.0, scrollSpeedBoost + Math.abs(dy) * 0.08);
      }
    }, { passive: true });

    function updateMarginRails(now) {
      const currentTime = (typeof now === 'number' && !isNaN(now)) ? now : performance.now();
      const dt = lastFrameTime ? Math.max(0.001, Math.min(0.05, (currentTime - lastFrameTime) / 1000)) : 0.016;
      lastFrameTime = currentTime;

      // Amortiguación independiente de FPS
      scrollSpeedBoost *= Math.pow(0.04, dt);

      // BASE_IDLE_SPEED -> Siempre en movimiento orgánico aunque no scrollees
      const BASE_IDLE_SPEED = 2.0;
      railPhase += scrollDirection * (BASE_IDLE_SPEED + scrollSpeedBoost) * dt;

      // Amplitud extra al scrollear
      const amp = Math.min(1.0, 0.55 + scrollSpeedBoost * 0.05);

      // Update 9 Left Mini-Switches
      const switches = document.querySelectorAll('.mini-switch-unit');
      switches.forEach((sw, idx) => {
        const wave = Math.sin(railPhase - idx * 0.65);
        const dynamicCompression = Math.max(0, Math.min(1, (wave * 0.5 + 0.5) * amp));
        
        const cap = sw.querySelector('.mini-keycap');
        const mag = sw.querySelector('.mini-magnet');

        if (cap) {
          cap.style.transform = `translateY(${dynamicCompression * 4}px)`;
        }
        if (mag) {
          let col = '#2F6B4F';
          if (dynamicCompression > 0.65) col = '#C85A32';
          else if (dynamicCompression > 0.3) col = '#C98A2C';
          mag.style.backgroundColor = col;
          mag.style.transform = `scaleX(${1 + dynamicCompression * 0.4})`;
        }
      });

      // Update 7 Right Morphing Shapes
      const morphs = document.querySelectorAll('.mini-morph-shape');
      morphs.forEach((m, idx) => {
        const wave = Math.cos(railPhase * 0.85 - idx * 0.7);
        const intensity = Math.max(0, Math.min(1, (wave * 0.5 + 0.5) * amp));
        
        const rad = Math.round(50 - intensity * 35);
        m.style.borderRadius = `${rad}%`;
        
        const scale = 0.8 + intensity * 0.45;
        const rot = Math.round(intensity * 90);
        m.style.transform = `scale(${scale}) rotate(${rot}deg)`;

        let col = '#2F6B4F';
        if (intensity > 0.65) col = '#C85A32';
        else if (intensity > 0.3) col = '#C98A2C';
        m.style.borderColor = col;
      });

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (railFluxBadge) {
        const scrollPct = Math.round(((window.scrollY || 0) / maxScroll) * 100);
        railFluxBadge.innerText = `FLUX ${scrollPct}%`;
      }

      // AS5600 Header Rotary Dial sync
      const scrollPctTotal = (window.scrollY || 0) / maxScroll;
      const degrees = Math.round(scrollPctTotal * 360 * 2);
      const encoderIcon = document.getElementById('headerEncoder');
      const angleText = document.getElementById('encoderAngle');
      if (encoderIcon && angleText) {
        encoderIcon.style.transform = `rotate(${degrees}deg)`;
        angleText.innerText = `${(degrees % 360).toString().padStart(3, '0')}°`;
      }

      // Sync mobile dots when visible
      const mobileDots = document.getElementById('mobileAnalogDots');
      if (mobileDots && mobileDots.children.length >= 3) {
        const d1 = Math.sin(railPhase) * 0.5 + 0.5;
        const d2 = Math.sin(railPhase - 0.8) * 0.5 + 0.5;
        const d3 = Math.sin(railPhase - 1.6) * 0.5 + 0.5;
        mobileDots.children[0].style.transform = `scale(${0.75 + d1 * 0.5})`;
        mobileDots.children[1].style.transform = `scale(${0.75 + d2 * 0.5})`;
        mobileDots.children[2].style.transform = `scale(${0.75 + d3 * 0.5})`;
      }

      requestAnimationFrame(updateMarginRails);
    }
    requestAnimationFrame(updateMarginRails);

    /* ==========================================================
       2. THREE LIVE PLAYGROUND AUTO-ANIMATED SCENARIOS
       ========================================================== */
    let synthAudioCtx = null, synthOsc = null, synthGain = null, synthFilter = null;
    let isSynthActive = false;

    function initSynthAudio() {
      if (synthAudioCtx) return;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      synthAudioCtx = new AudioContext();
      synthOsc = synthAudioCtx.createOscillator();
      synthOsc.type = 'triangle';
      synthOsc.frequency.setValueAtTime(261.63, synthAudioCtx.currentTime); // C4

      synthFilter = synthAudioCtx.createBiquadFilter();
      synthFilter.type = 'lowpass';
      synthFilter.frequency.setValueAtTime(440, synthAudioCtx.currentTime);

      synthGain = synthAudioCtx.createGain();
      synthGain.gain.setValueAtTime(0.001, synthAudioCtx.currentTime);

      synthOsc.connect(synthFilter);
      synthFilter.connect(synthGain);
      synthGain.connect(synthAudioCtx.destination);
      synthOsc.start();
    }

    document.getElementById('btnToggleAudio')?.addEventListener('click', function() {
      if (!isSynthActive) {
        initSynthAudio();
        if (synthAudioCtx && synthAudioCtx.state === 'suspended') synthAudioCtx.resume();
        isSynthActive = true;
        this.innerText = "Mute Synth";
        this.classList.add('bg-accent-terracotta', 'text-white');
      } else {
        if (synthGain && synthAudioCtx) {
          synthGain.gain.setTargetAtTime(0.0001, synthAudioCtx.currentTime, 0.05);
        }
        isSynthActive = false;
        this.innerText = "Audio Tone";
        this.classList.remove('bg-accent-terracotta', 'text-white');
      }
    });

    let playgroundTime = 0;
    function animatePlayground() {
      playgroundTime += 0.025;

      // Scenario 1: Musical Swell Envelope
      const musicCycle = (Math.sin(playgroundTime * 1.5) * 0.5 + 0.5);
      const musicTravel = musicCycle * 2.36;
      const musicPct = Math.round(musicCycle * 100);

      const noteEl = document.getElementById('musicFloatingNote');
      const ringEl = document.getElementById('musicRing');
      const barEl = document.getElementById('musicTravelBar');
      const valEl = document.getElementById('musicTravelVal');
      const cutoffEl = document.getElementById('musicCutoffVal');
      const pitchEl = document.getElementById('musicPitchVal');

      if (noteEl) {
        const scale = 0.8 + musicCycle * 0.85;
        const translateY = -musicCycle * 24;
        noteEl.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        let col = '#2F6B4F';
        if (musicCycle > 0.65) col = '#C85A32';
        else if (musicCycle > 0.3) col = '#C98A2C';
        noteEl.style.color = col;
      }
      if (ringEl) {
        const ringScale = 1.0 + musicCycle * 0.8;
        ringEl.style.transform = `scale(${ringScale})`;
        ringEl.style.opacity = (0.2 + musicCycle * 0.6).toString();
      }
      if (barEl) barEl.style.width = `${musicPct}%`;
      if (valEl) valEl.innerText = `${musicTravel.toFixed(2)} mm (${musicPct}%)`;
      const cutoffHz = Math.round(350 + musicCycle * 2200);
      if (cutoffEl) cutoffEl.innerText = `${cutoffHz} Hz`;
      if (pitchEl) pitchEl.innerText = musicCycle > 0.7 ? "C5 Swell" : musicCycle > 0.35 ? "E4 Rich" : "C4 Soft";

      if (isSynthActive && synthAudioCtx && synthFilter && synthGain) {
        synthFilter.frequency.setTargetAtTime(cutoffHz, synthAudioCtx.currentTime, 0.05);
        const vol = musicCycle > 0.05 ? (0.02 + musicCycle * 0.12) : 0.001;
        synthGain.gain.setTargetAtTime(vol, synthAudioCtx.currentTime, 0.05);
      }

      // Scenario 2: WASD 360° Joystick Compass
      const joyAngle = playgroundTime * 1.2;
      const joyRadius = 26 * (Math.sin(playgroundTime * 0.8) * 0.35 + 0.65);
      const jx = Math.cos(joyAngle) * joyRadius;
      const jy = Math.sin(joyAngle) * joyRadius;

      const knobEl = document.getElementById('joystickKnob');
      if (knobEl) knobEl.style.transform = `translate(${jx}px, ${jy}px)`;

      // Key depths based on vector projection
      const wPress = Math.max(0, -jy / 26);
      const sPress = Math.max(0, jy / 26);
      const aPress = Math.max(0, -jx / 26);
      const dPress = Math.max(0, jx / 26);

      const updateKeyVisual = (id, press) => {
        const el = document.getElementById(id);
        if (el) {
          el.style.backgroundColor = press > 0.2 ? '#2F6B4F' : '#FFFFFF';
          el.style.color = press > 0.2 ? '#FFFFFF' : '#1E1D1A';
          el.style.transform = `translateY(${press * 3}px)`;
        }
      };
      updateKeyVisual('keyW', wPress);
      updateKeyVisual('keyS', sPress);
      updateKeyVisual('keyA', aPress);
      updateKeyVisual('keyD', dPress);

      const joySpeed = (joyRadius / 26 * 8.0).toFixed(1);
      const speedValEl = document.getElementById('gamepadSpeedVal');
      const velBar = document.getElementById('gamepadVelocityBar');
      const stateEl = document.getElementById('gamepadStateText');

      if (speedValEl) speedValEl.innerText = `${joySpeed} m/s`;
      if (velBar) velBar.style.width = `${Math.round(joyRadius / 26 * 100)}%`;
      if (stateEl) {
        stateEl.innerText = joySpeed > 6.0 ? "Sprint 360°" : joySpeed > 3.0 ? "Jogging Vector" : "Stealth Walk";
      }

      // Scenario 3: Dual-Stage Shortcut Press (Letter vs Screenshot)
      // Alternates every ~3 seconds
      const dualCycle = (playgroundTime * 0.7) % (Math.PI * 2);
      const isFullPressCycle = dualCycle > Math.PI;
      const dualProgress = Math.sin(dualCycle) * 0.5 + 0.5;
      
      const dualTravel = isFullPressCycle ? (dualProgress * 2.30) : (dualProgress * 1.05);
      const dualBar = document.getElementById('dualStageBar');
      const dualVal = document.getElementById('dualStageTravelVal');
      const dualBadge = document.getElementById('dualStageStatusBadge');
      const flashEl = document.getElementById('screenshotFlash');
      const noticeEl = document.getElementById('screenshotNotice');
      const bufferEl = document.getElementById('dualStageBuffer');

      if (dualBar) dualBar.style.width = `${Math.round((dualTravel / 2.36) * 100)}%`;
      if (dualVal) dualVal.innerText = `${dualTravel.toFixed(2)} mm`;

      if (dualTravel >= 2.05) {
        // Full press triggered screenshot!
        if (dualBadge) dualBadge.innerText = "Full: Screenshot!";
        if (flashEl) flashEl.style.opacity = "0.75";
        if (noticeEl) noticeEl.style.opacity = "1.0";
        if (bufferEl) bufferEl.innerText = "screenshot.png";
      } else if (dualTravel >= 0.85) {
        // Half press typed "a"
        if (dualBadge) dualBadge.innerText = "Half: Type 'a'";
        if (flashEl) flashEl.style.opacity = "0.0";
        if (noticeEl) noticeEl.style.opacity = "0.0";
        if (bufferEl) bufferEl.innerText = "hello a|";
      } else {
        if (dualBadge) dualBadge.innerText = "Ready / Rest";
        if (flashEl) flashEl.style.opacity = "0.0";
        if (noticeEl) noticeEl.style.opacity = "0.0";
        if (bufferEl) bufferEl.innerText = "hello |";
      }

      requestAnimationFrame(animatePlayground);
    }
    requestAnimationFrame(animatePlayground);

    /* ==========================================================
       3. GALLERY FILTERING & LIGHTBOX MODAL
       ========================================================== */
    window.filterGallery = function(category) {
      const items = document.querySelectorAll('.gallery-item');
      const buttons = document.querySelectorAll('#galleryTabs .tab-btn');
      
      buttons.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
          btn.className = "tab-btn px-4 py-2 rounded-xl bg-accent-terracotta text-white shadow-sm transition-all";
        } else {
          btn.className = "tab-btn px-4 py-2 rounded-xl bg-paper-card hover:bg-paper-border text-ink-secondary border border-paper-border transition-all";
        }
      });

      items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    };

    let lastActiveModalTrigger = null;
    window.openModal = function(src, caption) {
      lastActiveModalTrigger = document.activeElement;
      const modal = document.getElementById('imageModal');
      const img = document.getElementById('modalImage');
      const cap = document.getElementById('modalCaption');
      const imgContainer = document.getElementById('modalImgContainer');
      
      img.src = src;
      cap.innerText = caption;

      // Adaptive container background:
      if (src.includes('pcb_')) {
        imgContainer.className = "p-6 flex items-center justify-center max-h-[75vh] overflow-auto bg-[#141414] transition-colors duration-200";
      } else {
        imgContainer.className = "p-6 flex items-center justify-center max-h-[75vh] overflow-auto bg-white transition-colors duration-200";
      }

      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      modal.focus();
    };

    window.closeModal = function() {
      const modal = document.getElementById('imageModal');
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
      if (lastActiveModalTrigger && typeof lastActiveModalTrigger.focus === 'function') {
        lastActiveModalTrigger.focus();
      }
    };

    window.toggleMobileMenu = function() {
      const m = document.getElementById('mobileNavMenu');
      if (m) m.classList.toggle('hidden');
    };
    window.closeMobileMenu = function() {
      const m = document.getElementById('mobileNavMenu');
      if (m) m.classList.add('hidden');
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
        closeMobileMenu();
      }
    });

    /* ==========================================================
       4. TIMELINE NATURAL VERTICAL SCROLL TO HORIZONTAL
       ========================================================== */
    const timelineContainer = document.getElementById('timelineScrollContainer');
    const timelineSection = document.getElementById('timeline');
    const btnTimelinePrev = document.getElementById('btnTimelinePrev');
    const btnTimelineNext = document.getElementById('btnTimelineNext');

    if (timelineContainer && timelineSection) {
      // Natural vertical mouse wheel translates into horizontal scrolling
      timelineSection.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          const maxScroll = timelineContainer.scrollWidth - timelineContainer.clientWidth - 4;
          const atEnd = timelineContainer.scrollLeft >= maxScroll;
          const atStart = timelineContainer.scrollLeft <= 4;

          // If scrolling down and not at end, or scrolling up and not at start: scroll timeline horizontally
          if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
            e.preventDefault();
            timelineContainer.scrollLeft += e.deltaY * 1.35;
          }
        }
      }, { passive: false });

      btnTimelinePrev?.addEventListener('click', () => {
        timelineContainer.scrollBy({ left: -360, behavior: 'smooth' });
      });

      btnTimelineNext?.addEventListener('click', () => {
        timelineContainer.scrollBy({ left: 360, behavior: 'smooth' });
      });
    }

    /* ==========================================================
       5. INTERNATIONALIZATION (i18n) DICTIONARY: EN, ES, FR, DE
       ========================================================== */

  // Video viewport observer (E3 / E5)
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.play().catch(() => {});
        } else {
          entry.target.pause();
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('video').forEach(v => videoObserver.observe(v));
