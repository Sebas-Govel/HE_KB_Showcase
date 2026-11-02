# HE-Keyboard — Ultra-Low Power Magnetic Levitation Mechanical Keyboard
> **Open-Source Showcase & Project Pitch for the 1517 Fund Medici Project**

[![Live Pitch Site](https://img.shields.io/badge/Live_Pitch_Site-GitHub_Pages-38bdf8?style=for-the-badge&logo=github)](https://sebas-govel.github.io/HE_KB_Showcase/)
[![Fabrication Status](https://img.shields.io/badge/Status-Rev_A_In_SMT_Fabrication-10b981?style=for-the-badge)](https://sebas-govel.github.io/HE_KB_Showcase/)
[![Firmware](https://img.shields.io/badge/Firmware-Zephyr_RTOS_v0.3.1-a855f7?style=for-the-badge)](https://sebas-govel.github.io/HE_KB_Showcase/)

---

## 🚀 Live Project Showcase
Explore the full interactive pitch page, 3D raytraced renders, kinematic section cuts, and KiCad schematics at:  
👉 **[https://sebas-govel.github.io/HE_KB_Showcase/](https://sebas-govel.github.io/HE_KB_Showcase/)**

Detailed hard specifications and mathematical derivations are available in the **[Engineering Fact Sheet](ENGINEERING_FACT_SHEET.md)**.

---

## ⚡ Key Engineering Highlights

| Metric | Rev A Specification | Advantage vs Industry Standard |
|:---|:---:|:---|
| **Active Sensor Current** | **1.4 mA typ** (HAL403SO) | > 4.3× lower than legacy SS49E (6–9 mA) |
| **RGB Static Idle Drain** | **0.00 µA** (AO3401A Gated) | Cuts 18–30 mA of parasitic quiescent draw |
| **Switch Mechanism** | **100% Springless 3-Magnet MagLev** | 2.36 mm travel, zero metal fatigue, progressive force |
| **Analog MUX $R_{\text{on}}$** | **59 Ω typ** (TI TMUX1308PWR) | 40 ns delay, dual-bank SAADC reduces capacitance by 34% |
| **ADC Noise Floor** | **< ±8 mV** (< 10 counts / 4096) | 50 µs settling + 4-sample moving average filter |
| **Deep Sleep Current** | **< 20 µA** | All-day wireless battery life on lightweight LiPo cell |
| **Kinematic Collision** | **0.0000 mm³** | 21-step sweep verified; calibrated Bambu Lab A1 press-fits |

---

## 📁 Repository Contents
This public showcase repository contains exclusively the presentation layer and visual engineering documentation:
- `index.html`: Responsive single-page presentation site with Tailwind CSS and interactive 3D lightbox viewer.
- `ENGINEERING_FACT_SHEET.md`: Formal technical paper with electrical budgets, multiplexer dynamics, and tolerance logs.
- `assets/img/`: High-resolution 3D raytraces, finite element magnetic simulations (Magpylib), and KiCad 10 schematic exports.

---

## 🎯 1517 Fund Medici Project — $1,000 USD Grant Allocation
- **$400 USD:** High-bandwidth USB logic analyzer & differential oscilloscope (Rigol DHO800 / Kingst LA2016) to capture 40 ns TMUX switching transients and tune SAADC settling time below 10 µs.
- **$250 USD:** Low-friction self-lubricating engineering polymers (POM Delrin, PTFE, micro-SLA 8K resin) for a glass-like frictionless magnetic glide.
- **$350 USD:** PCB Rev B fabrication spin with integrated LiPo power management IC (PMIC) and wireless pilot production batch.

---

*Author:* Sebastian Gonzalez V.  
*Hardware License:* CERN-OHL-P Open-Source Hardware
