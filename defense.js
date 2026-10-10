const waves = [
  {
    name: "CÓDIGOS BINARIOS",
    pool: [1, 3, 6, 7],
    count: 4,
    concurrent: 1,
    fall: 40,
    lesson: "Cada misil trae su código en binario o decimal. Suma las potencias activas: 128 64 32 16 8 4 2 1.",
  },
  {
    name: "TRANSMISIÓN HEX",
    pool: [8, 9, 10, 11],
    count: 4,
    concurrent: 2,
    fall: 40,
    lesson: "Ahora llegan en hexadecimal. Cada símbolo hex son 4 bits. A=10, B=11, C=12, D=13, E=14, F=15.",
  },
  {
    name: "SUMAS DE ATAQUE",
    pool: [4, 5],
    count: 4,
    concurrent: 2,
    fall: 38,
    lesson: "Los misiles traen dos señales. Súmalas en binario: 1+1 = 10, escribes 0 y llevas 1.",
  },
  {
    name: "FLAGS DEL MISIL",
    pool: [12, 13, 14, 15],
    count: 4,
    concurrent: 2,
    fall: 45,
    lesson: "Lee el estado de cada suma: Z resultado cero · C bit extra · N primer bit en 1 · V signo imposible.",
  },
  {
    name: "OJIVA MAESTRA",
    pool: [BOMB_MISSION],
    count: 3,
    concurrent: 2,
    fall: 70,
    lesson: "Ataque final. Convierte, suma y responde RESULTADO:FLAGS en hexadecimal. Ejemplo: 80:NV.",
  },
];

const Defense = (() => {
  const canvas = $("#defense-canvas");
  const ctx = canvas.getContext("2d");
  const input = $("#defense-input");
  const pad = $("#defense-keypad");
  const overlay = $("#defense-overlay");
  const W = canvas.width;
  const H = canvas.height;
  const GROUND = 262;
  const TURRET = { x: W / 2, y: 268 };
  let run = null;
  let nextId = 1;
  let time = 0;
  let last = performance.now();
  let overlayAction = null;
  const stars = Array.from({ length: 40 }, () => [randomInt(0, W), randomInt(0, 200)]);
  const city = Array.from({ length: 14 }, (_, i) => [i * 36 + randomInt(-4, 4), randomInt(12, 30)]);

  const isActive = () => defenseScreen.classList.contains("active");
  const live = () => (run ? run.missiles.filter((m) => !m.dying) : []);
  const selected = () => live().find((m) => m.id === run.selectedId);

  function missilePos(m) {
    return { x: m.sx + (m.tx - m.sx) * m.progress, y: -12 + (GROUND + 12) * m.progress };
  }

  function showOverlay(eyebrow, title, text, button, action) {
    $("#overlay-eyebrow").textContent = eyebrow;
    $("#overlay-title").textContent = title;
    $("#overlay-text").innerHTML = text;
    $("#overlay-button").textContent = button;
    overlayAction = action;
    overlay.hidden = false;
    setTimeout(() => $("#overlay-button").focus(), 60);
  }

  function updateHud() {
    if (!run) return;
    $("#wave-label").textContent = `OLEADA ${run.wave + 1}/${waves.length}`;
    $("#shield-label").textContent = "■".repeat(run.shields) + "□".repeat(3 - run.shields);
    updateScore();
  }

  function showDefenseFeedback(kind, message) {
    const box = $("#defense-feedback");
    box.className = `feedback visible ${kind}`;
    box.innerHTML = message;
  }

  function clearTarget() {
    $("#target-tag").textContent = "OBJETIVO: —";
    $("#target-value").textContent = "—";
    $("#target-question").textContent = "Esperando contacto en el radar...";
  }

  function select(id) {
    if (!run) return;
    run.selectedId = id;
    const m = selected();
    if (!m) {
      clearTarget();
      return;
    }
    const config = inputConfigFor(m.challenge);
    $("#target-tag").textContent = `OBJETIVO: MISIL M${m.id} // ${m.challenge.label}`;
    $("#target-value").textContent = m.challenge.value;
    $("#target-question").textContent = m.challenge.question;
    input.value = "";
    input.maxLength = config.maxLength;
    input.placeholder = config.placeholder;
    input.inputMode = config.inputMode;
    input.readOnly = touchUI;
    renderKeypad(pad, m.challenge.inputMode, [["prev", "◀"], ["next", "▶"]]);
  }

  function autoSelect() {
    const candidates = live().sort((a, b) => b.progress - a.progress);
    select(candidates.length ? candidates[0].id : null);
  }

  function cycle(step) {
    const candidates = live().sort((a, b) => missilePos(a).x - missilePos(b).x);
    if (!candidates.length) return;
    const index = candidates.findIndex((m) => m.id === run.selectedId);
    const next = candidates[(index + step + candidates.length) % candidates.length];
    select(next.id);
    beep(620, 0.03, "square");
  }

  function briefing(waveIndex) {
    run = {
      wave: waveIndex,
      missiles: [],
      interceptors: [],
      effects: [],
      spawned: 0,
      shields: 3,
      nextSpawn: 0.8,
      phase: "brief",
      selectedId: null,
      shake: 0,
    };
    clearTarget();
    $("#defense-feedback").className = "feedback";
    updateHud();
    const wave = waves[waveIndex];
    showOverlay(
      `OLEADA ${waveIndex + 1}/${waves.length}`,
      wave.name,
      `<b>INTEL:</b> ${wave.lesson}<br><br>${wave.count} misiles. Tienes 3 escudos. Un código incorrecto acelera el misil.`,
      "INICIAR DEFENSA",
      () => {
        overlay.hidden = true;
        run.phase = "play";
        if (!touchUI) input.focus();
      },
    );
  }

  function spawn() {
    const wave = waves[run.wave];
    const challenge = generatePracticeVariant(wave.pool[randomInt(0, wave.pool.length - 1)]);
    const sx = randomInt(50, W - 50);
    const m = {
      id: nextId++,
      sx,
      tx: Math.max(40, Math.min(W - 40, sx + randomInt(-90, 90))),
      progress: 0,
      speedMul: 1,
      duration: wave.fall,
      challenge,
      trail: [],
    };
    run.missiles.push(m);
    run.spawned += 1;
    beep(240, 0.12, "triangle");
    if (!selected()) select(m.id);
  }

  function burst(x, y, size, colors) {
    for (let i = 0; i < size; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 20 + Math.random() * 70;
      run.effects.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0.5 + Math.random() * 0.6,
        color: colors[i % colors.length],
      });
    }
  }

  function impact(m) {
    const pos = missilePos(m);
    run.missiles = run.missiles.filter((item) => item !== m);
    run.shields -= 1;
    run.shake = 0.5;
    state.streak = 0;
    burst(pos.x, GROUND, 40, ["#ff4d3d", "#ffb627", "#fff1a8", "#3b2a16"]);
    beep(70, 0.5, "sawtooth");
    showDefenseFeedback(
      "error",
      `<b>IMPACTO EN LA BASE</b><br>El código de M${m.id} era <b>${m.challenge.answer}</b>. ${m.challenge.explain}`,
    );
    updateHud();
    if (run.shields <= 0) {
      run.phase = "lost";
      saveProgress();
      setTimeout(
        () =>
          showOverlay(
            "BASE DESTRUIDA",
            "LA BASE CAYÓ",
            "Los misiles atravesaron los escudos. Repite la oleada: tendrá números nuevos, así que usa el método, no la memoria.",
            "REINTENTAR OLEADA",
            () => briefing(run.wave),
          ),
        900,
      );
      return;
    }
    if (m.id === run.selectedId) autoSelect();
  }

  function waveCleared() {
    run.phase = "cleared";
    const bonus = run.shields * 50;
    state.score += bonus;
    state.defenseWave = run.wave + 1;
    updateScore();
    saveProgress();
    playSuccess();
    if (state.defenseWave >= waves.length) {
      showOverlay(
        "DEFENSA COMPLETA",
        "BASE ASEGURADA",
        `Detuviste todas las oleadas. Bono de escudos: +${bonus}.`,
        "VER INFORME FINAL →",
        () => {
          overlay.hidden = true;
          state.defenseWave = 0;
          finishGame();
        },
      );
      return;
    }
    showOverlay(
      `OLEADA ${run.wave + 1} SUPERADA`,
      "CIELO DESPEJADO",
      `Bono de escudos: +${bonus}. El radar detecta la siguiente oleada.`,
      "SIGUIENTE OLEADA →",
      () => briefing(state.defenseWave),
    );
  }

  function fire(event) {
    event.preventDefault();
    if (!run || run.phase !== "play") return;
    const m = selected();
    if (!m) return;
    const raw = input.value;
    if (!isValidFormat(m.challenge, raw)) {
      beep(180, 0.12, "sawtooth");
      showDefenseFeedback("error", `Formato inválido. ${formatError(m.challenge)}`);
      return;
    }
    state.attempts += 1;
    if (isCorrect(m.challenge, raw)) {
      const reward = 100 + Math.round((1 - m.progress) * 100);
      state.correct += 1;
      state.streak += 1;
      state.score += reward;
      m.dying = true;
      run.interceptors.push({ target: m, t: 0 });
      beep(980, 0.08, "square");
      showDefenseFeedback("success", `<b>INTERCEPTADO +${reward}</b><br>${m.challenge.explain}`);
      autoSelect();
    } else {
      m.speedMul *= 1.35;
      state.streak = 0;
      state.score = Math.max(0, state.score - 10);
      beep(150, 0.15, "sawtooth");
      showDefenseFeedback("error", `<b>CÓDIGO INCORRECTO</b><br>M${m.id} acelera. Revisa el método y vuelve a disparar.`);
      input.select();
    }
    updateScore();
    saveProgress();
  }

  function update(dt) {
    if (!run) return;
    run.shake = Math.max(0, run.shake - dt);
    run.effects.forEach((p) => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 60 * dt;
      p.life -= dt;
    });
    run.effects = run.effects.filter((p) => p.life > 0);
    if (run.phase !== "play") return;
    const wave = waves[run.wave];
    run.nextSpawn -= dt;
    if (run.spawned < wave.count && live().length < wave.concurrent && run.nextSpawn <= 0) {
      spawn();
      run.nextSpawn = 5;
    }
    run.missiles.forEach((m) => {
      if (m.dying) return;
      m.progress += (dt / m.duration) * m.speedMul;
      const pos = missilePos(m);
      m.trail.push([pos.x, pos.y]);
      if (m.trail.length > 18) m.trail.shift();
    });
    [...run.missiles].forEach((m) => {
      if (!m.dying && m.progress >= 1) impact(m);
    });
    if (run.phase !== "play") return;
    run.interceptors.forEach((shot) => {
      shot.t += dt / 0.4;
      if (shot.t >= 1 && !shot.done) {
        shot.done = true;
        const pos = missilePos(shot.target);
        run.missiles = run.missiles.filter((m) => m !== shot.target);
        burst(pos.x, pos.y, 26, ["#8dff5a", "#ffb627", "#fff1a8"]);
        beep(180, 0.25, "triangle");
      }
    });
    run.interceptors = run.interceptors.filter((shot) => !shot.done);
    if (run.spawned >= wave.count && !run.missiles.length && !run.interceptors.length) waveCleared();
  }

  function rect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), w, h);
  }

  function drawMissile(m) {
    const pos = missilePos(m);
    const isSelected = m.id === run.selectedId;
    m.trail.forEach(([x, y], index) => {
      const alpha = index / m.trail.length;
      rect(x - 1, y - 6, 2, 2, `rgba(255, 182, 39, ${alpha * 0.6})`);
    });
    const angle = Math.atan2(GROUND + 12, m.tx - m.sx) - Math.PI / 2;
    ctx.save();
    ctx.translate(Math.round(pos.x), Math.round(pos.y));
    ctx.rotate(angle);
    rect(-2, -10, 4, 12, "#c9d1c0");
    rect(-2, 2, 4, 3, "#ff4d3d");
    rect(-4, -10, 2, 4, "#7a8270");
    rect(2, -10, 2, 4, "#7a8270");
    if (Math.floor(time * 10) % 2) rect(-1, -13, 2, 3, "#ffb627");
    ctx.restore();

    const label = m.challenge.value.length <= 11 ? m.challenge.value : `M${m.id}`;
    ctx.font = "16px VT323, monospace";
    const width = Math.ceil(ctx.measureText(label).width) + 8;
    const lx = Math.max(2, Math.min(W - width - 2, pos.x - width / 2));
    const ly = Math.max(2, pos.y - 30);
    rect(lx, ly, width, 15, isSelected ? "#8dff5a" : "rgba(6, 16, 10, 0.85)");
    ctx.strokeStyle = isSelected ? "#c6ff7a" : "#3d5a2a";
    ctx.strokeRect(Math.round(lx) + 0.5, Math.round(ly) + 0.5, width - 1, 14);
    ctx.fillStyle = isSelected ? "#06100a" : "#c6ff7a";
    ctx.fillText(label, lx + 4, ly + 12);

    if (isSelected) {
      const r = 10 + (Math.floor(time * 4) % 2) * 2;
      ctx.strokeStyle = "#8dff5a";
      ctx.lineWidth = 2;
      [
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ].forEach(([sx, sy]) => {
        ctx.beginPath();
        ctx.moveTo(pos.x + sx * r, pos.y + sy * (r - 5));
        ctx.lineTo(pos.x + sx * r, pos.y + sy * r);
        ctx.lineTo(pos.x + sx * (r - 5), pos.y + sy * r);
        ctx.stroke();
      });
      ctx.lineWidth = 1;
    }
  }

  function draw() {
    ctx.save();
    if (run && run.shake > 0) ctx.translate(randomInt(-4, 4), randomInt(-3, 3));
    rect(-8, -8, W + 16, H + 16, "#050d07");
    ctx.strokeStyle = "#0e2312";
    for (let x = 0; x < W; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, GROUND);
      ctx.stroke();
    }
    for (let y = 0; y < GROUND; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(W, y + 0.5);
      ctx.stroke();
    }
    stars.forEach(([x, y], i) => rect(x, y, 1, 1, i % 3 ? "#1f4a25" : "#4f7a32"));
    ctx.strokeStyle = "rgba(141, 255, 90, 0.18)";
    [80, 160, 240].forEach((r) => {
      ctx.beginPath();
      ctx.arc(TURRET.x, TURRET.y, r, Math.PI, Math.PI * 2);
      ctx.stroke();
    });
    const sweep = Math.PI + ((time * 0.8) % 1) * Math.PI;
    ctx.strokeStyle = "rgba(141, 255, 90, 0.35)";
    ctx.beginPath();
    ctx.moveTo(TURRET.x, TURRET.y);
    ctx.lineTo(TURRET.x + Math.cos(sweep) * 300, TURRET.y + Math.sin(sweep) * 300);
    ctx.stroke();

    city.forEach(([x, h], i) => {
      rect(x, GROUND - h, 30, h, i % 2 ? "#15210f" : "#1c2a16");
      for (let wy = GROUND - h + 4; wy < GROUND - 3; wy += 6) {
        for (let wx = x + 4; wx < x + 26; wx += 7) {
          if ((wx + wy + i) % 3) rect(wx, wy, 2, 2, (wx * wy) % 5 ? "#3d5a2a" : "#ffb627");
        }
      }
    });
    rect(0, GROUND, W, H - GROUND, "#1a2213");
    rect(0, GROUND, W, 2, "#46592f");

    if (run) {
      const shieldAlpha = 0.08 + run.shields * 0.07;
      ctx.strokeStyle = `rgba(141, 255, 90, ${shieldAlpha * 2})`;
      ctx.fillStyle = `rgba(141, 255, 90, ${shieldAlpha / 2})`;
      ctx.beginPath();
      ctx.arc(TURRET.x, GROUND, 46, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    const target = run && selected();
    const aim = target ? missilePos(target) : { x: TURRET.x, y: 0 };
    const aimAngle = Math.atan2(aim.y - TURRET.y, aim.x - TURRET.x);
    ctx.strokeStyle = "#9aa38c";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(TURRET.x, TURRET.y - 8);
    ctx.lineTo(TURRET.x + Math.cos(aimAngle) * 20, TURRET.y - 8 + Math.sin(aimAngle) * 20);
    ctx.stroke();
    ctx.lineWidth = 1;
    rect(TURRET.x - 14, TURRET.y - 10, 28, 12, "#4f6b2f");
    rect(TURRET.x - 10, TURRET.y - 14, 20, 6, "#5d7a36");
    rect(TURRET.x - 3, TURRET.y - 6, 6, 3, "#8dff5a");

    if (run) {
      run.missiles.forEach(drawMissile);
      run.interceptors.forEach((shot) => {
        const pos = missilePos(shot.target);
        const x = TURRET.x + (pos.x - TURRET.x) * shot.t;
        const y = TURRET.y - 8 + (pos.y - TURRET.y + 8) * shot.t;
        ctx.strokeStyle = "rgba(141, 255, 90, 0.5)";
        ctx.beginPath();
        ctx.moveTo(TURRET.x, TURRET.y - 8);
        ctx.lineTo(x, y);
        ctx.stroke();
        rect(x - 2, y - 2, 4, 4, "#c6ff7a");
      });
      run.effects.forEach((p) => rect(p.x, p.y, 3, 3, p.color));
    }
    ctx.restore();
  }

  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    time += dt;
    if (isActive()) {
      update(dt);
      draw();
    }
    requestAnimationFrame(loop);
  }

  $("#defense-form").addEventListener("submit", fire);
  bindKeypad(pad, input, () => (selected() ? selected().challenge.inputMode : "binary"), (key) => {
    if (key !== "prev" && key !== "next") return false;
    if (run && run.phase === "play") cycle(key === "prev" ? -1 : 1);
    return true;
  });
  $("#overlay-button").addEventListener("click", () => overlayAction && overlayAction());
  $("#defense-exit").addEventListener("click", () => {
    run = null;
    overlay.hidden = true;
    World.returnFromDefense();
  });
  input.addEventListener("input", () => {
    const m = run && selected();
    if (m) input.value = filterInput(m.challenge.inputMode, input.value);
  });
  canvas.addEventListener("pointerdown", (event) => {
    if (!run) return;
    const box = canvas.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * W;
    const y = ((event.clientY - box.top) / box.height) * H;
    let best = null;
    let bestDistance = 40;
    live().forEach((m) => {
      const pos = missilePos(m);
      const distance = Math.hypot(pos.x - x, pos.y - 15 - y);
      if (distance < bestDistance) {
        best = m;
        bestDistance = distance;
      }
    });
    if (best) {
      select(best.id);
      if (!touchUI) input.focus();
    }
  });
  window.addEventListener("keydown", (event) => {
    if (!isActive() || !run) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      if (run.phase === "play") cycle(event.key === "ArrowLeft" ? -1 : 1);
    }
  });

  requestAnimationFrame(loop);

  return {
    open() {
      setScreen(defenseScreen);
      briefing(Math.min(state.defenseWave, waves.length - 1));
    },
  };
})();
