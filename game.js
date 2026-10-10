const missions = [
  {
    code: "MISIÓN 01 // PUERTA DE ENLACE",
    title: "Rompe el primer firewall",
    nav: "Puerta de enlace",
    story: [
      "Conexión interceptada en <b>NODE_01</b>.",
      "El firewall acepta una clave binaria de 4 bits.",
    ],
    lesson:
      "En binario solo existen 0 y 1. De derecha a izquierda, las posiciones valen 1, 2, 4 y 8.",
    label: "NÚMERO DECIMAL DETECTADO",
    value: "5",
    question: "Convierte 5 a binario usando 4 bits.",
    answer: "0101",
    inputMode: "binary",
    hint: "5 se construye con 4 + 1. Activa esas dos posiciones.",
    explain: "0101 = 0×8 + 1×4 + 0×2 + 1×1 = 5.",
    powers: [8, 4, 2, 1],
  },
  {
    code: "MISIÓN 02 // PUERTO SOMBRA",
    title: "Lee la señal enemiga",
    nav: "Puerto sombra",
    story: [
      "El firewall cayó. Entrando al puerto <b>SHADOW_02</b>.",
      "Una señal binaria oculta el número del siguiente puerto.",
    ],
    lesson:
      "Para leer binario, suma el valor de cada posición que tenga un 1. Las posiciones con 0 no cuentan.",
    label: "SEÑAL BINARIA",
    value: "1010",
    question: "¿Qué número decimal representa esta señal?",
    answer: "10",
    inputMode: "decimal",
    hint: "Los unos están en las posiciones 8 y 2.",
    explain: "1010 = 8 + 2 = 10.",
    powers: [8, 4, 2, 1],
  },
  {
    code: "MISIÓN 03 // CÁMARA DE DATOS",
    title: "Activa los bits correctos",
    nav: "Cámara de datos",
    story: [
      "El puerto 10 responde. La bóveda usa claves de 8 bits.",
      "Necesitamos representar el número <b>42</b> para liberar el archivo.",
    ],
    lesson:
      "Con 8 bits aparecen nuevas posiciones: 128, 64, 32, 16, 8, 4, 2 y 1. Busca una suma que dé el objetivo.",
    label: "OBJETIVO DECIMAL",
    value: "42",
    question: "Convierte 42 a binario usando 8 bits.",
    answer: "00101010",
    inputMode: "binary",
    hint: "42 = 32 + 8 + 2.",
    explain: "00101010 activa 32, 8 y 2. Su suma es 42.",
    powers: [128, 64, 32, 16, 8, 4, 2, 1],
  },
  {
    code: "MISIÓN 04 // PAQUETE FANTASMA",
    title: "Decodifica el paquete",
    nav: "Paquete fantasma",
    story: [
      "Archivo liberado. Recibimos un paquete sin cabecera.",
      "Su dirección está codificada en <b>8 bits</b>.",
    ],
    lesson:
      "No necesitas sumar todo. Marca únicamente los valores debajo de los bits que están encendidos.",
    label: "PAQUETE INTERCEPTADO",
    value: "11001001",
    question: "Decodifica el paquete a decimal.",
    answer: "201",
    inputMode: "decimal",
    hint: "Suma 128 + 64 + 8 + 1.",
    explain: "11001001 = 128 + 64 + 8 + 1 = 201.",
    powers: [128, 64, 32, 16, 8, 4, 2, 1],
  },
  {
    code: "MISIÓN 05 // IDENTIDAD DIGITAL",
    title: "Reconstruye el byte",
    nav: "Identidad digital",
    story: [
      "La red exige una firma numérica antes de continuar.",
      "El identificador decimal del operador es <b>99</b>.",
    ],
    lesson:
      "Resta la potencia de 2 más grande que quepa en el número. Repite con el resto hasta llegar a cero.",
    label: "IDENTIDAD DEL OPERADOR",
    value: "99",
    question: "Codifica 99 como un byte de 8 bits.",
    answer: "01100011",
    inputMode: "binary",
    hint: "99 = 64 + 32 + 2 + 1.",
    explain: "01100011 activa 64, 32, 2 y 1. Total: 99.",
    powers: [128, 64, 32, 16, 8, 4, 2, 1],
  },
  {
    code: "MISIÓN 06 // SOBRECARGA",
    title: "Detecta el patrón",
    nav: "Sobrecarga",
    story: [
      "La defensa cambia de clave cada segundo.",
      "Solo hay tiempo para reconocer el patrón del byte.",
    ],
    lesson:
      "Un byte con todos sus bits en 1 contiene la suma de todas sus posiciones. Es el mayor valor posible con 8 bits.",
    label: "BYTE AL MÁXIMO",
    value: "11111111",
    question: "¿Cuál es su valor decimal?",
    answer: "255",
    inputMode: "decimal",
    hint: "Suma 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1.",
    explain: "Todos los bits activos suman 255, el máximo de un byte.",
    powers: [128, 64, 32, 16, 8, 4, 2, 1],
  },
  {
    code: "MISIÓN 07 // NÚCLEO CENTRAL",
    title: "Infiltra el núcleo",
    nav: "Núcleo central",
    story: [
      "Estás dentro del núcleo. El último bloqueo usa una clave grande.",
      "La consola solicita el valor binario de <b>173</b>.",
    ],
    lesson:
      "Divide el problema: 173 contiene 128. Quedan 45. Continúa eligiendo potencias que quepan en el resto.",
    label: "CLAVE DEL NÚCLEO",
    value: "173",
    question: "Convierte 173 a binario usando 8 bits.",
    answer: "10101101",
    inputMode: "binary",
    hint: "173 = 128 + 32 + 8 + 4 + 1.",
    explain: "10101101 activa 128, 32, 8, 4 y 1. Total: 173.",
    powers: [128, 64, 32, 16, 8, 4, 2, 1],
  },
  {
    code: "MISIÓN 08 // ACCESO ROOT",
    title: "Obtén acceso total",
    nav: "Acceso root",
    story: [
      "Última barrera. No habrá pistas del sistema.",
      "Decodifica la firma maestra y toma el control de <b>GHOST NET</b>.",
    ],
    lesson:
      "Prueba final: identifica cada bit activo y suma sus posiciones. Confía en el método.",
    label: "FIRMA MAESTRA",
    value: "11100110",
    question: "Introduce el valor decimal para obtener acceso root.",
    answer: "230",
    inputMode: "decimal",
    hint: "Los bits activos valen 128, 64, 32, 4 y 2.",
    explain: "11100110 = 128 + 64 + 32 + 4 + 2 = 230.",
    powers: [128, 64, 32, 16, 8, 4, 2, 1],
  },
];

const state = {
  mission: 0,
  score: 0,
  attempts: 0,
  correct: 0,
  streak: 0,
  sound: true,
  hintUsed: false,
  locked: false,
};

const $ = (selector) => document.querySelector(selector);
const introScreen = $("#intro-screen");
const gameScreen = $("#game-screen");
const victoryScreen = $("#victory-screen");
const answerInput = $("#answer-input");
const feedback = $("#feedback");
const storageKey = "binary-hacker-progress-v1";
let audioContext;

function setScreen(screen) {
  [introScreen, gameScreen, victoryScreen].forEach((item) => item.classList.remove("active"));
  screen.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function saveProgress() {
  localStorage.setItem(
    storageKey,
    JSON.stringify({
      mission: state.mission,
      score: state.score,
      attempts: state.attempts,
      correct: state.correct,
      streak: state.streak,
    }),
  );
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved || saved.mission >= missions.length) return false;
    Object.assign(state, saved);
    return saved.mission > 0 || saved.score > 0;
  } catch {
    return false;
  }
}

function resetState() {
  Object.assign(state, {
    mission: 0,
    score: 0,
    attempts: 0,
    correct: 0,
    streak: 0,
    hintUsed: false,
    locked: false,
  });
  localStorage.removeItem(storageKey);
}

function beep(frequency = 500, duration = 0.06, type = "square") {
  if (!state.sound) return;
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.035, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

function playSuccess() {
  beep(440, 0.08, "sine");
  setTimeout(() => beep(660, 0.08, "sine"), 90);
  setTimeout(() => beep(880, 0.12, "sine"), 180);
}

function buildMissionList() {
  $("#mission-list").innerHTML = missions
    .map(
      (mission, index) =>
        `<li data-number="${String(index + 1).padStart(2, "0")}">${mission.nav}</li>`,
    )
    .join("");
}

function updateMissionList() {
  [...$("#mission-list").children].forEach((item, index) => {
    item.classList.toggle("complete", index < state.mission);
    item.classList.toggle("active", index === state.mission);
  });
}

function renderPowers(mission) {
  const bits =
    mission.inputMode === "decimal" ? mission.value.padStart(mission.powers.length, "0") : "";
  $("#powers-row").innerHTML = mission.powers
    .map((power, index) => {
      const active = bits[index] === "1" ? " active" : "";
      return `<span class="power-chip${active}">2<sup>${Math.log2(power)}</sup><br>${power}</span>`;
    })
    .join("");
}

function renderMission() {
  const mission = missions[state.mission];
  state.hintUsed = false;
  state.locked = false;
  feedback.className = "feedback";
  feedback.textContent = "";
  answerInput.value = "";
  answerInput.maxLength = mission.inputMode === "binary" ? mission.powers.length : 3;
  answerInput.placeholder = mission.inputMode === "binary" ? "00000000" : "000";
  answerInput.inputMode = "numeric";
  $("#input-hint").textContent =
    mission.inputMode === "binary"
      ? `Usa exactamente ${mission.powers.length} bits: solo 0 y 1.`
      : "Escribe el número decimal.";
  $("#mission-code").textContent = mission.code;
  $("#mission-title").textContent = mission.title;
  $("#terminal-path").textContent = `root@ghost:/node_${String(state.mission + 1).padStart(2, "0")}`;
  $("#attempt-label").textContent = `INTENTOS: ${state.attempts}`;
  $("#operator-level").textContent = String(state.mission + 1).padStart(2, "0");
  $("#story-log").innerHTML = mission.story.map((line) => `<p>&gt; ${line}</p>`).join("");
  $("#lesson-text").textContent = mission.lesson;
  $("#challenge-label").textContent = mission.label;
  $("#challenge-value").textContent = mission.value;
  $("#challenge-question").textContent = mission.question;
  $("#score").textContent = String(Math.max(0, state.score)).padStart(4, "0");
  $("#streak").textContent = state.streak;
  $("#progress-fill").style.width = `${(state.mission / missions.length) * 100}%`;
  renderPowers(mission);
  updateMissionList();
  setTimeout(() => answerInput.focus(), 180);
}

function showFeedback(kind, message) {
  feedback.className = `feedback visible ${kind}`;
  feedback.innerHTML = message;
}

function normalizeAnswer(value, type) {
  const clean = value.trim().replace(/\s+/g, "");
  return type === "decimal" ? String(Number(clean)) : clean;
}

function submitAnswer(event) {
  event.preventDefault();
  if (state.locked) return;

  const mission = missions[state.mission];
  const rawAnswer = answerInput.value;
  const answer = normalizeAnswer(rawAnswer, mission.inputMode);
  const valid =
    mission.inputMode === "binary"
      ? new RegExp(`^[01]{${mission.powers.length}}$`).test(rawAnswer.trim())
      : /^\d+$/.test(rawAnswer.trim());

  if (!valid) {
    beep(180, 0.12, "sawtooth");
    showFeedback(
      "error",
      mission.inputMode === "binary"
        ? `Formato inválido. La clave necesita ${mission.powers.length} bits y solo puede contener 0 o 1.`
        : "Formato inválido. Introduce un número decimal.",
    );
    return;
  }

  state.attempts += 1;
  $("#attempt-label").textContent = `INTENTOS: ${state.attempts}`;

  if (answer === mission.answer) {
    state.locked = true;
    state.correct += 1;
    state.streak += 1;
    const reward = Math.max(50, 150 + state.streak * 20 - (state.hintUsed ? 25 : 0));
    state.score += reward;
    $("#score").textContent = String(state.score).padStart(4, "0");
    $("#streak").textContent = state.streak;
    $("#progress-fill").style.width = `${((state.mission + 1) / missions.length) * 100}%`;
    showFeedback(
      "success",
      `<b>ACCESO CONCEDIDO +${reward}</b><br>${mission.explain} Abriendo siguiente nodo...`,
    );
    playSuccess();
    saveProgress();
    setTimeout(nextMission, 1650);
  } else {
    state.streak = 0;
    state.score = Math.max(0, state.score - 10);
    $("#score").textContent = String(state.score).padStart(4, "0");
    $("#streak").textContent = "0";
    beep(150, 0.15, "sawtooth");
    showFeedback(
      "error",
      `<b>ACCESO DENEGADO</b><br>La clave no coincide. Revisa qué posiciones deben estar activas y vuelve a intentarlo.`,
    );
    answerInput.select();
    saveProgress();
  }
}

function nextMission() {
  state.mission += 1;
  if (state.mission >= missions.length) {
    finishGame();
    return;
  }
  saveProgress();
  renderMission();
}

function showHint() {
  if (state.locked) return;
  const mission = missions[state.mission];
  if (!state.hintUsed) {
    state.score = Math.max(0, state.score - 25);
    state.hintUsed = true;
    $("#score").textContent = String(state.score).padStart(4, "0");
    saveProgress();
  }
  beep(330, 0.07, "sine");
  showFeedback("success", `<b>PISTA DESCIFRADA</b><br>${mission.hint}`);
  answerInput.focus();
}

function finishGame() {
  const accuracy = state.attempts ? Math.round((state.correct / state.attempts) * 100) : 100;
  const rank =
    accuracy >= 90 && state.score >= 1200
      ? "ZERO DAY"
      : accuracy >= 70
        ? "GHOST OPERATOR"
        : "CODE BREAKER";
  $("#final-score").textContent = state.score;
  $("#final-accuracy").textContent = `${accuracy}%`;
  $("#final-rank").textContent = rank;
  $("#certificate-code").textContent =
    `GH-${$("#operator-id").textContent}-${state.score.toString(16).toUpperCase().padStart(4, "0")}`;
  localStorage.removeItem(storageKey);
  setScreen(victoryScreen);
  playSuccess();
}

function startGame(continueSaved = false) {
  if (!continueSaved) resetState();
  setScreen(gameScreen);
  renderMission();
  beep(520, 0.08, "sine");
}

function initializeMatrix() {
  const canvas = $("#matrix");
  const context = canvas.getContext("2d");
  const symbols = "01";
  const size = 16;
  let columns;
  let drops;

  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    columns = Math.floor(window.innerWidth / size);
    drops = Array.from({ length: columns }, () => Math.random() * -60);
  }

  function draw() {
    context.fillStyle = "rgba(3, 9, 6, 0.12)";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "#54f59b";
    context.font = `${size}px IBM Plex Mono`;
    drops.forEach((drop, index) => {
      context.fillText(symbols[Math.floor(Math.random() * symbols.length)], index * size, drop * size);
      if (drop * size > window.innerHeight && Math.random() > 0.985) drops[index] = 0;
      drops[index] += 0.32;
    });
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}

$("#answer-form").addEventListener("submit", submitAnswer);
$("#hint-button").addEventListener("click", showHint);
$("#start-button").addEventListener("click", () => startGame(false));
$("#continue-button").addEventListener("click", () => startGame(true));
$("#restart-button").addEventListener("click", () => {
  resetState();
  setScreen(introScreen);
});
$("#sound-toggle").addEventListener("click", (event) => {
  state.sound = !state.sound;
  event.currentTarget.textContent = `SND: ${state.sound ? "ON" : "OFF"}`;
  if (state.sound) beep(500);
});
answerInput.addEventListener("input", () => {
  const mission = missions[state.mission];
  if (mission.inputMode === "binary") {
    answerInput.value = answerInput.value.replace(/[^01]/g, "");
  } else {
    answerInput.value = answerInput.value.replace(/\D/g, "");
  }
});

buildMissionList();
const hasSavedProgress = loadProgress();
$("#continue-button").hidden = !hasSavedProgress;
$("#operator-id").textContent = String(Math.floor(100 + Math.random() * 900));
initializeMatrix();
