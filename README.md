# IT Will Fuzz

## Overview

**IT Will Fuzz** is a versatile fuzz distortion plugin inspired by classic and modern fuzz pedals such as the Fuzz Face, Big Muff, Tone Bender, and other boutique designs.

It is designed to deliver a wide range of fuzz tones — from warm, vintage, low-gain saturation to aggressive, gated, and synth-like distortion. The plugin focuses on preserving musicality while allowing extreme tonal shaping.

Built for guitar and bass, it responds well to playing dynamics, pickup selection, and volume knob interaction, emulating the behavior of analog fuzz circuits.

---

## How It Works

The plugin is based on three core processing stages:

---

### 1. Input Gain & Pre-Shaping

The incoming signal is first amplified and conditioned:

- Controls how hard the signal hits the fuzz stage  
- Strongly affects saturation character and compression  
- Higher input levels produce more aggressive distortion  

This stage mimics how analog fuzz pedals react to instrument level and impedance.

---

### 2. Non-Linear Clipping (Fuzz Core)

The heart of the plugin is a non-linear waveshaping stage:

- Transforms the waveform into a distorted signal  
- Introduces harmonic content (both even and odd harmonics)  
- Can range from smooth saturation to harsh clipping  

Depending on settings, this stage can emulate:

- Soft clipping (tube-like)
- Hard clipping (silicon fuzz)
- Gated / broken fuzz behavior

---

### 3. Tone Shaping & Output

After distortion, the signal is filtered and adjusted:

- Controls brightness and tonal balance  
- Prevents harshness or muddiness  
- Final gain stage balances output level  

This stage is essential to shape the fuzz into a usable musical tone.

---

## Controls

### Volume
Controls the final output level of the plugin.

- Compensates for gain added during distortion  
- Prevents clipping in the DAW  
- Can be used to push subsequent effects  

---

### Gain (Fuzz Amount)
Controls the intensity of the fuzz effect.

- Low values → light saturation / overdrive-like  
- Medium values → classic fuzz tones  
- High values → heavy, saturated distortion  

This parameter defines how aggressively the signal is clipped.

---

### Tone
Controls the tonal balance of the fuzz.

- Lower values → darker, bass-heavy sound  
- Higher values → brighter, more cutting tone  

Internally, this is implemented as a filter shaping the distorted signal.

---

### Bias / Character *(if implemented in your version)*
Controls asymmetry or gating behavior.

- Lower values → gated, sputtery fuzz  
- Higher values → smoother, sustained fuzz  

This simulates transistor biasing variations found in analog circuits.

---

### Output / Level
Final output control (if separate from Volume).

- Used to match levels with bypass signal  
- Prevents clipping in the mix  

---

### Preset Selector

Includes presets inspired by classic fuzz pedals:

- Fuzz Face
- Big Muff Pi
- Tone Bender
- Super Fuzz
- OctaFuzz
- Modern boutique fuzz variants

Each preset adjusts internal parameters to approximate the tonal behavior of the original circuits.

---

## Features

- Wide range of fuzz tones (vintage to modern)
- Non-linear waveshaping engine
- Dynamic response to playing intensity
- Tone shaping filter
- Support for gated and smooth fuzz styles
- Preset system inspired by real pedals
- Works on guitar and bass
- Output level control to prevent clipping

---

## Installation (REAPER)

### Step 1 — Locate JSFX Folder

In REAPER:

1. Go to **Options → Show REAPER resource path in explorer/finder**
2. Open the folder: Effects

---

### Step 2 — Install the Plugin

1. Create a new file:

IT_Will_Fuzz.jsfx

2. Paste the plugin code into this file
3. Save the file

---

### Step 3 — Load in REAPER

1. Open REAPER
2. Insert the plugin:

FX → Add → JS → IT Will Fuzz


---

## Usage Tips

### Vintage Fuzz (Fuzz Face style)
- Gain: Low to Medium  
- Tone: Warm (lower values)  
- Use guitar volume knob to clean up  

---

### Big Muff Style
- Gain: High  
- Tone: Mid to High  
- Sustained, thick distortion  

---

### Gated / Velcro Fuzz
- Gain: High  
- Bias/Character: Low  
- Produces sputtery, broken sounds  

---

### Bass Fuzz
- Keep Tone lower to preserve low-end  
- Avoid excessive gain to prevent muddiness  

---

## Signal Chain Recommendations

- Place **before modulation and delay effects**
- Can be placed before or after compression depending on desired response
- Works well with:
- Envelope filters
- Wah
- Octave effects

---

## Notes

- Fuzz is highly sensitive to input level and impedance
- Different guitars and pickups will produce different results
- Rolling off the instrument volume can clean up the fuzz naturally

---

## License

Free to use and modify.

---

## Author

Developed as part of the **IT Will** plugin series.
