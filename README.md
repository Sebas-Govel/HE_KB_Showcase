# HE-Keyboard — Ultra-Low Power Magnetic Levitation Mechanical Keyboard
> **Open-Source Showcase & Project Pitch for the 1517 Fund Medici Project**

[![Live Pitch Site](https://img.shields.io/badge/Live_Pitch_Site-GitHub_Pages-38bdf8?style=for-the-badge&logo=github)](https://sebas-govel.github.io/HE_KB_Showcase/)
[![Fabrication Status](https://img.shields.io/badge/Status-Rev_A_In_SMT_Fabrication-10b981?style=for-the-badge)](https://sebas-govel.github.io/HE_KB_Showcase/)
[![Firmware](https://img.shields.io/badge/Firmware-Zephyr_RTOS_v0.3.1-a855f7?style=for-the-badge)](https://sebas-govel.github.io/HE_KB_Showcase/)

---

## 🚀 Live Project Showcase
Explore the full interactive pitch page, 3D raytraced renders, kinematic section cuts, and KiCad schematics at:  
👉 **[https://sebas-govel.github.io/HE_KB_Showcase/](https://sebas-govel.github.io/HE_KB_Showcase/)**

Detailed hard specifications, mathematical derivations, and tolerance reports are available in the **[Engineering Fact Sheet](ENGINEERING_FACT_SHEET.md)**.

---

## ⚡ Key Engineering Highlights

| Metric | Specification | Engineering Advantage vs Industry Standard |
|:---|:---:|:---|
| **Active Sensor Current** | **1.4 mA typ** (HAL403SO) | > 4.3× lower active power than legacy SS49E (6–9 mA) |
| **RGB Power Gating (Rev A)** | **0.00 µA Quiescent** (AO3401A Gated) | Cuts 18–30 mA of parasitic quiescent LED idle drain |
| **Sensor Power (Rev A vs Rev B)** | **Rev A: 42 mA typ** &bull; **Rev B: < 1.5 mA avg** | Rev A provides ~11–12h on 500mAh; Rev B strobes sensors 20µs |
| **Standby Current (Rev B)** | **< 20 µA Deep Sleep** | Enables multi-week shelf life via synchronized sensor gating |
| **Battery Subsystem** | **SuperMini Native LiPo Charger (TP4054)** | Uses onboard charger (B+/B-); Rev B adds divider & slide switch |
| **Switch Mechanism** | **100% Springless 3-Magnet MagLev** | 2.36 mm travel (+33%), zero metal fatigue, progressive curve |
| **Analog MUX $R_{\text{on}}$** | **59 Ω typ** (TI TMUX1308PWR) | 40 ns delay, dual-bank SAADC reduces capacitance by 34% |
| **ADC Noise Floor** | **< ±8 mV** (< 10 counts / 4096) | 50 µs settling + 4-sample moving average filter |
| **Kinematic Collision** | **0.0000 mm³** | 21-step sweep verified; calibrated Bambu Lab A1 press-fits |

---

## 📁 Repository Contents
This public showcase repository contains exclusively the presentation layer and visual engineering documentation:
- `index.html`: Responsive single-page presentation site with Tailwind CSS and interactive 3D lightbox viewer.
- `ENGINEERING_FACT_SHEET.md`: Formal technical paper with electrical budgets, multiplexer dynamics, and tolerance logs.
- `assets/img/`: High-resolution 3D raytraces, finite element magnetic simulations (Magpylib), and KiCad 10 schematic exports.

---

## 🎯 1517 Fund Medici Project — $1,000 USD Grant Allocation
- **$350 USD — Measurement & Diagnostic Instrumentation:** Portable USB logic analyzer / oscilloscope (Rigol DHO804 / Kingst LA2016) to measure real-time TMUX1308 switching transients, capture SAADC ringing, and optimize Zephyr settling delay below 10 µs.
- **$250 USD — Technical Low-Friction Polymers & Consumables:** Engineering POM (Delrin), PTFE-infused resins, and Bambu Lab A1 consumables to eliminate layer friction for the V5.0 magnetic stems.
- **$400 USD — PCB Rev B Iteration & Pilot Batch:** JLCPCB Rev B run integrating Sensor Power Gating on `3V3_A`, battery monitoring divider, physical slide switch footprint, SMT passives, N52 magnets, and a functional pilot batch of 3 to 5 complete units.

---

*Author:* Sebastian Gonzalez V.  
*Hardware License:* CERN-OHL-P Open-Source Hardware
