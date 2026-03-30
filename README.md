# It-Will-Fuzz-Plugin-Reaper
It WILL Fuzz - Plugin Reaper DAW

  This plugin is a non-linear fuzz distortion processor with dynamic tone shaping, 
  designed to emulate the behavior of analog germanium-based fuzz circuits 
  while maintaining controlled digital stability.

  Signal Flow Overview
  Input → Pre-Gain → High-Pass Filter → Nonlinear Drive Stage → Texture Modulation
  → Tone Shaping (Band Split + Mid Scoop) → Output Gain → Dry/Wet Mix

  A first-order high-pass filter (~140 Hz) is applied:
  Removes excessive low-frequency energy
  Prevents intermodulation distortion and “mud” in the fuzz stage
  Improves note definition, especially for low-register instruments (bass guitar !!!)

  The core distortion is generated using an arctangent waveshaper:
  Produces soft saturation characteristic of germanium circuits
  with predominantly odd and even harmonics and additional 
  amplitude-dependent compression for smoother clipping

  The tone stage is implemented as a dual-band filter blend: Tone Shaping (Big Muff-style Network)
