# Auditoría Técnica de `index.html` y Plan de Mejoras Interactivas (V3)

> **Propósito:** Diagnóstico exhaustivo del `dist_site/index.html` actual (`1,518 líneas`) y especificación exacta de arquitectura, animaciones y exportación 3D real (protegiendo IP) lista para ser ejecutada por **Gemini Flash**.  
> **Regla de Oro de Privacidad:** Este documento (`AUDITORIA_Y_MEJORAS_V3.md`) y los archivos fuente `.blend`/`.stl` permanecen estrictamente locales; a `/tmp/HE_KB_Showcase/` solo se copia `index.html`, `README.md`, `ENGINEERING_FACT_SHEET.md` y `assets/` (incluyendo el `.glb` visual decimado).

---

## Parte 1: Hallazgos de la Auditoría sobre el `index.html` Actual

La paleta cálida (`#FAF7F2`) y la tipografía editorial (`Fraunces` + `Plus Jakarta Sans`) lograron una base visual muy agradable, pero al auditar el código fuente se detectaron **6 problemas concretos** que restan impacto y realismo:

1. **Modelo 3D Falso ("Chafa") e Incorrecto Mecánicamente (`initSwitch3D`, líneas 1044–1211):**
   - **Qué hay hoy:** Se construyeron 6 cajas genéricas (`THREE.BoxGeometry`) en JavaScript y una pirámide de 4 caras (`CylinderGeometry(..., 4)`) como keycap.
   - **Error mecánico:** Puso un techo cerrado (`topRoof`) y una pared lateral derecha (`+X`), ignorando por completo cómo funciona el **FloatForce Switch (V5.0)** real (`KE_KB_Hardware/HE_Switch_V5_UBody.blend`): en la realidad, el `U-Housing` abre hacia el frente (`-Y`), tiene un **puente central interno** con mordaza abierta para el imán `S2`, el `Stem` es un **marco rectangular con ventana hueca central** que abraza ese puente sin chocar, y `SideWall` cierra el frente con orejetas laterales (`lugs`).
   - **Iluminación plana:** Usa `three.js r128` antiguo sin `RoomEnvironment` (IBL), haciendo que los imanes metálicos (`metalness: 0.85`) se vean grises/opacos porque no tienen entorno que reflejar.

2. **Corte Transversal 2D del Playground también Incorrecto (`#switchCutawaySVG`, líneas 363–393):**
   - Dibuja un poste macizo bajando contra tres imanes apilados (`S3`, `S2`, `S1`), contradiciendo el corte real `assets/img/switch_v5_section.png` que aparece más abajo en la galería.

3. **Parches Negros `#141414` Detrás de Renders con Fondo Blanco (`#galleryGrid` y `#imageModal`, líneas 665–755 y 1007):**
   - Las tarjetas 4, 5, 6, 7, 11 y 12 (`switch_v5_exploded.png`, `switch_v5_section.png`, `slingshot_simulation.png`, `switch_v5_assembled.png`, `keycaps_wasd_v3_2.png`, `case_exploded.png`) son PNGs con **fondo blanco puro (`#FFFFFF`)**, pero tienen un contenedor `bg-[#141414] p-2`, generando un recuadro negro artificial alrededor de una imagen blanca dentro de una tarjeta blanca.

4. **Orden de Secciones Subóptimo y `Future HCI` Interrumpiendo el Cierre:**
   - Hoy el visitante ve una PCB suelta en el Hero e inmediatamente salta a un switch microscópico, sin ver nunca **cómo luce y se inclina (tenting) el teclado split completo** para proteger sus muñecas.
   - Además, la sección especulativa **Future HCI (`#hci`, línea 819)** está metida *antes* del **Pitch de 1517 Fund (`#grant`, línea 862)**, diluyendo el foco justo antes de pedir los `$1,000 USD`. Debe moverse hasta el final como epílogo visionario.

5. **Falta de Sensación Analógica Continua al Scrollear la Página:**
   - Fuera del pequeño ícono `AS5600` en el header, toda la página es estática al girar la rueda del ratón (`wheel`). Los márgenes están vacíos en pantallas grandes y no transmiten la sensación táctil/analógica del hardware.

6. **Detalles Residuales de Limpieza:**
   - Spanglish accidental en dos pies de foto dentro de una página 100% en inglés: línea 229 (*"PCB Rev A — Frente con serigrafía de Van Gogh"*) y línea 594 (*"Superficie superior plana..."*). Unificar a inglés editorial limpio.
   - Aún quedan clases `text-[11px]` (líneas 125, 129, 154, 230, 279, 290, 404, 440, 462); subirlas a `text-xs` (12px) o `text-sm` (14px).

---

## Parte 2: Nueva Estructura Narrativa de Alto Impacto (Orden Reorganizado)

Reordenar las secciones en `index.html` (y los enlaces del `<nav>` superior) en este flujo exacto pensado para cautivar en 10 segundos a visitantes y revisores de **1517 Fund**:

1. **Márgenes Laterales Interactivos Fijos (`Analog Margin Rails`):** Visibles durante toda la lectura, reaccionando físicamente a la rueda del ratón (`wheel` + `scroll`).
2. **01 · HERO — Qué es y por qué enamora:** Titular editorial en `Fraunces`, propuesta clara sin jerga, botones de acción y presentación limpia del hardware.
3. **02 · ERGONOMÍA VIVA: ANIMACIÓN DE SPLIT & TENTING (`0° → 25°`) + LOS 4 PILARES ABIERTOS:** Antes de ir al micro-detalle del switch, el visitante ve las **dos mitades del teclado separarse e inclinarse (tenting)** interactivamente para alinear las muñecas, acompañado de los 4 pilares esenciales (Ergonomía, Impresión 3D Global sin soportes, Cero Paywalls, Modelo Prusa desde México + IA).
4. **03 · FLOATFORCE SWITCH (V5.0) — VISOR 3D REALISTA (`.glb` exportado del CAD real):** Zoom al corazón mecánico real con explosión guiada por scroll/botón y pulsación de `2.36 mm` (`Spacebar` / clic), más la atribución a Riskable y simulación Magpylib.
5. **04 · CONTINUOUS ANALOG PLAYGROUND (1 Tecla = Música, Gamepad y Actuación):** Con el SVG de corte corregido para reflejar la geometría real de puente `S2` + ventana de Stem, y audio Web Audio API.
6. **05 · ART MEETS ENGINEERING (Van Gogh en PCB Matte Black) + GALERÍA CURADA:** Historia de *"The Langlois Bridge at Arles" (1888)* y galería de 12 activos con **fondos blancos limpios** en los renders claros.
7. **06 · HARDWARE REV B — INTEGRACIÓN VERTICAL:** Trackpad capacitivo grabado en cobre (Azoteq IC), PCBs dedicadas Izquierda/Derecha, SoC nRF52840 bare-metal en placa y Sensor Power Gating (`< 20 µA` sleep).
8. **07 · 1517 FUND MEDICI PITCH ($1,000 USD Grant & Historia del Creador):** Cierre contundente de inversión (`$450` / `$350` / `$200` en filamentos 3D) y fases de entrega.
9. **08 · EPÍLOGO: BEYOND THE KEYBOARD — FUTURE HCI (Al final antes del Footer):** Ratones analógicos sin fricción, lentes de eye-tracking con detección de biseles de monitor y micro-interfaces bio-sutiles.

---

## Parte 3: Especificación Técnica de las 4 Mejoras Clave

### Mejora 1: Exportación del Modelo 3D REAL (`floatforce_v5_showcase.glb`) Protegiendo IP

En lugar de cubos falsos en JS, ejecutar un script headless en Blender sobre **`KE_KB_Hardware/HE_Switch_V5_UBody.blend`** para generar `dist_site/assets/models/floatforce_v5_showcase.glb`:

* **Comando de exportación Blender headless que debe crear y correr Gemini Flash (`/tmp/export_showcase_glb.py`):**
  - Abrir `KE_KB_Hardware/HE_Switch_V5_UBody.blend`.
  - Tomar los objetos reales ya existentes en la escena:
    - `Procedural_V5_UHousing` (renombrar copia a `U_Housing`, color azul pizarra cálido o marfil técnico)
    - `Procedural_V5_SideWall` (renombrar a `SideWall`, con sus orejetas de alineación reales)
    - `Procedural_V5_SinglePlate` (renombrar a `Plate`, gris carbón mate)
    - `Procedural_V5_Stem` (renombrar a `Stem`, blanco hueso / gris claro sedoso)
    - El objeto `keycap` (`part_role == "v10_keycap_flat_top"`, o importar una keycap esférica de `HE_Keycaps_Ultimate_V3_2.blend`, renombrar a `Keycap`)
    - Crear los 4 cilindros visuales de imanes reales en metros (`L.mm`):
      - `Mag_S1_Bot` (`R=2.0mm`, `Z=0.03..1.53mm`, azul cobalto/níquel metálico)
      - `Mag_S2_Bridge` (`R=2.0mm`, `Z=6.92..8.42mm`, dorado N52 metálico)
      - `Mag_StemBot` (`R=2.0mm`, `Z=4.39..5.89mm`, verde esmeralda/salvia metálico)
      - `Mag_StemTop` (`R=2.0mm`, `Z=11.59..13.09mm`, verde esmeralda/salvia metálico)
  - **Protección de IP antes de exportar:** Evaluar modificadores Geometry Nodes a malla real, aplicar un modificador `DECIMATE` (`ratio = 0.35`, manteniendo bordes nítidos con `use_symmetry` o `Planar 3°`) y cuantizar vértices a `0.08 mm` para destruir tolerancias de fabricación (`0.05 mm`), manteniendo el aspecto visual **100% idéntico al CAD real** en menos de ~200 KB.
  - Escalar raíz `× 1000` para trabajar en milímetros cómodos en Three.js y exportar con `bpy.ops.export_scene.gltf(filepath=".../dist_site/assets/models/floatforce_v5_showcase.glb", export_format='GLB', export_yup=True)`.

* **Visor Three.js Moderno (`three@0.160.0` vía `importmap`):**
  - Usar `GLTFLoader`, `OrbitControls` y `RoomEnvironment` (`PMREMGenerator`) para reflejos metálicos realistas sobre fondo `#F6F1E8`.
  - **Vectores Reales de Explosión (convertidos de Blender Z-up a Three.js Y-up, en mm):**
    - `U_Housing`: `(0, 0, -4 * exp)`
    - `Mag_S2_Bridge`: `(0, +7.5 * exp, -4 * exp)` *(sale hacia arriba de la mordaza abierta del puente)*
    - `Mag_S1_Bot`: `(0, -7.5 * exp, -4 * exp)` *(sale hacia abajo del piso)*
    - `Stem`, `Mag_StemBot`, `Mag_StemTop`: `(0, +2.0 * exp - strokeY, +12 * exp)` *(salen hacia el frente `+Z` mostrando cómo abrazan el puente, y bajan `-2.36 mm` al presionar)*
    - `SideWall`: `(0, 0, +24 * exp)` *(sale hacia el frente `+Z` mostrando sus orejetas laterales)*
    - `Plate`: `(0, -14 * exp, 0)`
    - `Keycap`: `(0, +13 * exp - strokeY, +12 * exp)`

---

### Mejora 2: Rieles Laterales Analógicos en los Bordes del HTML (`Analog Margin Rails`)

Añadir dos rieles fijos en los bordes izquierdo y derecho de la pantalla (`fixed top-24 bottom-8 z-30 hidden xl:flex flex-col justify-between pointer-events-none select-none`, ancho `52px`, dejando libre el contenedor central `max-w-6xl`):

1. **Borde Izquierdo — Fila Vertical de 9 Mini-Switches Reactivos (`#leftSwitchRail`):**
   - 9 pequeños switches en perfil lateral dibujados en SVG limpio (carcasa + keycap móvil + núcleo magnético brillante + micro-barra de nivel).
   - **Física vinculada a `wheel` y `scroll`:**
     - Capturar tanto `window.scrollY` como la velocidad instantánea de la rueda del ratón (`wheelVelocity`, amortiguada en `requestAnimationFrame` con fricción `0.88`).
     - Al hacer scroll, una **onda analógica continua** (`sin(scrollY * 0.012 - index * 0.65)`) modulada por la intensidad del giro de rueda comprime cada switch individualmente entre `0.00 mm` y `2.36 mm`.
     - Conforme cada switch se presiona:
       - Su keycap desciende suavemente (`translateY`).
       - Su tamaño/ancho del núcleo magnético se expande ligeramente.
       - Su color interpola de forma continua: **Arena (`#D8D0BF`) → Salvia (`#2F6B4F`) → Ocre (`#C98A2C`) → Terracota (`#C85A32`)**.

2. **Borde Derecho — Columna de Figuras Geométricas Mutantes (`#rightMorphRail`):**
   - 7 nodos gráficos verticales que remarcan visualmente que una señal analógica transforma **tono, tamaño y forma**:
     - Figuras SVG/CSS que al scrollear interpolan su `border-radius` (de círculo `50%` a cuadrado técnico `18%` o rombo rotado), escalan proporcionalmente (`scale(0.75 → 1.35)`) con la velocidad de la rueda y rotan suavemente cambiando entre salvia, ocre y terracota.
     - Incluye una etiqueta flotante mínima al pie del riel que muestra en vivo `SCROLL FLUX: XX%` para que el visitante note de inmediato que él mismo está modulando los bordes con su ratón.
   - *(En pantallas móviles/tablets `< 1280px` donde no hay margen lateral libre, mostrar una versión compacta horizontal de 7 micro-switches justo debajo del header sticky).*

---

### Mejora 3: Animación Interactiva de Teclado Split & Tenting (`#tenting-studio`)

Crear en la **Sección 02** una experiencia visual memorable que muestre cómo el teclado dividido cuida el cuerpo:

* **Escena 3D / Perspectiva Interactiva de las Dos Mitades (15 + 15 teclas):**
  - Representar con geometría limpia y elegante en Three.js (o perspectiva 3D isométrica de alta precisión con grosor real de carcasa, 15 keycaps esculpidas por lado, pantalla OLED interior, perilla AS5600 y trackpad en el pulgar, más las patas de tenting plegables debajo):
  - **Vinculada automáticamente al Scroll al pasar por la sección + Controles Interactivos (`0° → 25°`):**
    1. **Slider / Botones rápidos de Postura:**
       - `Flat Conventional (0°)` — Mitades juntas y planas; indicador postural en ámbar/terracota (*"Pronated Forearms & Wrist Tension"*).
       - `Natural Tenting (15°)` — Las mitades se separan, abren su ángulo ergonómico (*splay* de `12°`) y elevan su borde interior `15°`; indicador en verde salvia (*"Relaxed Ulnar Alignment"*).
       - `Deep Sculpted Tenting (25°)` — Inclinación tipo apretón de manos natural con soportes impresos en 3D desplegados debajo; indicador (*"Zero Forearm Pronation — Neutral Handshake Angle"*).
    2. Mientras el usuario hace scroll por esta sección, las dos mitades hacen suavemente la coreografía de abrirse e inclinarse de `0°` a `20°` por sí solas, invitando a mover el control si quiere jugar con el ángulo.

---

### Mejora 4: Pulido de Galería, SVG del Playground y Limpieza Final

1. **Corregir el SVG `#switchCutawaySVG` del Playground:**
   - Dibujar el `U-Housing` con su puente central `S2` (dorado) en medio, el imán `S1` abajo sobre el sensor `HAL403SO`, y el `Stem` como un **marco rectangular hueco** con imán superior e inferior que sube y baja abrazando el puente `S2` sin tocarlo.
2. **Arreglar fondos de tarjetas en `#galleryGrid` y `#imageModal`:**
   - Para `pcb_iso.png`, `pcb_top.png` y `pcb_bottom.png`: mantener fondo oscuro elegante `bg-[#141414]`.
   - Para `switch_v5_*`, `slingshot_simulation.png`, `keycaps_wasd_v3_2.png` y `case_exploded.png`: usar `bg-white border border-paper-border/60` (y detectar automáticamente en `openModal(src, caption)` si es imagen de PCB o imagen de fondo blanco para ajustar el fondo del modal entre `bg-[#141414]` y `bg-white`).
3. **Unificar idioma y tamaños mínimos:**
   - Cambiar los dos pies de foto en español (líneas 229 y 594) a inglés limpio (*"PCB Rev A — Matte Black Front with Van Gogh Silkscreen"*).
   - Reemplazar todos los `text-[11px]` por `text-xs`.

---

## Checklist de Ejecución Directa para Gemini Flash

1. [ ] Escribir y ejecutar un script Python rápido con Blender headless (`flatpak run org.blender.Blender -b KE_KB_Hardware/HE_Switch_V5_UBody.blend -P /tmp/export_showcase_glb.py` o `blender -b ...`) para generar `dist_site/assets/models/floatforce_v5_showcase.glb` (decimado IP-safe con las piezas reales separadas por nombre).
2. [ ] Actualizar `dist_site/index.html` aplicando:
   - Reordenamiento completo de secciones (poniendo Split & Tenting arriba y moviendo **Future HCI hasta el final** antes del footer).
   - Rieles laterales fijos **Analog Margin Rails** reactivos a `wheel` y `scroll` (fila de switches comprimiéndose + figuras cambiando de color, tamaño y forma).
   - **Visor 3D Real** con `GLTFLoader` + `RoomEnvironment` cargando `floatforce_v5_showcase.glb` con explosión real y pulsación de `2.36 mm`.
   - **Animación interactiva de Split & Tenting (`0° → 25°`)**.
   - Corrección del SVG de corte en el Playground, fondos blancos limpios en la galería de CAD, unificación a inglés y eliminación de `text-[11px]`.
3. [ ] Sincronizar `index.html` y `assets/models/floatforce_v5_showcase.glb` hacia `/tmp/HE_KB_Showcase/` (**sin** subir `PLAN_REDISENO_CLARO_INTERACTIVO.md` ni `AUDITORIA_Y_MEJORAS_V3.md` ni archivos `.stl`/`.blend`), hacer commit y `git push origin main`.
