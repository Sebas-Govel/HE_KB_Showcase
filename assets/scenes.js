import * as THREE from 'three';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

    /* ==========================================================
       HERO OVERLAY: CANVAS-TO-COPPER MORPH (VAN GOGH 1888)
       ========================================================== */
    let currentOverlayMode = 'pcb';

    window.setHeroOverlayMode = function(mode) {
      currentOverlayMode = mode;
      const pcbImg = document.getElementById('heroPcbLayer');
      const artImg = document.getElementById('heroPaintingLayer');
      const statusEl = document.getElementById('heroOverlayStatus');
      const bPcb = document.getElementById('btnViewPcb');
      const bBlend = document.getElementById('btnViewBlend');
      const bArt = document.getElementById('btnViewArt');

      [bPcb, bBlend, bArt].forEach(b => {
        if (b) b.className = "px-2.5 py-1 rounded-lg text-ink-secondary hover:text-ink-primary transition-all";
      });

      if (mode === 'pcb') {
        if (pcbImg) { pcbImg.style.opacity = '1.0'; pcbImg.style.mixBlendMode = 'normal'; }
        if (artImg) { artImg.style.opacity = '0.0'; }
        if (statusEl) statusEl.innerText = "Mode: PCB Rev A (Matte Black + White Silkscreen)";
        if (bPcb) bPcb.className = "px-2.5 py-1 rounded-lg bg-paper-card text-ink-primary font-medium shadow-sm";
      } else if (mode === 'blend') {
        if (pcbImg) { pcbImg.style.opacity = '0.78'; pcbImg.style.mixBlendMode = 'lighten'; }
        if (artImg) { artImg.style.opacity = '0.75'; }
        if (statusEl) statusEl.innerText = "Mode: 50% Canvas-to-Copper Ghost Blend";
        if (bBlend) bBlend.className = "px-2.5 py-1 rounded-lg bg-accent-terracotta text-white font-medium shadow-sm";
      } else if (mode === 'art') {
        if (pcbImg) { pcbImg.style.opacity = '0.12'; pcbImg.style.mixBlendMode = 'luminosity'; }
        if (artImg) { artImg.style.opacity = '1.0'; }
        if (statusEl) statusEl.innerText = "Mode: Vincent van Gogh Original (1888, Arles)";
        if (bArt) bArt.className = "px-2.5 py-1 rounded-lg bg-accent-ochre text-ink-primary font-medium shadow-sm";
      }
    };

    window.toggleHeroBlendCycle = function() {
      if (currentOverlayMode === 'pcb') setHeroOverlayMode('blend');
      else if (currentOverlayMode === 'blend') setHeroOverlayMode('art');
      else setHeroOverlayMode('pcb');
    };

    /* ==========================================================
       SCENE 2: DRAWBRIDGE TENTING STUDIO (PIVOT AT DESK EDGES)
       ========================================================== */
    let bridgeScene, bridgeCamera, bridgeRenderer, bridgeControls;
    let leftHingeGroup, rightHingeGroup;
    let isBridgeVisible = false;
    let currentBridgeAngle = 15;
    let targetBridgeAngle = 15;
    let autoOscillateBridge = false;

    function initDrawbridge3D() {
      const container = document.getElementById('drawbridge3DContainer');
      if (!container) return;

      bridgeScene = new THREE.Scene();
      bridgeScene.background = new THREE.Color(0xF6F1E8);

      const w = container.clientWidth;
      const h = container.clientHeight;
      // Frontal low 3/4 camera to highlight the drawbridge V-shape elevation
      bridgeCamera = new THREE.PerspectiveCamera(36, w / h, 1, 2000);
      bridgeCamera.position.set(0, 140, 340);

      bridgeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      bridgeRenderer.setSize(w, h);
      bridgeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      bridgeRenderer.shadowMap.enabled = true;
      bridgeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
      bridgeRenderer.toneMapping = THREE.ACESFilmicToneMapping;
      bridgeRenderer.toneMappingExposure = 1.05;
      container.appendChild(bridgeRenderer.domElement);

      const pmrem = new THREE.PMREMGenerator(bridgeRenderer);
      bridgeScene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      bridgeControls = new OrbitControls(bridgeCamera, bridgeRenderer.domElement);
      bridgeControls.enableDamping = true;
      bridgeControls.dampingFactor = 0.05;
      bridgeControls.minDistance = 160;
      bridgeControls.maxDistance = 650;
      bridgeControls.target.set(0, 30, 0);

      // Studio Lighting
      const hemi = new THREE.HemisphereLight(0xFFFAF2, 0xE5DEC9, 0.7);
      bridgeScene.add(hemi);

      const sun = new THREE.DirectionalLight(0xFFFFFF, 1.25);
      sun.position.set(100, 240, 200);
      sun.castShadow = true;
      bridgeScene.add(sun);

      const fill = new THREE.DirectionalLight(0xD6E2EE, 0.45);
      fill.position.set(-120, 120, -120);
      bridgeScene.add(fill);

      // Desk Floor Surface
      const deskPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(900, 600),
        new THREE.ShadowMaterial({ opacity: 0.14 })
      );
      deskPlane.rotation.x = -Math.PI / 2;
      deskPlane.position.y = 0;
      deskPlane.receiveShadow = true;
      bridgeScene.add(deskPlane);

      // Create Drawbridge Hinge Groups anchored at outer pinky edges on desk
      leftHingeGroup = new THREE.Group();
      leftHingeGroup.position.set(-185, 0, 0); // Left outer desk anchor
      bridgeScene.add(leftHingeGroup);

      rightHingeGroup = new THREE.Group();
      rightHingeGroup.position.set(185, 0, 0); // Right outer desk anchor
      bridgeScene.add(rightHingeGroup);

      // Load Half Model and attach to Left & Right Hinge Groups
      const loader = new GLTFLoader();
      loader.load('assets/models/keyboard_half_showcase.glb', (gltf) => {
        const leftModel = gltf.scene;
        const rightModel = leftModel.clone();

        // In left half: outer edge is at -78.5mm in local coords.
        // We shift the model so its outer edge aligns with hinge at local x = 0:
        leftModel.position.set(78.5, 0, 0);
        leftHingeGroup.add(leftModel);

        // In right half: outer edge aligns with hinge at local x = 0:
        rightModel.position.set(-78.5, 0, 0);
        rightHingeGroup.add(rightModel);

        const loaderEl = document.getElementById('drawbridgeLoadingIndicator');
        if (loaderEl) loaderEl.style.display = 'none';
      }, undefined, (err) => {
        console.warn('Drawbridge GLB load failed:', err);
      });

      // Visibility Observer
      const obs = new IntersectionObserver(([entry]) => {
        isBridgeVisible = entry.isIntersecting;
      }, { threshold: 0.1 });
      obs.observe(container);

      // Animate Drawbridge Loop
      let breatheTime = 0;
      function animateBridge() {
        requestAnimationFrame(animateBridge);
        if (!isBridgeVisible) return;

        breatheTime += 0.015;
        if (autoOscillateBridge) {
          // Gentle auto-breathing oscillation between 6° and 20°
          targetBridgeAngle = 13 + Math.sin(breatheTime) * 7;
          updateDrawbridgeUI(targetBridgeAngle, false);
        }

        // Smooth angle interpolation
        currentBridgeAngle += (targetBridgeAngle - currentBridgeAngle) * 0.12;
        const thetaRad = THREE.MathUtils.degToRad(currentBridgeAngle);
        const splayRad = THREE.MathUtils.degToRad(currentBridgeAngle * 0.28);

        if (leftHingeGroup && rightHingeGroup) {
          // Left drawbridge arm lifts up (+Z rotation around outer hinge, plus splay)
          leftHingeGroup.rotation.z = thetaRad;
          leftHingeGroup.rotation.y = splayRad;

          // Right drawbridge arm lifts up (-Z rotation around outer hinge, plus splay)
          rightHingeGroup.rotation.z = -thetaRad;
          rightHingeGroup.rotation.y = -splayRad;
        }

        bridgeControls.update();
        bridgeRenderer.render(bridgeScene, bridgeCamera);
      }
      animateBridge();

      window.addEventListener('resize', () => {
        if (!container || !bridgeRenderer || !bridgeCamera) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        bridgeCamera.aspect = width / height;
        bridgeCamera.updateProjectionMatrix();
        bridgeRenderer.setSize(width, height);
      });
    }

    function updateDrawbridgeUI(angle, userInitiated = true) {
      if (userInitiated) {
        autoOscillateBridge = false;
        targetBridgeAngle = angle;
      }
      const valEl = document.getElementById('drawbridgeAngleVal');
      const slider = document.getElementById('drawbridgeSlider');
      const statusEl = document.getElementById('drawbridgeStatusText');
      const badgeEl = document.getElementById('drawbridgeStatusBadge');

      if (valEl) valEl.innerText = `${angle.toFixed(1)}°`;
      if (slider && userInitiated) slider.value = angle;

      if (statusEl && badgeEl) {
        if (angle < 4) {
          statusEl.innerText = "0° Flat Bridge: Twisted Forearms & Wrist Tension";
          badgeEl.className = "px-3.5 py-1.5 rounded-full bg-accent-terracotta/15 border border-accent-terracotta/30 text-accent-terracotta text-xs font-medium flex items-center gap-2";
        } else if (angle < 19) {
          statusEl.innerText = "15° Tenting: Relaxed Ulnar Alignment \u2022 Neutral Wrist";
          badgeEl.className = "px-3.5 py-1.5 rounded-full bg-accent-sage-soft border border-accent-sage/30 text-accent-sage text-xs font-medium flex items-center gap-2";
        } else {
          statusEl.innerText = "25° Drawbridge: Zero Forearm Pronation \u2022 Neutral Handshake";
          badgeEl.className = "px-3.5 py-1.5 rounded-full bg-accent-sage-soft border border-accent-sage/30 text-accent-sage text-xs font-medium flex items-center gap-2";
        }
      }

      // Button highlight sync
      if (userInitiated) {
        const b0 = document.getElementById('btnBridge0');
        const b15 = document.getElementById('btnBridge15');
        const b25 = document.getElementById('btnBridge25');
        [b0, b15, b25].forEach(b => {
          if (b) b.className = "px-3.5 py-1.5 rounded-xl bg-paper-card border border-paper-border text-xs font-medium text-ink-secondary hover:text-ink-primary transition-all";
        });
        if (Math.abs(angle - 0) < 1 && b0) b0.className = "px-3.5 py-1.5 rounded-xl bg-accent-terracotta text-white text-xs font-medium shadow-sm transition-all";
        if (Math.abs(angle - 15) < 1 && b15) b15.className = "px-3.5 py-1.5 rounded-xl bg-accent-sage text-white text-xs font-medium shadow-sm transition-all";
        if (Math.abs(angle - 25) < 1 && b25) b25.className = "px-3.5 py-1.5 rounded-xl bg-accent-sage text-white text-xs font-medium shadow-sm transition-all";
      }
    }

    window.setDrawbridgeAngle = function(angle) {
      updateDrawbridgeUI(angle, true);
    };

    document.getElementById('drawbridgeSlider')?.addEventListener('input', (e) => {
      updateDrawbridgeUI(parseFloat(e.target.value), true);
    });

    /* ==========================================================
       SCENE 3: FLOATFORCE SWITCH V5.0 STUDIO & HERO CANVAS RE-PARENTING
       ========================================================== */
    window.FFSync = {
      stroke: 0,
      explode: 0,
      phaseLabel: 'Smooth Travel',
      userInteracting: false
    };

    let switchScene, switchCamera, switchRenderer, switchControls;
    let switchParts = {};
    let isSwitchVisible = true;
    let isExploded = false;
    let explodeProgress = 0;
    let targetExplode = 0;
    let strokeTravel = 0;
    let targetStroke = 0;
    let switchModelLoaded = false;
    let currentSwitchSlot = null;

    let userInteractTimer = null;
    function flagUserInteraction() {
      window.FFSync.userInteracting = true;
      if (userInteractTimer) clearTimeout(userInteractTimer);
      userInteractTimer = setTimeout(() => {
        window.FFSync.userInteracting = false;
      }, 5000);
    }

    function initSwitch3D() {
      const heroSlot = document.getElementById('heroSwitch3DSlot');
      const sectionSlot = document.getElementById('switch3DContainer');
      currentSwitchSlot = heroSlot || sectionSlot;
      if (!currentSwitchSlot) return;

      const w = currentSwitchSlot.clientWidth || 400;
      const h = currentSwitchSlot.clientHeight || 400;

      switchScene = new THREE.Scene();
      switchScene.background = new THREE.Color(0xF6F1E8);

      switchCamera = new THREE.PerspectiveCamera(40, w / h, 0.1, 1000);
      switchCamera.position.set(28, 24, 34);

      switchRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      switchRenderer.setSize(w, h);
      switchRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      switchRenderer.shadowMap.enabled = true;
      switchRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
      switchRenderer.toneMapping = THREE.ACESFilmicToneMapping;
      switchRenderer.toneMappingExposure = 1.05;
      currentSwitchSlot.appendChild(switchRenderer.domElement);

      const pmrem = new THREE.PMREMGenerator(switchRenderer);
      switchScene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      switchControls = new OrbitControls(switchCamera, switchRenderer.domElement);
      switchControls.enableDamping = true;
      switchControls.dampingFactor = 0.05;
      switchControls.minDistance = 20;
      switchControls.maxDistance = 90;
      switchControls.target.set(0, 7.5, 0);

      switchControls.addEventListener('start', flagUserInteraction);

      // Studio Lighting
      const hemi = new THREE.HemisphereLight(0xFFFAF2, 0xE5DEC9, 0.75);
      switchScene.add(hemi);

      const sun = new THREE.DirectionalLight(0xFFFFFF, 1.2);
      sun.position.set(25, 40, 30);
      sun.castShadow = true;
      switchScene.add(sun);

      const fill = new THREE.DirectionalLight(0xD6E2EE, 0.5);
      fill.position.set(-30, 20, -25);
      switchScene.add(fill);

      const shadowPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(120, 120),
        new THREE.ShadowMaterial({ opacity: 0.14 })
      );
      shadowPlane.rotation.x = -Math.PI / 2;
      shadowPlane.position.y = -0.05;
      shadowPlane.receiveShadow = true;
      switchScene.add(shadowPlane);

      const switchRoot = new THREE.Group();
      switchScene.add(switchRoot);

      // Load Real CAD Switch GLB
      const loader = new GLTFLoader();
      loader.load('assets/models/floatforce_v5_showcase.glb', (gltf) => {
        const gltfScene = gltf.scene;
        gltfScene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.userData.initPos = child.position.clone();
            switchParts[child.name] = child;
          }
        });

        switchRoot.add(gltfScene);
        switchModelLoaded = true;

        const heroLoader = document.getElementById('heroSwitchLoadingIndicator');
        const switchLoader = document.getElementById('switchLoadingIndicator');
        if (heroLoader) heroLoader.style.display = 'none';
        if (switchLoader) switchLoader.style.display = 'none';
      }, undefined, (err) => {
        console.warn('Switch GLB load failed:', err);
      });

      // DOM Reparenting & Visibility via IntersectionObserver
      function attachToSlot(targetSlot) {
        if (!targetSlot || !switchRenderer || switchRenderer.domElement.parentElement === targetSlot) return;
        targetSlot.appendChild(switchRenderer.domElement);
        currentSwitchSlot = targetSlot;
        resizeSwitch();
      }

      function resizeSwitch() {
        if (!currentSwitchSlot || !switchRenderer || !switchCamera) return;
        const nw = currentSwitchSlot.clientWidth || 400;
        const nh = currentSwitchSlot.clientHeight || 400;
        switchCamera.aspect = nw / nh;
        switchCamera.updateProjectionMatrix();
        switchRenderer.setSize(nw, nh);
      }

      const observer = new IntersectionObserver((entries) => {
        const secEntry = entries.find(e => e.target === sectionSlot);
        const heroEntry = entries.find(e => e.target === heroSlot);

        if (sectionSlot && secEntry && secEntry.isIntersecting) {
          attachToSlot(sectionSlot);
          isSwitchVisible = true;
        } else if (heroSlot && heroEntry && heroEntry.isIntersecting) {
          attachToSlot(heroSlot);
          isSwitchVisible = true;
        } else {
          isSwitchVisible = entries.some(e => e.isIntersecting);
        }
      }, { threshold: 0.1 });

      if (heroSlot) observer.observe(heroSlot);
      if (sectionSlot) observer.observe(sectionSlot);

      function setPartOffset(name, dx, dy, dz) {
        const p = switchParts[name];
        if (!p || !p.userData.initPos) return;
        const b = p.userData.initPos;
        p.position.set(b.x + dx, b.y + dy, b.z + dz);
      }

      let choreoClock = 0;
      function animateSwitch() {
        requestAnimationFrame(animateSwitch);
        if (!isSwitchVisible) return;

        if (!window.FFSync.userInteracting) {
          choreoClock += 0.016;
          const cycle = choreoClock % 14.0;
          let s = 0;
          let exp = 0;
          let pLabel = 'Smooth Travel';

          if (cycle < 3.5) {
            // Phase 0: Smooth travel (sinusoidal stroke 0 -> 1.0 -> 0)
            const u = cycle / 3.5;
            s = Math.sin(u * Math.PI);
            exp = 0;
            pLabel = 'Smooth Travel';
          } else if (cycle < 7.0) {
            // Phase 1: Rapid Trigger (oscillations around actuation point)
            const u = (cycle - 3.5) / 3.5;
            s = 0.55 + Math.sin(u * Math.PI * 6) * 0.22;
            exp = 0;
            pLabel = 'Rapid Trigger';
          } else if (cycle < 10.5) {
            // Phase 2: Kinematic Inspection (explode and return)
            const u = (cycle - 7.0) / 3.5;
            s = 0;
            exp = Math.sin(u * Math.PI) * 0.75;
            pLabel = 'Kinematic Inspection';
          } else {
            // Phase 3: Dual-Stage (half press -> hold -> full press -> release)
            const u = (cycle - 10.5) / 3.5;
            if (u < 0.4) {
              s = (u / 0.4) * 0.42;
            } else if (u < 0.6) {
              s = 0.42;
            } else if (u < 0.85) {
              s = 0.42 + ((u - 0.6) / 0.25) * 0.58;
            } else {
              s = 1.0 - ((u - 0.85) / 0.15) * 1.0;
            }
            exp = 0;
            pLabel = 'Dual-Stage Action';
          }

          targetStroke = Math.max(0, Math.min(1, s));
          targetExplode = Math.max(0, Math.min(1, exp));
          window.FFSync.stroke = targetStroke;
          window.FFSync.explode = targetExplode;
          window.FFSync.phaseLabel = pLabel;
        }

        explodeProgress += (targetExplode - explodeProgress) * 0.1;
        strokeTravel += (targetStroke - strokeTravel) * 0.16;

        if (switchModelLoaded && switchParts) {
          const exp = explodeProgress;
          const strokeY = strokeTravel * 2.36; // mm displacement

          // Apply relative explosion vectors preserving exact assembly height
          setPartOffset('U_Housing',     0,  0,                  -4.0 * exp);
          setPartOffset('Mag_S2_Bridge', 0,  7.5 * exp,          -4.0 * exp);
          setPartOffset('Mag_S1_Bot',    0, -7.5 * exp,          -4.0 * exp);
          setPartOffset('Stem',          0,  2.0 * exp - strokeY, 12.0 * exp);
          setPartOffset('Mag_StemBot',   0,  2.0 * exp - strokeY, 12.0 * exp);
          setPartOffset('Mag_StemTop',   0,  2.0 * exp - strokeY, 12.0 * exp);
          setPartOffset('SideWall',      0,  0,                   24.0 * exp);
          setPartOffset('Plate',         0, -14.0 * exp,          0);
          setPartOffset('Keycap',        0,  13.0 * exp - strokeY, 12.0 * exp);

          if (!switchControls.state || switchControls.state === -1) {
            switchRoot.rotation.y += 0.003;
          }
        }

        const travelDisplay = document.getElementById('switchTravelValue');
        if (travelDisplay) {
          travelDisplay.innerText = `${(strokeTravel * 2.36).toFixed(2)} mm`;
        }

        switchControls.update();
        switchRenderer.render(switchScene, switchCamera);
      }
      animateSwitch();

      // Scroll Explode Interaction in Interactive Switch section
      window.addEventListener('scroll', () => {
        const section = document.getElementById('interactive-switch');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const winH = window.innerHeight;
        if (rect.top < winH * 0.75 && rect.bottom > winH * 0.25) {
          const ratio = (winH * 0.75 - rect.top) / (winH * 0.55);
          const clamped = Math.max(0, Math.min(1, ratio));
          if (!isExploded && window.FFSync.userInteracting) {
            targetExplode = Math.sin(clamped * Math.PI) * 0.65;
          }
        }
      });

      window.addEventListener('resize', resizeSwitch);
    }

    // Explode Toggle Button
    document.getElementById('btnExplodeToggle')?.addEventListener('click', function() {
      flagUserInteraction();
      isExploded = !isExploded;
      targetExplode = isExploded ? 1.0 : 0.0;
      this.innerText = isExploded ? "Assemble" : "Explode Assembly";
      if (isExploded) this.classList.add('bg-accent-terracotta', 'text-white');
      else this.classList.remove('bg-accent-terracotta', 'text-white');
    });

    // Reset View Button
    document.getElementById('btnResetView')?.addEventListener('click', function() {
      flagUserInteraction();
      switchCamera.position.set(28, 24, 34);
      switchControls.target.set(0, 7.5, 0);
    });

    // Press Switch Trigger
    const btnPress = document.getElementById('btnPressSwitch');
    function triggerSwitchPress() {
      flagUserInteraction();
      targetStroke = 1.0;
      const travelDisplay = document.getElementById('switchTravelValue');
      if (travelDisplay) travelDisplay.innerText = "2.36 mm";
      setTimeout(() => {
        targetStroke = 0.0;
      }, 450);
    }

    btnPress?.addEventListener('click', triggerSwitchPress);
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        const switchSec = document.getElementById('interactive-switch');
        const isSwitchFocused = switchSec && (switchSec.contains(document.activeElement) || document.activeElement === btnPress);
        if (isSwitchFocused) {
          e.preventDefault();
          triggerSwitchPress();
        }
      }
    });

    // Init All 3D Scenes on DOM Ready
    window.addEventListener('DOMContentLoaded', () => {
      initDrawbridge3D();
      initSwitch3D();
    });
