# Showcase V8 — Especificación Ejecutable Definitiva (Aprobada por el Autor)

> **Estado: APROBADO Y LISTO PARA EJECUCIÓN.** Todas las preguntas de diseño han sido respondidas por el autor (2026-11-07). Este archivo es la especificación exacta para el agente ejecutor.
> Auditado sobre HEAD `522778f`. Archivos objetivo: `index.html`, `assets/scenes.js`, `assets/app.js`, `assets/i18n.js`, `grant.html`, `fact_sheet.html`, `ENGINEERING_FACT_SHEET.md`, `README.md`, `PRESENTACION_LOOM_1517_MEDICI.md` y regeneración de `FloatForce_1517_Medici_Pitch.pptx` / `.pdf`.
> **Nota para el agente ejecutor:** Busca por IDs, selectores o texto literal, no confíes ciegamente en números de línea porque se desplazan tras cada edición.

---

## 0. Decisiones Congeladas del Autor (Mandatorias)

| # | Tema | Decisión Definitiva del Autor |
|---|---|---|
| **D1 / D7** | **Identidad y Nombre** | Quitar la foto placeholder (`sebas_portrait.*`) y **no usar el nombre completo** en el sitio ni documentos públicos. Usar **Sebas GV** (o iniciales **GV**). En el Hero, usar un CTA limpio: `↓ Meet the builder` apuntando a `#about`. |
| **D2** | **Archivos de Retrato** | La imagen `sebas_portrait.jpg/.webp` era un placeholder (nunca fue foto real del autor). Basta con desenlazarla del HTML y eliminar `assets/img/sebas_portrait.jpg` y `.webp` del árbol actual (`git rm`). No hace falta reescribir historial git. |
| **D3** | **Versión del Switch** | Mantener el **Switch V5.0 de 3 imanes (`2.36 mm` de recorrido)** como el estándar mostrado en el visor 3D y las métricas. |
| **D4** | **Presupuesto Medici (\$1,000 USD)** | **El sitio web (`index.html` y `grant.html`) manda.** El presupuesto oficial sin reembolsos es: **1) \$250 USD** Rev B Prototyping; **2) \$300 USD** Brand, Legal Protection (IMPI) & Tax Advisory; **3) \$450 USD** Materials R&D, 3D Tooling & Creator Setup. Propagar esta tabla exacta a `ENGINEERING_FACT_SHEET.md`, `fact_sheet.html`, `PRESENTACION_LOOM_1517_MEDICI.md` y el PPTX/PDF. |
| **D5** | **Modelo de Monetización** | **El sitio web manda:** 1) Certificación oficial de builds de terceros bajo marca registrada (IMPI); 2) Comunidad en Patreon con acceso temprano y bitácoras; 3) Donaciones directas. Propagar esto al PPTX/PDF y al guión de Loom. |
| **D6** | **Widget de Mouse Analógico** | **Es un plan viable en firmware (aún no implementado).** Debe llevar explícitamente el badge `Planned Firmware Feature` en el widget del Playground y ubicarse en la columna de dirección futura en `#status`. |
| **D8** | **Estado Real de PCB Rev A** | Basado en el tracking real de JLCPCB/YunExpress: **Producción PCBA SMT completada el 2 de nov; paquete en tránsito aéreo internacional hacia México (salió del aeropuerto de Hong Kong el 5 de nov).** *(Nota: NO publicar el número de guía `YT...` por privacidad).* |
| **D9** | **Honestidad en `#status`** | **Quitar** las afirmaciones de `< ±8 mV noise` y `zero stem binding` de la lista de verificados en `#status`. Describir con honestidad que el filtro está implementado en firmware y que las lecciones de ruido del protoboard guiaron el diseño de la PCB Rev A. |

---

## 1. Privacidad, Identidad ("GV") y Ubicación ("Jalisco, Mexico")

### 1.1 Eliminar Retrato Placeholder y Reemplazar por Foto de Laboratorio
- En `index.html` (`#about`, aprox. línea 412), quitar `<img src="assets/img/sebas_portrait.jpg" ...>`.
- En su lugar, usar `<picture>` con `assets/img/real/real_protoboard_sensors_wiring.webp` (fallback `.jpg`), `alt="Hand-soldered Hall sensor matrix and workbench in Jalisco, Mexico"`.
- Ejecutar `git rm dist_site/assets/img/sebas_portrait.jpg dist_site/assets/img/sebas_portrait.webp`.
- En el overlay inferior de esa tarjeta (línea 414–415):
  - Cambiar `Sebastián González V.` → **`Sebas GV`** (o **`GV — Hardware Maker`**).
  - Cambiar `Mexico City` → **`Jalisco, Mexico`**.

### 1.2 Reemplazar Nombre Completo por Iniciales "GV" en Todo el Repo
Reemplazar todas las apariciones de `Sebastián González V.` / `Sebastian Gonzalez V.` por **`GV`** (o **`Sebas GV`**):
- `index.html`: línea 412 (`alt`), línea 414 (overlay).
- `assets/i18n.js`: clave `about_badge` en EN, ES, FR, DE (`"GV • Jalisco, Mexico • Independent Hardware Maker"`, etc.).
- `fact_sheet.html` (línea 59) y `ENGINEERING_FACT_SHEET.md` (línea 3): `*Author:* GV (Jalisco, Mexico)`.
- `README.md` (línea 95): `*Author:* GV`.

### 1.3 Reemplazar "Mexico City / Ciudad de México" por "Jalisco, Mexico"
- `index.html`: líneas 415 y 450 (`about_p1` fallback en HTML).
- `assets/i18n.js`: actualizar `about_badge` y `about_p1` en los 4 idiomas:
  - **EN:** `Jalisco, Mexico`
  - **ES:** `Jalisco, México`
  - **FR:** `Jalisco, Mexique`
  - **DE:** `Jalisco, Mexiko`
- **Verificación:** `grep -rni "mexico city\|ciudad de méxico\|cdmx\|mexiko-stadt\|gonzalez\|gonzález\|sebas_portrait" dist_site/` (excluyendo el email `sebasgonzalezvelarde@outlook.com` del footer si el autor desea conservar su correo de contacto, y archivos históricos de auditoría) debe devolver **0 resultados**.

---

## 2. Narrativa de Mercado y Postura Real del Autor

**Puntos clave del autor que deben reflejarse:**
1. El problema con los switches comerciales no es simplemente que sean "propietarios", sino **su alto costo al importarlos/comprarlos en sitios como AliExpress** y la **imposibilidad de modificarlos en la etapa de diseño (design-stage)** en vez de limitarse a mods post-compra.
2. Los **"artificial tiers" (gamas artificiales)** no vienen solo del software: las marcas fragmentan funciones ergonómicas y físicas esenciales (**tenting, diseño split inalámbrico, perfil bajo / low-profile**) en gamas caras separadas, **además** de bloquear funciones de software.

### 2.1 Textos Exactos a Actualizar

1. **`about_p1` en `index.html` (línea 450) y `assets/i18n.js` (EN/ES/FR/DE):**
   - **EN:** *"I am an independent maker based in Jalisco, Mexico. I started this project out of frustration with the commercial keyboard market: essential physical ergonomics—like split layouts, tenting, low-profile bodies, and wireless connectivity—are artificially split across expensive product tiers alongside software locks. Even worse, replacement magnetic switches are pricey on AliExpress, and commercial boards only allow post-purchase modding rather than true design-stage customization. I wanted an open-source interface where anyone with a desktop 3D printer can modify the switch, case, or layout at the CAD level and build it anywhere in the world."*
   - **ES:** *"Soy un maker independiente en Jalisco, México. Inicié este proyecto por frustración con el mercado comercial de teclados: funciones físicas esenciales —como el diseño dividido (split), inclinación (tenting), perfil bajo (low-profile) y conectividad inalámbrica— se fragmentan artificialmente en gamas caras junto con bloqueos de software. Además, los switches magnéticos de repuesto son costosos en AliExpress y los teclados comerciales solo permiten modificaciones post-compra en lugar de personalización real desde la etapa de diseño. Quería una interfaz abierta donde cualquiera con una impresora 3D casera pueda modificar el switch, la carcasa o el layout desde el CAD y fabricarlo en cualquier parte del mundo."*
   - **FR:** *"Je suis un créateur indépendant basé au Jalisco, Mexique. J'ai lancé ce projet par frustration face au marché commercial des claviers : les fonctions ergonomiques essentielles — format scindé (split), inclinaison (tenting), profil bas et sans-fil — sont artificiellement segmentées dans des gammes coûteuses, en plus des blocages logiciels. De plus, les switchs magnétiques coûtent cher sur AliExpress et les claviers du commerce ne permettent que du modding après achat au lieu d'une vraie personnalisation dès la conception. Je voulais une interface open-source où chacun peut modifier le switch, le boîtier ou la disposition dès la CAO et l'imprimer chez soi."*
   - **DE:** *"Ich bin ein unabhängiger Maker aus Jalisco, Mexiko. Dieses Projekt entstand aus Frustration über den kommerziellen Tastaturmarkt: Wesentliche physische Merkmale — wie geteilte Layouts (Split), Tenting, flaches Profil (Low-Profile) und kabellose Verbindung — werden zusammen mit Software-Sperren künstlich in teure Produktstufen unterteilt. Zudem sind magnetische Ersatzschalter auf AliExpress teuer, und kommerzielle Tastaturen erlauben nur Modding nach dem Kauf statt echter Anpassung in der Designphase. Ich wollte eine Open-Source-Schnittstelle, bei der jeder den Schalter, das Gehäuse oder das Layout direkt im CAD anpassen und zu Hause 3D-drucken kann."*

2. **Pilar 3 en `#tenting-section` (`index.html` líneas 664–667):**
   - Título: `"Endgame for Everyone" (No Artificial Hardware or Software Tiers)`
   - Texto: *"Split ergonomics, drawbridge tenting, low-profile comfort, wireless readiness, and continuous analog sensing united in one accessible architecture—instead of being split across five overpriced product tiers or locked behind software paywalls."*

3. **Tabla comparativa en `#status` (`index.html` líneas 1253–1265):**
   - En la columna **Commercial Hall-Effect Keyboards**, cambiar los últimos 3 puntos por:
     - `• High replacement & import costs: Buying replacement magnetic switches (even on AliExpress) quickly adds up, with zero ability to print your own.`
     - `• Post-purchase mods only: You can lube or swap parts after buying, but you cannot modify the switch geometry, travel, or housing at the design stage.`
     - `• Artificial hardware & software tiers: Ergonomic tenting, low-profile cases, wireless split layouts, and advanced analog features are segmented into separate premium product lines.`

---

## 3. Estado Real de PCB Rev A (Unificación en Todo el Sitio)

Actualizar todos los textos de estado de Rev A con la información real de JLCPCB / YunExpress (producción terminada el 2 de nov, en tránsito aéreo desde Hong Kong desde el 5 de nov):

- **Hero badge (`hero_status_txt` en `index.html` línea 287 y `assets/i18n.js` EN/ES/FR/DE):**
  - **EN:** `"PCB Rev A: SMT production complete • In international air transit from Hong Kong to Mexico"`
  - **ES:** `"PCB Rev A: producción SMT terminada • En tránsito aéreo internacional de Hong Kong a México"`
  - **FR:** `"PCB Rev A : production SMT terminée • En transit aérien international de Hong Kong vers le Mexique"`
  - **DE:** `"PCB Rev A: SMT-Produktion abgeschlossen • Im internationalen Lufttransit von Hongkong nach Mexiko"`
- **Tabla `#build` (`index.html` línea 788):**
  - Badge: `&bull; SMT Done &bull; Air Transit (HK &rarr; MX)`
- **Sección `#status` Columna 2 (`index.html` líneas 1196):**
  - `"JLCPCB SMT completed Nov 2: Currently in international air transit (departed Hong Kong Nov 5) to Jalisco, Mexico for hands-on bring-up."`

---

## 4. Quitar el Nombre "Prusa" (Modelo de Negocio Abierto Neutro)

Para evitar cualquier conflicto de marca o copyright, eliminar el uso de `"Prusa"` como nombre de nuestro modelo de negocio y usar **"The Open-Source Maker Sustainability Model"** (o `"Sustainable Open Hardware Model"`).

###Dónde reemplazar:
1. **`index.html` Pilar 4 (líneas 675–678):**
   - Título: `Sustainable Open Hardware & AI-Assisted Engineering`
   - Texto: *"100% open-source community where anyone can download, modify, and print the hardware at home, paired with a sustainable creator model: official certification of third-party builds, a Patreon engineering log, and community support. Engineered in Jalisco leveraging AI for CAD, physics, and PCBs."*
2. **`index.html` Sección `#grant` (líneas 1714, 1726, 1798–1813) y `assets/i18n.js` (`grant_sec_title`, `grant_prusa_title`, `grant_prusa_desc` en EN/ES/FR/DE):**
   - Cambiar el ícono `"P"` (línea 1802) por `"O"`.
   - `grant_sec_title`:
     - **EN:** `"$1,000 USD Medici Grant: Forward Runway & Sustainable Open Model"`
     - **ES:** `"Beca Medici de $1,000 USD: Runway Futuro y Modelo Abierto Sustentable"`
     - **FR:** `"Bourse Medici de 1 000 $ : Runway Futur & Modèle Open-Source Durable"`
     - **DE:** `"1.000 USD Medici-Förderung: Zukunfts-Runway & Nachhaltiges Open-Source-Modell"`
   - `grant_prusa_title`:
     - **EN:** `"Sustainable Open-Source Hardware Model from Mexico"`
     - **ES:** `"Modelo de Hardware Abierto y Sustentable desde México"`
     - **FR:** `"Modèle de Matériel Open-Source Durable depuis le Mexique"`
     - **DE:** `"Nachhaltiges Open-Source-Hardware-Modell aus Mexiko"`
   - `grant_prusa_desc`:
     - Quitar *"Following Josef Prusa's philosophy:"* / *"Siguiendo la filosofía de Josef Prusa:"* / etc., y empezar directamente con: *"100% of the CAD files, circuit schematics, and Zephyr RTOS firmware remain permanently free and open-source under CERN-OHL-W v2. To build a sustainable, self-funding project..."* (manteniendo intactas las 3 vías: 1) Certificación IMPI, 2) Patreon, 3) Donaciones).
3. **`index.html` `#build` Columna 1 (línea 708):**
   - Cambiar `(Bambu Lab A1, Prusa MK3/MK4, Ender 3)` → `(Bambu Lab A1, Ender 3, or any standard 0.4mm desktop FDM printer)`.
4. **`grant.html` (línea 171), `README.md` (línea 30), `PRESENTACION_LOOM_1517_MEDICI.md` y PPTX:**
   - Eliminar toda referencia a `"Prusa"`.
5. **Verificación:** `grep -rni "prusa" dist_site/ --include=*.html --include=*.js --include=*.md` (fuera de archivos de notas de auditoría) debe devolver **0 resultados**.

---

## 5. Rediseño del Hero y Sincronización de Instancia Única 3D

### 5.1 Cambios en el Lado Izquierdo del Hero (`index.html` líneas 302–330)
1. **Eliminar los dos botones actuales:**
   - Quitar el botón `Watch It Open & Play ↓` (que saltaba `#about`).
   - Quitar el botón `Fact Sheet (MD) →` (que abría texto plano).
   - En su lugar, poner un único enlace de navegación suave hacia la siguiente sección (`#about`):
     ```html
     <div class="pt-2">
       <a href="#about" class="inline-flex items-center gap-2 text-sm font-medium text-accent-terracotta hover:text-accent-terracotta-hover transition-colors group">
         <span data-i18n="hero_cta_about">Meet the builder &amp; see how it works</span>
         <span class="transform group-hover:translate-y-0.5 transition-transform">&darr;</span>
       </a>
     </div>
     ```
2. **Reemplazar la barra de métricas aburridas (`30 + 30 Keys`, `0 Supports`, etc.) por un Panel de Telemetría Analógica en Vivo** conectado al reloj maestro del switch 3D:
   - En lugar de números estáticos de fabricación, mostrar una tarjeta compacta `Live Analog Telemetry (Synced with 3D Switch)` con 4 lecturas en tiempo real que cambian mientras el switch 3D baja, sube y explota:
     - **Travel Depth:** `<span id="heroLiveDepth">0.00 mm (0%)</span>` + mini barra de progreso.
     - **Synth Expression:** `<span id="heroLiveMusic">C4 Soft • 350 Hz</span>`
     - **360° Vector / Mouse:** `<span id="heroLiveVector">0.0 m/s • Cursor Idle</span>`
     - **Dual-Stage Trigger:** `<span id="heroLiveDual">Rest • Ready</span>`

### 5.2 Mover el Stage "Canvas-to-Copper" de Van Gogh a `#art` y Poner el Visor 3D del Switch en el Hero
1. El bloque interactivo de superposición `PCB SMT / 50% Blend / Painting` (`#heroArtStage` y sus controles, líneas 338–380) **se traslada íntegro a la sección `#art`** (reemplazando las dos tarjetas estáticas de las líneas 1295–1315, para que la sección `#art` sea aún más interactiva y no se pierda esa funcionalidad).
2. En la columna derecha del Hero (`lg:col-span-6`), colocar el contenedor `#heroSwitch3DSlot` (con la misma estética redondeada, indicador de estado del ciclo `Assembled Stroke` ↔ `Exploded View`, y lectura de desplazamiento en vivo).

### 5.3 Cómo Compartir la Misma Instancia WebGL (`scenes.js` + `app.js`) sin Duplicar Recursos
Para cumplir estrictamente el requerimiento del autor (*"poner la misma instancia del visor 3d del switch que esté en un loop de explodear y assembled, así como de pressed y no-pressed, sincronizado con los widgets de analog playground"*):

1. **Un solo `WebGLRenderer`, una sola escena `switchScene` y una sola carga de `floatforce_v5_showcase.glb`.**
2. **Re-parenting automático del `<canvas>` por visibilidad (`IntersectionObserver`):**
   - Existen dos slots en el DOM: `#heroSwitch3DSlot` (en el Hero) y `#switch3DContainer` (en `#interactive-switch`).
   - Cuando el usuario está arriba viendo el Hero, el `switchRenderer.domElement` reside dentro de `#heroSwitch3DSlot`.
   - Cuando el usuario hace scroll hacia `#interactive-switch`, el `IntersectionObserver` detecta que `#switch3DContainer` entró en el viewport y mueve limpiamente el nodo DOM del canvas (`switch3DContainer.appendChild(switchRenderer.domElement)`) ajustando `setSize` y `camera.aspect`. Cuando vuelve al Hero, regresa a `#heroSwitch3DSlot`.
   - En el slot que no tiene el canvas activo, se muestra un respaldo ligero (poster estático `switch_v5_exploded.webp`).
   - **Resultado:** Cero duplicación de memoria GPU, un solo contexto WebGL y un solo loop de renderizado.
3. **Coreografía Maestro-Esclavo Sincronizada (`window.FFSync`):**
   - Crear un estado global compartido `window.FFSync = { stroke: 0, explode: 0, angle: 0, phaseLabel: 'Pressing...' }` actualizado en un único loop `requestAnimationFrame`.
   - **Ciclo automático (~12 segundos):**
     - `0–3 s` (**Smooth Analog Press**): `explode = 0`, `stroke` hace una onda suave `0 → 0.5 → 1.0 → 0` (2.36 mm).
     - `3–5.5 s` (**Rapid Trigger Burst**): `explode = 0`, `stroke` hace 3 pulsaciones rápidas (`0.2 ↔ 0.85`).
     - `5.5–8.5 s` (**Explode & Inspect**): `stroke = 0`, `explode` sube `0 → 1.0`, sostiene mostrando los 3 imanes N52, y baja `1.0 → 0`.
     - `8.5–12 s` (**Dual-Stage Hold & Release**): pausa en `stroke = 0.42` (~1.0 mm, activa Etapa 1 `'a'`), luego baja a `stroke = 0.95` (~2.24 mm, activa Etapa 2 `Screenshot!`), y regresa a `0`.
   - Si el usuario interactúa manualmente con el botón `Press Switch`, `Explode Assembly` o arrastra con el ratón, el modo manual toma prioridad durante 5 segundos y luego retoma suavemente el ciclo automático.
   - Tanto los 4 widgets de `#playground` como la telemetría del Hero leen directamente `window.FFSync.stroke` y `window.FFSync.angle` en cada frame, logrando sincronía visual 1:1.

---

## 6. Nuevo Widget en `#playground`: Emulación Nativa de Ratón Analógico

### 6.1 Diseño y Ubicación
- Cambiar el grid de `#playground` (`index.html` línea 819) de `lg:grid-cols-3` a **`md:grid-cols-2`** (cuadrícula 2×2 amplia y limpia para los 4 escenarios).
- Actualizar `analog_desc` (en HTML e `i18n.js` ×4) de *"three dynamic interaction paradigms"* a *"four dynamic interaction paradigms"*.

### 6.2 Tarjeta 04: Native OS Analog Mouse (Zero Third-Party Apps)
- **Eyebrow:** `04 • Native OS Mouse`
- **Badge superior derecho:** `Planned Firmware Feature • Zero Apps` (color ocre/terracota suave, cumpliendo D6).
- **Título (`analog_mouse_title`):** `Precision Analog Mouse Emulation`
- **Descripción (`analog_mouse_desc`):**
  - **EN:** *"No third-party background utilities like Mouseless required. By combining continuous Hall-effect depth readings with native USB/BLE HID mouse reports inside the keyboard firmware, keys act as a high-precision proportional cursor on any OS (Windows, macOS, Linux, iPadOS, Android)—light pressure for pixel-perfect nudges, deep press for fast screen sweeps."*
  - **ES:** *"Sin necesidad de apps de terceros como Mouseless. Al combinar las lecturas continuas de profundidad Hall con reportes nativos de ratón USB/BLE HID dentro del firmware del teclado, las teclas controlan el cursor con velocidad proporcional y alta precisión en cualquier sistema operativo: presión suave para ajuste pixel a pixel, presión profunda para barridos rápidos."*
  - **FR:** *"Aucune application tierce comme Mouseless requise. En combinant la lecture analogique Hall avec des rapports souris USB/BLE HID natifs dans le firmware, les touches déplacent le curseur avec une précision proportionnelle sur tout OS : pression légère pour ajuster au pixel près, pression forte pour traverser l'écran."*
  - **DE:** *"Keine Drittanbieter-Apps wie Mouseless nötig. Durch die Kombination von analogen Hall-Tiefenwerten mit nativen USB/BLE-HID-Mausberichten in der Firmware steuern die Tasten den Mauszeiger präzise und proportional auf jedem Betriebssystem: leichter Druck für Pixel-Feinabstimmung, tiefer Druck für schnelle Bewegungen."*
- **Escenario visual (`h-44`):**
  - Un mini lienzo de pantalla con retícula sutil, un objetivo de precisión ("Pixel Target") y un cursor SVG (`#mouseSimCursor`) con estela suave que se desplaza proporcionalmente a `window.FFSync.stroke` y `window.FFSync.angle`.
  - Lectura inferior: `Cursor Velocity: <strong id="mouseSpeedVal">0 px/s (Sub-pixel)</strong>` y `OS Driver: <strong>Standard HID Mouse</strong>`.

---

## 7. Limpieza de Afirmaciones en `#status` (D9) y Consistencia General

1. **Quitar `< ±8 mV noise` y `zero stem binding` de `#status` Columna 1 (`index.html` líneas 1170 y 1178):**
   - Línea 1170: cambiar `FloatForce V5.0 switch: 2.36mm magnetic stroke, 3-magnet repulsive suspension, zero stem binding.` → `FloatForce V5.0 switch: 2.36mm magnetic stroke with 3-magnet repulsive suspension validated on 16-key rig.`
   - Línea 1178: cambiar `Zephyr RTOS v0.3.1: MUX settling time (50µs) & moving average filter (< ±8 mV noise).` → `Zephyr RTOS v0.3.1: Configurable MUX settling delay (50µs) and 4-sample moving average filter running on nRF52840.`
2. **Añadir el Mouse Analógico en `#status` Columna 3 (Future Direction):**
   - Añadir un bullet: `• Native HID Analog Mouse: Firmware-level proportional cursor control from key depth without third-party OS apps.`
3. **Unificar Licencia a `CERN-OHL-W v2` en todo el sitio:**
   - Cambiar `CERN-OHL-P-2.0` en el JSON-LD (`index.html` línea 45) a `https://spdx.org/licenses/CERN-OHL-W-2.0.html`.
   - Cambiar `CERN-OHL-P v2` en `#build` (línea 754) y `#status` (línea 1264) a `CERN-OHL-W v2`.
4. **Enlaces a `ENGINEERING_FACT_SHEET.md`:**
   - En `index.html` (línea 789) y `grant.html` (línea 51), cambiar `href="ENGINEERING_FACT_SHEET.md"` por `href="fact_sheet.html"`.

---

## 8. Sincronización de Documentos Adjuntos (Fact Sheet, Guión Loom y PPTX/PDF)

Para que no exista ninguna contradicción entre el sitio web y los materiales del pitch (D4 y D5):

1. **`ENGINEERING_FACT_SHEET.md` y `fact_sheet.html`:**
   - Autor: `GV (Jalisco, Mexico)`.
   - Estado Rev A: SMT completado el 2 de nov, en tránsito aéreo internacional desde Hong Kong.
   - Sección 8 (Presupuesto Medici de \$1,000 USD): reemplazar la tabla antigua (\$450/\$350/\$200) por las **3 partidas vigentes del sitio**:
     - **1. Rev B Prototyping (\$250.00)**
     - **2. Brand, Legal Protection (IMPI) & Tax Advisory (\$300.00)**
     - **3. Materials R&D, 3D Tooling & Creator Setup (\$450.00)**
2. **`PRESENTACION_LOOM_1517_MEDICI.md`:**
   - Cambiar `"Hi 1517 team, I’m Sebastian from Mexico"` → `"Hi 1517 team, I’m Sebas GV from Jalisco, Mexico"`.
   - Actualizar el Bloque 1 y 2 con la narrativa de gamas físicas artificiales (split, tenting, low profile, wireless) y costos/falta de personalización en etapa de diseño.
   - Mencionar en el Bloque 3 la emulación de ratón analógico sin apps de terceros.
   - Actualizar el Bloque 5 con el estado de Rev A (SMT listo, en tránsito aéreo desde Hong Kong).
   - Actualizar el Bloque 6 con el desglose exacto **\$250 / \$300 / \$450** (sin reembolsos, todo a futuro) y las 3 vías de monetización (Certificación IMPI, Patreon, donaciones) **sin usar el nombre Prusa**.
3. **Regenerar `FloatForce_1517_Medici_Pitch.pptx` y `.pdf`:**
   - Actualizar el script generador con: autor `Sebas GV (Jalisco, Mexico)`, narrativa de mercado corregida, función de mouse analógico, estado de Rev A en tránsito aéreo desde HK, tabla `\$250 / \$300 / \$450` y modelo sustentable abierto sin mencionar a Prusa. Regenerar `.pptx` y convertir a `.pdf` con `libreoffice --headless --convert-to pdf`.

---

## 9. Secuencia de Ejecución y Verificación para el Agente Ejecutor

1. **Paso 1:** Ejecutar cambios de privacidad, autor `GV`, ubicación `Jalisco, Mexico`, eliminación de `sebas_portrait.*`, unificación de licencia `CERN-OHL-W v2` y estado real de Rev A (§1, §3, §7).
2. **Paso 2:** Actualizar textos de narrativa de mercado y eliminación del término `"Prusa"` en `index.html`, `grant.html`, `README.md` e `i18n.js` en los 4 idiomas (§2, §4).
3. **Paso 3:** Implementar `window.FFSync`, mover el morph de Van Gogh a `#art`, colocar el slot 3D y telemetría en vivo en el Hero, y añadir el 4º widget (`Analog Mouse`) en `#playground` (§5, §6).
4. **Paso 4:** Recompilar CSS si se añadieron clases nuevas de Tailwind (`npx tailwindcss -i assets/input.css -o assets/app.css --minify` si aplica, o usar clases ya presentes en `app.css`).
5. **Paso 5:** Actualizar `ENGINEERING_FACT_SHEET.md`, `fact_sheet.html`, `PRESENTACION_LOOM_1517_MEDICI.md` y regenerar `FloatForce_1517_Medici_Pitch.pptx` y `.pdf` (§8).
6. **Paso 6 (Verificación Obligatoria):**
   - Correr verificaciones con `grep` para asegurar 0 apariciones de `sebas_portrait`, `Mexico City`, `Ciudad de México`, `Mexiko-Stadt`, `González`, `Gonzalez` (salvo el correo), `Prusa`, `< ±8 mV` y `zero stem binding`.
   - Verificar sintaxis JS (`node --check assets/app.js && node --check assets/scenes.js && node --check assets/i18n.js`).
   - Hacer commits limpios sin hacer `git push` (a menos que el usuario lo pida).
