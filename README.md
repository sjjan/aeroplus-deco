# AeroPlus Deco

**A technical dive decompression planner for open-circuit and CCR diving.**

Live app → [aeroplus-deco on GitHub Pages](https://sjjan.github.io/aeroplus-deco/AeroPlus-Deco.html)

---

## What it does

AeroPlus Deco is a browser-based decompression planner built on the **Bühlmann ZHL-16C algorithm with gradient factors (GF Lo/Hi)**. It runs entirely in your browser — no installation, no server, no data collection.

**Features**

- Bühlmann ZHL-16C with gradient factors (GF Lo/Hi)
- Multi-gas planning with automatic gas switching at MOD
- Trimix support (O₂ / He / N₂)
- CCR closed-circuit rebreather planning with setpoints, O₂ cylinder and scrubber tracking
- Bailout gas cylinder roles
- CNS% and OTU oxygen toxicity tracking
- Rock bottom gas reserve calculation per cylinder
- Consecutive dive planning with residual tissue offgassing
- Contingency plans (deeper / longer)
- Gas density warnings (5.2 and 6.2 g/ℓ thresholds)
- Auto GF Low setting matched to first gas switch depth ([Andy Davis method](https://scubatechphilippines.com/scuba_blog/gradient-factors-application-use-settings-open-circuit-tech/))
- Partial pressure gas blending calculator
- MOD / END / EAD / EADD / gas density calculator
- Best mix calculator
- Export dive plan as printable report
- Save and restore plans via JSON

---

## How to use

Open the HTML file in any modern browser — Safari, Chrome, Firefox. No dependencies, no build step.

To use the hosted version, visit the GitHub Pages link above.

To use it offline, download `AeroPlus-Deco.html` and open it locally.

---

## Background

AeroPlus is developed by a technical diver who is also a bush pilot, owner of **African Flying Adventures**, and a developer of aviation software solutions. The name reflects the connection between the two disciplines: both aviation and technical diving are governed by air pressure, demand respect for the natural environment, and depend on procedures, checklists and teamwork to keep people alive.

---

## Disclaimer

⚠ This app is provided for **educational and planning purposes only**. Always verify decompression calculations using a certified dive planning tool or a qualified dive professional. Incorrect decompression can result in serious injury or death. Use at your own risk.

---

## License

This project is open source. You are free to use, share and modify it. See [LICENSE](LICENSE) for details.

Contributions welcome — open an issue or submit a pull request.
