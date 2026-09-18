/* HBO-i interactieve kubus
   Geometrie: isometrische projectie. 3D-assen: x = langs de rechterzijde (niveaus),
   y = langs de linkerzijde (activiteiten / diepte), z = omhoog.
   Scherm: X = cx + 0.866·(x + y),  Y = cy − 0.5·x + 0.5·y − z. */
(function () {
  "use strict";
  const M = window.HBOI_MODEL;
  const T = window.HBOI_TASKS;
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.getElementById("cubeSvg");

  const COL_W = 44, ROW_H = 42, STRIP_W = 46;
  const U = 4 * COL_W;             // breedte rechterzijde (4 niveaus)
  const V = 5 * STRIP_W;           // breedte linkerzijde / diepte (5 lagen)
  const H = 5 * ROW_H;             // hoogte (5 activiteiten)
  const K = 0.866;
  const cx = 324, cy = 531;        // scherm-positie van hoekpunt (0,0,0)
  const CENTER = { x: 500, y: 440 };
  const R = 345;

  let selectedLayer = M.layers[0].id;

  // ---------- helpers ----------
  const el = (name, attrs = {}, parent) => {
    const n = document.createElementNS(NS, name);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    if (parent) parent.appendChild(n);
    return n;
  };
  const h = (tag, attrs = {}, children = []) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") n.className = v;
      else if (k === "style") n.style.cssText = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    for (const c of [].concat(children)) n.append(c instanceof Node ? c : document.createTextNode(String(c)));
    return n;
  };
  const shade = (hex, f) => {
    const n = parseInt(hex.slice(1), 16);
    const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => Math.max(0, Math.min(255, Math.round(v * f))));
    return "#" + c.map(v => v.toString(16).padStart(2, "0")).join("");
  };
  const layerById = id => M.layers.find(l => l.id === id);
  const actById = id => M.activities.find(a => a.id === id);
  const textColorOn = hex => (hex === "#F4E01D" || hex === "#8DC63F") ? "#0b1a3a" : "#ffffff";
  const polar = (deg) => ({ x: CENTER.x + R * Math.cos(deg * Math.PI / 180), y: CENTER.y + R * Math.sin(deg * Math.PI / 180) });
  const arcPath = (a1, a2, sweep) => {
    const p1 = polar(a1), p2 = polar(a2);
    return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A ${R} ${R} 0 0 ${sweep} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  };
  const fitText = (t, max) => {
    requestAnimationFrame(() => {
      try {
        const len = t.getComputedTextLength();
        if (len > max) { t.setAttribute("textLength", max); t.setAttribute("lengthAdjust", "spacingAndGlyphs"); }
      } catch (e) { /* niet zichtbaar */ }
    });
  };
  const tip = document.getElementById("tooltip");
  const wrap = document.getElementById("svgWrap");
  const hover = (g, getHtml, onEnter, onLeave) => {
    const move = e => {
      const r = wrap.getBoundingClientRect();
      tip.style.left = (e.clientX - r.left) + "px";
      tip.style.top = (e.clientY - r.top) + "px";
    };
    g.addEventListener("mouseenter", e => { tip.innerHTML = getHtml(); tip.hidden = false; move(e); if (onEnter) onEnter(); });
    g.addEventListener("mousemove", move);
    g.addEventListener("mouseleave", () => { tip.hidden = true; if (onLeave) onLeave(); });
  };
  const hlActivity = (id, on) => svg.querySelectorAll(`[data-act="${id}"]`).forEach(n => n.classList.toggle("hl", on));
  const countTasks = (layerId, actId, lvl) => (((T[layerId] || {})[actId] || {})[String(lvl)] || []).length;
  const clickable = (g, label, fn) => {
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    g.setAttribute("aria-label", label);
    g.addEventListener("click", fn);
    g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); } });
  };

  // ---------- aandachtsgebieden (bogen) ----------
  function drawArcs() {
    const defs = el("defs", {}, svg);
    const spec = [
      { id: "doelgericht-interacteren", a1: 192, a2: 266, sweep: 1 },   // linksboven, met de klok mee
      { id: "toekomstgericht-organiseren", a1: 274, a2: 348, sweep: 1 }, // rechtsboven
      { id: "persoonlijk-leiderschap", a1: 168, a2: 94, sweep: 0 },    // linksonder, tegen de klok in (leesbaar)
      { id: "onderzoekend-vermogen", a1: 86, a2: 12, sweep: 0 }        // rechtsonder
    ];
    const g = el("g", { class: "arcs" }, svg);
    spec.forEach(s => {
      const skill = M.skills.find(k => k.id === s.id);
      const d = arcPath(s.a1, s.a2, s.sweep);
      el("path", { id: "arc-" + s.id, d }, defs);
      const hit = el("path", { d, class: "arc-hit" }, g);
      const wrap = el("g", { class: "arc-textwrap" }, g);
      const text = el("text", { class: "arc-text", style: `--c:${skill.color}` }, wrap);
      const tp = el("textPath", { href: "#arc-" + s.id, startOffset: "50%", "text-anchor": "middle" }, text);
      tp.textContent = skill.name.toUpperCase();
      clickable(hit, "Aandachtsgebied " + skill.name, () => openSkill(skill.id));
      hit.style.cursor = "pointer";
      hover(hit, () => `<b>${skill.name}</b><small>Aandachtsgebied · ${skill.competencies.map(c => c[0]).join(", ")}</small>`);
    });
  }

  // ---------- de kubus ----------
  function drawCube() {
    const cube = el("g", { class: "cube" }, svg);
    // schaduw onder de kubus
    el("ellipse", { cx: cx + K * (U + V) / 2 + 20, cy: cy + 0.5 * V + 24, rx: 220, ry: 42, fill: "rgba(0,0,0,.35)", filter: "url(#blur)" }, cube);
    const defs = el("defs", {}, svg);
    const f = el("filter", { id: "blur", x: "-50%", y: "-50%", width: "200%", height: "200%" }, defs);
    el("feGaussianBlur", { stdDeviation: 14 }, f);

    // --- linkerzijde: activiteiten ---
    const left = el("g", { transform: `matrix(${K} 0.5 0 1 ${cx} ${cy - H})` }, cube);
    M.activities.forEach((a, i) => {
      const g = el("g", { class: "act" }, left);
      const q = i * ROW_H;
      el("path", { d: `M 0 ${q} H ${V} V ${q + ROW_H} H 0 Z`, fill: a.color, stroke: "rgba(0,0,0,.35)", "stroke-width": 1, class: "fill" }, g);
      el("path", { d: `M 0 ${q + ROW_H - 4} H ${V} V ${q + ROW_H} H 0 Z`, fill: "rgba(0,0,0,.18)" }, g);
      const t = el("text", { x: V / 2, y: q + 27, "text-anchor": "middle", fill: "#fff", "font-size": 18, "font-weight": 600 }, g);
      t.textContent = a.name;
      fitText(t, V - 24);
      g.dataset.act = a.id;
      clickable(g, "Activiteit " + a.name, () => openActivity(a.id));
      hover(g, () => `<b>${a.name}</b><small>Activiteit · klik voor de beschrijving en alle niveaus</small>`, () => hlActivity(a.id, true), () => hlActivity(a.id, false));
    });

    // --- rechterzijde: beheersingsniveaus ---
    const right = el("g", { transform: `matrix(${K} -0.5 0 1 ${cx + K * V} ${cy + 0.5 * V - H})` }, cube);
    M.activities.forEach((a, i) => {
      for (let lvl = 1; lvl <= 4; lvl++) {
        const g = el("g", { class: "face-cell", "data-act": a.id, "data-level": lvl }, right);
        const p = (lvl - 1) * COL_W, q = i * ROW_H;
        el("rect", { x: p, y: q, width: COL_W, height: ROW_H, fill: shade(a.color, 0.72), class: "cell" }, g);
        el("rect", { x: p, y: q, width: COL_W, height: 3, fill: "rgba(255,255,255,.18)" }, g);
        const t = el("text", { x: p + COL_W / 2, y: q + 28, "text-anchor": "middle", fill: "#fff", "font-size": 21, "font-weight": 600 }, g);
        t.textContent = lvl;
        clickable(g, `${a.name}, beheersingsniveau ${lvl}`, () => openCell(a.id, lvl));
        hover(g, () => {
          const n = countTasks(selectedLayer, a.id, lvl);
          return `<b>${a.name} · niveau ${lvl}</b>${layerById(selectedLayer).name}<br><small>${n ? n + (n === 1 ? " beroepstaak" : " beroepstaken") : "geen aparte beroepstaken"} · klik voor details</small>`;
        }, () => hlActivity(a.id, true), () => hlActivity(a.id, false));
      }
    });

    // --- bovenzijde: architectuurlagen ---
    const top = el("g", { transform: `matrix(${K} -0.5 ${K} 0.5 ${cx} ${cy - H})` }, cube);
    M.layers.forEach((l, i) => {
      const g = el("g", { class: "strip", "data-layer": l.id }, top);
      const q = i * STRIP_W;
      el("path", { d: `M 0 ${q} H ${U} V ${q + STRIP_W} H 0 Z`, fill: l.color, stroke: "rgba(0,0,0,.35)", "stroke-width": 1 }, g);
      const t = el("text", { x: U / 2, y: q + 29, "text-anchor": "middle", fill: textColorOn(l.color), "font-size": 14, "font-weight": 600 }, g);
      t.textContent = l.name.toLowerCase();
      fitText(t, U - 14);
      clickable(g, "Architectuurlaag " + l.name, () => { selectLayer(l.id); openLayer(l.id); });
      hover(g, () => `<b>${l.name}</b><small>Architectuurlaag · ${l.id === selectedLayer ? "geselecteerd" : "klik om te selecteren"}</small>`);
    });

    // --- as-labels ---
    const labels = el("g", { class: "axis-labels" }, cube);
    const label = (txt, x, y, rot, fn, anchor = "middle") => {
      const g = el("g", { class: "axis-label" }, labels);
      const t = el("text", { x, y, transform: `rotate(${rot} ${x} ${y})`, "text-anchor": anchor }, g);
      t.textContent = txt;
      clickable(g, txt, fn);
      hover(g, () => `<b>${txt.charAt(0) + txt.slice(1).toLowerCase()}</b><small>Klik voor uitleg</small>`);
    };
    // ARCHITECTUURLAGEN: langs de rechterbovenrand van het bovenvlak
    label("ARCHITECTUURLAGEN", cx + K * (U + V / 2) + 12, cy - 0.5 * U + 0.25 * V - H - 20, 30, () => openOverview("lagen"));
    // ACTIVITEITEN: verticaal links van de linkerzijde
    label("ACTIVITEITEN", cx - 16, cy - H / 2, -90, () => openOverview("activiteiten"));
    // BEROEPSTAKEN: onder de linkerzijde
    label("BEROEPSTAKEN", cx + K * V * 0.5 - 12, cy + 0.25 * V + 22, 30, () => openOverview("beroepstaken"));
    // BEHEERSINGSNIVEAU: onder de rechterzijde
    label("BEHEERSINGSNIVEAU", cx + K * (V + U / 2) + 12, cy + 0.5 * V - 0.25 * U + 22, -30, () => openLevels());
  }

  function selectLayer(id) {
    selectedLayer = id;
    svg.querySelectorAll(".strip").forEach(s => {
      s.classList.toggle("active", s.dataset.layer === id);
      s.classList.toggle("dim", s.dataset.layer !== id);
    });
    document.querySelectorAll("#layerChips .chip").forEach(c => c.classList.toggle("active", c.dataset.layer === id));
  }

  function drawSkillChips() {
    const box = document.getElementById("skillChips");
    M.skills.forEach(k => box.append(h("button", { class: "chip", type: "button", style: `--c:${k.color}`, onclick: () => openSkill(k.id) }, [h("i"), k.name])));
    document.querySelectorAll("#legend button").forEach(b => b.addEventListener("click", () => {
      const k = b.dataset.open;
      if (k === "niveaus") openLevels(); else openOverview(k);
    }));
  }
  function responsiveViewBox() {
    const mq = window.matchMedia("(max-width: 700px)");
    const apply = () => svg.setAttribute("viewBox", mq.matches ? "250 200 520 520" : "130 70 740 740");
    mq.addEventListener("change", apply);
    apply();
  }

  function drawChips() {
    const box = document.getElementById("layerChips");
    M.layers.forEach(l => {
      box.append(h("button", { class: "chip", type: "button", "data-layer": l.id, style: `--c:${l.color}`, onclick: () => selectLayer(l.id) },
        [h("i"), l.name]));
    });
  }

  // ---------- modal ----------
  const modal = document.getElementById("modal");
  const mTitle = document.getElementById("modalTitle");
  const mKicker = document.getElementById("modalKicker");
  const mBody = document.getElementById("modalBody");
  const mFoot = document.getElementById("modalFoot");
  document.getElementById("modalClose").addEventListener("click", () => modal.close());
  modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

  function show({ kicker, title, color, body, foot }) {
    mKicker.textContent = kicker || "";
    mTitle.textContent = title;
    modal.querySelector(".modal-card").style.setProperty("--c", color || "#143c8a");
    mBody.replaceChildren(...[].concat(body));
    mFoot.replaceChildren(...[].concat(foot || []));
    mBody.scrollTop = 0;
    if (!modal.open) modal.showModal();
  }

  const taskList = (layerId, actId, lvl) => {
    const items = ((T[layerId] || {})[actId] || {})[String(lvl)] || [];
    if (!items.length) return h("div", { class: "empty" }, "Voor deze combinatie zijn in de domeinbeschrijving geen aparte beroepstaken opgenomen. Een hoger niveau impliceert beheersing van de onderliggende niveaus.");
    return h("ul", { class: "tasklist" }, items.map(t => h("li", {}, t)));
  };

  function openCell(actId, lvl) {
    const a = actById(actId), l = layerById(selectedLayer), L = M.levels[lvl - 1];
    const body = [
      h("p", { class: "small" }, [`Beheersingsniveau ${lvl} · ${L.name}. `, h("span", {}, L.context)]),
      h("h3", {}, `Exemplarische beroepstaken · ${l.name}`),
      taskList(l.id, a.id, lvl)
    ];
    const layerGroup = h("div", { class: "group" }, [h("span", { class: "group-label" }, "Laag")]);
    M.layers.forEach(x => layerGroup.append(h("button", { class: "btn" + (x.id === l.id ? " active" : ""), type: "button", style: `--c:${x.color}`, onclick: () => { selectLayer(x.id); openCell(actId, lvl); } }, [h("i"), x.name])));
    const lvlGroup = h("div", { class: "group" }, [h("span", { class: "group-label" }, "Niveau")]);
    for (let n = 1; n <= 4; n++) lvlGroup.append(h("button", { class: "btn lvl" + (n === lvl ? " active" : ""), type: "button", onclick: () => openCell(actId, n) }, n));
    show({ kicker: `${a.name} · niveau ${lvl}`, title: `${a.name} op niveau ${lvl} (${L.name.toLowerCase()})`, color: a.color, body, foot: [layerGroup, h("span", { class: "spacer" }), lvlGroup] });
  }

  function openActivity(actId) {
    const a = actById(actId), l = layerById(selectedLayer);
    const body = [h("p", {}, a.text), h("p", { class: "small" }, a.ecf), h("h3", {}, `Beroepstaken per niveau · ${l.name}`)];
    for (let n = 1; n <= 4; n++) {
      body.push(h("h4", { style: "margin:14px 0 6px;font-size:14px" }, `Niveau ${n} · ${M.levels[n - 1].name}`));
      body.push(taskList(l.id, a.id, n));
    }
    const layerGroup = h("div", { class: "group" }, [h("span", { class: "group-label" }, "Laag")]);
    M.layers.forEach(x => layerGroup.append(h("button", { class: "btn" + (x.id === l.id ? " active" : ""), type: "button", style: `--c:${x.color}`, onclick: () => { selectLayer(x.id); openActivity(actId); } }, [h("i"), x.name])));
    show({ kicker: "Activiteit", title: a.name, color: a.color, body, foot: layerGroup });
  }

  function openLayer(layerId) {
    const l = layerById(layerId);
    const counts = M.activities.map(a => {
      const row = h("div", { class: "lvl-row" });
      for (let n = 1; n <= 4; n++) {
        const k = ((T[l.id][a.id] || {})[String(n)] || []).length;
        row.append(h("button", { class: "pill", type: "button", style: "border:0;cursor:pointer", onclick: () => openCell(a.id, n) }, `niveau ${n}: ${k} ${k === 1 ? "taak" : "taken"}`));
      }
      return h("div", { class: "row", style: "padding:8px 0;border-top:1px solid var(--line)" }, [h("b", { style: `color:${a.color};display:block;margin-bottom:6px` }, a.name), row]);
    });
    show({
      kicker: "Architectuurlaag · nu geselecteerd",
      title: l.name,
      color: l.color,
      body: [h("p", {}, l.text), h("h3", {}, "Beroepstaken in deze laag (klik voor de inhoud)"), ...counts],
      foot: h("p", { class: "small", style: "margin:0;font-size:13px;color:var(--muted)" }, "Sluit dit venster en klik op een cijfer 1–4 in de kubus om de beroepstaken van deze laag te bekijken.")
    });
  }

  function openLevels() {
    const cards = M.levels.map(L => h("div", { class: "levelcard" }, [
      h("h4", {}, `${L.n}. ${L.name}`),
      h("dl", {}, [h("dt", {}, "Zelfstandigheid"), h("dd", {}, L.zelfstandigheid), h("dt", {}, "Context"), h("dd", {}, L.context), h("dt", {}, "Inhoud"), h("dd", {}, L.inhoud)])
    ]));
    show({ kicker: "Dimensie 1", title: "Beheersingsniveaus", color: "#143c8a", body: [h("p", {}, M.levelsIntro), h("p", { class: "small" }, M.levelsFrameworks), h("div", { class: "levelgrid" }, cards)] });
  }

  function openSkill(id) {
    const s = M.skills.find(k => k.id === id);
    show({
      kicker: "Aandachtsgebied · professional skills", title: s.name, color: s.color,
      body: [h("p", {}, s.text), h("h3", {}, "Competenties"), ...s.competencies.map(([n, d]) => h("div", { class: "comp", style: `--c:${s.color}` }, [h("b", {}, n), d])), h("p", { class: "small" }, M.skillsIntro)]
    });
  }

  function openOverview(kind) {
    if (kind === "lagen") {
      const list = h("div", { class: "layerlist" }, M.layers.map(l => h("div", { class: "row" }, [h("i", { style: `--c:${l.color}` }), h("div", {}, [h("b", {}, l.name), h("p", {}, l.text)])])));
      show({ kicker: "Dimensie 3", title: "Architectuurlagen", color: "#2D2E83", body: [h("p", {}, M.layersIntro), h("p", { class: "small" }, M.layersOrder), list] });
    } else if (kind === "activiteiten") {
      const list = h("div", { class: "layerlist" }, M.activities.map(a => h("div", { class: "row" }, [h("i", { style: `--c:${a.color}` }), h("div", {}, [h("b", {}, a.name), h("p", {}, a.text)])])));
      show({ kicker: "Dimensie 2", title: "Activiteiten", color: "#E5007D", body: [h("p", {}, M.activitiesIntro), list] });
    } else {
      show({ kicker: "De inhoud van de kubus", title: "Beroepstaken", color: "#D71E3A", body: [h("p", {}, M.tasksIntro), h("p", {}, M.tasksDerive), h("p", { class: "small" }, M.modelIntro)] });
    }
  }

  // ---------- volledig overzicht ----------
  function drawOverview() {
    const box = document.getElementById("overviewTables");
    M.layers.forEach((l, i) => {
      const thead = h("thead", {}, h("tr", {}, [h("th", {}, "Activiteit"), ...[1, 2, 3, 4].map(n => h("th", {}, `Niveau ${n} · ${M.levels[n - 1].name}`))]));
      const tbody = h("tbody", {}, M.activities.map(a => h("tr", {}, [
        h("th", { class: "act", style: `--c:${a.color}` }, a.name),
        ...[1, 2, 3, 4].map(n => {
          const items = (T[l.id][a.id] || {})[String(n)] || [];
          return items.length ? h("td", {}, h("ul", {}, items.map(t => h("li", {}, t)))) : h("td", { class: "empty" }, "—");
        })
      ])));
      box.append(h("details", { class: "layer-block", style: `--c:${l.color}`, ...(i === 0 ? { open: "" } : {}) }, [
        h("summary", {}, l.name),
        h("div", { class: "table-scroll" }, h("table", { class: "tasks" }, [thead, tbody]))
      ]));
    });
  }

  drawArcs();
  drawCube();
  drawChips();
  drawSkillChips();
  responsiveViewBox();
  drawOverview();
  selectLayer(selectedLayer);
})();
