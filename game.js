const missions = [
  {
    chapter: "CAPÍTULO 1 // DESPERTAR",
    code: "MISIÓN 01 // EL PRIMER BIT",
    title: "Enciende la señal",
    nav: "El primer bit",
    character: ["NX", "NYX // MENTORA"],
    dialogue: "No memorices todavía. Un bit es solo un interruptor: 0 apagado, 1 encendido.",
    story: ["Tu comunicador está apagado.", "Envía un bit encendido para contactar a <b>Ghost Network</b>."],
    lesson: "BIT significa binary digit. Solo puede tener dos estados: 0 o 1.",
    label: "ESTADO SOLICITADO",
    value: "ON",
    question: "¿Qué bit representa ENCENDIDO?",
    answer: "1",
    inputMode: "binary",
    hint: "Cero es apagado. El otro estado es encendido.",
    explain: "1 significa encendido, verdadero o activo.",
    powers: [1],
  },
  {
    chapter: "CAPÍTULO 1 // DESPERTAR",
    code: "MISIÓN 02 // CUATRO INTERRUPTORES",
    title: "Descubre el valor de posición",
    nav: "Posiciones",
    character: ["BT", "BYTE // DRON"],
    dialogue: "Bip. Cada posición hacia la izquierda vale el doble: 1, 2, 4, 8.",
    story: ["Nyx abre un panel con cuatro interruptores.", "La secuencia activa las posiciones <b>4 y 1</b>."],
    lesson: "De derecha a izquierda, cuatro bits valen 1, 2, 4 y 8. Solo sumas donde hay un 1.",
    label: "SEÑAL BINARIA",
    value: "0101",
    question: "¿Qué número decimal representa?",
    answer: "5",
    inputMode: "decimal",
    hint: "Los unos están sobre 4 y 1.",
    explain: "0101 = 4 + 1 = 5.",
    powers: [8, 4, 2, 1],
  },
  {
    chapter: "CAPÍTULO 1 // DESPERTAR",
    code: "MISIÓN 03 // CONSTRUIR UNA CLAVE",
    title: "Piensa con interruptores",
    nav: "Construir clave",
    character: ["NX", "NYX // MENTORA"],
    dialogue: "Para construir 13, elige valores que sumen 13. No hay nada que memorizar.",
    story: ["El primer cerrojo pide una clave de cuatro bits.", "El objetivo decimal es <b>13</b>."],
    lesson: "Busca la potencia más grande que quepa, réstala y continúa con el resto.",
    label: "OBJETIVO DECIMAL",
    value: "13",
    question: "Escribe 13 en binario usando 4 bits.",
    answer: "1101",
    inputMode: "binary",
    hint: "13 = 8 + 4 + 1.",
    explain: "1101 activa 8, 4 y 1. Su suma es 13.",
    powers: [8, 4, 2, 1],
  },
  {
    chapter: "CAPÍTULO 1 // DESPERTAR",
    code: "MISIÓN 04 // PRIMER BYTE",
    title: "Amplía tu visión",
    nav: "Primer byte",
    character: ["NX", "NYX // MENTORA"],
    dialogue: "Ocho bits forman un byte. Es la misma idea, solo aparecen 16, 32, 64 y 128.",
    story: ["La puerta acepta una señal de ocho bits.", "Byte interceptó <b>00011010</b>."],
    lesson: "Un byte tiene 8 bits y puede representar valores entre 0 y 255.",
    label: "BYTE INTERCEPTADO",
    value: "00011010",
    question: "Convierte el byte a decimal.",
    answer: "26",
    inputMode: "decimal",
    hint: "Suma 16 + 8 + 2.",
    explain: "00011010 = 16 + 8 + 2 = 26.",
    powers: [128, 64, 32, 16, 8, 4, 2, 1],
  },
  {
    chapter: "CAPÍTULO 2 // ARITMÉTICA",
    code: "MISIÓN 05 // SUMA LIMPIA",
    title: "Suma como una máquina",
    nav: "Suma limpia",
    character: ["BT", "BYTE // DRON"],
    dialogue: "Regla rápida: 0+0=0, 0+1=1, 1+1=10. En ese último caso escribes 0 y llevas 1.",
    story: ["El sistema divide la clave en dos señales.", "Debes combinarlas con una <b>suma binaria</b>."],
    lesson: "Suma de derecha a izquierda, igual que en decimal. Cuando obtienes 10, llevas 1.",
    label: "SUMA BINARIA",
    value: "0101 + 0010",
    question: "Introduce el resultado usando 4 bits.",
    answer: "0111",
    inputMode: "binary",
    hint: "En decimal es 5 + 2.",
    explain: "0101 + 0010 = 0111, porque 5 + 2 = 7.",
    powers: [8, 4, 2, 1],
  },
  {
    chapter: "CAPÍTULO 2 // ARITMÉTICA",
    code: "MISIÓN 06 // LLEVAR UNO",
    title: "Controla el acarreo",
    nav: "Llevar uno",
    character: ["NX", "NYX // MENTORA"],
    dialogue: "Cuando 1+1 produce 10, el cero queda abajo y el uno viaja a la siguiente columna.",
    story: ["El Warden fuerza una suma al límite.", "No pierdas el bit que se <b>lleva</b>."],
    lesson: "El bit que pasa a la siguiente columna se llama carry o acarreo.",
    label: "SUMA BINARIA",
    value: "0111 + 0001",
    question: "Introduce el resultado usando 4 bits.",
    answer: "1000",
    inputMode: "binary",
    hint: "En decimal es 7 + 1.",
    explain: "0111 + 0001 = 1000. Los acarreos recorren las tres primeras columnas.",
    powers: [8, 4, 2, 1],
  },
  {
    chapter: "CAPÍTULO 2 // ARITMÉTICA",
    code: "MISIÓN 07 // CLAVE DE 42",
    title: "Construye un byte completo",
    nav: "Clave de 42",
    character: ["BT", "BYTE // DRON"],
    dialogue: "Bip. Divide el objetivo en potencias de dos. Yo vigilo la puerta.",
    story: ["El archivo Ghost está cifrado.", "Su identificador decimal es <b>42</b>."],
    lesson: "Para pasar decimal a binario, activa las potencias de 2 que sumen el objetivo.",
    label: "OBJETIVO DECIMAL",
    value: "42",
    question: "Convierte 42 a binario usando 8 bits.",
    answer: "00101010",
    inputMode: "binary",
    hint: "42 = 32 + 8 + 2.",
    explain: "00101010 activa 32, 8 y 2. Total: 42.",
    powers: [128, 64, 32, 16, 8, 4, 2, 1],
  },
  {
    chapter: "CAPÍTULO 2 // ARITMÉTICA",
    code: "MISIÓN 08 // PAQUETE FANTASMA",
    title: "Decodifica una dirección",
    nav: "Paquete fantasma",
    character: ["WD", "WARDEN // SISTEMA"],
    dialogue: "Intruso detectado. Demuestra que puedes leer mi dirección o serás expulsado.",
    story: ["El Warden bloquea el túnel.", "Solo revela el byte <b>11001001</b>."],
    lesson: "Para pasar binario a decimal, suma los valores de todas las posiciones activas.",
    label: "DIRECCIÓN BINARIA",
    value: "11001001",
    question: "Convierte el byte a decimal.",
    answer: "201",
    inputMode: "decimal",
    hint: "Suma 128 + 64 + 8 + 1.",
    explain: "11001001 = 128 + 64 + 8 + 1 = 201.",
    powers: [128, 64, 32, 16, 8, 4, 2, 1],
  },
  {
    chapter: "CAPÍTULO 3 // HEXADECIMAL",
    code: "MISIÓN 09 // NUEVO ALFABETO",
    title: "Conoce hexadecimal",
    nav: "Nuevo alfabeto",
    character: ["NX", "NYX // MENTORA"],
    dialogue: "Hexadecimal usa 16 símbolos: 0 al 9 y después A, B, C, D, E, F.",
    story: ["La zona profunda no muestra bytes completos.", "Agrupa cada cuatro bits en un símbolo."],
    lesson: "A vale 10, B 11, C 12, D 13, E 14 y F 15. Cuatro bits forman un dígito hexadecimal.",
    label: "GRUPO DE 4 BITS",
    value: "1010",
    question: "¿Qué dígito hexadecimal representa?",
    answer: "A",
    inputMode: "hex",
    hint: "1010 vale 8 + 2 = 10. En hexadecimal, 10 es una letra.",
    explain: "1010 vale 10, y el símbolo hexadecimal para 10 es A.",
    powers: [8, 4, 2, 1],
  },
  {
    chapter: "CAPÍTULO 3 // HEXADECIMAL",
    code: "MISIÓN 10 // DOS NIBBLES",
    title: "Traduce hex a binario",
    nav: "Hex a binario",
    character: ["BT", "BYTE // DRON"],
    dialogue: "Un byte se divide en dos grupos de cuatro bits. Tradúcelos por separado y únelos.",
    story: ["La clave aparece como <b>3F</b>.", "Cada símbolo oculta cuatro bits."],
    lesson: "3 es 0011. F vale 15 y es 1111. Luego unes ambos grupos.",
    label: "CLAVE HEXADECIMAL",
    value: "3F",
    question: "Convierte 3F a binario usando 8 bits.",
    answer: "00111111",
    inputMode: "binary",
    hint: "3 → 0011 y F → 1111.",
    explain: "3F se separa como 3 y F: 0011 1111.",
    powers: [128, 64, 32, 16, 8, 4, 2, 1],
  },
  {
    chapter: "CAPÍTULO 3 // HEXADECIMAL",
    code: "MISIÓN 11 // COMPRIMIR EL BYTE",
    title: "Traduce binario a hex",
    nav: "Binario a hex",
    character: ["NX", "NYX // MENTORA"],
    dialogue: "Separa desde la derecha en grupos de cuatro. Cada grupo se convierte por su cuenta.",
    story: ["El túnel transmite <b>11010110</b>.", "Comprímelo en dos símbolos hexadecimales."],
    lesson: "1101 vale 13, que es D. 0110 vale 6. Mantén el mismo orden.",
    label: "BYTE BINARIO",
    value: "11010110",
    question: "Convierte el byte a hexadecimal.",
    answer: "D6",
    inputMode: "hex",
    hint: "1101 → D y 0110 → 6.",
    explain: "1101 0110 se convierte en D6.",
    powers: [128, 64, 32, 16, 8, 4, 2, 1],
  },
  {
    chapter: "CAPÍTULO 3 // HEXADECIMAL",
    code: "MISIÓN 12 // VALOR MÁXIMO",
    title: "Conecta los tres sistemas",
    nav: "Valor máximo",
    character: ["WD", "WARDEN // SISTEMA"],
    dialogue: "Última prueba de traducción. Un valor, tres formas de escribirlo.",
    story: ["El Warden libera el byte máximo: <b>11111111</b>.", "En decimal vale 255."],
    lesson: "1111 es F. Como el byte tiene dos grupos 1111, su forma hexadecimal repite ese símbolo.",
    label: "VALOR DECIMAL",
    value: "255",
    question: "Escribe 255 en hexadecimal.",
    answer: "FF",
    inputMode: "hex",
    hint: "255 en binario es 11111111. Divide: 1111 1111.",
    explain: "255 = 11111111 = FF.",
    powers: [128, 64, 32, 16, 8, 4, 2, 1],
  },
  {
    chapter: "CAPÍTULO 4 // FLAGS",
    code: "MISIÓN 13 // ZERO Y CARRY",
    title: "Lee el estado del procesador",
    nav: "Zero y Carry",
    character: ["NX", "NYX // MENTORA"],
    dialogue: "Los flags son luces de estado. Z dice resultado cero. C dice que salió un acarreo del espacio disponible.",
    story: ["Trabajamos con registros de <b>4 bits</b>.", "La suma produce cinco bits, pero el registro conserva solo cuatro."],
    lesson: "Z se activa si el resultado guardado es 0000. C se activa si aparece un bit extra a la izquierda.",
    label: "SUMA DE 4 BITS",
    value: "1111 + 0001 = 1 0000",
    question: "El resultado guardado es 0000. ¿Qué flags se activan? Escribe sus letras.",
    answer: "ZC",
    inputMode: "flags",
    hint: "El resultado guardado es cero y también salió un acarreo.",
    explain: "Se activan Z y C: el registro queda en 0000 y hubo un quinto bit de acarreo.",
    powers: [8, 4, 2, 1],
  },
  {
    chapter: "CAPÍTULO 4 // FLAGS",
    code: "MISIÓN 14 // NEGATIVE",
    title: "Detecta un resultado negativo",
    nav: "Negative",
    character: ["BT", "BYTE // DRON"],
    dialogue: "En números con signo, el bit más a la izquierda indica el signo. Si queda en 1, se activa N.",
    story: ["El procesador interpreta los cuatro bits con signo.", "Observa el bit más significativo del resultado."],
    lesson: "N se activa cuando el bit más a la izquierda del resultado es 1.",
    label: "SUMA DE 4 BITS",
    value: "1000 + 0001 = 1001",
    question: "¿Qué flag se activa? Escribe su letra.",
    answer: "N",
    inputMode: "flags",
    hint: "Mira el primer bit del resultado: es 1.",
    explain: "Se activa N porque el bit de signo de 1001 es 1.",
    powers: [8, 4, 2, 1],
  },
  {
    chapter: "CAPÍTULO 4 // FLAGS",
    code: "MISIÓN 15 // OVERFLOW",
    title: "Distingue carry de overflow",
    nav: "Overflow",
    character: ["NX", "NYX // MENTORA"],
    dialogue: "Overflow no significa simplemente llevar uno. Se activa cuando el resultado con signo ya no cabe.",
    story: ["En 4 bits con signo, el mayor positivo es <b>0111, que vale 7</b>.", "Sumar uno produce un patrón negativo."],
    lesson: "V se activa si positivo + positivo da negativo, o negativo + negativo da positivo.",
    label: "SUMA CON SIGNO",
    value: "0111 + 0001 = 1000",
    question: "¿Qué flags se activan? Escribe sus letras.",
    answer: "NV",
    inputMode: "flags",
    hint: "El resultado empieza en 1 y dos positivos produjeron un patrón negativo.",
    explain: "Se activan N y V. 1000 tiene signo negativo y 7 + 1 no cabe en el rango con signo.",
    powers: [8, 4, 2, 1],
  },
  {
    chapter: "CAPÍTULO 4 // FLAGS",
    code: "MISIÓN 16 // CONTROL DE ESTADO",
    title: "Comprueba los cuatro flags",
    nav: "Control de estado",
    character: ["WD", "WARDEN // SISTEMA"],
    dialogue: "Prueba final. Calcula la suma y decide el estado sin ayuda de la red.",
    story: ["El registro sigue siendo de <b>4 bits</b>.", "El bit extra no se guarda, pero sí afecta los flags."],
    lesson: "Revisa en orden: resultado cero, acarreo externo, bit de signo y overflow con signo.",
    label: "SUMA FINAL",
    value: "1110 + 0011 = 1 0001",
    question: "El resultado guardado es 0001. ¿Qué flag se activa?",
    answer: "C",
    inputMode: "flags",
    hint: "Hay un bit extra a la izquierda. El resultado no es cero ni negativo.",
    explain: "Solo se activa C. El acarreo salió del registro y el resultado guardado es 0001.",
    powers: [8, 4, 2, 1],
  },
  {
    chapter: "CAPÍTULO 5 // PRUEBA FINAL",
    code: "MISIÓN 17 // ACCESO ROOT",
    title: "Conecta todo lo aprendido",
    nav: "Acceso root",
    character: ["NX", "NYX // MENTORA"],
    dialogue: "Esta vez no hay un concepto nuevo. Convierte, suma y analiza. Ya conoces cada pieza.",
    story: [
      "El núcleo entrega dos valores hexadecimales de 8 bits.",
      "Debes calcular el resultado y sus flags para vencer al <b>Warden</b>.",
    ],
    lesson: "Convierte 7F y 01 a binario, suma los bytes, vuelve a hexadecimal y revisa Z, C, N y V.",
    label: "OPERACIÓN MAESTRA",
    value: "7F + 01",
    question: "Responde RESULTADO:FLAGS. Ejemplo: A2:CN",
    answer: "80:NV",
    inputMode: "final",
    hint: "7F = 01111111. Al sumar 1 obtienes 10000000. Revisa signo y overflow.",
    explain: "7F + 01 = 80. En binario: 01111111 + 00000001 = 10000000. Se activan N y V.",
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
  const inputConfig = {
    binary: {
      maxLength: mission.powers.length,
      placeholder: "0".repeat(mission.powers.length),
      hint: `Usa exactamente ${mission.powers.length} bits: solo 0 y 1.`,
      inputMode: "numeric",
    },
    decimal: {
      maxLength: 3,
      placeholder: "000",
      hint: "Escribe el número decimal.",
      inputMode: "numeric",
    },
    hex: {
      maxLength: 2,
      placeholder: "FF",
      hint: "Usa números y, cuando haga falta, letras de A a F.",
      inputMode: "text",
    },
    flags: {
      maxLength: 7,
      placeholder: "ZCNV",
      hint: "Escribe las letras activas: Z, C, N o V. El orden no importa.",
      inputMode: "text",
    },
    final: {
      maxLength: 7,
      placeholder: "80:NV",
      hint: "Formato: resultado hexadecimal, dos puntos y flags activos.",
      inputMode: "text",
    },
  }[mission.inputMode];
  state.hintUsed = false;
  state.locked = false;
  feedback.className = "feedback";
  feedback.textContent = "";
  answerInput.value = "";
  answerInput.maxLength = inputConfig.maxLength;
  answerInput.placeholder = inputConfig.placeholder;
  answerInput.inputMode = inputConfig.inputMode;
  $("#input-hint").textContent = inputConfig.hint;
  $("#chapter-badge").textContent = mission.chapter;
  $("#mission-code").textContent = mission.code;
  $("#mission-title").textContent = mission.title;
  $("#character-avatar").textContent = mission.character[0];
  $("#character-name").textContent = mission.character[1];
  $("#character-dialogue").textContent = mission.dialogue;
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
  const clean = value.trim().replace(/[\s,]+/g, "").toUpperCase();
  if (type === "decimal") return String(Number(clean));
  if (type === "flags") return [...clean].sort((a, b) => "ZCNV".indexOf(a) - "ZCNV".indexOf(b)).join("");
  if (type === "final") {
    const [result = "", flags = ""] = clean.split(":");
    const orderedFlags = [...flags]
      .sort((a, b) => "ZCNV".indexOf(a) - "ZCNV".indexOf(b))
      .join("");
    return `${result}:${orderedFlags}`;
  }
  return clean;
}

function submitAnswer(event) {
  event.preventDefault();
  if (state.locked) return;

  const mission = missions[state.mission];
  const rawAnswer = answerInput.value;
  const answer = normalizeAnswer(rawAnswer, mission.inputMode);
  const validators = {
    binary: new RegExp(`^[01]{${mission.powers.length}}$`),
    decimal: /^\d+$/,
    hex: /^[0-9A-Fa-f]{1,2}$/,
    flags: /^[ZCNVzcnv](?:[\s,]*[ZCNVzcnv])*$/,
    final: /^[0-9A-Fa-f]{1,2}\s*:\s*[ZCNVzcnv](?:[\s,]*[ZCNVzcnv])*$/,
  };
  const valid = validators[mission.inputMode].test(rawAnswer.trim());

  if (!valid) {
    beep(180, 0.12, "sawtooth");
    showFeedback(
      "error",
      `Formato inválido. ${{
        binary: `La clave necesita ${mission.powers.length} bits y solo puede contener 0 o 1.`,
        decimal: "Introduce un número decimal.",
        hex: "Usa uno o dos símbolos hexadecimales: 0-9 o A-F.",
        flags: "Usa únicamente las letras Z, C, N o V.",
        final: "Usa el formato resultado:flags, por ejemplo A2:CN.",
      }[mission.inputMode]}`,
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
  } else if (mission.inputMode === "decimal") {
    answerInput.value = answerInput.value.replace(/\D/g, "");
  } else if (mission.inputMode === "hex") {
    answerInput.value = answerInput.value.replace(/[^0-9a-f]/gi, "").toUpperCase();
  } else if (mission.inputMode === "flags") {
    answerInput.value = answerInput.value.replace(/[^zcnv,\s]/gi, "").toUpperCase();
  } else {
    answerInput.value = answerInput.value.replace(/[^0-9a-f:zcnv,\s]/gi, "").toUpperCase();
  }
});

buildMissionList();
const hasSavedProgress = loadProgress();
$("#continue-button").hidden = !hasSavedProgress;
$("#operator-id").textContent = String(Math.floor(100 + Math.random() * 900));
initializeMatrix();
