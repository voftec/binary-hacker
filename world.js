const TILE = 16;

const radioCast = {
  NX: "CMDTE. NYX // MANDO",
  BT: "BYTE // DRON EXPLORADOR",
  WD: "WARDEN // IA ENEMIGA",
};

const zones = [
  {
    name: "PERÍMETRO",
    outdoor: true,
    missions: [0, 1, 2, 3],
    radio: ["NX", "Soldado, cruza el perímetro. Muévete con las flechas y choca con una terminal ▣ para hackearla."],
    map: [
      "####################",
      "#P,,,,,C#,,,,,,t,,,#",
      "#,,,,,,,#,,,,,,,,,,#",
      "#,,,1,,,a,,,,2,,,,,#",
      "#,t,,,,,#,,,,,,,,,t#",
      "#,,,,S,,#,,S,,,,,,,#",
      "##########b#########",
      "#,,,,,,,,,,,#......#",
      "#,,C,,,,,,,,#......#",
      "#,,,,,,3,,,,c...4..#",
      "#,t,,,,,,,,,#......#",
      "#,,,,S,,,,,,#......#",
      "#,,,,,,,,,,,#.....E#",
      "####################",
    ],
  },
  {
    name: "CUARTEL",
    missions: [4, 5, 6, 7],
    radio: ["BT", "Bip. Estamos dentro del cuartel. Aquí las cerraduras usan sumas binarias."],
    map: [
      "####################",
      "#P.....#.......#...#",
      "#......#..C....#...#",
      "#..1...a...2...#.4.#",
      "#......#.......#...#",
      "#C....C#.......#...#",
      "##########b#####...#",
      "#K..K..........#...#",
      "#..............#...#",
      "#......3.......c...#",
      "#..............#...#",
      "#C..C..C..C....#...#",
      "#..............#..E#",
      "####################",
    ],
  },
  {
    name: "ARCHIVO CIFRADO",
    missions: [8, 9, 10, 11],
    radio: ["NX", "Archivo cifrado. Aquí todo está en hexadecimal: cada símbolo son 4 bits."],
    map: [
      "####################",
      "#....#K.K.K.K.K.K..#",
      "#.P..#............K#",
      "#....a.....2.......#",
      "#.1..#............K#",
      "#....#K.K.K.K.K....#",
      "###############b####",
      "#.........#........#",
      "#..K.K.K..#..K..K..#",
      "#....4....c....3...#",
      "#..K.K.K..#..K..K..#",
      "#.........#........#",
      "#E........#........#",
      "####################",
    ],
  },
  {
    name: "SALA DE SERVIDORES",
    missions: [12, 13, 14, 15],
    radio: ["WD", "Sala de servidores. Mis flags vigilan cada suma. No pasarás."],
    map: [
      "####################",
      "#RRR#RRRRR#RRRR#RRR#",
      "#...#.....#....#...#",
      "#.P.#.K.K.#.K..#.4.#",
      "#...#.....#....#...#",
      "#.1.#.K.K.b....#...#",
      "#...#.....#.K..#...#",
      "#...#..2..#....#...#",
      "#...#.K.K.#..3.c...#",
      "#...#.....#....#...#",
      "#...a.K.K.#.K..#...#",
      "#...#.....#....#...#",
      "#...#.....#....#..E#",
      "####################",
    ],
  },
  {
    name: "SÓTANO // BOMBA",
    missions: [BOMB_MISSION],
    radio: ["NX", "El Warden plantó una bomba en el sótano. Encuéntrala en el laberinto y desactívala."],
    map: [
      "####################",
      "#P..#......#.......#",
      "#...#.##.#.#.####..#",
      "#.###.#..#...#..#..#",
      "#.....#.####.#.##..#",
      "####.##....#.#....##",
      "#....#..##.#.####..#",
      "#.####.#...#....#..#",
      "#......#.#####..#..#",
      "#####..#.....#..#..#",
      "#...#.##.###.#.##..#",
      "#.#...#....#.#..B..#",
      "#.#.###.##...#....E#",
      "####################",
    ],
  },
  {
    name: "CONTROL DE MISILES",
    missions: [],
    radio: ["WD", "Misiles en camino. Sus códigos están cifrados. Ve a la consola: descífralos o tu base cae."],
    map: [
      "####################",
      "#RRRRRRRRRRRRRRRRRR#",
      "#..................#",
      "#.K..............K.#",
      "#.......MMMM.......#",
      "#..................#",
      "#.C..C........C..C.#",
      "#..................#",
      "#..................#",
      "#.K..............K.#",
      "#..................#",
      "#..................#",
      "#........P.........#",
      "####################",
    ],
  },
];

const World = (() => {
  const canvas = $("#map-canvas");
  const ctx = canvas.getContext("2d");
  const cols = 20;
  const rows = 14;
  const dirs = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const keyMap = {
    ArrowUp: "up",
    KeyW: "up",
    ArrowDown: "down",
    KeyS: "down",
    ArrowLeft: "left",
    KeyA: "left",
    ArrowRight: "right",
    KeyD: "right",
  };
  const interactive = "1234BabcEM";
  let zoneIndex = 0;
  let grid = [];
  let held = [];
  let bumpLock = false;
  let progressAtOpen = 0;
  let time = 0;
  let last = performance.now();
  const player = { x: 1, y: 1, px: 16, py: 16, tx: 1, ty: 1, dir: "down", moving: false, step: 0 };
  const drone = { x: 16, y: 16 };

  canvas.width = cols * TILE;
  canvas.height = rows * TILE;

  const zone = () => zones[zoneIndex];
  const modalOpen = () => !missionModal.hidden;
  const isActive = () => gameScreen.classList.contains("active") && !modalOpen();
  const tileAt = (x, y) => (grid[y] && grid[y][x]) || "#";
  const hash = (x, y) => (((x * 73856093) ^ (y * 19349663)) >>> 0) % 997;

  function isZoneComplete(index) {
    const z = zones[index];
    return z.missions.length > 0 && z.missions.every((m) => m < state.mission);
  }

  function isZoneUnlocked(index) {
    return index === 0 || isZoneComplete(index - 1);
  }

  function doorOpen(ch) {
    const mission = zone().missions["abc".indexOf(ch)];
    return mission !== undefined && mission < state.mission;
  }

  function walkable(ch) {
    if (",.P".includes(ch)) return true;
    if ("abc".includes(ch)) return doorOpen(ch);
    return false;
  }

  function radio(character, text) {
    $("#radio-avatar").textContent = character;
    $("#radio-avatar").dataset.character = character;
    $("#radio-name").textContent = radioCast[character];
    $("#radio-text").textContent = text;
  }

  function objective() {
    if (zoneIndex === zones.length - 1) return "Llega a la consola ▣ y defiende la base de los misiles.";
    const next = zone().missions.find((m) => m >= state.mission);
    if (next === undefined) return "Zona asegurada. Ve a la escotilla de salida ⇩.";
    if (next === BOMB_MISSION) return "Recorre el laberinto, encuentra la bomba y desactívala.";
    return `Hackea la terminal ${zone().missions.indexOf(next) + 1}: ${missions[next].nav}.`;
  }

  function updateHud() {
    $("#zone-badge").textContent = `ZONA ${zoneIndex + 1}/${zones.length}`;
    $("#zone-name").textContent = zone().name;
    $("#objective").textContent = `OBJETIVO: ${objective()}`;
    $("#progress-fill").style.width = `${(Math.min(state.mission, missions.length) / missions.length) * 100}%`;
    const select = $("#zone-select");
    select.innerHTML = zones
      .map((z, index) =>
        isZoneUnlocked(index)
          ? `<option value="${index}"${index === zoneIndex ? " selected" : ""}>${index + 1}. ${z.name}</option>`
          : "",
      )
      .join("");
    updateScore();
  }

  function enterZone(index) {
    zoneIndex = Math.max(0, Math.min(index, zones.length - 1));
    if (!isZoneUnlocked(zoneIndex)) zoneIndex = 0;
    state.chapter = zoneIndex;
    grid = zone().map.map((row) => [...row]);
    grid.forEach((row, y) =>
      row.forEach((ch, x) => {
        if (ch === "P") Object.assign(player, { x, y, tx: x, ty: y, px: x * TILE, py: y * TILE });
      }),
    );
    Object.assign(player, { moving: false, dir: "down" });
    Object.assign(drone, { x: player.px - 10, y: player.py - 10 });
    held = [];
    radio(...zone().radio);
    updateHud();
    saveProgress();
    canvas.classList.remove("zone-flash");
    void canvas.offsetWidth;
    canvas.classList.add("zone-flash");
  }

  function interact(ch) {
    const z = zone();
    if ("1234".includes(ch)) {
      const mission = z.missions[Number(ch) - 1];
      if (mission > state.mission) {
        radio("NX", "Esa terminal sigue cifrada. Hackea primero la anterior.");
        beep(160, 0.08);
        return;
      }
      progressAtOpen = state.mission;
      openMission(mission);
    } else if (ch === "B") {
      progressAtOpen = state.mission;
      openMission(BOMB_MISSION);
    } else if ("abc".includes(ch)) {
      radio("BT", `Bip. Puerta sellada. Hackea la terminal ${"abc".indexOf(ch) + 1} para abrirla.`);
      beep(160, 0.08);
    } else if (ch === "E") {
      if (isZoneComplete(zoneIndex)) {
        playSuccess();
        enterZone(zoneIndex + 1);
      } else {
        radio("NX", "La escotilla está sellada. Primero asegura todas las terminales de la zona.");
        beep(160, 0.08);
      }
    } else if (ch === "M") {
      held = [];
      Defense.open();
    }
  }

  function interactFacing() {
    if (!isActive() || player.moving) return;
    const [dx, dy] = dirs[player.dir];
    const ch = tileAt(player.x + dx, player.y + dy);
    if (interactive.includes(ch)) interact(ch);
  }

  function onMissionClosed() {
    held = [];
    bumpLock = true;
    updateHud();
    if (state.mission > progressAtOpen) {
      if (isZoneComplete(zoneIndex)) {
        radio("NX", "Zona asegurada. Ve a la escotilla de salida ⇩.");
      } else {
        radio("BT", "Bip. Puerta abierta. Sigue a la próxima terminal.");
      }
    }
  }

  function press(dir) {
    if (!held.length) bumpLock = false;
    held = held.filter((item) => item !== dir).concat(dir);
  }

  function release(dir) {
    held = held.filter((item) => item !== dir);
    if (!held.length) bumpLock = false;
  }

  function update(dt) {
    if (!isActive()) return;
    const speed = 80 * dt;
    if (player.moving) {
      const targetX = player.tx * TILE;
      const targetY = player.ty * TILE;
      player.px += Math.sign(targetX - player.px) * Math.min(speed, Math.abs(targetX - player.px));
      player.py += Math.sign(targetY - player.py) * Math.min(speed, Math.abs(targetY - player.py));
      if (player.px === targetX && player.py === targetY) {
        player.x = player.tx;
        player.y = player.ty;
        player.moving = false;
        player.step += 1;
      }
    }
    if (!player.moving && held.length) {
      const dir = held[held.length - 1];
      player.dir = dir;
      const [dx, dy] = dirs[dir];
      const nx = player.x + dx;
      const ny = player.y + dy;
      const ch = tileAt(nx, ny);
      if (walkable(ch)) {
        Object.assign(player, { tx: nx, ty: ny, moving: true });
        if (player.step % 2 === 0) beep(70, 0.02, "square");
      } else if (!bumpLock && interactive.includes(ch)) {
        bumpLock = true;
        interact(ch);
      }
    }
    drone.x += (player.px - 12 - drone.x) * Math.min(1, dt * 3);
    drone.y += (player.py - 12 - drone.y) * Math.min(1, dt * 3);
  }

  function rect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), w, h);
  }

  function isOutdoorTile(x, y) {
    if (!zone().outdoor) return false;
    const around = [tileAt(x, y), tileAt(x - 1, y), tileAt(x + 1, y), tileAt(x, y - 1), tileAt(x, y + 1)];
    if (around[0] === ".") return false;
    return around.includes(",") || around.includes("P");
  }

  function drawGround(x, y) {
    const sx = x * TILE;
    const sy = y * TILE;
    const h = hash(x, y);
    if (isOutdoorTile(x, y)) {
      rect(sx, sy, TILE, TILE, "#22381a");
      for (let i = 0; i < 5; i += 1) {
        const gx = (h * (i + 3) * 7) % 15;
        const gy = (h * (i + 5) * 11) % 15;
        rect(sx + gx, sy + gy, 1, 2, i % 2 ? "#2f4d22" : "#1a2c13");
      }
    } else {
      rect(sx, sy, TILE, TILE, zoneIndex === 4 ? "#1f2419" : "#2a3223");
      rect(sx, sy, TILE, 1, "#323b29");
      rect(sx, sy, 1, TILE, "#323b29");
      if (h % 7 === 0) rect(sx + (h % 11) + 2, sy + (h % 9) + 3, 2, 1, "#20271a");
    }
  }

  function drawWall(x, y) {
    const sx = x * TILE;
    const sy = y * TILE;
    const below = tileAt(x, y + 1);
    const face = !"#R".includes(below) && y < rows - 1;
    const touchesIndoor = [tileAt(x - 1, y), tileAt(x + 1, y), tileAt(x, y - 1), tileAt(x, y + 1)].some(
      (ch) => ch === "." || "KR".includes(ch),
    );
    if (zone().outdoor && !touchesIndoor) {
      drawGround(x, y);
      rect(sx + 1, sy + 2, 2, 13, "#6d7663");
      rect(sx + 13, sy + 2, 2, 13, "#6d7663");
      for (let i = 4; i < 15; i += 4) rect(sx, sy + i, TILE, 1, "#8b9480");
      rect(sx + 1, sy + 1, 2, 1, "#a8b29c");
      rect(sx + 13, sy + 1, 2, 1, "#a8b29c");
      return;
    }
    rect(sx, sy, TILE, TILE, "#141b0f");
    if (face) {
      rect(sx, sy, TILE, 5, "#46592f");
      rect(sx, sy + 5, TILE, 11, "#33421f");
      const offset = (y % 2) * 4;
      for (let i = 0; i < 3; i += 1) rect(sx + ((i * 8 + offset) % 16), sy + 6, 1, 4, "#26321a");
      rect(sx, sy + 10, TILE, 1, "#26321a");
      rect(sx, sy + 15, TILE, 1, "#0c1108");
    } else {
      rect(sx + 1, sy + 1, TILE - 2, TILE - 2, "#1d2714");
      rect(sx + 3, sy + 3, 2, 2, "#2b3a1d");
    }
  }

  function drawTerminal(x, y, ch) {
    const sx = x * TILE;
    const sy = y * TILE;
    const mission = zone().missions[Number(ch) - 1];
    const solved = mission < state.mission;
    const current = mission === state.mission;
    const blink = Math.floor(time * 3) % 2 === 0;
    drawGround(x, y);
    rect(sx + 2, sy + 13, 12, 2, "rgba(0,0,0,0.45)");
    rect(sx + 2, sy + 2, 12, 12, "#0b0f08");
    rect(sx + 3, sy + 3, 10, 10, "#3a4630");
    const screen = solved ? "#8dff5a" : current ? (blink ? "#ffb627" : "#c98a12") : "#5a2a22";
    rect(sx + 4, sy + 4, 8, 6, screen);
    ctx.fillStyle = "#0b0f08";
    ctx.font = "6px 'Press Start 2P', monospace";
    ctx.fillText(ch, sx + 5, sy + 10);
    rect(sx + 4, sy + 11, 8, 1, "#232b1c");
    if (current) {
      rect(sx + 7, sy - 4 + (blink ? 0 : 1), 2, 3, "#ffb627");
      rect(sx + 7, sy + (blink ? 0 : 1), 2, 1, "#ffb627");
    }
  }

  function drawDoor(x, y, ch) {
    const sx = x * TILE;
    const sy = y * TILE;
    drawGround(x, y);
    if (doorOpen(ch)) {
      rect(sx, sy, 2, TILE, "#8dff5a");
      rect(sx + 14, sy, 2, TILE, "#8dff5a");
      return;
    }
    rect(sx, sy, TILE, TILE, "#1a1a12");
    for (let i = -16; i < 16; i += 6) {
      ctx.fillStyle = "#d9a521";
      ctx.beginPath();
      ctx.moveTo(sx + i, sy + TILE);
      ctx.lineTo(sx + i + 3, sy + TILE);
      ctx.lineTo(sx + i + 3 + TILE, sy);
      ctx.lineTo(sx + i + TILE, sy);
      ctx.fill();
    }
    rect(sx + 5, sy + 5, 6, 6, "#1a1a12");
    rect(sx + 6, sy + 6, 4, 4, Math.floor(time * 2) % 2 ? "#ff4d3d" : "#7a1d14");
  }

  function drawExit(x, y) {
    const sx = x * TILE;
    const sy = y * TILE;
    const open = isZoneComplete(zoneIndex);
    drawGround(x, y);
    rect(sx + 1, sy + 1, 14, 14, "#0e120b");
    rect(sx + 2, sy + 2, 12, 12, open ? "#2f5a1f" : "#4a5240");
    [
      [3, 3],
      [11, 3],
      [3, 11],
      [11, 11],
    ].forEach(([bx, by]) => rect(sx + bx, sy + by, 2, 2, "#9aa38c"));
    const color = open ? (Math.floor(time * 3) % 2 ? "#8dff5a" : "#c6ff7a") : "#7a1d14";
    rect(sx + 7, sy + 4, 2, 5, color);
    rect(sx + 5, sy + 8, 6, 1, color);
    rect(sx + 6, sy + 9, 4, 1, color);
    rect(sx + 7, sy + 10, 2, 1, color);
  }

  function drawBomb(x, y) {
    const sx = x * TILE;
    const sy = y * TILE;
    const defused = BOMB_MISSION < state.mission;
    const blink = Math.floor(time * 4) % 2 === 0;
    drawGround(x, y);
    rect(sx + 1, sy + 13, 14, 2, "rgba(0,0,0,0.5)");
    rect(sx + 2, sy + 5, 12, 9, "#26261f");
    rect(sx + 3, sy + 6, 10, 7, "#3d3d31");
    rect(sx + 4, sy + 7, 8, 3, defused ? "#1f3a14" : "#2a0805");
    ctx.fillStyle = defused ? "#8dff5a" : "#ff4d3d";
    ctx.font = "4px 'Press Start 2P', monospace";
    ctx.fillText(defused ? "OK" : "88", sx + 4, sy + 10);
    rect(sx + 4, sy + 3, 1, 3, "#ff4d3d");
    rect(sx + 7, sy + 2, 1, 4, "#4aa3ff");
    rect(sx + 10, sy + 3, 1, 3, "#ffb627");
    if (!defused && blink) rect(sx + 12, sy + 1, 3, 3, "#ff4d3d");
  }

  function drawObstacle(x, y, ch) {
    const sx = x * TILE;
    const sy = y * TILE;
    const h = hash(x, y);
    drawGround(x, y);
    if (ch === "C") {
      rect(sx + 1, sy + 13, 14, 2, "rgba(0,0,0,0.45)");
      rect(sx + 1, sy + 2, 14, 12, "#4a3218");
      rect(sx + 2, sy + 3, 12, 10, "#7a5530");
      rect(sx + 2, sy + 7, 12, 1, "#4a3218");
      for (let i = 0; i < 10; i += 1) rect(sx + 3 + i, sy + 3 + i, 2, 1, "#5b3e1f");
    } else if (ch === "S") {
      [
        [1, 8],
        [6, 8],
        [11, 8],
        [3, 4],
        [8, 4],
      ].forEach(([bx, by]) => {
        rect(sx + bx, sy + by, 5, 4, "#6e6243");
        rect(sx + bx, sy + by, 5, 1, "#a39467");
      });
    } else if (ch === "t") {
      rect(sx + 7, sy + 10, 2, 5, "#3b2a16");
      rect(sx + 2, sy + 2, 12, 9, "#163010");
      rect(sx + 4, sy + 1, 8, 2, "#1d3a14");
      rect(sx + 4, sy + 3, 4, 3, "#2f5a1f");
      rect(sx + 9, sy + 6, 3, 2, "#244a18");
    } else if (ch === "K") {
      rect(sx + 2, sy + 1, 12, 14, "#0d110a");
      rect(sx + 3, sy + 2, 10, 12, "#1b2216");
      for (let i = 0; i < 4; i += 1) {
        rect(sx + 4, sy + 3 + i * 3, 8, 1, "#2b3423");
        const on = (Math.floor(time * 4) + h + i) % 3 !== 0;
        rect(sx + 10, sy + 3 + i * 3, 1, 1, on ? (i % 2 ? "#ffb627" : "#8dff5a") : "#26321a");
      }
    } else if (ch === "R") {
      drawWall(x, y);
      rect(sx + 2, sy + 4, 12, 8, "#0b0f08");
      rect(sx + 3, sy + 5, 10, 6, "#0f2a10");
      const line = Math.floor(time * 6 + h) % 6;
      rect(sx + 3, sy + 5 + line, 10, 1, "#8dff5a");
      rect(sx + 4, sy + 7, (h % 6) + 2, 1, "#4f7a32");
    } else if (ch === "M") {
      rect(sx, sy + 3, TILE, 12, "#11160d");
      rect(sx + 1, sy + 4, 14, 10, "#2c3524");
      rect(sx + 2, sy + 5, 12, 6, "#0f2a10");
      const sweep = (time * 2 + x) % 1;
      rect(sx + 2 + Math.floor(sweep * 12), sy + 5, 1, 6, "#8dff5a");
      if (Math.floor(time * 3) % 2) rect(sx + 3 + (h % 8), sy + 7, 2, 2, "#ff4d3d");
      rect(sx + 3, sy + 12, 3, 1, "#ffb627");
      rect(sx + 10, sy + 12, 3, 1, "#ff4d3d");
    }
  }

  const sprite = {
    down: [
      "...HHHHHH...",
      "..HHHHHHHH..",
      "..hhhhhhhh..",
      "...SSSSSS...",
      "...SESSES...",
      "...SSSSSS...",
      "..BBBbBBBB..",
      ".SBBBbBBBBS.",
      ".SBBBBbBBBS.",
      "..ggggggg...",
      "..PPP..PPP..",
      "..PPP..PPP..",
      "..KKK..KKK..",
    ],
    up: [
      "...HHHHHH...",
      "..HHHHHHHH..",
      "..HHhHHhHH..",
      "...hhhhhh...",
      "...SSSSSS...",
      "....SSSS....",
      "..BBBBBBBB..",
      ".SBrrrrrrBS.",
      ".SBrrrrrrBS.",
      "..ggggggg...",
      "..PPP..PPP..",
      "..PPP..PPP..",
      "..KKK..KKK..",
    ],
    side: [
      "...HHHHHH...",
      "..HHHHHHHH..",
      "..hhhhhhhh..",
      "...SSSSSS...",
      "...SSSSES...",
      "...SSSSSS...",
      "...BBBBBB...",
      "...BBBBBBGGG",
      "...BBBBBBS..",
      "...gggggg...",
      "...PPP.PPP..",
      "...PPP.PPP..",
      "...KKK.KKK..",
    ],
  };
  const spriteColors = {
    H: "#4f6b2f",
    h: "#36481f",
    S: "#d9a77a",
    E: "#111",
    B: "#5d7a36",
    b: "#3e5228",
    r: "#4a3218",
    g: "#2b2b1a",
    P: "#3e5228",
    K: "#15150d",
    G: "#1c1c1c",
  };

  function drawPlayer() {
    const frame = player.dir === "left" || player.dir === "right" ? sprite.side : sprite[player.dir];
    const flip = player.dir === "left";
    const walking = player.moving && Math.floor((player.px + player.py) / 4) % 2 === 0;
    const ox = Math.round(player.px) + 2;
    const oy = Math.round(player.py) + 1;
    rect(ox + 1, oy + 13, 10, 2, "rgba(0,0,0,0.45)");
    frame.forEach((row, ry) => {
      [...row].forEach((ch, rx) => {
        if (ch === ".") return;
        let dy = 0;
        if (walking && ry >= 10) dy = rx < 6 ? -1 : 0;
        const px = flip ? ox + 11 - rx : ox + rx;
        rect(px, oy + ry + dy, 1, 1, spriteColors[ch]);
      });
    });
  }

  function drawDrone() {
    const bob = Math.sin(time * 5) * 1.5;
    const dx = Math.round(drone.x);
    const dy = Math.round(drone.y + bob);
    rect(dx + 1, dy + 9, 6, 1, "rgba(0,0,0,0.35)");
    rect(dx, dy, 8, 1, "#9aa38c");
    rect(dx + 2, dy + 2, 4, 4, "#5a6650");
    rect(dx + 3, dy + 3, 2, 2, Math.floor(time * 3) % 2 ? "#8dff5a" : "#4f7a32");
    rect(dx + 3, dy + 1, 2, 1, "#5a6650");
  }

  function draw() {
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const ch = tileAt(x, y);
        if (ch === "#") drawWall(x, y);
        else if ("1234".includes(ch)) drawTerminal(x, y, ch);
        else if ("abc".includes(ch)) drawDoor(x, y, ch);
        else if (ch === "E") drawExit(x, y);
        else if (ch === "B") drawBomb(x, y);
        else if ("CStKRM".includes(ch)) drawObstacle(x, y, ch);
        else drawGround(x, y);
      }
    }
    if (zoneIndex === 4) {
      const gradient = ctx.createRadialGradient(
        player.px + 8,
        player.py + 8,
        24,
        player.px + 8,
        player.py + 8,
        110,
      );
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(1, "rgba(0,0,0,0.82)");
      drawPlayer();
      drawDrone();
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }
    drawPlayer();
    drawDrone();
  }

  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    time += dt;
    update(dt);
    if (gameScreen.classList.contains("active")) draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener("keydown", (event) => {
    if (!gameScreen.classList.contains("active")) return;
    if (modalOpen()) {
      if (event.key === "Escape") closeMission();
      return;
    }
    if (event.target.tagName === "SELECT") return;
    const dir = keyMap[event.code];
    if (dir) {
      event.preventDefault();
      if (!event.repeat) press(dir);
    } else if (event.code === "Space" || event.code === "Enter") {
      event.preventDefault();
      interactFacing();
    }
  });
  window.addEventListener("keyup", (event) => {
    const dir = keyMap[event.code];
    if (dir) release(dir);
  });
  window.addEventListener("blur", () => {
    held = [];
  });

  document.querySelectorAll(".dpad [data-dir]").forEach((button) => {
    const dir = button.dataset.dir;
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      press(dir);
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach((name) =>
      button.addEventListener(name, () => release(dir)),
    );
  });
  $("#dpad-action").addEventListener("click", interactFacing);
  $("#zone-select").addEventListener("change", (event) => {
    enterZone(Number(event.target.value));
    event.target.blur();
  });

  requestAnimationFrame(loop);

  return {
    zoneCount: zones.length,
    enterZone,
    refresh: updateHud,
    onMissionClosed,
    radio,
    returnFromDefense() {
      setScreen(gameScreen);
      held = [];
      bumpLock = true;
      updateHud();
    },
  };
})();
