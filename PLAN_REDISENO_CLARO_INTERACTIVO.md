# Plan Maestro de Rediseño Web v2: Editorial Cálido, Tipografía Serif e Interactividad 3D

> **Propósito de este documento:** Guía de implementación exacta y autocontenida pensada para ser ejecutada directamente por **Gemini Flash** en la siguiente sesión.  
> **Archivos objetivo a modificar:**
> 1. `/home/sebas/HE_Keyboard_Plan/dist_site/index.html`
> 2. `/home/sebas/HE_Keyboard_Plan/dist_site/README.md`
> 3. `/home/sebas/HE_Keyboard_Plan/dist_site/ENGINEERING_FACT_SHEET.md`
> *(Posteriormente sincronizar únicamente los archivos públicos a `/tmp/HE_KB_Showcase/` — **NUNCA** subir este documento de plan ni archivos fuente `.blend` / `.stl` de fabricación).*

---

## 1. Nueva Identidad Visual: Luminosa, Editorial y Humana (Adiós al "Dark Tech Vibecodeado")

Abandonamos por completo el cliché de fondo negro (`#0a0a0c`) con acentos neón/azul cielo (`#38bdf8`) y exceso de texto monoespaciado. El nuevo diseño debe sentirse como una **revista impresa de diseño industrial y arte** (inspirado en *Kinfolk*, *Teenage Engineering* sobre papel cálido, *Analogue* y catálogos de museo).

### 1.1 Paleta de Colores Exacta (Tailwind Config)
Configurar en el bloque `tailwind.config` de `index.html`:

| Token | Hex | Rol Visual |
| :--- | :--- | :--- |
| `paper.base` | `#FAF7F2` | Fondo principal cálido (papel algodón / crema suave, amigable a la vista) |
| `paper.surface` | `#F2EDE4` | Secciones alternas suaves y fondos de contenedores secundarios |
| `paper.card` | `#FFFFFF` | Tarjetas limpias y luminosas con sombra cálida muy difusa |
| `paper.border` | `#E5DEC9` | Líneas divisorias finas de 1px (tono arena/piedra sutil) |
| `ink.primary` | `#1E1D1A` | Texto principal y titulares (carbón tinta cálido, nunca negro puro `#000`) |
| `ink.secondary` | `#5C5852` | Párrafos descriptivos (gris tierra legible, alto contraste sobre crema) |
| `ink.muted` | `#8A847C` | Etiquetas discretas y metadatos |
| `accent.terracotta` | `#C85A32` | Acento primario cálido (botones principales, estados activos, energía magnética) |
| `accent.sage` | `#2F6B4F` | Acento secundario orgánico (ergonomía, validación, hardware abierto) |
| `accent.ochre` | `#C98A2C` | Acento artístico (guiño directo al puente de Arlés de Van Gogh y grant 1517) |

*Nota sobre las imágenes de la PCB Negra:* Sobre tarjetas color crema/arena suave (`#F2EDE4`), la PCB en **Matte Black con serigrafía blanca de Van Gogh** resaltará como un objeto físico real fotografiado sobre una mesa de estudio, en lugar de perderse contra un fondo negro. Recortar o estilizar los contenedores de imagen con fondos suaves (`#EAE4D8` o `#181818` solo cuando el render tenga fondo negro sólido, usando bordes redondeados limpios `rounded-2xl` y sombra suave `shadow-sm` sin marcos tipo ventana de código).

---

## 2. Sistema Tipográfico Editorial con Serifas

Reemplazar la combinación robótica actual (`Inter` + `JetBrains Mono` en todas las tarjetas) por una jerarquía editorial cálida desde Google Fonts:

1. **Titulares y Encabezados (`font-serif`):** **`Fraunces`** (pesos 400, 600, italic) o **`Instrument Serif`** / **`Newsreader`**.
   - Uso: `<h1>`, `<h2>`, citas destacadas y números grandes. Aporta calidez artesanal, elegancia y personalidad inmediata.
   - Aplicar `tracking-tight` y cursivas sutiles en palabras clave humanas (ej. *"Redesigning how hands *feel* the digital world"*).
2. **Cuerpo de Texto e Interfaz (`font-sans`):** **`Plus Jakarta Sans`** o **`DM Sans`** (pesos 400, 500, 600).
   - Uso: Todos los párrafos, tarjetas, botones y navegación (`text-base` 16px y `text-lg` 18px con `leading-relaxed`).
   - **Regla estricta:** Quitar la clase `font-mono` de las rejillas de tarjetas (Pillars, Roadmap, Timeline, Gallery).
3. **Datos Técnicos Puntuales (`font-mono`):** **`JetBrains Mono`** (peso 500).
   - Uso **exclusivo** para cifras en tablas (`$450.00`, `2.36 mm`, `1.4 mA`) o badges diminutos de versión (`V5.0`).

---

## 3. Animaciones de Scroll y Visor 3D Interactivo del Switch

El sitio debe sentirse **vivo, táctil y juguetón** mientras el usuario hace scroll o interactúa con el cursor/dedo.

### 3.1 Escena 3D Interactiva del Switch FloatForce V5.0 (Explode & Press)
Integrar **Three.js ligero vía ES Module CDN** (`three@0.160.0`) en una sección protagonista dedicada al **FloatForce Switch (V5.0)**:

* **Protección Estricta de Propiedad Intelectual (IP):**
  * **NO** copiar archivos `.stl` de impresión real ni `.blend` al repositorio público.
  * Generar mediante un pequeño script de Blender headless (`blender -b KE_KB_Hardware/HE_Switch_V5_UBody.blend --python ...`) un archivo **`dist_site/assets/models/floatforce_v5_visual.glb`** con modificador *Decimate* (baja densidad poligonal puramente visual, sin tolerancias internas reales) y objetos separados por nombre: `U_Body`, `SideWall`, `Stem`, `Magnet_Floor`, `Magnet_Top`, `Magnet_Stem`, `Keycap`. *(Alternativa si se prefiere 0 archivos binarios extra: construir las 6 piezas estilizadas directamente con geometrías limpias biseladas en Three.js).*
* **Comportamiento Interactivo + Scroll:**
  1. **Scroll-Driven Explosion:** Al llegar a la sección del switch y hacer scroll, las piezas se separan suavemente en el eje vertical/lateral mostrando el `U-Body`, la tapa `SideWall` y los **3 imanes de neodimio** flotando en el interior, y vuelven a ensamblarse al continuar bajando.
  2. **Botón / Tecla Interactiva ("Press Me" o barra espaciadora):** El usuario puede arrastrar para rotar el modelo 3D sobre el fondo crema iluminado con luz de estudio suave, o mantener presionado un botón para ver cómo el stem baja `2.36 mm` comprimiendo el campo magnético.

### 3.2 Animación de Presión Analógica y Cambio de Tono/Color al Hacer Scroll
Crear un componente visual interactivo (**"Continuous Analog Playground"**) que demuestre sin jerga técnica qué significa un teclado analógico continuo:
* A medida que el usuario hace scroll (o mueve un slider táctil de `0.0 mm` a `2.36 mm`):
  1. **Ilustración SVG animada de un switch en corte:** El vástago baja suavemente; las ondas magnéticas entre los imanes pasan gradualmente de **verde salvia tranquilo (`#2F6B4F`)** a **ocre cálido (`#C98A2C`)** y **terracota vibrante (`#C85A32`)**.
  2. **Respuesta Multimodal en Vivo (3 indicadores visuales sincronizados):**
     - **Música:** Barras de onda sonora que crecen en amplitud y cambian de matiz armónico según la profundidad de presión (incluso opcionalmente un tono Web Audio API suave y agradable si el usuario hace clic en *" Enable Sound"*).
     - **Movimiento Analógico:** Un ícono/figura geométrica que avanza lento al presionar 20% y corre fluido al llegar al 100%.
     - **Punto de Actuación Personalizable:** Una línea punteada que el usuario puede mover para decidir a qué altura exacta "hace clic" su tecla.

### 3.3 Micro-Animaciones Orgánicas en la Página
* **Perilla Rotatoria en Scroll:** Un elemento gráfico minimalista inspirado en el encoder magnético AS5600 que gira suavemente (`transform: rotate(...)`) en proporción al progreso de lectura de la página.
* **Aparición Suave (Scroll Reveal):** Usar `IntersectionObserver` con transiciones suaves (`opacity` + `translateY(16px)`, duración `600ms`, curva `cubic-bezier(0.22, 1, 0.36, 1)`). Sin rebotes bruscos.

---

## 4. Podado Editorial y Eliminación de Texto Innecesario / Repetitivo

El sitio actual repite los mismos conceptos hasta 3 veces y contiene etiquetas técnicas artificiales que rompen la magia. Aplicar esta limpieza:

### 4.1 Eliminar "Footnotes" y Etiquetas Robóticas de Renders
Eliminar por completo frases que anuncian que una imagen es generada o explican lo obvio:
* ❌ Eliminar: `"Raytraced 3D"`, `"Matte Black Raytraces"`, `"Raytraced in Matte Black..."`
* ❌ Eliminar: `"Click to Enlarge"`, `"Click anywhere outside to dismiss"`, `"Open Raw File ->"`
* ❌ Eliminar prefijos numerados fríos: `"Section 01"`, `"Section 03"`, `"Section 04"`, `"Section 07 • The Pitch"`
* ❌ Eliminar subtítulos repetitivos bajo las fotos como `"Zero Top SMDs Under Switches"` repetido en varias partes.
* ✅ Reemplazar por pies de foto breves y editoriales cuando aporten valor real, o simplemente el título limpio de la pieza (ej. *"PCB Rev A — Frente con serigrafía de Van Gogh"*).

### 4.2 Eliminar Redundancia Estructural (Consolidar Secciones)
1. **Quitar la cuadrícula de 6 "Metric Chips" del Hero:** Esos 6 recuadros repiten palabra por palabra lo que dicen las tarjetas de abajo. Dejar un **Hero limpio y respirado**: Título en Serif grande + 1 párrafo claro y humano + 2 botones limpios + visual principal (o switch interactivo).
2. **Fusionar "The Vision (Status Quo vs Solution)" con "The 7 Pillars":** En lugar de tener una comparativa larga seguida de 7 tarjetas que vuelven a explicar ergonomía, 3D printing y multimodalidad:
   - Dejar una sección narrativa fluida con el **Playground Analógico Interactivo** (Ergonomía + Expresión Musical/Analógica + Controles Físicos).
   - Dejar una cuadrícula limpia y concisa de **4 bloques esenciales de Filosofía Abierta**:
     1. *Ergonomía Natural (Split + Tenting)*
     2. *Impresión 3D Sin Soportes para Cualquier Idioma*
     3. *"Endgame for Everyone" (Cero Paywalls)*
     4. *Modelo Abierto estilo Prusa desde México + Ingeniería asistida por IA*

---

## 5. Correcciones Obligatorias de Texto y Presupuesto (En los 3 Archivos)

Aplicar estos dos cambios exactos en **`index.html`**, **`README.md`** y **`ENGINEERING_FACT_SHEET.md`**:

### 5.1 Eliminar `"Polyphonic aftertouch"` -> Lenguaje Musical Claro y Entendible
Buscar todas las apariciones de `polyphonic aftertouch` / `Polyphonic Aftertouch` (insensible a mayúsculas) y reemplazarlas por expresiones naturales que cualquier persona entienda al instante:

* **Antes:** *"expressive MIDI controller with polyphonic aftertouch"* / *"Polyphonic MIDI aftertouch"*
* **Después (Inglés):** *"expressive musical controller where every key responds continuously to how softly or deeply you press—letting you swell volume, bend notes, or shape sound naturally"* (y en tablas/resúmenes cortos: *"Continuous pressure-sensitive MIDI expression per key"*).

### 5.2 Eliminar `"resins"` / `"resinas"` del Presupuesto ($200.00 USD)
Por ahora únicamente se comprarán **filamentos de impresión 3D (FDM)**, no resinas. Buscar `resins` / `SLA` en los 3 archivos y corregir:

* **En `index.html` (Tabla de Grant - Rubro 3, $200.00 USD):**
  * *Antes:* `"Filaments and resins to iterate ergonomic tenting stands..."`
  * *Después:* `"3D printing filaments to iterate ergonomic tenting stands, custom keycap sets, and open step-by-step build guides for AI-assisted hardware creation."`
* **En `README.md` (Sección Grant Allocation - $200.00 USD):**
  * *Antes:* `"Filaments and resins to iterate ergonomic tenting stands..."`
  * *Después:* `"3D printing filaments to iterate ergonomic tenting stands, multilingual keycap testing, and open beginner-friendly build guides."`
* **En `ENGINEERING_FACT_SHEET.md` (Sección 5.3 y Tabla ASCII Sección 8):**
  * En Sección 5.3: Cambiar `"clean FDM/SLA printing"` por `"clean FDM 3D printing"`.
  * En Tabla Sección 8 (`$200.00`): Cambiar `"Filaments/resins for ergonomic tenting..."` por `"3D printing filaments for ergonomic tenting..."`.

---

## 6. Elementos que DEBEN Conservarse Intactos

Al hacer el rediseño visual y la poda de texto, mantener fielmente estos pilares clave ya aprobados:
1. **Nombre del Switch y Atribución:** **FloatForce Switch (V5.0)** en todo el sitio, manteniendo la nota transparente de atribución comunitaria a **Riskable** por la inspiración del concepto de 3 imanes, y dejando claro que la arquitectura mecánica `U-Body + Keyed SideWall + Closed-Front Stem` fue modelada, simulada con **Magpylib** y calibrada 100% desde cero.
2. **Art Meets Engineering:** La sección dedicada a *"The Langlois Bridge at Arles" (1888)* de Vincent van Gogh en la PCB Matte Black con serigrafía blanca.
3. **Roadmap Rev B (Integración Vertical — objetivo de grant, NO diseñado aún):** Trackpad capacitivo grabado directamente en el cobre de la PCB con chip Azoteq, PCBs dedicadas Izquierda/Derecha, SoC nRF52840 bare-metal en placa y sensor power gating (`< 20 µA` sleep como objetivo no verificado hasta que Rev B exista).
4. **Beyond the Keyboard (Futuro HCI):** Ratones analógicos sin fricción, lentes de eye-tracking espacial que detectan los biseles del monitor, e interfaces bio-sutiles.
5. **Presupuesto Exacto de $1,000 USD (1517 Medici Grant):**
   - `$450.00` — R&D Seed Capital Recovery & Continuity Runway (Rev A -> Rev B)
   - `$350.00` — PCB Rev B Fabrication & Interactivity Modules
   - `$200.00` — Open-Source Ecosystem, 3D Printing Filaments & Build Guides
   - Total: `$1,000.00` (usar entidad `&#36;` en HTML para evitar errores de escapado).

---

## 7. Checklist Paso a Paso de Ejecución para Gemini Flash

Cuando el usuario pida aplicar este documento:
1. [ ] **(Opcional / Recomendado para 3D)** Ejecutar un script rápido en Blender CLI sobre `KE_KB_Hardware/HE_Switch_V5_UBody.blend` para exportar `dist_site/assets/models/floatforce_v5_visual.glb` (malla simplificada solo visual con colores de materiales limpios, sin exponer STLs de producción), o implementar las piezas estilizadas del switch directamente en Three.js.
2. [ ] Reescribir `dist_site/index.html` con la paleta crema cálida (`#FAF7F2`), tipografía `Fraunces` + `Plus Jakarta Sans`, el visor 3D / animación de switch vinculada al scroll, poda de textos repetitivos/footnotes, eliminación de *"polyphonic aftertouch"* y eliminación de *"resins"*.
3. [ ] Actualizar `dist_site/README.md` y `dist_site/ENGINEERING_FACT_SHEET.md` eliminando `"polyphonic aftertouch"` y `"resins"` / `"SLA"`.
4. [ ] Verificar con `grep -riE "aftertouch|resin|MagLev" dist_site/` que haya **cero** ocurrencias en los archivos de salida (`index.html`, `README.md`, `ENGINEERING_FACT_SHEET.md`).
5. [ ] Copiar únicamente `index.html`, `README.md`, `ENGINEERING_FACT_SHEET.md` y `assets/` hacia `/tmp/HE_KB_Showcase/` (**no** copiar este archivo `PLAN_REDISENO_CLARO_INTERACTIVO.md`), hacer commit y `git push origin main` para actualizar GitHub Pages.
