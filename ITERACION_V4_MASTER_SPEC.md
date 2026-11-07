# Especificación Maestra Iteración V4: Teclado 3D Completo, Tenting "Puente Levadizo", Playground Auto-Animado y Línea del Tiempo de Prototipos

> **Propósito:** Guía técnica exacta y autocontenida para que el agente ejecutor (**Gemini Flash**) resuelva los bugs detectados en V3 y construya las nuevas experiencias visuales en `dist_site/index.html`.  
> **REGLAS ESTRICTAS DE SEGURIDAD Y GIT (NO VIOLAR):**
> 1. **NUNCA sobrescribir ni borrar** ningún archivo dentro de `KE_KB_Hardware/Renders/` ni modificar los archivos `.blend` originales (Regla #9 de `AGENTS.md`). Cualquier render nuevo se guarda **únicamente** en `dist_site/assets/img/timeline/`.
> 2. **Privacidad de IP:** Nunca copiar archivos `.blend`, `.stl`, `.kicad_pcb` ni estos documentos `.md` de planeación (`ITERACION_V4_MASTER_SPEC.md`, etc.) al repositorio público `/tmp/HE_KB_Showcase/`. Los modelos `.glb` web deben usar mallas decimadas/instanciadas solo visuales.

---

## 1. Bordes Laterales Vivos (`Analog Margin Rails`): Movimiento Continuo + Aceleración con Scroll

### Diagnóstico del Problema Actual (`index.html`, líneas 1508 y 1531)
Actualmente la onda usa `Math.sin(scrollY * 0.012 - idx * 0.65)`. Como no depende del tiempo `t`, **cuando el visitante deja de mover la rueda del ratón los switches y figuras quedan totalmente congelados**.

### Solución Exacta a Implementar
Reemplazar el cálculo estático por un **integrador de fase continua con velocidad base (`idle flow`) + impulso por scroll**:

```javascript
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
    // Impulso proporcional a la velocidad de desplazamiento (con tope suave)
    scrollSpeedBoost = Math.min(14.0, scrollSpeedBoost + Math.abs(dy) * 0.08);
  }
}, { passive: true });

function updateMarginRails(now) {
  const dt = Math.min(0.05, (now - lastFrameTime) / 1000);
  lastFrameTime = now;

  // Decaimiento suave de la aceleración de vuelta al reposo vivo
  scrollSpeedBoost *= Math.pow(0.04, dt); // amortiguación independiente de FPS

  const BASE_IDLE_SPEED = 2.0; // rad/s -> SIEMPRE en movimiento orgánico aunque no scrollees
  railPhase += scrollDirection * (BASE_IDLE_SPEED + scrollSpeedBoost) * dt;

  // Amplitud extra al scrollear rápido (0.55 en reposo -> 1.0 a máxima velocidad)
  const amp = Math.min(1.0, 0.55 + scrollSpeedBoost * 0.05);

  // Riel Izquierdo (switches): Math.sin(railPhase - idx * 0.65)
  // Riel Derecho (figuras mutantes): Math.cos(railPhase * 0.85 - idx * 0.7)
  requestAnimationFrame(updateMarginRails);
}
```
* **Resultado:** En reposo, los mini-switches del borde izquierdo respiran en una ola magnética suave y las figuras derechas rotan/mutan lentamente; en cuanto el usuario gira la rueda hacia abajo o hacia arriba, **la ola acelera de velocidad e intensidad en la dirección del scroll** y luego desacelera con inercia sedosa sin detenerse jamás.

---

## 2. Corrección Exacta del Bug en el Switch 3D (`Keycap` en `0,0,0` al Ensamblar)

### Causa Raíz Exacta (`index.html`, líneas 1318 y 1362–1389)
Al inspeccionar `dist_site/assets/models/floatforce_v5_showcase.glb`, los nodos exportados desde Blender traen sus alturas reales de ensamblaje en `node.translation`:
* `U_Housing`: `[0, 0, 0]` | `SideWall`: `[0, 0, 0]`
* `Plate`: `[0, 5.00, 0]` | `Stem`: `[0, 4.39, 0]` | **`Keycap`: `[0, 10.99, 0]`**
* `Mag_S1_Bot`: `[0, 0.78, 0]` | `Mag_S2_Bridge`: `[0, 7.67, 0]` | `Mag_StemBot`: `[0, 5.14, 0]` | `Mag_StemTop`: `[0, 12.34, 0]`

En la línea 1318 se guardó `child.userData.initPos = child.position.clone()`, **pero en las líneas 1362–1389 se usó `.position.set(0, 13 * exp - strokeY, 12 * exp)` ignorando `initPos`**. Por eso cuando `exp = 0` (vista ensamblada), ¡la `Keycap`, el `Stem`, el `Plate` y los imanes colapsaban todos a `y = 0` en el suelo!

### Solución Exacta de 5 Líneas
Usar siempre desplazamientos **relativos** a `userData.initPos`:

```javascript
function setPartOffset(name, dx, dy, dz) {
  const p = parts[name];
  if (!p || !p.userData.initPos) return;
  const b = p.userData.initPos;
  p.position.set(b.x + dx, b.y + dy, b.z + dz);
}

// Dentro de animate():
setPartOffset('U_Housing',     0,  0,                  -4.0 * exp);
setPartOffset('Mag_S2_Bridge', 0,  7.5 * exp,          -4.0 * exp);
setPartOffset('Mag_S1_Bot',    0, -7.5 * exp,          -4.0 * exp);
setPartOffset('Stem',          0,  2.0 * exp - strokeY, 12.0 * exp);
setPartOffset('Mag_StemBot',   0,  2.0 * exp - strokeY, 12.0 * exp);
setPartOffset('Mag_StemTop',   0,  2.0 * exp - strokeY, 12.0 * exp);
setPartOffset('SideWall',      0,  0,                   24.0 * exp);
setPartOffset('Plate',         0, -14.0 * exp,          0);
setPartOffset('Keycap',        0,  13.0 * exp - strokeY, 12.0 * exp);
```
*(Ajustar también `controls.target.set(0, 7.5, 0)` para centrar verticalmente el switch completo con su keycap arriba).*

---

## 3. Nuevo Hero con Gancho Memorable + Modelo 3D Real de las Dos Mitades del Teclado

### 3.1 Nuevo Copywriting / Hook de Bienvenida (Hero)
El copy actual (*"Computer keyboards have been trapped in rigid, binary 1980s paradigms..."*) suena demasiado académico. Reemplazarlo por un **hook directo, sensorial y memorable**:

* **Badge Superior:** `1517 Fund · Medici Project Candidate · Open Hardware Built in Mexico`
* **Headline (`<h1>` en `Fraunces`):**
  > **Your fingers aren’t binary.**  
  > **Neither is *FloatForce*.**
* **Subtítulo Principal (2 oraciones claras y magnéticas):**
  > Meet the open-source split keyboard where every key floats on magnets instead of metal springs—turning touch into expressive music, 360° analog motion, and effortless typing. Split in two and lifted like a drawbridge to keep your wrists pain-free, 100% printable at home with zero supports.
* **Botones de Acción:**
  - Primario (Terracota): `Watch It Open & Play ↓`
  - Secundario: `Toggle X-Ray: Van Gogh PCB` *(interactúa directo con el modelo 3D del Hero)* + enlace limpio a `Engineering Fact Sheet`.

### 3.2 Cómo Generar el Modelo 3D Real de las Dos Mitades (`keyboard_half_showcase.glb`)
¡Cada mitad del teclado tiene **30 teclas (`6 columnas × 5 filas`)** en una PCB 100% ambidiestra, NO 15 teclas! Todos los datos reales ya existen en `KE_KB_Hardware/build_unibody_case.py` (líneas 69–140):

* **Script Blender Headless (`/tmp/export_split_half_glb.py`) que debe crear y ejecutar el agente:**
  1. Abrir una escena limpia en Blender e importar (`bpy.data.libraries.load`) desde `KE_KB_Hardware/HE_Case_Unibody.blend` los objetos `Case_Bottom_Tray` y `Case_Top_Plate` (aplicando `Decimate ratio=0.25` para que pesen poco y protejan IP).
  2. Crear la placa **`PCB_Board`** (`X = 23..168 mm`, `Y = 35.5..146 mm`, `Z = 6.2..7.8 mm`) con material negro mate (`#141414`) y mapear en su cara superior (`Z = 7.81 mm`) un plano texturizado con `dist_site/assets/img/pcb_top.png` (recortado a los bordes de la placa) para que **se vea literalmente la serigrafía blanca del puente de Van Gogh sobre la PCB negra debajo de los switches**.
  3. Importar 1 `Keycap` esférica desde `KE_KB_Hardware/HE_Keycaps_Ultimate_V3_2.blend` (o `HE_Switch_V5_UBody.blend`) y 1 cuerpo exterior simplificado de switch (`12 × 12 × 8.45 mm` sobre `Z = 7.8 mm`), e **instanciarlos compartiendo el mismo `mesh` (`obj.data`) en las 30 coordenadas exactas de `KEY_LAYOUT`** de `build_unibody_case.py` (`líneas 109–122`)! *(Al compartir `obj.data`, glTF reutiliza 1 sola malla para las 30 teclas y el `.glb` completo pesará apenas ~200–350 KB).*
  4. Añadir en sus coordenadas reales de `build_unibody_case.py`:
     - **Perilla rotatoria `AS5600_Knob`** (importada de `HE_Knob_V2.blend` decimada o cilindro estriado limpio) en `(153.0, 125.0)`.
     - **Pantalla `OLED_Screen`** en `(153.69, 95.75)` con brillo sutil cálido.
     - **Módulo `SuperMini_MCU`** en `(153.0, 60.74)`.
  5. Centrar el pivote o normalizar coordenadas en mm y exportar a `dist_site/assets/models/keyboard_half_showcase.glb` (`export_yup=True`).

* **Renderizado en el Hero (Three.js):**
  - Cargar `keyboard_half_showcase.glb` y clonar **Mitad Izquierda** y **Mitad Derecha** colocadas ergonómicamente con un suave ángulo de tenting (`12°`), iluminación cálida de estudio, rotación suave con el mouse, una ola sutil presionando las 60 teclas, y un botón **"Peek Inside: Van Gogh PCB"** que vuelve semitransparente/eleva `Case_Top_Plate` para revelar la PCB negra con el arte de Van Gogh debajo de las teclas.

---

## 4. Tenting Correcto: "El Efecto Puente Levadizo de Van Gogh" (`/   \`)

### Por qué falló la versión anterior (`index.html`, líneas 340–416 y 1585–1590)
La versión anterior dibujó dos rectángulos planos de `3×5` vistos desde el techo haciendo rotación en plano (`rotateZ`), lo cual parece limpiaparabrisas girando sobre la mesa y **no muestra cómo el teclado se levanta en V invertida**.

### La Conexión Narrativa y Física con Van Gogh (¡Destacar en el Título y Copy!)
¡El cuadro grabado en la PCB (*"The Langlois Bridge at Arles"*, 1888) es literalmente un **puente levadizo doble que se parte por la mitad y se eleva desde sus extremos**! Usar esa metáfora perfecta:
* **Título de la Sección:** `Like Van Gogh’s Drawbridge: Split & Tenting Ergonomics`
* **Subtítulo:** *"Why did we etch a drawbridge onto our PCB? Because ergonomic tenting works just like a drawbridge opening in two: the outer edges stay anchored on your desk while the inner thumb edges rise (0° → 25°), rotating your forearms out of painful flat twist into a natural, relaxed handshake."*

### Geometría Exacta del Movimiento en 3D (Three.js Vista Frontal-3/4 Baja)
Usar las **dos mitades 3D reales** (`keyboard_half_showcase.glb`) vistas desde una cámara frontal-isométrica baja (`camera.position.set(0, 145, 310)`, mirando a `(0, 35, 0)`) sobre una superficie de escritorio limpia:
1. **Bisagra Izquierda (`leftHingeGroup`):** Posicionada en el **borde exterior izquierdo (meñique)** sobre la mesa (`x = -185, y = 0, z = 0`). La mitad izquierda se extiende desde `x = 0` hacia `+157 mm` (hacia el centro).
   - Al aplicar tenting $\theta \in [0^\circ, 25^\circ]$: **`leftHingeGroup.rotation.z = +THREE.MathUtils.degToRad(theta)`** (más un ligero *splay* `rotation.y = +degToRad(theta * 0.3)`). ¡El borde exterior sigue tocando la mesa en `y = 0` mientras el borde interior del pulgar **se levanta hacia el cielo**!
2. **Bisagra Derecha (`rightHingeGroup`):** Posicionada en el **borde exterior derecho (meñique)** sobre la mesa (`x = +185, y = 0, z = 0`). La mitad derecha se extiende desde `x = 0` hacia `-157 mm` (hacia el centro).
   - Al aplicar tenting $\theta \in [0^\circ, 25^\circ]$: **`rightHingeGroup.rotation.z = -THREE.MathUtils.degToRad(theta)`** (más `rotation.y = -degToRad(theta * 0.3)`).
3. **Patas de Tenting + Indicador Visual de Muñecas:**
   - Debajo del borde interno de cada mitad, un soporte/pata impresa en 3D se despliega apoyándose en la mesa conforme sube el puente `/   \`.
   - Dibujar sobre el lienzo/overlay dos arcos angulares limpios mostrando `0° Flat (Twisted Forearms)` $\rightarrow$ `15°–25° Drawbridge Tenting (Neutral Handshake)`.
   - **Animación viva por defecto:** Oscila suavemente sola (`0° ↔ 22°`) para que el visitante vea abrirse y cerrarse el "puente levadizo" sin tocar nada, y si mueve el slider o botones (`0°`, `15°`, `25°`) toma control manual.

---

## 5. Nuevo "Continuous Analog Playground": 3 Demos Auto-Animadas sin Esfuerzo

Reemplazar el Playground dependiente de un slider manual por **3 Escenarios Vivos en paralelo (`grid-cols-1 lg:grid-cols-3 gap-6`) que funcionan solos en bucle continuo** (permitiendo también que el usuario haga clic/hover para jugar si quiere):

### Escenario 1: Expresión Musical Viva (Tecla en Bucle + Nota Flotante)
* **Animación automática:** Una tecla FloatForce grande se presiona sola siguiendo una envolvente musical orgánica (toque suave al `30%`, respiración profunda al `95%`, vibrato rápido entre `60%–75%`, liberación).
* **Respuesta visual inmediata:** Una **nota musical vectorial (`♪` / `♫`) rodeada de ondas concéntricas** flota encima/al lado:
  - Conforme la tecla baja más profundo, **la nota crece de tamaño (`scale 0.7 → 1.65`), sube en altura melódica (`translateY`), vibra suavemente y cambia de color** (*Salvia → Ocre → Terracota*).
  - Conservar el botón opcional *"🔊 Listen to Analog Synth"* que reproduce esa misma melodía expresiva con Web Audio API.

### Escenario 2: Joystick Analógico 360° con 4 Teclas `WASD`
* **Animación automática:** Un bloque de **4 teclas `W`, `A`, `S`, `D` vistas en perspectiva** donde las 4 teclas bajan y suben automáticamente en una coreografía fluida (ej. `W` al `80%` + `D` al `45%`, luego `D` al `100%` + `S` al `30%`, luego `A` suave al `25%`...), mostrando en cada tecla su porcentaje instantáneo de presión.
* **Respuesta visual inmediata:** Abajo/al lado, un **Joystick Virtual 2D (círculo de mando con palanca/punto vectorial y estela suave)** se mueve hacia **todos los ángulos (`360°`) y velocidades** calculado en tiempo real como `vecX = depth(D) - depth(A)` y `vecY = depth(S) - depth(W)`, moviendo un pequeño cursor/personaje con total fluidez analógica (caminar sigiloso vs. correr en diagonal).

### Escenario 3: Dos Acciones en Una Sola Tecla (*Dual-Stage Press: Letra vs. Screenshot*)
* **Animación automática:** Una sola tecla con **dos marcas claras de altura** en su recorrido (`0.9 mm Half-Press` y `2.1 mm Full Bottom-Out`), alternando automáticamente cada ~2.5 segundos entre:
  - **Pulso A (Presión a medias — `1.0 mm`):** La tecla baja solo hasta la mitad y sube. En la mini-pantalla de al lado aparece escrita una letra limpia (**`"a"`** — badge *"Half-press: Types character"*).
  - **Pulso B (Presión hasta el fondo — `2.3 mm`):** La tecla baja con decisión hasta el fondo. En cuanto cruza la segunda marca, la mini-pantalla dispara un **destello blanco de obturador de cámara, encuadra las esquinas del visor y muestra una captura flotante `"📸 Screenshot Captured!"`** (*"Full-press: Instant Screenshot"*).

---

## 6. Línea Temporal Deslizante de Todos los Prototipos Reales (Scroll-Driven R&D Timeline)

Antes o integrada en la sección de Galería (`#gallery`), crear una **Línea del Tiempo Horizontal Vinculada al Scroll Vertical (`Prototype Evolution: From First Sketch to SMT Production`)** que demuestre ante **1517 Fund** toda la iteración física real hecha desde cero.

### 6.1 Preparación de Imágenes (¡SIN TOCAR `KE_KB_Hardware/Renders/`!)
Crear la carpeta `dist_site/assets/img/timeline/` y poblarla con **10 hitos cronológicos reales** (optimizados en PNG/WebP `~800px` de ancho para carga instantánea):

1. **`01_freecad_v10.png` *(Renderizar nuevo con Blender CLI sin modificar el `.blend`)*:** Abrir `KE_KB_Hardware/Exploded view of current Freecad Switch Design.blend` en modo background y renderizar una vista limpia sobre fondo claro hacia `dist_site/assets/img/timeline/01_freecad_v10.png`.
2. **`02_parametric_rig.png` *(Renderizar nuevo con Blender CLI)*:** Abrir `KE_KB_Hardware/Parametric_Switch_Blender.blend` y renderizar hacia `dist_site/assets/img/timeline/02_parametric_rig.png`.
3. **`03_nextgen_switch_knob.png` *(Copiar de existentes)*:** `KE_KB_Hardware/Renders/Switch_NextGen/switch_exploded.png` (y/o `AS5600_Knob/knob_exploded.png` — primeros micro-rieles y encoder magnético V1).
4. **`04_magnet_topologies.png` *(Copiar de existentes)*:** `KE_KB_Hardware/Renders/Ultimate_Switches/slingshot_exploded.png` (exploración de repulsión vs. slingshot + Magpylib).
5. **`05_handbuilt_proto.png` *(Renderizar nuevo con Blender CLI)*:** Abrir `KE_KB_Hardware/usermadePrototype.blend` y renderizar hacia `dist_site/assets/img/timeline/05_handbuilt_proto.png`.
6. **`06_bambu_tolerance_calibration.png` *(Copiar de existentes)*:** `KE_KB_Hardware/Renders/tolerance_test_plate_v2_render.png` (calibración física real en Bambu Lab A1: `Ø4.10`, `Ø4.15`, `8.05 mm`).
7. **`07_v3_trimode.png` *(Copiar de existentes)*:** `KE_KB_Hardware/Renders/Switch_V3_TriMode/v3_exploded_trimode.png` (carcasa diagonal simétrica C2 Tri-Mode).
8. **`08_v4_ubody_keycaps_v3.png` *(Copiar de existentes)*:** `KE_KB_Hardware/Renders/Switch_V4_UBody_SideWall/v4_exploded_assembly.png` (primer U-Body monolítico + tapa lateral).
9. **`09_keycaps_v3_1_bed.png` *(Copiar de existentes)*:** `KE_KB_Hardware/Renders/Keycaps_Ultimate_V3_1/v3_1_print_bed_family.png` (familia de prueba inclinada a `-62°` libre de soportes en cama PEI).
10. **`10_v5_floatforce_revA.png` *(Copiar de existentes)*:** `KE_KB_Hardware/Renders/Switch_V5_UBody/v5_exploded_assembly.png` + `Keycaps_Ultimate_V3_2/v3_2_wasd_mx_front_row.png` + `pcb_iso.png` (arquitectura final **FloatForce V5.0** con `+33%` de recorrido, keycaps V3.2 reforzadas en 4 vías y PCB Rev A Matte Black en fabricación).

### 6.2 Mecánica de Deslizamiento Horizontal con el Scroll (`Sticky Horizontal Track`)
* Envolver la sección en un contenedor alto (`height: 280vh` en desktop) con un interior `sticky top-20 h-[calc(100vh-5rem)] overflow-hidden flex flex-col justify-center`.
* Conforme el usuario hace scroll vertical dentro de ese contenedor (`progress = 0.0 → 1.0`), trasladar suavemente el carril horizontal de tarjetas (`transform: translateX(-${progress * maxScrollX}px)`) desde el **Prototipo #01 (Más antiguo)** a la izquierda hasta el **#10 (Actual en Producción)** a la derecha, iluminando una línea de tiempo dorada/terracota con fechas, versión y una frase breve de qué aprendizaje real dejó cada iteración. *(En móvil permitir también swipe horizontal nativo cómodo).*

---

## 7. Rendimiento WebGL (Regla de Oro para 60 FPS)
Como ahora habrá escenas Three.js de altísimo impacto (Teclado Split Completo en Hero / Drawbridge Tenting + Switch FloatForce V5.0 3D):
* Usar un `IntersectionObserver` sobre cada contenedor 3D para **ejecutar `renderer.render(...)` únicamente cuando ese lienzo esté visible en el viewport** (`isIntersecting === true`). Así la tarjeta gráfica nunca trabaja doble y el scroll de toda la página se mantiene a 60 FPS mantequilla.

---

## Checklist Paso a Paso para el Agente Ejecutor (Gemini Flash)

1. [ ] **Generar los 3 renders históricos faltantes** (`01_freecad_v10.png`, `02_parametric_rig.png`, `05_handbuilt_proto.png`) mediante Blender CLI hacia `dist_site/assets/img/timeline/` y copiar/redimensionar (`~900px`) los otros 7 hitos desde `KE_KB_Hardware/Renders/` hacia `dist_site/assets/img/timeline/` (**sin modificar nada en `KE_KB_Hardware/`**).
2. [ ] **Generar `dist_site/assets/models/keyboard_half_showcase.glb`** mediante un script Python en Blender CLI usando `HE_Case_Unibody.blend` + las **30 posiciones reales de `KEY_LAYOUT`** (`build_unibody_case.py`) con keycaps instanciadas (`obj.data` compartido), perilla AS5600, OLED y la textura `pcb_top.png` de Van Gogh sobre la PCB interna.
3. [ ] **Actualizar `dist_site/index.html`** con los 6 bloques mejorados:
   - Hook editorial potente en el Hero (*"Your fingers aren’t binary. Neither is FloatForce."*) + visor 3D de las dos mitades completas con modo rayos-X para ver la PCB de Van Gogh.
   - **Rieles laterales dinámicos** con flujo continuo en reposo (`BASE_IDLE_SPEED`) que aceleran con la velocidad y dirección del scroll.
   - **Tenting Studio en 3D tipo "Puente Levadizo de Van Gogh" (`/   \`)** pivotando ambas mitades desde sus bisagras exteriores (`0° → 25°`).
   - **Fix de `initPos` en el Switch 3D (`setPartOffset`)** para que la `Keycap` y todas las piezas queden perfectamente ensambladas arriba del `Stem` cuando `exp = 0`.
   - **Nuevo Continuous Analog Playground auto-animado** (1: Tecla + Nota musical que crece y se mueve; 2: 4 teclas `WASD` moviendo un joystick 360°; 3: 1 tecla con media presión = letra y presión a fondo = captura de screenshot).
   - **Línea Temporal Horizontal en Scroll** de los 10 prototipos reales desde el primer diseño en FreeCAD hasta V5.0 + PCB Rev A, manteniendo **Future HCI** al final como epílogo.
4. [ ] **Sincronizar a `/tmp/HE_KB_Showcase/`** únicamente `index.html`, `README.md`, `ENGINEERING_FACT_SHEET.md` y `assets/` (excluyendo todos los `.md` de planeación interna y archivos fuente CAD), hacer `git commit` y `git push origin main`.
