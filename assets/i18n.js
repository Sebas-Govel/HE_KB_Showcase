// Multilingual Dictionary & Localization Engine (EN, ES, FR, DE)
window.translations = {
      en: {

        nav_build: "Build Guide",
        build_eyebrow: "Open-Source Maker Guide",
        build_title: "Build It Yourself: Bill of Materials & CAD",
        build_desc: "FloatForce was designed from first principles so that anyone with an everyday desktop 3D printer can replicate, customize, and build it without proprietary tools or industrial injection molds.",
        status_eyebrow: "Engineering Rigor & Transparency",
        status_title: "Honest Verification Matrix: What's Real Today",
        status_desc: "We clearly separate bench-tested physical hardware from ordered prototypes in production and future research directions. No marketing hype; pure engineering transparency.",

        nav_ergo: "Ergonomics",
        nav_floatforce: "FloatForce 3D",
        nav_analog: "Continuous Analog",
        nav_rd: "R&D Evolution",
        nav_art: "Art & PCB",
        nav_revb: "Rev B",
        nav_real: "What's Real?",
        nav_grant: "1517 Pitch",
        nav_gallery: "Gallery",
        hero_badge: "1517 Fund • Medici Candidate • Open Hardware →",
        hero_title: 'Humans express far more than 1 and 0,<br><span class="italic font-normal text-accent-terracotta">FloatForce</span> gives everyone a way to feel everything in between.',
        hero_p1: "Meet the low-cost, open-source split keyboard where every key floats on magnets instead of metal springs—turning continuous physical depth into expressive music, 360° analog game vectors, and effortless tactile typing.",
        hero_p2: "Engineered from scratch for affordable fabrication: a low-cost standard PCBA architecture, 100% support-free 3D printing on everyday desktop printers, and lifted like an architectural drawbridge for natural ergonomic comfort.",
        hero_btn_watch: "Watch It Open & Play ↓",
        hero_btn_sheet: "Fact Sheet (MD) →",
        hero_stat_matrix: "Full 60-Key Split Matrix",
        hero_stat_stroke: "Magnetic Stroke (+33%)",
        hero_stat_power: "Sensor Power (HAL403SO)",
        hero_stat_supports: "Support-Free 3D Printed",
        hero_canvas_tag: "Physical PCB Rev A Art",
        hero_canvas_caption: "Physical PCB Rev A (JLCPCB Standard SMT): All 30 Hall sensors, multiplexers, and power-gating circuitry reside exclusively on the bottom layer. The top surface is a monolithic tactile canvas dedicated to Van Gogh's drawbridge.",

        drawbridge_eyebrow: "Van Gogh’s Drawbridge Metaphor",
        drawbridge_title: "Like Van Gogh’s Drawbridge: Split & Tenting Ergonomics",
        drawbridge_desc: "Why did we etch a drawbridge onto our PCB? Because ergonomic tenting works just like a drawbridge opening in two: the outer pinky edges stay anchored on your desk while the inner thumb edges rise (0° → 25°), rotating your forearms out of painful flat twist into a natural, relaxed handshake.",

        ff_eyebrow: "Parametric Magnetic Kinematics",
        ff_title: "FloatForce V5.0: The Springless Magnetic Switch",
        ff_desc: "Traditional mechanical switches rely on metal leaf springs that degrade, introduce contact chatter, and limit travel to binary on/off. FloatForce replaces mechanical contact with 3 precision neodymium magnets and a ratiometric Hall sensor.",

        analog_eyebrow: "Real-Time Hardware Emulation",
        analog_title: "Continuous Analog Playground",
        analog_desc: "Experience how continuous Hall sensor depth transforms typing into three dynamic interaction paradigms. Press and hold your physical keys (W, A, S, D, Space) or drag the switch stem slider below.",

        timeline_eyebrow: "Engineering Log & Milestones",
        timeline_title: "Prototype Evolution: First Sketch to Production",
        timeline_desc: "Ten real hardware milestones demonstrating our rigorous physical engineering process—from early FreeCAD geometries and protoboards to sub-millimeter Bambu Lab A1 calibration and final SMT fabrication at JLCPCB.",

        art_eyebrow: "Aesthetic Functionalism",
        art_title: "Van Gogh’s Langlois Bridge: High-Art Silkscreen",
        art_desc_1: "When ordering our PCB Rev A from JLCPCB, we chose Matte Black solder mask with Pure White silkscreen.",
        art_desc_2: "The vector art etched into the front copper and silkscreen is Van Gogh’s famous Langlois drawbridge in southern France. We chose this masterpiece because a bridge represents the quintessential union of structural civil engineering and profound human emotion—just as this keyboard bridges electronics with human expression.",

        roadmap_eyebrow: "Rev B Direction — Not Yet Designed",
        roadmap_title: "Rev B: Medici Grant Direction (Exploratory)",
        roadmap_desc: "Protoboard and macropad testing exposed noise issues that shaped the Rev A design. Rev A validation starts on delivery. Rev B is a Medici grant direction — it has not been designed yet. These are the exploration areas, not Rev A specs:",

        real_eyebrow: "Physical Proof • Working Hardware",
        real_title: "¿What’s actually real?",
        real_desc: "FloatForce was not conceived in pure theory or ungrounded CAD software. Over months of hands-on physical prototyping in Mexico, every kinematic dimension, magnetic gap, and analog sensor response was tested by hand. Below is the unvarnished physical laboratory proof: working prototypes, live switch actuation, and the 16-key macropad that proves this technology works in the real world.",
        real_video_badge_1: "Live Physical Macropad",
        real_macropad_badge: "Master Proof of Concept",
        real_macropad_title: "The 16-Key Functional Macropad: Proving FloatForce in the Real World",
        real_macropad_desc_1: "Before committing personal savings to full PCB manufacturing, we validated our architecture across two distinct physical test rigs: a 15-sensor hand-soldered protoboard rig (channels C0–C14 on CD74HC4067) to establish Zephyr RTOS firmware timings, and this 16-key functional macropad to physically test switch stroke, keycap retention, and magnetic repulsion. Working keys proved that the 3-magnet repulsive suspension produces smooth vertical travel without spring wear or mechanical binding.",
        real_macropad_desc_2: "Crucially, hand-soldered protoboard tests exposed real analog engineering challenges: flying wires suffered from stray parasitic capacitance, line-to-line crosstalk, and signal drift due to missing per-sensor decoupling capacitors. These exact bench lessons directly drove the architecture of PCB Rev A—incorporating dedicated 100 nF bypass caps at every HAL403SO, a dual-bank TMUX1308 multiplexer split that slashes bus capacitance by 34%, and unbroken ground planes.",
        real_switch_title_1: "Springless Magnetic Levitation",
        real_switch_desc_1: "Close-up physical test of the 3-magnet repulsive suspension. Watch how the stem glides vertically with no metal springs or contact leaf friction, spring crunch, or binding, producing a naturally smooth, progressive force curve.",
        real_switch_title_2: "Instant Snap Return & Tactile Stability",
        real_switch_desc_2: "Demonstrating the rapid magnetic snap upon release. The magnetic field naturally accelerates the stem back to its home position, ensuring instantaneous key resets with no mechanical leaf debounce needed.",
        real_gallery_title: "Laboratory Bench & Physical Assembly Log",
        real_g1_title: "16-Key Assembled Bed",
        real_g1_desc: "Functional prototype validating plate stability, switch retention, and keycap ergonomics under typing load.",
        real_g2_title: "Ergonomic 18 × 17 mm Pitch",
        real_g2_desc: "Compact Choc-spaced grid reducing finger travel distance while maintaining complete magnetic isolation between adjacent sensors.",
        real_g3_title: "Analog Sensor Array Rig",
        real_g3_desc: "Hand-soldered Hall sensor matrix validating settling times, decoupling capacitors, and ADC noise floor.",
        real_g4_title: "FDM Monolithic U-Body",
        real_g4_desc: "Calibrated press-fit neodymium magnet sockets with zero print supports on everyday desktop 3D printers.",

        grant_eyebrow: "The Pitch",
        grant_title: "1517 Fund Medici Grant Allocation",
        grant_builder_title: "The Autodidactic Builder Journey",
        roadmap_status: "Rev B not yet designed — grant direction only",
        hero_status_txt: "Rev A ordered at JLCPCB (~3-4 wks delivery)",
        progress_eyebrow: "Project Status",
        progress_title: "From hand-soldered prototypes to Rev B",
        progress_current: "Now: Rev A in transit to Mexico for hardware bring-up.",
        progress_pct_label: "milestones completed",
        progress_m1: "Hand-soldered R&D prototypes",
        progress_m2: "3D-printed designs validated",
        progress_m3: "PCB Rev A manufactured",
        progress_m4: "Rev B design (Medici grant)",
        marquee_title: "From the workbench — real prototypes, not renders",
        marquee_c1: "16-key macropad — hand-wired and fully functional",
        marquee_c2: "Hand-soldered R&D rig — 15 Hall sensors + MUX",
        marquee_c3: "3D-printed switch housing — magnet sockets",
        marquee_c4: "Macropad top — continuous analog depth sensing",

        gallery_eyebrow: "Open Engineering Archive",
        gallery_title: "Curated Asset Gallery"
        nav_about: "About",
        about_eyebrow: "The Builder Behind FloatForce • Solo Maker in Mexico",
        about_title: "Why I’m Building an Unorthodox Hardware Interface",
        about_badge: "Sebastián González V. • Mexico City • Independent Hardware Maker",
        about_p1: "I am an independent maker based in Mexico City. I started this project out of frustration with the commercial keyboard industry: multi-hundred dollar price tags on closed black boxes with proprietary switches, fragile mechanical leaves, and artificial software tiers. I wanted a keyboard with continuous analog sensing, true ergonomic tenting, and zero mechanical wear—designed so anyone with an everyday 3D printer can build, customize, and repair it anywhere in the world.",
        about_ai_label: "AI as an Engineering Copilot",
        about_ai_txt: "Historically, designing custom analog hardware required venture capital and a specialized team in Silicon Valley. By using modern AI as an engineering copilot (Magpylib for magnetic simulation, KiCad 10 for multi-channel PCB routing, Python for procedural CAD, Zephyr RTOS for embedded firmware), I designed, calibrated, and sent to fabrication this entire physical stack as a solo maker in Mexico—demonstrating a new paradigm for decentralized hardware innovation.",
        grant_sec_eyebrow: "1517 Fund • Medici Project Candidate",
        grant_sec_title: "$1,000 USD Medici Grant: Forward Runway & The Prusa Model",
        grant_sec_desc: "1517 backs unorthodox builders tackling difficult physical challenges. All past R&D (~$500 USD) was self-funded from personal savings as tangible proof of commitment and execution capacity—not for reimbursement. This $1,000 USD grant provides 100% forward-looking continuity runway to validate Rev A, iterate toward Rev B, and publish open-source build guides.",
        grant_table_h_item: "ITEM & CATEGORY",
        grant_table_h_cost: "COST (USD)",
        grant_table_h_purpose: "ENGINEERING PURPOSE & IMPACT",
        grant_table_h_deliverable: "DELIVERABLE",
        grant_row1_title: "1. Rev B Prototyping ($250)",
        grant_row1_sub: "Fund a Rev B PCB iteration informed by Rev A testing, plus sensors, OLEDs, encoders, batteries and magnets for working test units",
        grant_row1_desc: "Funding a refined Rev B PCB fabrication run informed by Rev A bench testing, plus precision Hall sensors, OLEDs, rotary encoders, LiPo batteries, and neodymium magnets for working test units.",
        grant_row1_del: "Rev B PCB Iteration & Working Units",
        grant_row2_title: "2. Brand, Legal Protection & Tax Advisory ($300)",
        grant_row2_sub: "Register project trademark in Mexico (IMPI), prior-art search, IP consultation, and tax advisory for third-party build certification",
        grant_row2_desc: "Registering the official FloatForce / HE-Keyboard trademark with the Mexican Patent and Trademark Office (IMPI), conducting a prior-art search, and obtaining professional IP and tax advisory to establish an official, legally compliant third-party certification program.",
        grant_row2_del: "IMPI Trademark Registration, IP & Tax Advisory",
        grant_row3_title: "3. Materials R&D, 3D Tooling & Creator Setup ($450)",
        grant_row3_sub: "Specialized engineering filaments, custom nozzles, BMCU 370C multicolor keycap setup / resin 3D outsourcing, plus creator audio gear for Patreon",
        grant_row3_desc: "Testing specialized filaments and precision nozzles to dial in mechanical tolerances, exploring a BMCU 370C multicolor keycap setup or resin printing with third-party labs for tactile R&D, and acquiring extra hardware including a dedicated microphone for the Patreon community setup and open build tutorials.",
        grant_row3_del: "Specialized 3D Tooling, Resin/Multicolor R&D & Audio Setup",
        grant_total_label: "TOTAL GRANT ALLOCATION",
        grant_total_sub: "100% Direct Product R&D • Zero Reimbursement",
        grant_prusa_title: "The Prusa Open-Source Business Model from Mexico",
        grant_prusa_desc: "Following Josef Prusa’s philosophy: 100% of the CAD files, circuit schematics, and Zephyr RTOS firmware remain permanently free and open-source under CERN-OHL-W v2. To build a sustainable, self-funding business, we plan three concrete monetization streams: 1) Official Certification of third-party products under a protected trademark owned by the author (IMPI), ensuring quality and compatibility; 2) An official Patreon community offering early design access and technical build logs; and 3) Simple direct donations from enthusiasts who support open human interface hardware.",
        grant_row5_del: "Domain, Hosting & Video Setup",

      },

      es: {

        nav_build: "Guía de Armado",
        build_eyebrow: "Guía de Fabricación Abierta",
        build_title: "Ármalo Tú Mismo: Lista de Materiales y CAD",
        build_desc: "FloatForce fue diseñado desde primeros principios para que cualquier persona con una impresora 3D de escritorio común pueda replicarlo, personalizarlo y construirlo sin herramientas propietarias ni moldes de inyección industrial.",
        status_eyebrow: "Rigor y Transparencia de Ingeniería",
        status_title: "Matriz de Verificación Honesta: Qué es Real Hoy",
        status_desc: "Separamos con rigor el hardware físico probado en banco, los prototipos en producción en camino y las futuras direcciones de investigación. Sin marketing engañoso; pura transparencia de ingeniería.",

        nav_ergo: "Ergonomía",
        nav_floatforce: "FloatForce 3D",
        nav_analog: "Analógico Continuo",
        nav_rd: "Evolución I+D",
        nav_art: "Arte y PCB",
        nav_revb: "Rev B",
        nav_real: "¿Qué es Real?",
        nav_grant: "Pitch 1517",
        nav_gallery: "Galería",
        hero_badge: "Fondo 1517 • Candidato Proyecto Medici • Hardware Abierto →",
        hero_title: 'Los humanos expresan mucho más que 1 y 0,<br><span class="italic font-normal text-accent-terracotta">FloatForce</span> le da a todos una forma de sentir todo lo que hay en medio.',
        hero_p1: "Conoce el teclado dividido de bajo costo y código abierto donde cada tecla flota sobre imanes en lugar de resortes metálicos, convirtiendo la profundidad física continua en música expresiva, vectores analógicos de 360° para videojuegos y una escritura táctil sin esfuerzo.",
        hero_p2: "Diseñado desde cero para una fabricación económica: arquitectura PCBA estándar de bajo costo, impresión 3D 100% libre de soportes en impresoras comunes y elevado como un puente levadizo para un confort ergonómico natural.",
        hero_btn_watch: "Míralo Abrir y Jugar ↓",
        hero_btn_sheet: "Ficha Técnica (MD) →",
        hero_stat_matrix: "Matriz Dividida 60 Teclas",
        hero_stat_stroke: "Recorrido Magnético (+33%)",
        hero_stat_power: "Consumo Sensor (HAL403SO)",
        hero_stat_supports: "Impresión 3D Sin Soportes",
        hero_canvas_tag: "Arte en PCB Rev A",
        hero_canvas_caption: "PCB Rev A física (JLCPCB SMT Estándar): Los 30 sensores Hall, multiplexores y circuitería de alimentación residen exclusivamente en la cara inferior. La cara superior es un lienzo táctil monolítico dedicado al puente levadizo de Van Gogh.",

        drawbridge_eyebrow: "La Metáfora del Puente Levadizo de Van Gogh",
        drawbridge_title: "Como el Puente Levadizo de Van Gogh: Ergonomía Dividida e Inclinada",
        drawbridge_desc: "¿Por qué grabamos un puente levadizo en nuestra PCB? Porque la inclinación ergonómica funciona exactamente como un puente levadizo que se abre en dos: los bordes exteriores de los meñiques descansan en el escritorio mientras los bordes interiores de los pulgares se elevan (0° → 25°), rotando los antebrazos hacia un saludo de manos natural y relajado.",

        ff_eyebrow: "Cinemática Magnética Paramétrica",
        ff_title: "FloatForce V5.0: El Switch Magnético Sin Resortes",
        ff_desc: "Los switches mecánicos tradicionales dependen de resortes metálicos que se degradan, generan rebotes de contacto y limitan el movimiento a un encendido/apagado binario. FloatForce reemplaza el contacto mecánico con 3 imanes de neodimio y un sensor Hall ratiométrico.",

        analog_eyebrow: "Emulación de Hardware en Tiempo Real",
        analog_title: "Laboratorio Analógico Continuo",
        analog_desc: "Experimenta cómo la profundidad continua del sensor Hall transforma la escritura en tres paradigmas interactivos dinámicos. Presiona tus teclas físicas (W, A, S, D, Espacio) o arrastra el control deslizante a continuación.",

        timeline_eyebrow: "Bitácora de Ingeniería e Hitos",
        timeline_title: "Evolución del Prototipo: Del Boceto a la Producción",
        timeline_desc: "Diez hitos reales de hardware que demuestran nuestro riguroso proceso de ingeniería física: desde las primeras geometrías en FreeCAD y protoboards hasta la calibración submilimétrica en Bambu Lab A1 y la fabricación SMT final en JLCPCB.",

        art_eyebrow: "Funcionalismo Estético",
        art_title: "El Puente Langlois de Van Gogh: Serigrafía de Alta Expresión",
        art_desc_1: "Al ordenar nuestra PCB Rev A en JLCPCB, elegimos máscara de soldadura Negro Mate con serigrafía Blanco Puro.",
        art_desc_2: "El arte vectorial grabado en el cobre frontal y la serigrafía es el famoso puente levadizo Langlois de Van Gogh en Arlés. Elegimos esta obra maestra porque un puente representa la unión perfecta entre la ingeniería estructural y la emoción humana, al igual que este teclado une la electrónica con la expresión.",

        roadmap_eyebrow: "Dirección Rev B — Aún no diseñada",
        roadmap_title: "Rev B: Dirección Medici (exploratoria)",
        roadmap_desc: "Las pruebas en protoboard y macropad expusieron problemas de ruido que dieron forma al diseño de la Rev A. La validación de la Rev A inicia al recibirla. Rev B es una dirección de la beca Medici — aún no está diseñada. Estas son áreas de exploración, no especificaciones de Rev A:",

        real_eyebrow: "Prueba Física • Hardware Funcional",
        real_title: "¿Qué es realmente real?",
        real_desc: "FloatForce no fue concebido en pura teoría ni en renders de CAD. Durante meses de prototipado físico en México, cada dimensión cinemática, distancia magnética y respuesta de sensor analógico fue probada a mano. Aquí está la prueba física sin filtros: prototipos funcionales, switches en acción real y el macropad de 16 teclas que demuestra que esta tecnología funciona en el mundo real.",
        real_video_badge_1: "Macropad Físico en Vivo",
        real_macropad_badge: "Prueba de Concepto Maestra",
        real_macropad_title: "El Macropad Funcional de 16 Teclas: Demostrando FloatForce en el Mundo Real",
        real_macropad_desc_1: "Antes de comprometer ahorros personales en la fabricación de la PCB completa, validamos nuestra arquitectura en dos bancos físicos distintos: una protoboard soldada a mano con 15 sensores (canales C0–C14 en CD74HC4067) para calibrar el firmware Zephyr RTOS, y este macropad funcional de 16 teclas para probar físicamente el recorrido del switch, la retención de keycaps y la levitación magnética. Las teclas operativas confirmaron un deslizamiento suave sin desgaste de resortes ni roce mecánico.",
        real_macropad_desc_2: "De manera crucial, las pruebas en protoboard expusieron los desafíos reales del sensado analógico: cables volantes con capacitancia parasítica, diafonía entre canales y deriva por falta de capacitores de desacoplo individuales. Estas lecciones de laboratorio definieron directamente la arquitectura de la PCB Rev A: desacoplo local de 100 nF por cada sensor HAL403SO, división de bus en dos bancos TMUX1308 que reduce la capacitancia en 34% y planos de masa continuos.",
        real_switch_title_1: "Levitación Magnética Sin Resortes",
        real_switch_desc_1: "Prueba física en primer plano de la suspensión de repulsión por 3 imanes. Observa cómo el vástago se desliza verticalmente sin fricción metálica, ruidos de resorte ni fricción de roce, logrando una curva de fuerza progresiva.",
        real_switch_title_2: "Retorno Rápido Instantáneo y Estabilidad",
        real_switch_desc_2: "Demostración del rebote magnético instantáneo al soltar. El campo magnético acelera naturalmente el vástago de vuelta a su posición de reposo, asegurando reinicios inmediatos sin rebote de contacto.",
        real_gallery_title: "Banco de Laboratorio y Registro de Ensamblaje",
        real_g1_title: "Base de Pruebas de 16 Teclas",
        real_g1_desc: "Prototipo funcional que valida la estabilidad de la placa, retención de switches y ergonomía de teclas bajo uso continuo.",
        real_g2_title: "Espaciado Ergonómico 18 × 17 mm",
        real_g2_desc: "Matriz compacta estilo Choc que reduce el estiramiento de los dedos y conserva aislamiento magnético total entre sensores adyacentes.",
        real_g3_title: "Matriz de Sensores Analógicos",
        real_g3_desc: "Matriz de sensores Hall soldada a mano para validar tiempos de asentamiento, capacitores de desacoplo y piso de ruido del ADC.",
        real_g4_title: "Cuerpo en U Monolítico FDM",
        real_g4_desc: "Cavidades calibradas para imanes de neodimio por ajuste a presión con cero soportes en impresoras 3D comunes.",

        grant_eyebrow: "La Propuesta",
        grant_title: "Asignación de la Beca Medici de 1517 Fund",
        grant_builder_title: "La Trayectoria del Creador Autodidacta",
        roadmap_status: "Rev B aún no diseñada — solo dirección de grant",
        hero_status_txt: "Rev A ordenada en JLCPCB (~3-4 semanas de entrega)",
        progress_eyebrow: "Estado del Proyecto",
        progress_title: "De prototipos soldados a mano a la Rev B",
        progress_current: "Ahora: Rev A en tránsito a México para pruebas de hardware.",
        progress_pct_label: "del camino a la Rev B",
        progress_m1: "Prototipos de I+D soldados a mano",
        progress_m2: "Diseños 3D validados en impresora",
        progress_m3: "PCB Rev A fabricada",
        progress_m4: "Diseño Rev B (beca Medici)",
        marquee_title: "Desde el banco de trabajo — prototipos reales, no renders",
        marquee_c1: "Macropad de 16 teclas — cableado a mano y funcional",
        marquee_c2: "Banco de I+D soldado a mano — 15 sensores Hall + MUX",
        marquee_c3: "Housing de switch impreso en 3D — sockets de imán",
        marquee_c4: "Parte superior del macropad — sensado analógico continuo",

        gallery_eyebrow: "Archivo de Ingeniería Abierto",
        gallery_title: "Galería de Recursos Seleccionados"
        nav_about: "Quién Soy",
        about_eyebrow: "El creador detrás de FloatForce • Maker en México",
        about_title: "Por qué construyo una interfaz de hardware no convencional",
        about_badge: "Sebastián González V. • Ciudad de México • Maker de Hardware Independiente",
        about_p1: "Soy un maker independiente basado en la Ciudad de México. Empecé este proyecto por frustración con la industria comercial de teclados: precios inflados de cientos de dólares por cajas negras cerradas con switches propietarios, resortes mecánicos frágiles y funciones bloqueadas por software. Quería un teclado con sensado analógico continuo, elevación ergonómica real y cero desgaste mecánico, diseñado para que cualquiera con una impresora 3D común pueda fabricarlo, personalizarlo y repararlo en cualquier lugar del mundo.",
        about_ai_label: "La IA como copiloto de ingeniería",
        about_ai_txt: "Históricamente, diseñar hardware analógico personalizado requería capital de riesgo y un equipo en Silicon Valley. Usando la IA como copiloto de ingeniería (Magpylib para simulación magnética, KiCad 10 para diseño de PCB multicanal, Python para CAD procedural, Zephyr RTOS para firmware embebido), diseñé, calibré y mandé a fabricar toda esta pila física como maker en solitario desde México, demostrando un nuevo paradigma de innovación en hardware descentralizado.",
        grant_sec_eyebrow: "Fondo 1517 • Candidatura Proyecto Medici",
        grant_sec_title: "Beca Medici de $1,000 USD: Runway Futuro y el Modelo Prusa",
        grant_sec_desc: "1517 respalda a creadores no convencionales que construyen cosas difíciles. Toda la I+D previa (~$500 USD) se autofinanció con ahorros personales como prueba de compromiso y capacidad de ejecución, no para reembolso. Esta beca de $1,000 USD es 100% runway hacia adelante para validar la Rev A, iterar hacia la Rev B y publicar guías abiertas de fabricación.",
        grant_table_h_item: "ÍTEM Y CATEGORÍA",
        grant_table_h_cost: "COSTO (USD)",
        grant_table_h_purpose: "PROPÓSITO DE INGENIERÍA E IMPACTO",
        grant_table_h_deliverable: "ENTREGABLE",
        grant_row1_title: "1. Prototipado de Rev B ($250)",
        grant_row1_sub: "Financiar una iteración de PCB Rev B informada por las pruebas de Rev A, más sensores, pantallas OLED, encoders, baterías e imanes para unidades de prueba",
        grant_row1_desc: "Financiamiento de una iteración refinada de PCB Rev B basada en las pruebas de banco de la Rev A, más sensores Hall de precisión, OLEDs, encoders rotativos, baterías LiPo e imanes de neodimio para unidades de prueba funcionales.",
        grant_row1_del: "Iteración PCB Rev B y unidades de prueba",
        grant_row2_title: "2. Protección de marca, legal y asesoría tributaria ($300)",
        grant_row2_sub: "Registrar la marca del proyecto en México (IMPI), búsqueda de arte previo, asesoría de PI y fiscal para certificación de terceros",
        grant_row2_desc: "Registro de marca oficial ante el Instituto Mexicano de la Propiedad Industrial (IMPI), búsqueda de arte previo y asesoría legal de PI y tributaria para fundamentar el programa de certificación de terceros sin diluir la identidad del proyecto.",
        grant_row2_del: "Registro de marca IMPI, asesoría de PI y tributaria",
        grant_row3_title: "3. I+D de materiales, herramental 3D y setup de creador ($450)",
        grant_row3_sub: "Filamentos especiales, boquillas para calibración, setup BMCU 370C multicolor / impresión en resina con terceros, y micrófono para Patreon",
        grant_row3_desc: "Probar distintos filamentos especiales y más boquillas para encontrar el sweet spot de tolerancia, explorar un setup BMCU 370C para keycaps multicolor o mandar a imprimir en resina con terceros para continuar el I+D, además de componentes extra como un micrófono para el setup de Patreon y creación de guías.",
        grant_row3_del: "Herramental 3D, I+D multicolor/resina y equipo de audio",
        grant_total_label: "ASIGNACIÓN TOTAL DE LA BECA",
        grant_total_sub: "100% I+D directo de producto • Cero reembolso",
        grant_prusa_title: "El modelo de negocio abierto tipo Prusa desde México",
        grant_prusa_desc: "Siguiendo la filosofía de Josef Prusa: el 100% de los archivos CAD, esquemáticos y firmware Zephyr RTOS se mantienen libres y abiertos permanentemente bajo CERN-OHL-W v2. Para construir un modelo de negocio sostenible, planeamos tres vías de monetización: 1) Certificación oficial de productos de terceros bajo una marca protegida ante el IMPI; 2) Una comunidad oficial en Patreon con acceso anticipado y bitácoras técnicas; y 3) Donaciones directas de entusiastas que apoyan el hardware libre.",
        grant_row5_del: "Dominio web, hosting y equipo de grabación AV",

      },

      fr: {

        nav_build: "Guide d'Assemblage",
        build_eyebrow: "Guide du Fabricant Open-Source",
        build_title: "Fabriquez-le Vous-Même : Nomenclature & CAD",
        build_desc: "FloatForce a été conçu dès l'origine pour que toute personne disposant d'une imprimante 3D de bureau puisse le reproduire, le personnaliser et l'assembler sans outillage propriétaire.",
        status_eyebrow: "Rigueur et Transparence d'Ingénierie",
        status_title: "Matrice de Vérification Honnête : Le Concret Aujourd'hui",
        status_desc: "Nous séparons clairement le matériel physique testé en laboratoire, les prototypes commandés en production et les futures pistes de recherche. Aucune surenchère marketing ; une pure transparence d'ingénierie.",

        nav_ergo: "Ergonomie",
        nav_floatforce: "FloatForce 3D",
        nav_analog: "Analogique Continu",
        nav_rd: "Évolution R&D",
        nav_art: "Art et PCB",
        nav_revb: "Rev B",
        nav_real: "Qu'est-ce qui est réel ?",
        nav_grant: "Présentation 1517",
        nav_gallery: "Galerie",
        hero_badge: "Fonds 1517 • Candidat Projet Medici • Matériel Ouvert →",
        hero_title: 'Les humains expriment bien plus que des 1 et des 0,<br><span class="italic font-normal text-accent-terracotta">FloatForce</span> offre à chacun le moyen de ressentir tout ce qui se trouve entre les deux.',
        hero_p1: "Découvrez le clavier ergonomique scindé open-source et accessible où chaque touche flotte sur des aimants au lieu de ressorts métalliques, transformant la profondeur physique en musique expressive, vecteurs analogiques 360° pour les jeux et frappe tactile sans effort.",
        hero_p2: "Conçu pour une fabrication économique : circuit imprimé standard économique, impression 3D 100% sans supports sur imprimantes grand public et inclinaison en pont-levis pour un confort ergonomique naturel.",
        hero_btn_watch: "Voir le pont s'ouvrir ↓",
        hero_btn_sheet: "Fiche Technique (MD) →",
        hero_stat_matrix: "Matrice Scindée 60 Touches",
        hero_stat_stroke: "Course Magnétique (+33%)",
        hero_stat_power: "Puissance Capteur (HAL403SO)",
        hero_stat_supports: "Impression 3D Sans Supports",
        hero_canvas_tag: "Art sur PCB Rév A",
        hero_canvas_caption: "PCB physique Rév A (JLCPCB SMT Standard) : Les 30 capteurs Hall, multiplexeurs et circuits d'alimentation se trouvent exclusivement sur la face inférieure. La face supérieure est une toile tactile dédiée au pont-levis de Van Gogh.",

        drawbridge_eyebrow: "La Métaphore du Pont-Levis de Van Gogh",
        drawbridge_title: "Comme le Pont-Levis de Van Gogh : Ergonomie Scindée et Inclinée",
        drawbridge_desc: "Pourquoi avoir gravé un pont-levis sur notre circuit imprimé ? Parce que l'inclinaison ergonomique fonctionne exactement comme un pont-levis qui s'ouvre : les bords extérieurs restent posés sur le bureau tandis que les pouces s'élèvent (0° → 25°), ramenant vos avant-bras dans une position naturelle et détendue.",

        ff_eyebrow: "Cinématique Magnétique Paramétrique",
        ff_title: "FloatForce V5.0 : Le Commutateur Magnétique Sans Ressort",
        ff_desc: "Les commutateurs mécaniques traditionnels dépendent de ressorts métalliques qui s'usent, créent des rebonds et limitent la frappe au binaire. FloatForce remplace les contacts par 3 aimants néodyme et un capteur à effet Hall ratiométrique.",

        analog_eyebrow: "Émulation Matérielle en Temps Réel",
        analog_title: "Espace Interactif Analogique Continu",
        analog_desc: "Découvrez comment la profondeur continue du capteur Hall transforme la frappe en trois modes d'interaction dynamiques. Appuyez sur vos touches ou déplacez le curseur ci-dessous.",

        timeline_eyebrow: "Journal d'Ingénierie & Étapes Clés",
        timeline_title: "Évolution du Prototype : Du Premier Croquis à la Série",
        timeline_desc: "Dix étapes matérielles réelles démontrant notre processus d'ingénierie physique : des premières géométries FreeCAD aux calibrations submillimétriques sur Bambu Lab A1 et à la fabrication SMT finale chez JLCPCB.",

        art_eyebrow: "Fonctionnalisme Esthétique",
        art_title: "Le Pont de Langlois de Van Gogh : Sérigraphie Artistique",
        art_desc_1: "Lors de la commande du circuit imprimé Rev A chez JLCPCB, nous avons choisi un vernis épargne Noir Mat et une sérigraphie Blanc Pur.",
        art_desc_2: "Le tracé vectoriel gravé sur la face avant représente le célèbre pont-levis de Langlois peint par Van Gogh à Arles. Nous avons choisi ce chef-d'œuvre car un pont incarne l'union entre génie civil et émotion humaine.",

        roadmap_eyebrow: "Direction Rev B — Pas encore conçue",
        roadmap_title: "Rev B : Direction Medici (exploratoire)",
        roadmap_desc: "Les tests sur plaque d'essai et macropad ont mis en évidence des problèmes de bruit qui ont façonné la conception de la Rev A. La validation de la Rev A commencera à la livraison. La Rev B est une direction de la bourse Médicis — elle n'est pas encore conçue. Ce sont des domaines d'exploration, pas des spécifications de la Rev A :",

        real_eyebrow: "Preuve Physique • Matériel Fonctionnel",
        real_title: "Qu'est-ce qui est réellement fait ?",
        real_desc: "FloatForce n'a pas été conçu dans la théorie ou des rendus virtuels. Durant des mois de prototypage manuel au Mexique, chaque dimension cinématique, écartement magnétique et signal de capteur analogique a été testé sur banc d'essai. Voici la preuve physique authentique : des prototypes fonctionnels, l'actionnement réel des commutateurs et le macropad de 16 touches qui prouve que la technologie fonctionne.",
        real_video_badge_1: "Macropad Physique en Direct",
        real_macropad_badge: "Preuve de Concept Principale",
        real_macropad_title: "Le Macropad Fonctionnel 16 Touches : Valider FloatForce dans le Monde Réel",
        real_macropad_desc_1: "Avant d'engager la fabrication complète, nous avons validé notre architecture sur deux bancs de test distincts : une plaque d'essai avec 15 capteurs Hall (canaux C0–C14 sur CD74HC4067) pour calibrer le firmware Zephyr RTOS, et ce macropad fonctionnel de 16 touches pour tester mécaniquement la course, la tenue des touches et la suspension magnétique.",
        real_macropad_desc_2: "Ce prototype sur plaque d'essai a mis en lumière les défis du monde réel : le câblage manuel subissait une capacité parasite et de la diaphonie faute de condensateurs de découplage locaux. Ces leçons ont directement inspiré la PCB Rev A : découplage dédié de 100 nF par capteur HAL403SO, multiplexage TMUX1308 divisé réduisant la capacité de 34% et plan de masse continu.",
        real_switch_title_1: "Lévitation Magnétique Sans Ressort",
        real_switch_desc_1: "Test physique rapproché de la suspension à 3 aimants. Observez la tige glisser sans frottement métallique ni grincement de ressort, offrant une courbe de résistance douce et progressive.",
        real_switch_title_2: "Retour Instantané et Stabilité Tactile",
        real_switch_desc_2: "Démonstration du retour rapide lors du relâchement. Le champ magnétique accélère la tige vers sa position de repos, garantissant une réinitialisation instantanée sans rebond mécanique.",
        real_gallery_title: "Banc d'Essai et Journal d'Assemblage",
        real_g1_title: "Banc d'Essai 16 Touches",
        real_g1_desc: "Prototype fonctionnel validant la stabilité de la plaque, la rétention des touches et l'ergonomie lors de la frappe.",
        real_g2_title: "Espacement Ergonomique 18 × 17 mm",
        real_g2_desc: "Grille compacte réduisant la fatigue des doigts tout en garantissant une isolation magnétique totale entre capteurs.",
        real_g3_title: "Banc de Capteurs Analogiques",
        real_g3_desc: "Matrice de capteurs Hall soudée à la main validant les temps de stabilisation, condensateurs et plancher de bruit ADC.",
        real_g4_title: "Corps en U Monolithique FDM",
        real_g4_desc: "Logements d'aimants néodyme ajustés à pression sans aucun support d'impression sur imprimante 3D classique.",

        grant_eyebrow: "La Proposition",
        grant_title: "Allocation de la Bourse Médicis du Fonds 1517",
        grant_builder_title: "Le Parcours d'un Créateur Autodidacte",
        roadmap_status: "Rev B pas encore conçue — direction de grant uniquement",
        hero_status_txt: "Rev A commandée chez JLCPCB (~3-4 sem. livraison)",
        progress_eyebrow: "État du Projet",
        progress_title: "Des prototypes soudés à la main à la Rev B",
        progress_current: "Maintenant : Rev A en transit vers le Mexique pour tests matériels.",
        progress_pct_label: "jalons complétés",
        progress_m1: "Prototypes R&D soudés à la main",
        progress_m2: "Conceptions 3D validées",
        progress_m3: "PCB Rev A fabriquée",
        progress_m4: "Conception Rev B (bourse Médicis)",
        marquee_title: "Depuis l'établi — de vrais prototypes, pas des rendus",
        marquee_c1: "Macropad 16 touches — câblé à la main et fonctionnel",
        marquee_c2: "Banc R&D soudé à la main — 15 capteurs Hall + MUX",
        marquee_c3: "Boîtier de switch imprimé en 3D — logements d'aimants",
        marquee_c4: "Dessus du macropad — détection analogique continue",

        gallery_eyebrow: "Archives d'Ingénierie Ouvertes",
        gallery_title: "Galerie de Ressources Sélectionnées"
        nav_about: "À Propos",
        about_eyebrow: "Le créateur derrière FloatForce • Maker au Mexique",
        about_title: "Pourquoi je crée une interface matérielle non conventionnelle",
        about_badge: "Sebastián González V. • Mexico • Créateur de Matériel Indépendant",
        about_p1: "Je suis un maker indépendant basé à Mexico. J'ai lancé ce projet face à la frustration envers l'industrie des claviers : des prix excessifs pour des boîtes noires fermées aux commutateurs propriétaires et fonctions bridées. Je voulais un clavier à détection analogique continue, avec une véritable ergonomie et zéro usure mécanique, fabricable et réparable par quiconque possédant une imprimante 3D.",
        about_ai_label: "L'IA comme copilote d'ingénierie",
        about_ai_txt: "Historiquement, la conception de matériel analogique sur mesure exigeait d'importants capitaux et une équipe dans la Silicon Valley. En utilisant l'IA comme copilote (Magpylib pour la simulation magnétique, KiCad 10 pour le routage PCB, Python pour la CAO procédurale, Zephyr RTOS pour le firmware), j'ai conçu, calibré et lancé la fabrication de cet ensemble en tant que créateur solo au Mexique.",
        grant_sec_eyebrow: "Fonds 1517 • Candidature Projet Medici",
        grant_sec_title: "Bourse Medici de 1 000 $ : Runway Futur & Modèle Prusa",
        grant_sec_desc: "1517 soutient les créateurs audacieux qui s'attaquent à des défis physiques ardus. Tous les travaux passés (~500 USD) ont été autofinancés sur fonds propres comme preuve tangible d'engagement, non pour remboursement. Cette bourse de 1 000 $ offre un runway 100 % prospectif pour valider la Rev A, itérer vers la Rev B et publier des guides ouverts.",
        grant_table_h_item: "POSTE & CATÉGORIE",
        grant_table_h_cost: "COÛT (USD)",
        grant_table_h_purpose: "IMPACT TECHNIQUE & OBJECTIF",
        grant_table_h_deliverable: "LIVRABLE",
        grant_row1_title: "1. Prototypage Rev B (250 $)",
        grant_row1_sub: "Financer une itération PCB Rev B basée sur les tests de Rev A, plus capteurs, écrans OLED, encodeurs, batteries et aimants pour unités de test",
        grant_row1_desc: "Financement d'une itération affinée du PCB Rev B informée par les tests de banc de la Rev A, plus capteurs Hall, OLEDs, encodeurs rotatifs, batteries LiPo et aimants pour unités de test fonctionnelles.",
        grant_row1_del: "Itération PCB Rev B & unités de test",
        grant_row2_title: "2. Protection de marque, juridique & conseil fiscal (300 $)",
        grant_row2_sub: "Enregistrer la marque au Mexique (IMPI), recherche d'antériorités, conseil en PI et fiscalité pour certifier des tiers",
        grant_row2_desc: "Dépôt officiel de la marque auprès de l'INPI mexicain (IMPI), recherche d'antériorités, conseil en propriété intellectuelle et accompagnement fiscal pour encadrer la certification de fabricants tiers.",
        grant_row2_del: "Dépôt de marque IMPI, conseil PI & fiscal",
        grant_row3_title: "3. R&D matériaux, outillage 3D & setup créateur (450 $)",
        grant_row3_sub: "Filaments spéciaux, buses de précision, setup multicolore BMCU 370C / impression résine externe, et microphone pour Patreon",
        grant_row3_desc: "Tester des filaments techniques et buses pour ajuster les tolérances, intégrer un setup multicolore BMCU 370C pour touches ou sous-traiter en résine pour la R&D tactile, plus matériel audio avec microphone dédié pour Patreon et tutoriels.",
        grant_row3_del: "Outillage 3D, R&D résine/couleur & équipement audio",
        grant_total_label: "ALLOCATION TOTALE DE LA BOURSE",
        grant_total_sub: "100 % R&D produit directe • Zéro remboursement",
        grant_prusa_title: "Le modèle économique Open-Source de Prusa depuis le Mexique",
        grant_prusa_desc: "Suivant la philosophie de Josef Prusa : 100% des fichiers CAO, schémas et firmware Zephyr RTOS restent libres sous licence CERN-OHL-W v2. Pour assurer un modèle économique pérenne, nous prévoyons trois sources de revenus : 1) Certification officielle de produits tiers via une marque protégée (IMPI), 2) Communauté officielle Patreon avec accès anticipé et coulisses, et 3) Dons directs des passionnés de matériel ouvert.",
        grant_row5_del: "Nom de domaine, hébergement & équipement AV",

      },

      de: {

        nav_build: "Bauanleitung",
        build_eyebrow: "Open-Source-Bauanleitung",
        build_title: "Selber Bauen: Stückliste & CAD",
        build_desc: "FloatForce wurde von Grund auf so konzipiert, dass jeder mit einem herkömmlichen Desktop-3D-Drucker die Tastatur ohne proprietäre Werkzeuge oder Spritzgussformen nachbauen kann.",
        status_eyebrow: "Entwicklungsstrenge & Transparenz",
        status_title: "Ehrliche Verifizierungsmatrix: Was heute real ist",
        status_desc: "Wir trennen klar zwischen laborgetesteter Hardware, bestellten Prototypen in Produktion und künftigen Forschungsrichtungen. Kein Marketing-Hype; reine technische Transparenz.",

        nav_ergo: "Ergonomie",
        nav_floatforce: "FloatForce 3D",
        nav_analog: "Kontinuierliches Analog",
        nav_rd: "F&E-Entwicklung",
        nav_art: "Kunst & Leiterplatte",
        nav_revb: "Rev B",
        nav_real: "Was ist real?",
        nav_grant: "1517 Pitch",
        nav_gallery: "Galerie",
        hero_badge: "1517 Fonds • Medici-Projekt-Kandidat • Open Hardware →",
        hero_title: 'Menschen drücken weit mehr aus als 1 und 0,<br><span class="italic font-normal text-accent-terracotta">FloatForce</span> gibt jedem die Möglichkeit, alles dazwischen zu fühlen.',
        hero_p1: "Das kostengünstige, quelloffene Split-Keyboard, bei dem jede Taste auf Magneten statt Metallfedern schwebt – und kontinuierliche Tiefe in ausdrucksstarke Musik, 360°-Analogvektoren für Gaming und müheloses taktiles Tippen verwandelt.",
        hero_p2: "Entwickelt für erschwingliche Fertigung: Standard-PCBA-Architektur zu geringen Kosten, 100% stützstrukturfreier 3D-Druck auf handelsüblichen Druckern und wie eine Zugbrücke für ergonomischen Komfort geneigt.",
        hero_btn_watch: "Öffnen & Spielen ansehen ↓",
        hero_btn_sheet: "Datenblatt (MD) →",
        hero_stat_matrix: "60-Tasten Split-Matrix",
        hero_stat_stroke: "Magnetischer Hub (+33%)",
        hero_stat_power: "1,4 mA / Sensor (42 mA gesamt)",
        hero_stat_supports: "Stützfreier 3D-Druck",
        hero_canvas_tag: "Kunst auf PCB Rev A",
        hero_canvas_caption: "Physische PCB Rev A (JLCPCB Standard SMT): Alle 30 Hall-Sensoren, Multiplexer und Stromsteuerungen befinden sich auf der Unterseite. Die Oberseite ist eine monolithische taktile Leinwand, gewidmet Van Goghs Zugbrücke.",

        drawbridge_eyebrow: "Die Zugbrücken-Metapher von Van Gogh",
        drawbridge_title: "Wie Van Goghs Zugbrücke: Split- & Neigungsergonomie",
        drawbridge_desc: "Warum haben wir eine Zugbrücke auf unsere Leiterplatte geätzt? Weil die ergonomische Neigung wie eine zweiflügelige Zugbrücke funktioniert: Die Außenkanten bleiben auf dem Tisch, während sich die Innenkanten anheben (0° → 25°) und Ihre Unterarme in eine entspannte Handhaltung bringen.",

        ff_eyebrow: "Parametrische Magnetkinematik",
        ff_title: "FloatForce V5.0: Der federlose Magnetschalter",
        ff_desc: "Herkömmliche mechanische Schalter basieren auf Metallfedern, die verschleißen, Prellen verursachen und den Hub auf binäres Ein/Aus beschränken. FloatForce ersetzt mechanische Kontakte durch 3 Neodym-Magnete und einen ratiometrischen Hall-Sensor.",

        analog_eyebrow: "Echtzeit-Hardware-Emulation",
        analog_title: "Kontinuierlicher Analog-Spielplatz",
        analog_desc: "Erleben Sie, wie kontinuierliche Hall-Sensortiefe das Tippen in drei dynamische Interaktionsparadigmen verwandelt. Drücken Sie Ihre Tasten oder nutzen Sie den Schieberegler unten.",

        timeline_eyebrow: "Entwicklungsprotokoll & Meilensteine",
        timeline_title: "Prototypen-Entwicklung: Von der ersten Skizze zur Serie",
        timeline_desc: "Zehn echte Hardware-Meilensteine, die unseren rigorosen Entwicklungsprozess belegen: von frühen FreeCAD-Modellen über submillimetergenaue Bambu Lab A1-Kalibrierungen bis zur finalen SMT-Fertigung bei JLCPCB.",

        art_eyebrow: "Ästhetischer Funktionalismus",
        art_title: "Van Goghs Langlois-Brücke: Kunst auf der Platine",
        art_desc_1: "Für unsere PCB Rev A bei JLCPCB wählten wir mattschwarzen Lötstopplack mit reinweißem Siebdruck.",
        art_desc_2: "Das Vektorgemälde zeigt Van Goghs berühmte Zugbrücke von Langlois. Wir haben dieses Meisterwerk gewählt, weil eine Brücke die vollendete Verbindung von Ingenieurbau und menschlichem Empfinden darstellt.",

        roadmap_eyebrow: "Rev B Richtung — Noch nicht gestaltet",
        roadmap_title: "Rev B: Medici-Richtung (explorativ)",
        roadmap_desc: "Tests auf dem Steckbrett und Macropad deckten Rauschprobleme auf, die das Rev-A-Design prägten. Die Validierung von Rev A beginnt mit der Lieferung. Rev B ist eine Medici-Richtung — sie ist noch nicht gestaltet. Dies sind Explorationsbereiche, keine Rev-A-Spezifikationen:",

        real_eyebrow: "Physischer Beweis • Funktionierende Hardware",
        real_title: "Was ist wirklich real?",
        real_desc: "FloatForce entstand nicht in reiner Theorie oder Renderings. In monatelangem praktischem Prototyping in Mexiko wurde jede kinematische Abmessung, jeder Magnetspalt und jedes analoge Sensorsignal von Hand getestet. Hier ist der unverfälschte physische Beweis: funktionierende Prototypen, reale Schalterbetätigung und das 16-Tasten-Macropad, das zeigt, dass diese Technologie in der Praxis funktioniert.",
        real_video_badge_1: "Echtes physisches Macropad",
        real_macropad_badge: "Haupt-Machbarkeitsnachweis",
        real_macropad_title: "Das funktionale 16-Tasten-Macropad: FloatForce in der Praxis bewiesen",
        real_macropad_desc_1: "Vor der Serienfertigung haben wir unsere Architektur auf zwei Prüfständen getestet: einem handgelöteten Steckbrett mit 15 Hall-Sensoren (Kanäle C0–C14 auf CD74HC4067) für das Zephyr-Firmware-Timing und diesem 16-Tasten-Macropad für Hub und Magnetschwebe.",
        real_macropad_desc_2: "Entscheidend war, dass Tests reale analoge Herausforderungen aufdeckten: Freie Verdrahtung verursachte parasitäre Kapazitäten und Übersprechen mangels Entkopplungskondensatoren. Diese Erkenntnisse prägten direkt die PCB Rev A: 100-nF-Kondensatoren pro HAL403SO-Sensor, aufgeteilte TMUX1308-Multiplexer mit 34% weniger Buskapazität und durchgehende Masselagen.",
        real_switch_title_1: "Reibungsfreie Magnetlevitation",
        real_switch_desc_1: "Nahaufnahme des Tests der 3-Magnet-Abstoßung. Beobachten Sie, wie der Stößel ohne Reibung oder Federkratzen gleitet und eine progressive Kraftkurve liefert.",
        real_switch_title_2: "Sofortiger Rückprall & Taktile Stabilität",
        real_switch_desc_2: "Demonstration der sofortigen magnetischen Rückstellung. Das Magnetfeld beschleunigt den Schalter sofort in die Ausgangsposition zurück, ohne Prellen.",
        real_gallery_title: "Laborprüfstand & Montageprotokoll",
        real_g1_title: "16-Tasten Testaufbau",
        real_g1_desc: "Funktionsprototyp zur Validierung von Plattenstabilität, Schalterhalt und Tastenkappen-Ergonomie beim Tippen.",
        real_g2_title: "Ergonomisches 18 × 17 mm Raster",
        real_g2_desc: "Kompakter Tastenabstand zur Reduzierung der Fingerwege bei vollständiger magnetischer Entkopplung benachbarter Sensoren.",
        real_g3_title: "Analoge Sensor-Matrix",
        real_g3_desc: "Handgelötetes Hall-Sensor-Array zur Validierung von Einschwingzeiten, Entkopplungskondensatoren und ADC-Rauschen.",
        real_g4_title: "FDM Monolithischer U-Körper",
        real_g4_desc: "Kalibrierte Neodym-Magnetsitze mit Presspassung ohne Stützstrukturen auf handelsüblichen 3D-Druckern.",

        grant_eyebrow: "Der Pitch",
        grant_title: "Verwendung des 1517 Fund Medici-Stipendiums",
        grant_builder_title: "Der Weg eines autodidaktischen Entwicklers",
        roadmap_status: "Rev B noch nicht gestaltet — nur Medici-Richtung",
        hero_status_txt: "Rev A bei JLCPCB bestellt (~3-4 Wochen Lieferzeit)",
        progress_eyebrow: "Projektstatus",
        progress_title: "Von handgelöteten Prototypen zu Rev B",
        progress_current: "Jetzt: Rev A auf dem Transport nach Mexiko für Hardware-Tests.",
        progress_pct_label: "Meilensteine abgeschlossen",
        progress_m1: "Handgelötete R&D-Prototypen",
        progress_m2: "3D-gedruckte Designs validiert",
        progress_m3: "PCB Rev A gefertigt",
        progress_m4: "Rev B-Design (Medici-Stipendium)",
        marquee_title: "Von der Werkbank — echte Prototypen, keine Renderings",
        marquee_c1: "16-Tasten-Macropad — handverdrahtet und funktionsfähig",
        marquee_c2: "Handgelöteter R&D-Aufbau — 15 Hall-Sensoren + MUX",
        marquee_c3: "3D-gedrucktes Switch-Gehäuse — Magnethalterungen",
        marquee_c4: "Macropad-Oberseite — kontinuierliche analoge Tiefenerkennung",

        gallery_eyebrow: "Offenes Engineering-Archiv",
        gallery_title: "Kuratierte Projektgalerie"
        nav_about: "Über den Entwickler",
        about_eyebrow: "Der Entwickler hinter FloatForce • Maker in Mexiko",
        about_title: "Warum ich eine unkonventionelle Hardware-Schnittstelle baue",
        about_badge: "Sebastián González V. • Mexiko-Stadt • Unabhängiger Hardware-Entwickler",
        about_p1: "Ich bin ein unabhängiger Maker aus Mexiko-Stadt. Ich habe dieses Projekt aus Frustration über die kommerzielle Tastaturindustrie gestartet: überteuerte geschlossene Blackboxes mit proprietären Schaltern und künstlichen Software-Einschränkungen. Ich wollte eine Tastatur mit kontinuierlicher analoger Erfassung, echter Ergonomie und ohne mechanischen Verschleiß, die jeder mit einem 3D-Drucker weltweit nachbauen kann.",
        about_ai_label: "KI als Entwicklungs-Copilot",
        about_ai_txt: "Bisher erforderte die Entwicklung kundenspezifischer analoger Hardware Risikokapital und ein Team im Silicon Valley. Durch den Einsatz von KI als Entwicklungs-Copilot (Magpylib für Magnetsimulationen, KiCad 10 für PCB-Routing, Python für prozedurales CAD, Zephyr RTOS für Embedded-Firmware) habe ich diesen gesamten Hardware-Stack als Solo-Maker in Mexiko entworfen, kalibriert und in die Fertigung geschickt.",
        grant_sec_eyebrow: "1517 Fonds • Medici-Projekt-Kandidat",
        grant_sec_title: "1.000 USD Medici-Förderung: Zukunfts-Runway & Prusa-Modell",
        grant_sec_desc: "1517 unterstützt unkonventionelle Entwickler, die komplexe physische Herausforderungen meistern. Die gesamte bisherige F&E (~500 USD) wurde aus eigenen Ersparnissen finanziert – als Beweis für Entschlossenheit und Umsetzungsstärke, nicht zur Erstattung. Diese 1.000 USD-Förderung ist zu 100 % vorausschauender Runway zur Validierung von Rev A, zur Iteration von Rev B und zur Veröffentlichung offener Bauanleitungen.",
        grant_table_h_item: "POSTEN & KATEGORIE",
        grant_table_h_cost: "KOSTEN (USD)",
        grant_table_h_purpose: "TECHNISCHER ZWECK & WIRKUNG",
        grant_table_h_deliverable: "DELIVERABLE",
        grant_row1_title: "1. Rev B Prototyping (250 $)",
        grant_row1_sub: "Finanzierung einer durch Rev A-Tests informierten Rev B PCB-Iteration plus Sensoren, OLEDs, Encoder, Akkus und Magnete für Testgeräte",
        grant_row1_desc: "Finanzierung einer verfeinerten Rev B PCB-Iteration basierend auf den Rev A-Prüfstandstests sowie Hall-Sensoren, OLEDs, Dreh-Encodern, LiPo-Akkus und Neodym-Magneten für voll funktionsfähige Testeinheiten.",
        grant_row1_del: "Rev B PCB-Iteration & Testeinheiten",
        grant_row2_title: "2. Marken-, Rechts- und Steuerschutz (300 $)",
        grant_row2_sub: "Eintragung der Projektmarke in Mexiko (IMPI), Recherche zum Stand der Technik, IP- und Steuerberatung für Dritthersteller-Zertifizierung",
        grant_row2_desc: "Offizielle Registrierung der Projektmarke beim mexikanischen Patent- und Markenamt (IMPI), Recherche zum Stand der Technik sowie IP- und Steuerberatung zur Zertifizierung von Drittherstellern.",
        grant_row2_del: "IMPI-Markenregistrierung, IP- & Steuerberatung",
        grant_row3_title: "3. Material-F&E, 3D-Tooling & Creator-Setup (450 $)",
        grant_row3_sub: "Spezialfilamente, Präzisionsdüsen, BMCU 370C Multicolor-Setup / externer Harzdruck sowie Mikrofon für Patreon",
        grant_row3_desc: "Erprobung von Spezialfilamenten und Düsen zur Toleranzoptimierung, Aufbau eines BMCU 370C Mehrfarben-Setups für Tastenkappen oder externer Harzdruck für haptische F&E sowie zusätzliches Audio-Equipment (Mikrofon) für Patreon und Bauanleitungen.",
        grant_row3_del: "3D-Tooling, Harz/Multicolor-F&E & Audio-Setup",
        grant_total_label: "GESAMTFÖRDERUNG",
        grant_total_sub: "100 % direkte Produkt-F&E • Keine Rückerstattung",
        grant_prusa_title: "Das Prusa Open-Source-Geschäftsmodell aus Mexiko",
        grant_prusa_desc: "Nach dem Vorbild von Josef Prusa: 100% der CAD-Dateien, Schaltpläne und Zephyr RTOS-Firmware bleiben unter CERN-OHL-W v2 dauerhaft quelloffen. Zur nachhaltigen Finanzierung planen wir drei Erlösquellen: 1) Offizielle Zertifizierung von Dritthersteller-Produkten unter einer geschützten IMPI-Marke, 2) Offizielle Patreon-Community mit Vorabzugang und Entwicklungsberichten sowie 3) Direkte Spenden von Unterstützern offener Hardware.",
        grant_row5_del: "Projekt-Domain, Hosting & Video-Setup",

      }
    };

    window.setLanguage = function(lang) {
      if (!window.translations[lang]) lang = 'en';
      document.documentElement.lang = lang;

      const metaTitles = {
        en: "HE-Keyboard — Open-Source FloatForce Interface",
        es: "HE-Keyboard — Interfaz Ergonómica FloatForce de Código Abierto",
        fr: "HE-Keyboard — Interface Ergonomique FloatForce Open-Source",
        de: "HE-Keyboard — Open-Source FloatForce Interface"
      };
      const metaDescs = {
        en: "Your fingers aren’t binary. Neither is FloatForce. Open-source split ergonomic keyboard with magnetic levitation switches, 360° analog motion, and Van Gogh drawbridge tenting.",
        es: "Tus dedos no son binarios. FloatForce tampoco. Teclado ergonómico dividido con switches de levitación magnética, sensado analógico 360° y puente levadizo Van Gogh.",
        fr: "Vos doigts ne sont pas binaires. FloatForce non plus. Clavier ergonomique scindé avec commutateurs à sustentation magnétique et inclinaison pont-levis.",
        de: "Ihre Finger sind nicht binär. FloatForce auch nicht. Ergonomische Split-Tastatur mit Magnetschwebe-Schaltern und 360°-Analogsteuerung."
      };
      if (metaTitles[lang]) document.title = metaTitles[lang];
      const descEl = document.querySelector('meta[name="description"]');
      if (descEl && metaDescs[lang]) descEl.setAttribute('content', metaDescs[lang]);
      try {
        localStorage.setItem('ff_lang', lang);
      } catch (e) {}

      // Update button active styles
      ['en', 'es', 'fr', 'de'].forEach(l => {
        const btn = document.getElementById(`langBtn-${l}`);
        if (btn) {
          if (l === lang) {
            btn.className = "px-2 py-0.5 rounded-lg font-medium transition-all bg-accent-terracotta text-white shadow-sm";
          } else {
            btn.className = "px-2 py-0.5 rounded-lg font-medium transition-all text-ink-secondary hover:text-ink-primary";
          }
        }
      });

      // Update all [data-i18n]
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (window.translations[lang] && window.translations[lang][key]) {
          el.textContent = window.translations[lang][key];
        }
      });

      // Update all [data-i18n-html]
      document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (window.translations[lang] && window.translations[lang][key]) {
          el.innerHTML = window.translations[lang][key];
        }
      });
    };

    // Initialize on load
    try {
      const savedLang = localStorage.getItem('ff_lang') || 
        (navigator.language && navigator.language.startsWith('es') ? 'es' :
        (navigator.language && navigator.language.startsWith('fr') ? 'fr' :
        (navigator.language && navigator.language.startsWith('de') ? 'de' : 'en')));
      window.setLanguage(savedLang);
    } catch(e) {
    window.setLanguage('en');
  }
