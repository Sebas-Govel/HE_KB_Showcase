# HE-Keyboard — Open-Source Ergonomic MagLev Multimodal Keyboard
> **Open-Source Showcase & Project Pitch for the 1517 Fund Medici Project**

[![Live Pitch Site](https://img.shields.io/badge/Live_Pitch_Site-GitHub_Pages-38bdf8?style=for-the-badge&logo=github)](https://sebas-govel.github.io/HE_KB_Showcase/)
[![Fabrication Status](https://img.shields.io/badge/Status-Rev_A_In_SMT_Fabrication-10b981?style=for-the-badge)](https://sebas-govel.github.io/HE_KB_Showcase/)
[![Firmware](https://img.shields.io/badge/Firmware-Zephyr_RTOS_v0.3.1-a855f7?style=for-the-badge)](https://sebas-govel.github.io/HE_KB_Showcase/)
[![Hardware License](https://img.shields.io/badge/License-CERN--OHL--P-amber?style=for-the-badge)](https://sebas-govel.github.io/HE_KB_Showcase/)

---

## 🚀 Live Project Showcase
Explore the full interactive pitch page, 3D raytraced renders, kinematic section cuts, and KiCad schematics at:  
👉 **[https://sebas-govel.github.io/HE_KB_Showcase/](https://sebas-govel.github.io/HE_KB_Showcase/)**

Detailed hard specifications, mathematical derivations, and tolerance reports are available in the **[Engineering Fact Sheet](ENGINEERING_FACT_SHEET.md)**.

---

## 💡 The Vision: Redesigning the Human-Computer Interface
Keyboards have been trapped in rigid, binary 1980s paradigms. We engineered an open-source, ultra-low profile ergonomic keyboard powered by continuous magnetic sensing. 
Instead of chasing esports latency hype, our mission centers on **postural health, expressive multimodal interaction, radical affordability, and global accessibility through 3D printing and AI-assisted engineering**.

### 🌟 The 7 Core Pillars of the Design:
1. **Real Ergonomics & Postural Health:** Split 30-key ambidextrous layout with native tenting support and ultra-low profile footprint, reducing wrist extension and repetitive strain (RSI).
2. **Multimodal Analog Expression:** Continuous per-key magnetic sensing transforms keys into a velocity-sensitive MIDI instrument with polyphonic aftertouch, an analog gamepad with 360° proportional movement, and an adaptive mechanical keyboard.
3. **Expanded Interactivity Ecosystem:** Integrated AS5600 magnetic rotary encoder, dual thumb trackpads (Azoteq I2C) for mouse navigation without leaving the home row, and an OLED display for live status.
4. **"Endgame for Everyone" (No Paywalls):** High-end flagship performance engineered with accessible components. Zero feature paywalls, zero tiered subscriptions, and zero artificial software limits.
5. **Global Layouts via Support-Free 3D Printing:** 100% support-free 3D printable keycaps (V3.2) and switches (V5.0), empowering anyone from Japan to Africa to Latin America to print custom alphabets and tactile legends at home.
6. **Educational AI-Assisted Hardware Engineering:** Demonstrating how an autodidactic maker outside professional electrical engineering can create complex hardware from scratch leveraging AI for parametric CAD, physics simulation, and PCB design.
7. **The "Prusa Research" Business Model:** Leading a free open-source hardware community while establishing a sustainable hardware peripherals venture from Mexico selling official assembled keyboards and DIY kits worldwide.

---

## ⚡ Engineering Specifications Summary

| Parameter | Specification | Real-World Human / Engineering Impact |
|:---|:---:|:---|
| **Input Modality** | **Continuous Multimodal Analog** | Polyphonic MIDI aftertouch, analog gamepad, adaptive typing |
| **Switch Suspension** | **100% Springless 3-Magnet MagLev** | 2.36 mm travel (+33%), smooth progressive curve, zero metal fatigue |
| **Active Sensor Current** | **1.4 mA typ** (HAL403SO) | > 4.3× lower active power than legacy SS49E (6–9 mA) |
| **RGB Power Gating (Rev A)** | **0.00 µA Quiescent** (AO3401A Gated) | Cuts 18–30 mA of parasitic quiescent LED idle drain |
| **Sensor Power (Rev A vs Rev B)** | **Rev A: 42 mA typ** &bull; **Rev B: < 1.5 mA avg** | Rev A provides ~11–12h on 500mAh; Rev B strobes sensors 20µs |
| **Standby Current (Rev B)** | **< 20 µA Deep Sleep** | Enables multi-week shelf life via synchronized sensor gating |
| **Battery Subsystem** | **SuperMini Native LiPo Charger (TP4054)** | Uses onboard charger (B+/B-); Rev B adds divider & slide switch |
| **Analog MUX $R_{\text{on}}$** | **59 Ω typ** (TI TMUX1308PWR) | 40 ns delay, dual-bank SAADC reduces capacitance by 34% |
| **ADC Noise Floor** | **< ±8 mV** (< 10 counts / 4096) | 50 µs settling + 4-sample moving average filter |
| **Kinematic Collision** | **0.0000 mm³** | 21-step sweep verified; calibrated Bambu Lab A1 press-fits |

---

## 🎯 1517 Fund Medici Project — $1,000 USD Grant Allocation
The $1,000 USD grant is allocated with full transparency to sustain development momentum, fund the next hardware spin, and expand open-source educational documentation:

- **$450.00 USD — R&D Seed Capital Recovery & Continuity Runway (Rev A -> Rev B):** Re-investing personal savings spent on prototypes, early tooling, and the first manufactured PCBA batch, replenishing working capital to absorb physical testing iterations without stalling momentum.
- **$350.00 USD — PCB Rev B Fabrication & Interactivity Modules:** Direct fabrication of the Rev B PCB iteration in JLCPCB (Sensor Power Gating on `3V3_A`, battery divider, physical slide switch), plus purchasing OLED displays, I2C touchpads, rotary encoders, LiPo batteries, and N52 magnets for 3 to 5 full working units.
- **$200.00 USD — Open-Source Ecosystem, Printing Materials & Build Guides:** Filaments and resins to iterate ergonomic tenting stands, multilingual keycaps testing, and producing open beginner-friendly documentation for AI-assisted hardware engineering.

---

*Author:* Sebastian Gonzalez V.  
*Origin:* Mexico  
*Hardware License:* CERN-OHL-P Open-Source Hardware
