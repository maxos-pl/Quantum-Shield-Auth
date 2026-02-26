# 🛡️ Quantum Shield Auth

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.1.0-green.svg)
![Security](https://img.shields.io/badge/security-behavioral-red.svg)
![Vanilla JS](https://img.shields.io/badge/javascript-vanilla-yellow.svg)

**Quantum Shield Auth** is a lightweight, aesthetically pleasing verification widget inspired by modern cybersecurity standards. Moving away from traditional CAPTCHAs, it utilizes multi-layered **Behavioral Analysis** to distinguish humans from automated scripts.



---

## 🚀 Key Features

* **Biometric Slider:** Analyzes cursor trajectory (Y-axis variance) and movement speed to block linear bot scripts.
* **Environment Check:** Deep scans for automation signatures such as `navigator.webdriver` and hidden browser properties.
* **Dynamic Cell Input:** Character-by-character input of a randomly generated word, verifying human typing rhythm (**Keystroke Dynamics**).
* **Pressure Analysis:** Measures "Hold-to-Verify" duration (ms) to eliminate instant programmatic clicks.
* **UI Hardening:** Strict prevention of text selection, copying, element dragging, and DevTools shortcuts (F12/Ctrl+U).

---

## 🛠️ Tech Stack

- **HTML5** — Semantic structure.
- **CSS3** — Custom properties and `cubic-bezier` animations.
- **JavaScript (ES6+)** — Pure logic with zero external dependencies.

---

## ⚙️ Security Matrix

| Method | Metric | Target |
| :--- | :--- | :--- |
| **Slider** | Y-trajectory & Velocity | Linear scripts, Selenium |
| **Checkbox** | Network emulation delay | Headless browsers |
| **Word Input** | Keystroke Jitter ($ms$) | Auto-fillers, Puppeteer |
| **Smart Button** | Hold duration threshold | Auto-clickers |

---

## 🛡️ Advanced Backend Integration (Hardening Guide)

To make this widget production-ready, the client-side success must be verified by a secure backend. Simply receiving a `verified: true` flag is not enough.

### 1. Telemetry Validation Logic
Your backend should receive raw behavioral data and perform the following checks:

* **Entropy Analysis:** Calculate the standard deviation of the mouse Y-coordinates. If $SD \approx 0$, the movement is synthetic.
* **Velocity Thresholds:** Verify the time taken for each step. For example, if the 5-letter word was "typed" in less than 200ms, flag it as a bot.
* **Sequence Check:** Ensure steps were completed in the correct order (Slider -> Checkbox -> Typing -> Hold).



### 2. Secure Handshake (Nonce & JWT)
Prevent **Replay Attacks** (where a bot reuses a previous successful response):
1.  **Challenge:** On page load, the server generates a unique `nonce` (UUID) and stores it in a short-lived cache (Redis).
2.  **Payload:** The frontend sends the `nonce` back along with the encrypted behavioral telemetry.
3.  **Signature:** After validation, the server issues a signed **JWT** (JSON Web Token) containing a `claim` that allows the user to proceed to the next sensitive action (e.g., login or payment).

### 3. Fingerprinting & IP Reputation
- **Canvas Fingerprinting:** Collect the browser's hardware rendering signature. If 50 different IP addresses share the same hardware fingerprint, they belong to the same bot farm.
- **Datacenter Blocking:** Check the user's IP against known lists of VPNs, Tor exit nodes, and AWS/GCP/Azure datacenter ranges.



---

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/maxos-pl/quantum-shield-auth.git](https://github.com/maxos-pl/quantum-shield-auth.git)
    ```
2.  **Deployment:** Simply host the `index.html`, `style.css`, and `script.js` on any web server.
3.  **Test Protection:** Try to right-click, select text, or press `F12` to see the UI hardening in action.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Developed with a focus on non-intrusive security and modern UX.*
