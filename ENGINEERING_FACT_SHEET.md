# Engineering Fact Sheet — Open-Source Hall Effect Keyboard
**Project Pitch Documentation for 1517 Fund (Medici Project)**  
*Author:* Sebastian Gonzalez V.  
*Date:* November 2026  
*Status:* Hardware Rev A in Fabrication & Assembly (JLCPCB) | Firmware v0.3.1 Validated | Rev B in Architecture  

---

## 1. Executive Summary & Core Engineering Thesis

Commercial Hall Effect (magnetic) mechanical keyboards (e.g. Wooting, SteelSeries Apex Pro, Razer Huntsman Analog) provide millimetric analog control and dynamic rapid trigger, but remain strictly corded, desktop-bound peripherals. Their architectures rely on power-hungry linear Hall sensors (consuming 6 to 10 mA per key continuously) and un-gated RGB arrays that draw between **350 mA and 1.2 A**. Running such a keyboard on portable battery power results in less than 2 to 4 hours of battery life.

**Our Core Engineering Thesis:**  
By combining:
1. **Ultra-low power ratiometric Hall sensors** (HAL403SO, 1.4 mA typ vs ~6.5 mA legacy SS49E),
2. **Dual-bank low-capacitance analog multiplexing** (4× TI TMUX1308 with 59 Ω $R_{\text{on}}$ and split SAADC routing),
3. **P-MOSFET Power Gating on the LED rail (Rev A)**: cutting parasitic RGB static idle drain,
4. **Synchronized Sensor Strobing / Power Gating (Rev B Roadmap)**: strobing the analog sensor rail for ~20 µs during conversion to slash average sensing current below 1.5 mA and enable true < 20 µA sleep,
5. **Springless 3D-printed magnetic levitation switches** (Switch V5.0 U-Body with 3-magnet repulsive/attractive kinematics), and
6. **Firmware-level cyclic settling and ratiometric cancellation** on the nRF52840 (Zephyr RTOS),

we achieve high-precision, sub-0.1 mm rapid trigger actuation with an active scan floor that enables true wireless portable operation.

---

## 2. Electrical Architecture & Power Budget

### 2.1 Sensor Power Comparison: HAL403SO vs Legacy SS49E

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

### 2.2 Power Gating Architecture: Rev A Reality vs Rev B Roadmap

An honest and rigorous evaluation of power consumption reveals two distinct stages of development:

#### A. Rev A (Current Fabrication State — SMT Assembly at JLCPCB)
- **Native Battery Charging:** The SuperMini nRF52840 board integrates a native onboard LiPo charger (TP4054/SGM4056 with dedicated `B+`/`B-` pads on the bottom face). Rev A directly leverages this native charger without adding redundant charging silicon.
- **LED Power Gating (Active in Hardware):** The 30 per-key + underglow reverse-mount SK6812MINI-E LEDs draw ~0.6 mA each in *static idle* even when displaying black (18–30 mA continuous parasitic loss). In Rev A, an **AO3401A P-channel MOSFET** ($R_{\text{DS(on)}} < 85\text{ m}\Omega$) switches the entire `3V3_LED` rail via GPIO `LED_EN` (`P0.08`). When LEDs are turned off, quiescent drain on the LED rail drops to **0.00 µA**.
- **Sensor Rail Reality:** The 30× HAL403SO sensors remain continuously powered on the clean analog rail (`3V3_A`) during operation, drawing **42 mA typ**. On a standard 500 mAh LiPo battery, Rev A provides **~11–12 hours** of active wireless typing. It is primarily optimized for USB-C desktop use, firmware validation, and short-duration portable testing.

#### B. Rev B (Medici Project Grant Objective — Production Wireless)
- **Synchronized Sensor Power Gating:** In Rev B, an ultra-fast high-side P-MOSFET / load switch is added to the sensor rail (`3V3_A`). Instead of leaving sensors energized continuously, firmware strobes the sensors ON only during the ~20 µs SAADC sampling window of each multiplexer scan frame.
- **Dramatically Slashed Sensing Power:** Duty-cycling the 42 mA load reduces the average sensing current from 42 mA down to **< 1.5 mA**.
- **True Deep Sleep Mode (< 20 µA):** When the keyboard detects inactivity, the sensor rail is held OFF, the nRF52840 enters System ON low-power sleep, and quiescent draw drops to **< 20 µA**, extending wireless shelf standby to **several weeks**.
- **Hardware Enhancements:** Integrates a battery voltage divider connected to `AIN2` (`P0.04`) for fuel gauge telemetry and a physical slide switch footprint to physically disconnect the LiPo cell during transport.

---

## 3. Analog Front-End & Multiplexing Topology

### 3.1 Dual-Bank 16:1 Partitioned Architecture

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
  Routing Bank A (`U1` + `U2`) to **AIN7 (P0.31)** and Bank B (`U3` + `U4`) to **AIN5 (P0.29)** isolates the two pairs. Each ADC node sees only two multiplexer output pins in parallel instead of four, cutting total line capacitance from **160 pF down to ~80 pF (a 34% reduction)** and lowering settling time to < 20 µs.
- **Hardware Zero-Reference Autocalibration:**  
  Channels 7 of `U3` and `U4` are tied directly to analog `GND`. During every scan frame, the firmware samples these hard-ground channels to measure instantaneous SAADC offset, thermal drift, and reference sag in real time, automatically nulling baseline noise.

---

## 4. Mechanical Engineering: MagLev Switch V5.0 & Calibrated Keycaps

### 4.1 Kinematic Specifications (Switch V5.0 "U-Body + Keyed SideWall + Closed-Front Stem")

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

### 4.2 Calibrated Bambu Lab A1 Production Tolerances

Empirically derived from iterative micrometer gauge blocks printed on a textured PEI bed:
- **Vertical magnet socket (base floor):** **Ø 4.10 mm** (firm press-fit without cracking layer lines).
- **Horizontal magnet socket (lying stem):** **Ø 4.15 mm** (smooth insertion without splitting delamination).
- **Housing guide channel (FLAT stem):** **8.10 mm** (+0.10 mm clearance over 8.00 mm stem).
- **Stem $\leftrightarrow$ Keycap connector:** **8.05 mm** male plug $\leftrightarrow$ **8.05 mm** reinforced square female socket (1:1 zero-slop fit).
- **Print orientation:** Pre-rotated **$-45^\circ$ in $Z$** so slicer monotonic raster lines align 100% parallel to the travel axis, eliminating stair-step layer friction.

### 4.3 Keycaps Ultimate V3.2 Family

- **Geometry:** Centered spherical dish (Ø 10.60 mm, 0.70 mm depression, 1.90 mm ergonomic flat rim).
- **4-Way Reinforced HE Socket:** Quad-buttress reinforced core (`HE_NorthButtress`, `HE_SouthButtress`, lateral ribs tied to skirt, 4 diagonal corner gussets) completely eliminates socket delamination during aggressive stem press-fit.
- **Support-Free Printability:** Pre-angled at $-62^\circ$ with integrated non-removable structural bed foot ($\sim 15\text{ mm}^2$ PEI contact area) allowing clean FDM/SLA printing with **Supports: OFF**.

---

## 5. Firmware Architecture & Signal Processing (Zephyr RTOS)

1. **Ratiometric SAADC Reference:** Configured with $V_{\text{DD}}/4$ internal reference and $1/4$ input gain. Full scale equals $V_{\text{DD}}$, making ADC counts ratiometrically invariant to battery voltage fluctuations.
2. **MUX Switching & Settling Time:** Hardware timer enforces a **50 µs settling window** (`CONFIG_KB_MUX_SETTLING_ENABLE=y`) between channel address switching and SAADC sample trigger, eliminating capacitive crosstalk between adjacent multiplexer channels.
3. **Sliding Circular Moving Average Filter:** 4-sample buffer per channel (`CONFIG_KB_MOVING_AVERAGE_SAMPLES=4`) provides ~4 ms group delay (imperceptible to human typing) while collapsing the noise floor from $\pm 80\text{ mV}$ down to **$< \pm 8\text{ mV}$ ($< 10$ raw counts out of 4096)**.
4. **HID Safe Boot Mode:** USB/BLE HID output defaults to muted upon power-up until baseline auto-calibration completes, preventing phantom keystrokes during boot.

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

The $1,000 USD Medici grant is deployed with strict cost discipline toward high-precision instrumentation, specialized engineering materials, and the Rev B hardware spin:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1517 FUND MEDICI GRANT BUDGET ALLOCATION ($1,000 USD TOTAL)                 │
├──────────────────────────────────────┬─────────────┬────────────────────────┤
│ Category & Item                      │ Cost (USD)  │ Engineering Purpose    │
├──────────────────────────────────────┼─────────────┼────────────────────────┤
│ 1. Precision Measurement Instrument  │   $350.00   │ Portable USB logic     │
│    Rigol DHO804 / Kingst LA2016 16-Ch│             │ analyzer / scope to    │
│    Logic Analyzer + Active Probes    │             │ capture 40 ns TMUX     │
│                                      │             │ transitions & tune     │
│                                      │             │ settling below 10 µs   │
├──────────────────────────────────────┼─────────────┼────────────────────────┤
│ 2. Technical Low-Friction Polymers   │   $250.00   │ Self-lubricating POM / │
│    Engineering POM (Delrin), PTFE-   │             │ PTFE resins & Bambu A1 │
│    infused resin & A1 consumables   │             │ consumables for a zero-│
│                                      │             │ wear, glass-like glide │
├──────────────────────────────────────┼─────────────┼────────────────────────┤
│ 3. PCB Rev B Iteration & Pilot Batch │   $400.00   │ Rev B PCBs with Sensor │
│    JLCPCB Rev B run (Sensor Power    │             │ Power Gating (3V3_A),  │
│    Gating + slide switch + divider), │             │ slide switch, SMT pass-│
│    SMT passives & N52 magnets        │             │ ives & pilot batch of  │
│                                      │             │ 3 to 5 full units      │
├──────────────────────────────────────┼─────────────┼────────────────────────┤
│ TOTAL                                │  $1,000.00  │ 100% Direct Hardware   │
└──────────────────────────────────────┴─────────────┴────────────────────────┘
```
