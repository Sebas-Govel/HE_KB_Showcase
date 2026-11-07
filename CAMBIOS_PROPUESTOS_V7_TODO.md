# Showcase V7 — Lista de cambios (para agente ejecutor)

Archivo objetivo: `dist_site/index.html` (3023 líneas, 194 KB, Tailwind CDN + Three.js r160 vía unpkg + i18n inline EN/ES/FR/DE).
Auditoría hecha el 2026-11-02. Los números de línea son del HEAD `c36b3eb`; **se desplazan al editar, busca por texto/ID, no por número**.

## Reglas para el agente ejecutor (no negociables)
1. **No inventes datos técnicos.** Si dudas de una cifra, déjala como está y anótala en la sección "Preguntas para el autor" al final de este archivo.
2. **Honestidad de estado:** Rev A está *fabricada, en tránsito, aún sin probar en mano*. Rev B *no está diseñada*. No cambies esos textos hacia algo más optimista.
3. No borres ni sobrescribas imágenes/videos/GLB existentes. Los nuevos assets van con nombre nuevo (p. ej. `*_v7.webp`). Los PNG originales se quedan.
4. Cada cambio de texto visible se hace en **los 4 idiomas** (EN, ES, FR, DE) vía `data-i18n` / `window.translations`. Si no puedes traducir bien FR/DE, copia el texto EN y márcalo en "Preguntas para el autor".
5. Un commit por bloque (A, B, C...), con mensaje `showcase: <bloque> - <resumen>`. No hagas push ni despliegues; eso lo hace el autor.
6. Después de cada bloque: abrir con `python3 -m http.server` en `dist_site/`, revisar consola del navegador sin errores y probar los 4 idiomas (un `SyntaxError` en el diccionario i18n ya congeló las animaciones una vez).
7. No cambies el diseño visual general (paleta papel/terracota/salvia/ocre, fuentes Fraunces/Jakarta/JetBrains Mono).

---

## A. Bugs y errores objetivos (hacer primero)

| # | Problema | Dónde buscar | Arreglo |
|---|---|---|---|
| A1 | Clase Tailwind **inexistente** `accent-terracotta-soft` (el config solo define `terracotta`, `terracotta-hover`, `sage`, `sage-soft`, `ochre`, `ochre-soft`). Los badges salen sin fondo. | `real_macropad_badge`, `roadmap_status` | Añadir `'terracotta-soft': '#F8E6DE'` al `tailwind.config` (o usar `bg-accent-terracotta/10`). |
| A2 | `shadow-xs` no existe en Tailwind 3 CDN. | `setHeroOverlayMode` (JS) y botones PCB SMT/Blend/Painting | Cambiar a `shadow-sm` o definir `boxShadow.xs` en config. |
| A3 | Email placeholder `mailto:contact@example.com` en el footer ("Contact Founder"). | `<footer>` | Poner el correo real del autor (preguntar) o reemplazar por link a GitHub Discussions/Issues. **No publicar con el placeholder.** |
| A4 | Estado de Rev A contradictorio: hero dice "Awaiting delivery to Mexico", progreso dice "in transit", fact sheet dice "in Fabrication & Assembly (JLCPCB)", Fase 2 dice "sent to JLCPCB SMT production". | `hero_status_txt`, `progress_current`, roadmap Phase 2, `ENGINEERING_FACT_SHEET.md` línea 5 | Unificar en una sola frase (preguntar al autor el estado real hoy) y usarla en todos lados + 4 idiomas. |
| A5 | Etiqueta **"Real CAD Geometry • IP-Protected Decimation"** sobre el visor del switch. Contradice el mensaje open-source (CERN-OHL-P). | sección `#interactive-switch`, overlay superior izquierdo | Cambiar a "Real CAD geometry • decimated for web" (o similar, sin "IP-Protected"). |
| A6 | "Collision Margin: 0.000 mm³" como si fuera un margen. Es el volumen de colisión. | barra inferior del visor del switch | Renombrar a "Collision volume: 0.000 mm³ (CAD check)". |
| A7 | Marquee del hero repite 4 fotos × 3 con captions duplicados (`marquee_c1..c4`). Está bien técnicamente (loop infinito) pero los duplicados se indexan y leen 3 veces con lector de pantalla. | `.marquee-track` | Duplicados con `aria-hidden="true"` y `alt=""`. |
| A8 | Comentarios de sección mal numerados (dos "09", "07" antes de "08"...). | comentarios `<!-- NN · ... -->` | Renumerar comentarios en orden real de las secciones. |
| A9 | Mini-barra "Rev B · Medici" y 70% "of the road to Rev B": porcentaje arbitrario sin criterio. | bloque "Project Status" | Quitar el "70%" o definir criterio visible (p. ej. "3 de 4 hitos"). Recomendado: "3 / 4 milestones". |
| A10 | Mezcla de claims con comillas/escapes y `data-i18n-html` con HTML en traducciones (frágil). | `hero_title`, diccionario | Añadir un script de verificación (ver F3) que parsea el diccionario y falla si hay claves faltantes entre idiomas. |

## B. Consistencia técnica (verificar contra fuentes; NO inventar)

Estas discrepancias existen entre sitio, fact sheet y `AGENTS.md`. El agente **no decide**: las lista y pregunta al autor.

| # | Discrepancia |
|---|---|
| B1 | Fact sheet §3.1 dice HAL403SO linear range **±390 G**; `AGENTS.md` dice satura ~**±315 G** peor caso. Revisar `Specsheets/HAL403.pdf` con `pdftotext -layout` y alinear. |
| B2 | Fact sheet habla de LiPo 500 mAh y "11–12 h de operación inalámbrica" (§3.2); `AGENTS.md` dice "cada mitad se alimenta por USB-C, **sin batería**". Elegir una y corregir sitio + fact sheet. |
| B3 | Hero: "1.4 mA Sensor Power (HAL403SO)" es **por sensor**; el total de 30 sensores es ~42 mA. Aclarar "1.4 mA per sensor (42 mA total)" para no sugerir que el teclado consume 1.4 mA. |
| B4 | "Zero-friction", "zero metallic friction", "zero mechanical rebound chatter", "zero wear": son afirmaciones absolutas. Suavizar a "no metal springs / no contact leaf" o respaldar con medición. |
| B5 | "0% Overhead", "100% Direct Product R&D": revisar con el autor si se mantiene en un sitio público. |
| B6 | "Hasta 25° de tenting" y "(0° → 25°)" vs. botones 0/15/25 y slider: confirmar que 25° es el máximo real del diseño. |
| B7 | La tabla de actuación dual-stage usa umbrales 0.9 mm / 2.1 mm y el fact sheet dice 0.2–2.2 mm configurable: aclarar que la demo es ejemplo. |
| B8 | Pie de página/CERN-OHL-P: confirmar que existe archivo `LICENSE` en el repo público. |

## C. Contenido y estructura (impacto alto para el lanzamiento)

| # | Cambio | Detalle |
|---|---|---|
| C1 | **Video antes del scroll.** El primer elemento visible es una imagen de PCB y mucho texto. | Insertar en el hero (o inmediatamente debajo) el video `macropad_16key_demo.mp4` como prueba principal. El hero actual de PCB/Van Gogh pasa a segunda posición. Mantener el morph Canvas-to-Copper. |
| C2 | **Mover "What's actually real?" (`#real-life`) justo después del hero.** Es lo que más credibilidad da a un visitante de Reddit. | Reordenar: Hero → Real → FloatForce 3D → Analog playground → Ergonomics → Timeline → Art/PCB → Gallery → Rev B. Actualizar el orden en el `<nav>`. |
| C3 | **Sacar la sección de grant (`#grant`) y su ítem del nav a una página aparte** (`grant.html`) o al final con menos peso. | La audiencia de lanzamiento no es el comité Medici. Mantener el contenido tal cual; solo moverlo. En el hero, reducir el badge "1517 Fund • Medici Candidate" o moverlo a `grant.html`. |
| C4 | **Sección "Build it yourself" nueva** (después de FloatForce): lista de qué se necesita (impresora, imanes N52 Ø4×1.5, HAL403SO, MUX, etc.), enlaces a STL/CAD/KiCad/firmware y estado de cada archivo. | Solo enlazar lo que **existe** en el repo público. Para lo demás poner "coming soon". No inventar precios; poner "BOM cost: por confirmar" hasta que el autor dé la cifra. |
| C5 | **Sección "Honest status" corta** con tres columnas: ✅ Probado en hardware real / 🟡 Fabricado, sin probar (PCB Rev A) / 🔵 Solo diseño (Rev B). | Reusar textos ya existentes; es resumen, no contenido nuevo. |
| C6 | **Call to action claro** arriba: "Star on GitHub", "Read the fact sheet", "Join discussion" (link a Discussions si existe). | Un solo botón primario + uno secundario. Quitar el punto verde pulsante del botón GitHub del header (sugiere "live" sin significado). |
| C7 | Hay mucho texto en `text-xs` (12 px) para contenido explicativo. | Subir párrafos explicativos a `text-sm`/`text-base`. `text-xs` solo para etiquetas/mono. |
| C8 | Sección `#hci` (mouse analógico, gafas, bio-interfaces) distrae del producto. | Mover a `grant.html` o colapsarla en un `<details>` al final. |
| C9 | Pilar 4 ("Prusa Model") y fase 4 son plan de negocio. | Mover a `grant.html` o al footer; no en la sección de ergonomía. |
| C10 | Sin sección de **comparación honesta** con teclados Hall-effect comerciales (Wooting, etc.). | Opcional: tabla breve "qué es distinto" (3-magnet springless, 3D printable, open). **Sin precios ni cifras de terceros que no se verifiquen con fuente.** |

## D. SEO, social y metadatos

| # | Cambio |
|---|---|
| D1 | `og:image` apunta a una pintura de Van Gogh (jpg). Crear `assets/img/og_cover_v7.png` 1200×630 con el macropad/PCB + título. Añadir `og:image:width/height`, `og:image:alt`, y `twitter:image`, `twitter:title`, `twitter:description`. |
| D2 | Añadir `<link rel="icon">` (SVG con la "H" del header) y `apple-touch-icon`. |
| D3 | Añadir `<link rel="canonical">` y `<html lang>` dinámico al cambiar idioma (`document.documentElement.lang = lang` en `setLanguage`). |
| D4 | `hreflang` no aplica (misma URL), pero actualizar `<title>`/`description` por idioma en `setLanguage`. |
| D5 | JSON-LD `schema.org/CreativeWork` o `Product` mínimo (nombre, autor, licencia, url). Opcional. |
| D6 | `og:url` debe coincidir con la URL pública final. Verificar que el repo `HE_KB_Showcase` realmente existe y es el que despliega Pages (el remoto git local apunta a `HE_Keyboard_Plan`; ver `sync_to_github.sh`). |

## E. Rendimiento

| # | Cambio |
|---|---|
| E1 | **Tailwind CDN** (`cdn.tailwindcss.com`) no es para producción (avisa en consola, bloquea render, ~300 KB). Compilar con la CLI de Tailwind (`npx tailwindcss -i in.css -o assets/app.css --minify`) y quitar el `<script>` CDN + `tailwind.config` inline. Guardar `tailwind.config.js` en repo. |
| E2 | Imágenes: 13 MB de PNG/JPG en `assets/img`. Generar **WebP** (calidad ~82) junto a los originales (no borrar originales) y usar `<picture>`; PNG grandes: `case_top`, `case_exploded`, `switch_v5_*`, `keycaps_wasd_v3_2`, `pcb_*_transparent`. Meta: < 4 MB totales cargados en la primera pantalla + scroll inicial. |
| E3 | Videos: 17 MB, `autoplay` + `preload="metadata"`. Generar versiones **WebM VP9/AV1 + MP4 H.264** más ligeras (`ffmpeg -crf 28`, ≤ 1280 px de ancho), conservar los originales. Usar `<source>` múltiple. Pausar con `IntersectionObserver` cuando salgan de pantalla. Añadir `poster` real (frame del video). |
| E4 | `loading="lazy"` solo está en 4 de 43 `<img>`. Añadir `loading="lazy"` y `decoding="async"` a todas las imágenes bajo el fold; `fetchpriority="high"` solo a la imagen del hero. Añadir `width`/`height` para evitar CLS. |
| E5 | Tres escenas WebGL (drawbridge, switch, hero?) + 6 `requestAnimationFrame`. Verificar que **todas** pausan fuera de pantalla (ya hay `IntersectionObserver` en dos) y en `document.hidden` (`visibilitychange`). Limitar `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`. |
| E6 | Dos listeners `scroll` sin `{passive:true}` ni throttle (rieles/encoder). Cambiar a `passive:true` + `requestAnimationFrame` throttle. |
| E7 | Three.js desde `unpkg.com` sin fallback ni SRI. Descargar a `assets/vendor/three/` (versión fija r160, solo módulos usados: three, OrbitControls, GLTFLoader, RoomEnvironment) y apuntar el importmap ahí. Evita caída de unpkg. |
| E8 | Google Fonts: añadir `font-display: swap` (ya está en la URL) y reducir pesos no usados (Jakarta 300/500/700 italic, etc.). Verificar con la pestaña Network. |
| E9 | Mover el JS inline (~1300 líneas) a `assets/app.js` y el diccionario a `assets/i18n.js`; cache más fácil y HTML más legible. Hacerlo **después** de A–D para que los diffs sean claros. |
| E10 | Cargar los GLB (`keyboard_half_showcase.glb`, `floatforce_v5_showcase.glb`) solo cuando la sección entre en viewport (ya parcialmente). Mostrar el `poster` PNG correspondiente mientras carga. |

## F. Accesibilidad y calidad

| # | Cambio |
|---|---|
| F1 | Solo 3 atributos `aria-*` en toda la página. Añadir: `aria-label` a botones de idioma, a los botones de tenting (0°/15°/25°), a `Explode`/`Reset`/`Press Switch`; `role="img"` + `aria-label` en los canvas WebGL; `aria-live="polite"` en los readouts (desplazamiento, estado del drawbridge). |
| F2 | **Contraste:** `ink-muted #8A847C` sobre `#FAF7F2` ≈ 3.4:1 (falla AA 4.5:1 para texto pequeño). Oscurecer a ~`#6E685F`. Verificar `text-white/60` sobre fondos oscuros. |
| F3 | Crear `scripts/check_site.py` que: (1) parsea `window.translations` y falla si falta alguna clave en algún idioma; (2) comprueba que todo `assets/...` referenciado exista; (3) valida que no queden `example.com` ni `TODO`. Ejecutar antes de cada commit. |
| F4 | `prefers-reduced-motion`: hoy solo desactiva el marquee. Extender a: rieles laterales, "breathe auto-oscillation" del drawbridge, animaciones del playground, `animate-pulse`, autoplay de videos (mostrar poster + botón play). |
| F5 | Foco visible: añadir `focus-visible:ring-2 ring-accent-terracotta` a botones/enlaces. Verificar navegación solo con teclado (Tab) y que el Spacebar del visor del switch no interfiera con el scroll de la página cuando el foco está fuera del visor. |
| F6 | Modal de imagen: `role="dialog"`, `aria-modal`, cerrar con `Esc`, devolver foco al elemento que lo abrió. |
| F7 | Audio del playground (`AudioContext`): confirmar que **no** arranca sin gesto del usuario y que hay botón visible de mute. |
| F8 | Móvil (≤ 390 px): probar cada sección; el nav `md:flex` desaparece sin menú alternativo → añadir un botón hamburguesa simple con los mismos enlaces. Revisar tablas (`overflow-x-auto` ya existe en el grant). |
| F9 | Alt text descriptivo en las 43 imágenes (hoy hay genéricos). Decorativas con `alt=""`. |
| F10 | i18n incompleto: solo 95 elementos con `data-i18n`; el grant, pilares, playground, HCI y footer están solo en inglés. Al menos traducir hero, nav, real-life, FloatForce, honest-status y footer (los de mayor tráfico) en ES/FR/DE. Resto: dejar EN y documentarlo. |

## G. Pulido de contenido

1. Titular del hero es largo (3 líneas en desktop). Probar versión corta: *"Keys that feel everything between 1 and 0."* (decisión del autor, ver Preguntas).
2. Unificar términos: "FloatForce" (switch), "HE-Keyboard" (proyecto), "Rev A" (PCB). Hoy "FloatForce Interface", "Open Human Interface" y "Open-Source Human Interface" conviven.
3. `Fact Sheet (MD)` abre un `.md` crudo en otra pestaña; renderizarlo a HTML (`fact_sheet.html` con `marked` o pandoc) o enlazar a la vista GitHub.
4. Footer: añadir enlaces a Issues/Discussions, licencia (`LICENSE`), y crédito a Riskable (ya aparece en la sección FloatForce, repetir corto).
5. Crédito Van Gogh: indicar que la obra es de dominio público (1888) y la fuente de la imagen usada.
6. Quitar emojis en botones (🔊, 📸) o dejarlos consistentes con el resto de la UI.
7. Texto "Breathe Auto-Oscillation: Active" y "Click or hover to morph" son jerga interna; simplificar.

## H. Orden de ejecución recomendado

1. A (bugs) → B (solo listar preguntas) → D (metadatos) → F1–F3, F6 → E1, E2, E3, E4, E7 → C1, C2, C5, C6 → resto de C → F8, F10 → E9 → G.
2. Commits: uno por letra. Probar los 4 idiomas y móvil tras cada uno.

## Criterios de aceptación globales
- Consola del navegador sin errores ni warnings propios (Tailwind CDN warning debe desaparecer tras E1).
- Lighthouse móvil: Performance ≥ 80, Accessibility ≥ 95, SEO ≥ 95.
- `scripts/check_site.py` pasa.
- Ningún `contact@example.com`, ningún "IP-Protected", ningún claim de Rev B como diseñada o de Rev A como probada.
- Primera pantalla muestra video o imagen real del macropad funcionando, no solo renders.

---

## Preguntas y notas técnicas para el autor

- [x] **B1 (Rango lineal HAL403SO):** Verificado en `Specsheets/HAL403.pdf` pág. 4: Rango de campo magnético típico es **±390 G** (mínimo ±500 G). A sensibilidad máxima de 4.6 mV/G, la excursión de 1.45 V desde el punto medio satura a **~±315 G** peor caso. Ambos son ciertos: ±390 G lineal típico, ±315 G saturación en peor caso.
- [ ] **B2 (Alimentación):** `AGENTS.md` congela USB-C por mitad sin batería, mientras el Fact sheet mencionaba LiPo 500 mAh como horizonte futuro inalámbrico. ¿Confirmar si en el showcase se describe estrictamente USB-C o se aclara "USB-C actual / LiPo futuro en Rev B"?
- [x] **B3 (Consumo sensores):** Clarificado en hero a "1.4 mA / sensor (42 mA array total)" en los 4 idiomas.
- [x] **B4 (Términos absolutos):** Suavizados "zero metallic friction" a "no metal springs or contact leaf friction" y "zero mechanical rebound chatter" a "no mechanical leaf debounce needed".
- [ ] **B5 (0% Overhead):** ¿Se mantiene en el pitch de Medici o se ajusta la redacción?
- [ ] **B6 (Tenting 25° máx.):** ¿25° es el ángulo físico máximo probado en el diseño mecánico?
- [x] **B7 (Dual-stage demo):** Etiquetado explícitamente en el playground como configurable (demo: 0.9 mm | 2.1 mm).
- [ ] **B8 (Licencia CERN-OHL-P):** Confirmar adición del archivo `LICENSE` (CERN-OHL-P v2) en la raíz del repo de showcase.
- [ ] **C3 / C8 (Páginas separadas vs SPA):** Decidir si mover el pitch Medici (`#grant`) y futuro HCI (`#hci`) a `grant.html` o conservarlo como SPA unificada.
- [ ] **G1 (Titular Hero):** ¿Mantener el titular poético actual o cambiar a versión corta: *"Keys that feel everything between 1 and 0."*?
