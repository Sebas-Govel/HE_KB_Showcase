# Engineering Fact Sheet — Open-Source Ergonomic MagLev Keyboard
**Project Pitch Documentation for 1517 Fund (Medici Project)**  
*Author:* Sebastian Gonzalez V.  
*Date:* November 2026  
*Status:* Hardware Rev A in Fabrication & Assembly (JLCPCB) | Firmware v0.3.1 Validated | Rev B in Architecture  

---

## 1. Executive Summary: Redesigning the Human-Computer Interface

The keyboard is humanity's primary cognitive conduit to the digital world, yet its physical architecture has stagnated for four decades: rigid planar layouts, binary on/off mechanical switches, and high-priced commercial peripherals locked behind artificial software paywalls.

This project is an open-source, human-centered redesign of the computer keyboard from first principles. Rather than chasing competitive gaming marketing hype, our mission focuses on **postural health, expressive multimodal interaction, radical affordability, and global accessibility through 3D printing and AI-assisted engineering**.

### The 7 Core Pillars of the Vision:
1. **Ergonomic Postural Health:** Split 30-key ambidextrous layout with integrated tenting and an ultra-low profile, drastically reducing wrist extension, ulnar deviation, and repetitive strain injury (RSI).
2. **Multimodal Analog Expression:** Continuous per-key magnetic sensing transforms every key into a velocity-sensitive, polyphonic aftertouch MIDI instrument, an analog gamepad with 360° motion gradation, and an ergonomically customizable keyboard.
3. **Integrated Physical Interactivity:** Native hardware support for an AS5600 magnetic rotary encoder, dual thumb trackpads (Azoteq I2C), and an OLED display for live layer/mode monitoring and visual feedback.
4. **"Endgame for Everyone" (No Paywalls):** High-end features without artificial firmware gating or subscription models. Flagship hardware accessible to students, creators, and tinkerers everywhere.
5. **Decentralized Global Accessibility:** 100% support-free 3D printable keycaps (Ultimate V3.2) and switches (V5.0), empowering anyone anywhere in the world to print custom linguistic layouts, alphabets, or tactile legends at home.
6. **Educational Empowerment via AI-Assisted Hardware Design:** Proving that an autodidactic builder outside traditional electrical engineering can build complex physical hardware by leveraging AI for parametric CAD, physics simulation, and PCB design.
7. **The "Prusa Research" Business Philosophy:** Fostering a free, open-source hardware community while establishing a sustainable peripherals venture from Mexico offering ready-to-use kits and assembled hardware.

---

## 2. Multimodal Analog Expression: Beyond Binary Typing

Traditional mechanical switches provide a single binary state (0 or 1) determined by a stamped metal contact leaf. By contrast, the Rev A keyboard continuously tracks the physical displacement of every key across its full 2.36 mm stroke using ratiometric Hall effect sensors.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ CONTINUOUS ANALOG DISPLACEMENT MAPPING (2.36 mm TRAVEL STROKE)               │
├──────────────────────┬──────────────────────┬───────────────────────────────┤
│ Mode                 │ Input Behavior       │ Real-World Application        │
├──────────────────────┼──────────────────────┼───────────────────────────────┤
│ 1. Expressive MIDI   │ Velocity + Continuous│ Real-time synth modulation,   │
│    Polyphonic After- │ Pressure (Aftertouch)│ filter cutoff sweeps, vibrato │
│    touch Controller  │                      │ directly on the home row      │
├──────────────────────┼──────────────────────┼───────────────────────────────┤
│ 2. Proportional      │ Continuous Travel    │ Smooth acceleration, walking  │
│    Analog Gamepad    │ (0% to 100% Vector)  │ speed control, stealth pacing │
│                      │                      │ without external joysticks    │
├──────────────────────┼──────────────────────┼───────────────────────────────┤
│ 3. Adaptive Keyboard │ Dynamic Actuation    │ Per-key actuation thresholds  │
│                      │ Points (0.2–2.2 mm)  │ tailored to individual typing │
│                      │                      │ pressure & ergonomics         │
└──────────────────────┴──────────────────────┴───────────────────────────────┘
```

---

## 3. Electrical Architecture & Power Budget

### 3.1 Sensor Power Comparison: HAL403SO vs Legacy SS49E

| Parameter | Legacy Hall Sensor (SS49E) | Rev A Sensor (HAL403SO) | Engineering Advantage |
|:---|:---:|:---:|:---|
| **Operating Voltage** | 4.5 V – 6.0 V (Needs boost or 5V VBUS) | **1.6 V – 3.6 V** (Native 3.3 V rail) | Eliminates boost converter noise & losses |
| **Supply Current ($I_{\text{DD}}$)** | 6.0 mA – 10.0 mA (8.0 mA typ) | **1.4 mA typ / 2.0 mA max** | **> 4.3× reduction in active sensing power** |
| **30-Key Matrix Current** | 180 mA – 240 mA continuous | **42 mA typ** | Cuts 140–200 mA off the power bus |
| **Output Resistance ($R_{\text{OUT}}$)** | ~50 Ω | **10 kΩ** | Low output loading; fast $RC$ settling with 100 nF |
| **Sensitivity** | 1.4 – 1.8 mV/Gauss @ 5V | **4.1 mV/Gauss @ 3.3V** | High magnetic resolution without external preamps |
| **Linear Range** | ±650 Gauss | **±390 Gauss** | Matched to N52 magnet stroke geometry |
| **Package / Mounting** | TO-92S (Through-hole / hand bent) | **SOT-23-3 (SMD)** | Machine-assembled on bottom copper (`B.Cu`) |

---

### 3.2 Power Management: Rev A Hardware vs Rev B Roadmap

An honest engineering assessment of the power domains:

#### A. Rev A (Current Fabrication State — SMT Assembly at JLCPCB)
- **Native SuperMini LiPo Charger:** The SuperMini nRF52840 integrates an onboard LiPo charger (TP4054/SGM4056 with dedicated `B+`/`B-` pads on the underside). Rev A relies directly on this native hardware without redundant silicon.
- **LED Power Gating (Active in Hardware):** The 30 per-key + underglow reverse-mount SK6812MINI-E LEDs draw ~0.6 mA each in static idle even when displaying black (18–30 mA continuous loss). In Rev A, an **AO3401A P-channel MOSFET** ($R_{\text{DS(on)}} < 85\text{ m}\Omega$) switches the entire `3V3_LED` rail via GPIO `LED_EN` (`P0.08`). Quiescent drain on the LED rail drops to **0.00 µA** when off.
- **Sensor Rail Reality:** The 30× HAL403SO sensors remain continuously energized on the clean analog rail (`3V3_A`) during operation, drawing **42 mA typ**. On a standard 500 mAh LiPo cell, Rev A delivers **~11–12 hours** of continuous active wireless operation. It is optimized for desk use, firmware validation, and short-duration wireless testing.

#### B. Rev B (Medici Project Grant Objective — Production Wireless)
- **Synchronized Sensor Power Gating:** In Rev B, an ultra-fast high-side P-MOSFET / load switch is added to the sensor rail (`3V3_A`). Firmware strobes the sensors ON only during the ~20 µs SAADC sampling window of each multiplexer scan frame.
- **Average Sensing Power:** Duty-cycling the 42 mA load drops average sensing current from 42 mA down to **< 1.5 mA**.
- **True Deep Sleep Mode (< 20 µA):** Inactivity shuts down the analog sensor rail, dropping total system sleep current to **< 20 µA**, unlocking multi-week shelf standby.
- **Hardware Enhancements:** Integrates a battery voltage divider to `AIN2` (`P0.04`) for battery percentage telemetry and a physical slide switch footprint to disconnect the LiPo during transit.

---

## 4. Analog Front-End & Multiplexing Topology

### 4.1 Dual-Bank 16:1 Partitioned Architecture

```
[30x HAL403SO Sensors + 2x Hard-GND Channels]
          │
          ├── Bank A (Keys 1-16) ──> [U1: TMUX1308] (0-7) ─┐
          │                         [U2: TMUX1308] (0-7) ─┴─> MUX_OUT   ──> AIN7 (P0.31)
          │
          └── Bank B (Keys 17-30 + 2 GND) 
                                 ──> [U3: TMUX1308] (0-7) ─┐
                                     [U4: TMUX1308] (0-7) ─┴─> MUX_OUT_B ──> AIN5 (P0.29)
```

- **Multiplexer IC:** Texas Instruments **TMUX1308PWR** (8:1 Analog Multiplexer, TSSOP-16).
- **On-Resistance ($R_{\text{on}}$):** 59 Ω typ (120 Ω max at 3.3 V, flatness 1.5 Ω).
- **Switch Capacitance:** $C_{\text{D(OFF)}} = 37\text{ pF}$, $C_{\text{D(ON)}} = 40\text{ pF}$, pin capacitance 9–11 pF.
- **Propagation Delay / Switching Speed:** $t_{\text{pd}} \sim 40\text{ ns}$ (transition time $t_{\text{TRAN}} \sim 25\text{ ns}$).
- **Capacitance Reduction via Dual ADC Split:**  
  Routing Bank A (`U1` + `U2`) to **AIN7 (P0.31)** and Bank B (`U3` + `U4`) to **AIN5 (P0.29)** isolates the nodes, reducing total line capacitance from **160 pF down to ~80 pF (a 34% reduction)** and lowering settling time to < 20 µs.
- **Hardware Zero-Reference Autocalibration:**  
  Channels 7 of `U3` and `U4` are tied directly to analog `GND`. Real-time sampling during every scan frame nulls SAADC offset, thermal drift, and reference sag.

---

## 5. Mechanical Engineering: MagLev Switch V5.0 & Calibrated Keycaps

### 5.1 Kinematic Specifications (Switch V5.0 "U-Body + Keyed SideWall + Closed-Front Stem")

| Parameter | Value | Engineering Notes |
|:---|:---:|:---|
| **Outer Envelope** | 12.00 × 12.00 × 8.45 mm | Fits standard 19.00 × 19.00 mm switch grid |
| **Total Stroke (Travel)** | **2.36 mm** | +32.6% increase over V4.0 (1.78 mm) |
| **Mounting Plate Thickness** | 3.00 mm | Clamps U-Housing and Keyed SideWall simultaneously |
| **Magnetic Suspension** | 3 Neodymium N52 Array | 100% springless; progressive repulsive/attractive curve |
| **Floor Magnet ($S_1$)** | Ø4.00 × 1.50 mm (Socket: **Ø4.06 mm**) | Repels stem magnet; features Ø1.70 mm ejection pin |
| **Top Bridge Magnet ($S_2$)** | Ø4.00 × 1.50 mm (Socket: **Ø4.16 mm**) | Attracts stem at rest; open dual-jaw cradle (≥0.84 mm walls) |
| **Stem Magnet (Center)** | Ø4.00 × 1.50 mm (Socket: **Ø4.15 mm**) | Horizontal press-fit in stem center |
| **Magnetic Barrier Thickness** | **0.45 mm / 0.50 mm** | Thinned from 0.65 mm: +25% to 35% magnetic spring force ($F \propto 1/d^4$) |
| **Stem Guide Tolerance** | 0.10 mm/side ($Y$), 0.16 mm/side ($X$) | 45% reduction in stem wobble; bed-printed flat $-Y$ face |
| **Static & Kinematic Collisions** | **0.0000 mm³** | Verified by 21-step CAD kinematic raycast sweep |

### 5.2 Calibrated Bambu Lab A1 Production Tolerances

- **Vertical magnet socket (base floor):** **Ø 4.10 mm** (firm press-fit without cracking layer lines).
- **Horizontal magnet socket (lying stem):** **Ø 4.15 mm** (smooth insertion without splitting delamination).
- **Housing guide channel (FLAT stem):** **8.10 mm** (+0.10 mm clearance over 8.00 mm stem).
- **Stem $\leftrightarrow$ Keycap connector:** **8.05 mm** male plug $\leftrightarrow$ **8.05 mm** reinforced square female socket (1:1 zero-slop fit).
- **Print orientation:** Pre-rotated **$-45^\circ$ in $Z$** so slicer monotonic raster lines align 100% parallel to the travel axis, eliminating stair-step layer friction.

### 5.3 Keycaps Ultimate V3.2 Family

- **Geometry:** Centered spherical dish (Ø 10.60 mm, 0.70 mm depression, 1.90 mm ergonomic flat rim).
- **4-Way Reinforced HE Socket:** Quad-buttress reinforced core (`HE_NorthButtress`, `HE_SouthButtress`, lateral ribs tied to skirt, 4 diagonal corner gussets) eliminates layer delamination during aggressive stem press-fit.
- **Support-Free Printability:** Pre-angled at $-62^\circ$ with integrated non-removable structural bed foot ($\sim 15\text{ mm}^2$ PEI contact area) allowing clean FDM/SLA printing with **Supports: OFF**.

---

## 6. Manufacturing & Validation Status

| Subsystem | Milestone | Current Status | Verification Evidence |
|:---|:---|:---:|:---|
| **Protoboard Rig** | 15× SS49E + CD74HC4067 + nRF52840 | **Validated 100%** | Running Zephyr v0.3.1 firmware; real-time Web VIA monitor at 15 Hz |
| **PCB Layout (Rev A)** | Ambidextrous 30-key bottom-mount PCB | **Completed** | KiCad 10 DRC/ERC passed (0 errors, 0 warnings) |
| **PCBA Package** | JLCPCB Economic/Standard SMT order | **Production Ready** | Gerbers, CPL, BOM generated (`HE_KB_RevA_Gerbers.zip`, `jlc_cpl.csv`) |
| **MagLev Switch** | Switch V5.0 CAD & kinematics | **Validated & Printed** | STLs exported, 0.000 mm³ collision, test prints on Bambu A1 verified |
| **Ergonomic Keycaps** | Keycaps Ultimate V3.2 (HE + MX) | **Validated & Printed** | 4-way reinforced socket, support-free print bed verified |

---

## 7. Medici Project (1517 Fund) — $1,000 USD Grant Allocation

The $1,000 USD Medici grant is allocated with full transparency to sustain development momentum, fund the next hardware spin, and expand open-source educational documentation:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1517 FUND MEDICI GRANT BUDGET ALLOCATION ($1,000 USD TOTAL)                 │
├──────────────────────────────────────┬─────────────┬────────────────────────┤
│ Category & Item                      │ Cost (USD)  │ Engineering Purpose    │
├──────────────────────────────────────┼─────────────┼────────────────────────┤
│ 1. R&D Seed Capital Recovery &       │   $450.00   │ Re-investing personal  │
│    Continuity Runway (Rev A -> B)    │             │ savings spent on proto-│
│    Self-funded prototypes, initial   │             │ boards, initial JLCPCB │
│    PCBA batch & early tooling        │             │ PCBA & testing supplies│
├──────────────────────────────────────┼─────────────┼────────────────────────┤
│ 2. PCB Rev B Fabrication &           │   $350.00   │ Direct JLCPCB Rev B    │
│    Interactivity Modules             │             │ run (Sensor Gating +   │
│    OLED displays, I2C touchpads,     │             │ slide switch + divider)│
│    rotary encoders, LiPos & magnets  │             │ and assembling units   │
├──────────────────────────────────────┼─────────────┼────────────────────────┤
│ 3. Open-Source Ecosystem, Printing   │   $200.00   │ Filaments/resins for   │
│    Materials & Build Guides          │             │ ergonomic tenting,     │
│    Tenting test stands, multilingual │             │ multilingual keycaps & │
│    keycaps & beginner build guides   │             │ educational tutorials  │
├──────────────────────────────────────┼─────────────┼────────────────────────┤
│ TOTAL                                │  $1,000.00  │ 100% Direct Product R&D│
└──────────────────────────────────────┴─────────────┴────────────────────────┘
```
