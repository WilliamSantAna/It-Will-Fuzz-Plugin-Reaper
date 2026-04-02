desc:It WILL Fuzz
version:    1.0.3
author:     William Sant Ana
tags:       processing fuzz sharpened
link:       https://github.com/WilliamSantAna/It-Will-Fuzz-Plugin-Reaper
screenshot: 
about:
 # It WILL Fuzz
 
  This plugin is a non-linear fuzz distortion processor with dynamic tone shaping, 
  designed to emulate the behavior of analog germanium-based fuzz circuits 
  while maintaining controlled digital stability.

  Signal Flow Overview
  Input → Pre-Gain → High-Pass Filter → Nonlinear Drive Stage → Texture Modulation
  → Tone Shaping (Band Split + Mid Scoop) → Output Gain → Dry/Wet Mix

  A first-order high-pass filter (~140 Hz) is applied:
  Removes excessive low-frequency energy
  Prevents intermodulation distortion and “mud” in the fuzz stage
  Improves note definition, especially for low-register instruments (bass guitar !)

  The core distortion is generated using an arctangent waveshaper:
  Produces soft saturation characteristic of germanium circuits
  Generates predominantly odd and even harmonics
  Includes additional amplitude-dependent compression for smoother clipping

  The tone stage is implemented as a dual-band filter blend: Tone Shaping (Big Muff-style Network)

  Key Characteristics
    Germanium-style soft clipping (smooth, compressed, musical)
    Pre-distortion low-end control (tight, defined response)
    Analog-like instability via stochastic modulation
    Big Muff-inspired tone shaping with mid scoop
    Stable output with limiter protection
    Parallel processing capability


slider1:inputGain=5.3<0.1,10,0.1>Gain
slider2:drive=10<0,20,0.5>Drive
slider3:outputGain=0.5<0,2,0.01>Output
slider4:mix=1<0,1,0.01>Mix/Blend
slider5:volatility=0.5<0,1,0.01>Tone
slider6:preset=0<0,5,1{It WILL Fuzz,Zvex Fuzz Factory,EHX Big Muff PI,EarthQuaker Erupter,Dunlop Fuzz Face,Vox Tone Bender,Shin-ei Super Fuzz,Dr. Scientific Bit Quest,Fulltone OctaFuzz,JHS Muffuletta,Malekko Omicron,Wampler Velvet Fuzz}>Preset

@init
// Filtro high-pass (remove graves excessivos antes da distorção. Botei em 140hz por padrão, abaixo disso embola)
hp_coeff = exp(-2*$pi*140/srate);
hp_state = 0;

// Filtro low pass (pro tone não atuar em cima dele)
lp_state = 0;

// Segundo filtro (para construir o tone tipo Big Muff)
hp2_state = 0;

// Variáveis para pequena instabilidade (pra eu simular comportamento analógico)
noise_phase = 0;
noise_sample = 0;
noise_smooth = 0;
last_preset = 0;

@slider
preset != last_preset ? (

  last_preset = preset;

  preset == 0 ? ( // It WILL Fuzz (MUITOOO GANHO, Muito molho, Muito grave)
    inputGain = 5.3;
    drive = 20;
    outputGain = 0.5;
    mix = 1;
    volatility = 0;
  );
  
  preset == 1 ? ( // Zvex Fuzz Factory (instável, agressivo)
    inputGain = 7.0;
    drive = 18;
    outputGain = 0.35;
    mix = 1;
    volatility = 0.75;
  );
  
  preset == 2 ? ( // EHX Big Muff Pi (clássico, gordo, mid scoop)
    inputGain = 5.5;
    drive = 17;
    outputGain = 0.40;
    mix = 1;
    volatility = 0.35;
  );
  
  preset == 3 ? ( // EarthQuaker Erupter (fuzz direto, sem tone)
    inputGain = 6.5;
    drive = 20;
    outputGain = 0.32;
    mix = 1;
    volatility = 0.25;
  );
  
  preset == 4 ? ( // Dunlop Fuzz Face (germanium feel)
    inputGain = 4.2;
    drive = 12;
    outputGain = 0.50;
    mix = 1;
    volatility = 0.45;
  );
  
  preset == 5 ? ( // Vox Tone Bender (mais médio/agressivo)
    inputGain = 5.8;
    drive = 15;
    outputGain = 0.42;
    mix = 1;
    volatility = 0.55;
  );
  
  preset == 6 ? ( // Shin-ei Super Fuzz (rasgado + scooped)
    inputGain = 6.2;
    drive = 19;
    outputGain = 0.34;
    mix = 1;
    volatility = 0.65;
  );
  
  preset == 7 ? ( // Dr. Scientific BitQuest (quase glitch/lofi)
    inputGain = 7.5;
    drive = 20;
    outputGain = 0.30;
    mix = 1;
    volatility = 0.9;
  );
  
  preset == 8 ? ( // Fulltone OctaFuzz (harmônicos fortes)
    inputGain = 6.0;
    drive = 18;
    outputGain = 0.36;
    mix = 1;
    volatility = 0.7;
  );
  
  preset == 9 ? ( // JHS Muffuletta (muff moderno equilibrado)
    inputGain = 5.2;
    drive = 16;
    outputGain = 0.45;
    mix = 1;
    volatility = 0.4;
  );
  
  preset == 10 ? ( // Malekko Omicron (tight e moderno)
    inputGain = 4.8;
    drive = 14;
    outputGain = 0.48;
    mix = 1;
    volatility = 0.6;
  );
  
  preset == 11 ? ( // Wampler Velvet Fuzz (suave, quase distortion)
    inputGain = 3.8;
    drive = 10;
    outputGain = 0.55;
    mix = 1;
    volatility = 0.5;
  );
  
  // atualiza UI
  sliderchange(inputGain);
  sliderchange(drive);
  sliderchange(outputGain);
  sliderchange(mix);
  sliderchange(volatility);  
)

@sample
channel = 0;
loop(num_ch,

  // ===== SINAL ORIGINAL =====
  input_sample = spl(channel);

  // ===== GANHO DE ENTRADA =====
  // Ajusta o nível do sinal antes da distorção (pra controlar comportamento de sinal single e humbucker)
  signal = input_sample * (inputGain - 0.5);

  // ===== FILTRO DE GRAVES (TIGHTEN) =====
  // Usando o filtro de high-pass que declarei acima
  hp_out = signal - hp_state + hp_coeff * hp_state;
  hp_state = hp_out;
  signal = hp_out;

  // Guarda referência do sinal limpo (para controle de drive)
  // Preciso adicionar drive apenas no sinal limpo (com filtros hp e lp)
  clean_reference = signal;

  // Dou uma leve comprimida aqui (-30%) so pra segurar aquele pico que estoura (acima de 140hz)
  signal = signal * (1 - 0.3 * abs(signal));

  // Se ainda estourar, seguro o pico em no maximo 1.2db (fica mais suave ainda, senao comprime demais)
  signal = min(max(signal, -1.2), 1.2);

  // ===== INSTABILIDADE LEVE (GERANDO CARÁTERISTICA DE ANALÓGICO) =====
  // Custei pegar a manha disso: Esse srate é a variavel do reaper que define o sampling 44khz até 192khz
  // Senao usar isso, o audio simplesmente some. Então preciso gerar um ruido e dividir pelos splits do srate
  noise_rate = 10;
  noise_phase += noise_rate / srate;

  // Agora vou desafar (multiplicar por -1, e botar uma sujeira randomica leve (*0,05)), 
  noise_phase >= 1 ? (
    noise_phase -= 1;
    noise_sample = (rand(2) - 1) * 0.05;
  );

  // Eu quis suavizar o ruido pra evitar aqule som digital parecendo radio fora de sintonia
  noise_smooth = noise_smooth * 0.95 + noise_sample * 0.05;

  // ===== ESTAGIO DE DRIVE =====
  // Drive com leve variação para dar vida ao som
  drive_dynamic = drive * (1 + noise_smooth * 0.2);
  drive_amount = drive_dynamic * 3;

  // Clipping estilo germanium (mais suave e vintage)
  // Agradecimento ao Prof Spock que gratuitamente disponibilizou no github, 
  // uma documentacao extensa de como aplicar, matematicamente, um soft clip que simula um transistor germanico
  // Como é simples: tangenta hiperbolica do sinal * drive. Esse cara teve a manha!
  saturated = atan(signal * drive_amount);

  // Compressão adicional para suavizar ainda mais. 
  // Porque depois do germanium, o troço clipa com força, chega a estourar tudo
  saturated = saturated * (1 - 0.2 * abs(saturated));

  // ===== ESTAGIO DE MIX/BLEND =====
  // Mistura progressiva entre limpo e distorcido
  shaped_signal = clean_reference + (saturated - clean_reference) * drive;

  // Pequena variação para simular imperfeições analógicas 
  // (sempre com a tangenta hiperbolica....aprendi isso e é magica pura)
  textured = shaped_signal * (1 + noise_smooth * 0.1);
  textured += noise_smooth * 0.05;
  textured = atan(textured);

  // ===== TONE (ESTILO BIG MUFF) =====
  // Curva do knob (melhora resposta perceptiva)
  // Aqui basta elevar ao quadrado o tone e voce tem a curva minima e maxima
  tone_curve = pow(volatility, 2);

  // --- PARTE GRAVE (LOW PASS) ---
  // Aqui começa em 200hz (maximo do grave) e jogo o filtro low-pass e o sinal comprimido anterior 
  // (tudo em cima do rate sampling, senao o aduio some)
  low_freq = 200 + tone_curve * 3000;
  lp_coeff = exp(-2*$pi*low_freq/srate);
  low_part = (1 - lp_coeff) * textured + lp_coeff * lp_state;
  lp_state = low_part;

  // --- PARTE AGUDA (HIGH PASS) ---
  // A parte aguda é a mesma coisa, fecho em 4000hz (acima disso fica estridente e o chiado aparece demais)
  high_freq = 1000 + tone_curve * 4000;
  hp2_coeff = exp(-2*$pi*high_freq/srate);
  high_part = textured - hp2_state + hp2_coeff * hp2_state;
  hp2_state = high_part;

  // --- Eu quis fazer um mid-scoop (os videos do bigmuff pi nao tem caracteristica de ressaltar medios, e sim, capar eles) ---
  // Por isso botei um (1 - 0.6) ali, pra escavar 60% dos medios.
  tone_output =
      (low_part * (1 - tone_curve) + high_part * tone_curve) * (1 - 0.6)
    + textured * 0.6 * 0.3;

  // ===== SAÍDA =====
  output_signal = tone_output * outputGain;

  // Limiter simples para evitar clipping digital 
  // Porque depois de todos os estagios, se o sinal subir demais, eu so corto em 70%
  output_signal = max(min(output_signal, 0.7), -0.7);

  // ===== MIX FINAL =====
  // Mistura entre sinal limpo e processado
  spl(channel) = input_sample + (output_signal - input_sample) * mix;

  channel += 1;
);
