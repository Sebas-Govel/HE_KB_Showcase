# Launch Kit — HE-Keyboard / FloatForce

Borrador para revisión del autor. Nada se publica sin tu OK. Los `[CORCHETES]` son datos que solo tú tienes; **no los inventé**.

Reglas de honestidad que respeta todo el texto:
- Probado en mano: switch FloatForce impreso en 3D + macropad de 16 teclas cableado a mano + firmware v0.3.1.
- PCB Rev A: **fabricada, aún sin probar** (`[estado real hoy]`).
- Rev B: **no diseñada**. Solo dirección.
- Crédito explícito a Riskable por la idea de los 3 imanes.

---

## 1. Guión del reel / TikTok (vertical 9:16, ~35 s)

**Idea central:** *"Un teclado cuyas teclas no son 1 y 0."* El gancho es físico (la tecla flota y se siente), no técnico.
**Audio:** música sin letra, subtítulos grandes siempre (mucha gente ve sin sonido). Voz en off opcional; versión EN para Reddit/TikTok global, ES como segunda versión.
**Assets que ya tienes:** `switch_physical_action_1.mp4`, `switch_physical_action_2.mp4`, `macropad_16key_demo.mp4`, `pcb_top_transparent.png`, `vangogh_bridge_1888.jpg`, render explosionado `switch_v5_exploded.png`, captura del playground analógico del sitio.

| Tiempo | Imagen | Texto en pantalla (EN) | Voz (EN) |
|---|---|---|---|
| 0–3 s | **Gancho:** macro del stem bajando despacio con el dedo, se ve el recorrido (switch_physical_action_1). Corte seco. | *This key has no spring.* | "This key has no spring." |
| 3–7 s | Render explosionado: 3 imanes resaltados con flechas. | *3 magnets. 0 metal.* | "Three magnets push and pull the stem. Nothing metal touches." |
| 7–12 s | Macropad 16 teclas funcionando: pulsación suave vs. fuerte; superponer una barra de % que sube con la profundidad. | *Every key knows HOW FAR you pressed.* | "A Hall sensor reads how deep every key is, not just on or off." |
| 12–18 s | Captura del playground: nota que crece con la presión; joystick WASD analógico. | *Music. Gaming. Typing.* | "So one key can swell a note, walk or run, or do two things." |
| 18–23 s | Imprimiendo en Bambu A1 (clip rápido/timelapse si lo tienes `[clip]`) + piezas impresas en la mano. | *Printed at home. Support-free.* | "The switch and keycaps print on a regular 3D printer, no supports." |
| 23–29 s | PCB Rev A negra con serigrafía Van Gogh; transición a la pintura (el morph del hero). | *PCB Rev A: Van Gogh's bridge in copper.* | "The board is out of fabrication. The bridge is Van Gogh's, because tenting lifts the halves like a drawbridge." |
| 29–33 s | Pantalla con 3 ítems: ✅ switch probado · ✅ macropad probado · 🟡 PCB aún sin probar. | *Honest status: PCB not tested yet.* | "I haven't tested the board yet. I'll show you when it arrives." |
| 33–36 s | Logo/URL + repo. | *Open source. Idea credit: @Riskable.* `[URL]` | "Open source. Link in bio." |

**Notas de producción**
- Pon el **gancho en los primeros 2 s**; sin logo ni intro.
- Mantén cada plano ≤ 3 s; sube la velocidad del macropad si queda lento.
- Un clip con **sonido real** (el "clack" suave o su ausencia) funciona bien como gancho de audio.
- El plano de "honest status" es deliberado: genera confianza y evita críticas de "vaporware".
- Versión larga (YouTube Short/Reel 60 s) opcional: añade 10 s del ruido en protoboard y cómo lo arreglaste con la PCB (la historia de "mis soldaduras eran malas").

**Texto de publicación (caption)**
> Springless magnetic keyboard switch I designed and 3D-print at home. Hall sensor reads continuous depth. PCB Rev A just came out of fab (untested for now). Fully open source. `[URL]`
> #mechanicalkeyboard #ergonomic #3dprinting #opensourcehardware #halleffect

---

## 2. Post inicial de Reddit

**Dónde (en orden de afinidad):**
1. **r/ErgoMechKeyboards** — mejor encaje (split, tenting, DIY).
2. **r/MechanicalKeyboards** — más tráfico, más escéptico.
3. **r/OpenSourceHardware** / **r/3Dprinting** — enfoque en impresión y apertura.

Antes de postear: leer las reglas de cada subreddit sobre autopromoción y flair (varios exigen contribuir antes o etiquetar "DIY/Build"). Publicar en un subreddit a la vez, no el mismo día en todos.

### Título (elige uno)
1. `I made a springless magnetic keyboard switch you can 3D print — 3 magnets, Hall sensor, 2.36 mm of continuous travel`
2. `Open-source split keyboard with 3D-printed magnetic switches (Hall effect, no springs). PCB Rev A is back from fab, untested.`
3. `Hand-built a 16-key analog macropad with my own 3D-printed magnetic switches. Here is the working demo and the PCB I'm about to test.`

Recomendado: **#3** para r/ErgoMechKeyboards (empieza con algo que funciona) y **#1** para r/3Dprinting.

### Cuerpo (EN) — listo para pegar

> **TL;DR:** I've been designing a springless keyboard switch that floats on three magnets and is read by a Hall effect sensor, so every key reports *how far* it's pressed, not just on/off. Everything is open source. The switch and a 16-key hand-wired macropad work. The custom PCB just came out of fab and I haven't tested it yet.
>
> **What works today (tested in my hands)**
> - **FloatForce switch (V5):** 3 N52 magnets (Ø4×1.5 mm), no springs, no contact leaf. 12×12 mm housing, 2.36 mm of travel. Prints on a Bambu A1 with no supports (housing printed on its back wall, stem printed flat so layer lines run along the travel direction).
> - **16-key macropad:** hand-wired with SS49E sensors and a mux, running Zephyr firmware on a nRF52840 (SuperMini). Video below.
> - **Calibrated tolerances** for press-fit magnet sockets and keycap/stem fit; they're written down in the repo so you don't have to repeat my failed prints.
>
> **What I haven't proven yet (being honest)**
> - **PCB Rev A** (30 keys per half, HAL403SO sensors, 4× TMUX1308 muxes, per-key RGB, ambidextrous so one board works for both halves): fabricated at JLCPCB, **not tested yet** `[estado real hoy]`. My hand-soldered protoboard rig was noisy (crosstalk, drift), mostly my soldering and no decoupling caps, so Rev A adds a bypass cap per sensor and splits the mux load across two ADC pins. Whether that actually fixes it is exactly what I'll find out.
> - **Rev B** (on-PCB trackpad, separate L/R boards, power gating) is a direction only. It isn't designed.
>
> **Why I'm doing this**
> I wanted analog keys (pressure-sensitive notes, proportional WASD, two actions per key depending on depth) without a closed ecosystem, and I wanted a split with real tenting that anyone can print. The ergonomic tenting concept is a "drawbridge": outer edges stay on the desk, inner edges rise.
>
> **Credit where it's due:** the three-magnet idea was inspired by Riskable's open-source work. My design (U-body housing, keyed side wall, closed-front stem, the sensor chain, firmware, magnetic simulation in Magpylib) was modeled and calibrated from scratch.
>
> **Transparency:** I'm an independent maker in Mexico with no EE background. I use AI heavily for CAD, simulation and PCB work, and I check outputs against datasheets. If you see a mistake, please tell me.
>
> **Links**
> - Interactive page (3D switch, tenting viewer, analog demos): `[URL showcase]`
> - Repo (CAD, KiCad, firmware, fact sheet; CERN-OHL-P): `[URL repo]`
>
> **Questions I'd love feedback on**
> 1. Is 2.36 mm too short or too long for a Hall-effect switch you'd type on all day?
> 2. Anyone who has used HAL-style SOT-23 sensors on the underside of a 1.6 mm board: any saturation surprises with a centered magnet?
> 3. What would make you actually build one: a kit, a BOM cost, or build-guide videos?

### Reglas para el comentario fijado
Publicar tú mismo un primer comentario con: BOM aproximado por mitad **solo si tienes la cifra** `[costo]`, lista de archivos y "what I'll post next" (resultado del bring-up de Rev A).

### Respuestas preparadas a objeciones frecuentes
| Objeción | Respuesta corta honesta |
|---|---|
| "Hall effect ya existe (Wooting, etc.)" | Sí. Lo diferente: switch 3D-printable, sin resortes, abierto y reproducible en casa. No compito en pulido con productos comerciales. |
| "¿Cuánto cuesta?" | `[cifra]` por mitad; si no la tienes: "Aún estoy calculando con el BOM final; lo publicaré cuando Rev A esté probada." |
| "¿Los imanes no interfieren entre teclas?" | Es el principal riesgo; se midió/simuló con Magpylib (`[link]`) y la prueba real con Rev A lo confirmará. |
| "¿Es IA slop?" | La IA ayudó con CAD/simulación/PCB; todo se verificó con datasheets y prototipos físicos que se ven en el video. |
| "¿Cuándo hay kits?" | No hay promesa. Primero validar Rev A. |

### Calendario sugerido (sin gastar nada)
1. Hoy–mañana: aplicar bloque A de `CAMBIOS_PROPUESTOS_V7_TODO.md` (sobre todo A3 correo y A4 estado) antes de enlazar la página.
2. Grabar/editar el reel con los assets existentes.
3. Publicar en **r/ErgoMechKeyboards** primero; responder todos los comentarios las primeras 3 h.
4. Una semana después: reel + post de seguimiento (bring-up de la PCB) con datos reales.

---

## 3. Pendientes del autor antes de publicar
- [ ] Estado real de Rev A hoy.
- [ ] URLs finales (showcase y repo) y que el repo tenga licencia + archivos que se mencionan.
- [ ] ¿Tienes cifra de costo de BOM? (si no, se omite).
- [ ] ¿Clip de impresión 3D y video con audio real del switch?
- [ ] Revisar reglas de autopromoción del subreddit elegido.
- [ ] Resolver discrepancias técnicas B1–B2 de la lista de cambios (rango de saturación del HAL403 y batería vs USB-C) antes de citar cifras en público.
