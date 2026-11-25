// Conjunto de objetos em estilo "3D suave" (degradê, brilho e sombra). Sem pessoas.
const NAVY = "#0B172B", NAVY2 = "#16294A", NAVY3 = "#24406B";
const P = {
  coral: ["#FF8F7E", "#EF4B3F"],
  teal: ["#5DE3D2", "#12998B"],
  amber: ["#FFD777", "#F29A2E"],
  violet: ["#A99BFF", "#6A4DE0"],
  sky: ["#7CCBFF", "#2F86E0"],
  gold: ["#EBD6B4", "#A67C52"],
  navy: ["#3A63A3", "#0B172B"],
  white: ["#FFFFFF", "#DCE4F0"],
};
const grad = (id, c, dir = "d") => {
  const [x1, y1, x2, y2] = dir === "v" ? [0, 0, 0, 1] : dir === "h" ? [0, 0, 1, 0] : [0, 0, 1, 1];
  return `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient>`;
};
const SHADOW = `<filter id="sh" x="-40%" y="-40%" width="180%" height="190%"><feGaussianBlur in="SourceAlpha" stdDeviation="13"/><feOffset dx="0" dy="16" result="b"/><feComponentTransfer><feFuncA type="linear" slope="0.32"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
const glow = (id, color, op = 0.5) => `<radialGradient id="${id}"><stop offset="0" stop-color="${color}" stop-opacity="${op}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;
const wrap = (w, h, defs, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${SHADOW}${defs}</defs>${body}</svg>`;
const shine = (cx, cy, rx, ry, rot = -30, op = 0.45) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" opacity="${op}" transform="rotate(${rot} ${cx} ${cy})"/>`;
const heartPath = (cx, cy, s) => { // coração com centro (cx,cy) e largura ~ s
  const k = s / 300;
  const X = (x) => cx + (x - 150) * k, Y = (y) => cy + (y - 150) * k;
  return `M${X(150)} ${Y(270)} C${X(10)} ${Y(180)} ${X(-10)} ${Y(80)} ${X(50)} ${Y(40)} C${X(100)} ${Y(8)} ${X(150)} ${Y(38)} ${X(150)} ${Y(75)} C${X(150)} ${Y(38)} ${X(200)} ${Y(8)} ${X(250)} ${Y(40)} C${X(310)} ${Y(80)} ${X(290)} ${Y(180)} ${X(150)} ${Y(270)} Z`;
};
const sparkle = (x, y, r, c = "#fff", op = 0.9) => `<path d="M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r} Z" fill="${c}" opacity="${op}"/>`;

// ---- objetos individuais, cada um em tela 800x800 ----
function heart(bg) {
  const d = grad("c", P.coral);
  return wrap(800, 800, d, `<g filter="url(#sh)"><path d="${heartPath(400, 400, 560)}" fill="url(#c)"/></g>${shine(290, 270, 70, 34, -35, 0.5)}${sparkle(560, 250, 26)}`);
}
function heartCracked(bg = "#FFFFFF") {
  const d = grad("c", P.coral);
  const crack = `M400 175 L428 285 L372 360 L430 440 L380 530 L400 640`;
  return wrap(800, 800, d,
    `<g filter="url(#sh)"><path d="${heartPath(400, 400, 560)}" fill="url(#c)"/></g>${shine(290, 270, 70, 34, -35, 0.45)}<path d="${crack}" stroke="${bg}" stroke-width="22" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`);
}
function umbrella() {
  const d = grad("a", P.amber) + grad("b", P.coral) + grad("h", P.gold, "v");
  const dome = `M110 380 A290 290 0 0 1 690 380 Q640 330 600 380 Q550 330 500 380 Q450 330 400 380 Q350 330 300 380 Q250 330 200 380 Q160 330 110 380 Z`;
  return wrap(800, 800, d,
    `<g filter="url(#sh)"><path d="M400 380 V600 a62 62 0 0 1 -124 0" stroke="url(#h)" stroke-width="26" fill="none" stroke-linecap="round"/><path d="${dome}" fill="url(#b)"/></g>` +
    `<path d="M400 90 L200 380 L300 380 Z" fill="url(#a)" opacity=".95"/><path d="M400 90 L600 380 L500 380 Z" fill="url(#a)" opacity=".95"/>` +
    `<rect x="388" y="62" width="24" height="44" rx="12" fill="url(#h)"/>${shine(300, 230, 80, 26, -40, 0.4)}${sparkle(610, 190, 28)}`);
}
function bubble() {
  const d = grad("t", P.teal) + grad("v", P.violet);
  return wrap(800, 800, d,
    `<g filter="url(#sh)"><path d="M120 150 H560 a70 70 0 0 1 70 70 V400 a70 70 0 0 1 -70 70 H330 L210 580 V470 H190 a70 70 0 0 1 -70 -70 V220 a70 70 0 0 1 0 -70 Z" fill="url(#t)"/></g>` +
    `<g filter="url(#sh)"><path d="M470 360 H680 a60 60 0 0 1 60 60 V560 a60 60 0 0 1 -60 60 H660 V700 L570 620 H470 a60 60 0 0 1 -60 -60 V420 a60 60 0 0 1 60 -60 Z" fill="url(#v)"/></g>` +
    `${[0, 1, 2].map((i) => `<circle cx="${250 + i * 90}" cy="310" r="24" fill="#fff"/>`).join("")}${shine(230, 200, 70, 22, -20, 0.4)}${sparkle(700, 190, 26)}`);
}
function target() {
  const d = grad("c", P.coral) + grad("w", P.white) + grad("a", P.amber);
  return wrap(800, 800, d,
    `<g filter="url(#sh)"><circle cx="390" cy="420" r="300" fill="url(#c)"/></g><circle cx="390" cy="420" r="225" fill="url(#w)"/><circle cx="390" cy="420" r="150" fill="url(#c)"/><circle cx="390" cy="420" r="75" fill="url(#w)"/><circle cx="390" cy="420" r="34" fill="url(#c)"/>` +
    `<g filter="url(#sh)"><path d="M392 418 L640 170" stroke="#0B172B" stroke-width="18" stroke-linecap="round"/><path d="M640 170 l10 -62 l50 -8 l-12 52 l52 -12 l-8 50 z" fill="url(#a)"/></g>${shine(250, 240, 60, 24, -40, 0.4)}`);
}
function loop() {
  const d = grad("v", P.violet);
  const arrow = (cx, cy, rot) => `<g transform="rotate(${rot} ${cx} ${cy})"><path d="M${cx + 150} ${cy} A150 150 0 0 0 ${cx} ${cy - 150}" stroke="#fff" stroke-width="40" fill="none" stroke-linecap="round"/><path d="M${cx - 30} ${cy - 215} L${cx + 50} ${cy - 150} L${cx - 30} ${cy - 85} Z" fill="#fff"/></g>`;
  return wrap(800, 800, d, `<g filter="url(#sh)"><circle cx="400" cy="400" r="310" fill="url(#v)"/></g>${arrow(400, 400, 0)}${arrow(400, 400, 180)}${shine(290, 250, 90, 30, -35, 0.35)}`);
}
function scales() {
  const d = grad("g", P.gold) + grad("a", P.amber) + grad("n", P.navy);
  return wrap(800, 800, d,
    `<g filter="url(#sh)"><rect x="250" y="640" width="300" height="46" rx="23" fill="url(#n)"/><rect x="380" y="210" width="40" height="440" rx="20" fill="url(#g)"/><circle cx="400" cy="190" r="40" fill="url(#a)"/>` +
    `<g transform="rotate(-11 400 230)"><rect x="110" y="214" width="580" height="34" rx="17" fill="url(#g)"/></g>` +
    `<path d="M150 252 L100 440 M150 252 L240 440" stroke="#EBD6B4" stroke-width="8"/><path d="M100 440 h140 a70 56 0 0 1 -140 0Z" fill="url(#a)"/>` +
    `<path d="M650 208 L560 330 M650 208 L720 330" stroke="#EBD6B4" stroke-width="8"/><path d="M560 330 h160 a80 44 0 0 1 -160 0Z" fill="url(#g)"/></g>` +
    `<rect x="96" y="372" width="150" height="68" rx="12" fill="#EF4B3F" opacity=".95"/>${sparkle(640, 140, 26)}`);
}
function megaphone() {
  const d = grad("a", P.amber) + grad("c", P.coral) + grad("n", P.navy);
  return wrap(800, 800, d,
    `<g filter="url(#sh)" transform="rotate(-12 400 400)"><path d="M180 330 L560 170 L560 630 L180 470 Z" fill="url(#a)"/><rect x="120" y="320" width="130" height="160" rx="36" fill="url(#c)"/><ellipse cx="560" cy="400" rx="64" ry="240" fill="url(#c)"/><path d="M230 500 L290 660 a42 42 0 0 0 80 -24 L330 520Z" fill="url(#n)"/></g>` +
    `<path d="M650 300 q60 100 0 200" stroke="#fff" stroke-width="22" fill="none" stroke-linecap="round" opacity=".9"/><path d="M700 240 q104 160 0 320" stroke="#fff" stroke-width="22" fill="none" stroke-linecap="round" opacity=".6"/>${sparkle(180, 200, 28)}`);
}
function eye() {
  const d = grad("w", P.white, "v") + grad("t", P.teal) + grad("n", P.navy);
  return wrap(800, 800, d,
    `<g filter="url(#sh)"><path d="M60 400 Q400 130 740 400 Q400 670 60 400 Z" fill="url(#w)"/></g><circle cx="400" cy="400" r="150" fill="url(#t)"/><circle cx="400" cy="400" r="74" fill="#0B172B"/><circle cx="352" cy="352" r="30" fill="#fff" opacity=".9"/>${sparkle(660, 230, 26)}`);
}
function magnifier() {
  const d = grad("g", P.gold) + grad("n", P.navy) + grad("a", P.amber);
  return wrap(800, 800, d,
    `<g filter="url(#sh)"><path d="M520 520 L690 690" stroke="url(#n)" stroke-width="86" stroke-linecap="round"/><circle cx="360" cy="360" r="250" fill="#fff" fill-opacity=".28" stroke="url(#g)" stroke-width="50"/></g>${shine(270, 250, 90, 30, -40, 0.55)}${sparkle(560, 200, 36, "#FFC857")}${sparkle(190, 520, 22, "#FFC857")}`);
}
function house() {
  const d = grad("c", P.coral) + grad("w", P.white, "v") + grad("a", P.amber);
  return wrap(800, 800, d,
    `<g filter="url(#sh)"><rect x="180" y="340" width="440" height="330" rx="24" fill="url(#w)"/><path d="M120 360 L400 120 L680 360 Z" fill="url(#c)"/></g>` +
    `<rect x="340" y="500" width="120" height="170" rx="16" fill="url(#a)"/><rect x="215" y="400" width="90" height="90" rx="14" fill="#7CCBFF"/><rect x="495" y="400" width="90" height="90" rx="14" fill="#7CCBFF"/><path d="${heartPath(400, 300, 70)}" fill="#fff"/>`);
}
function cap() {
  const d = grad("n", P.navy) + grad("a", P.amber) + grad("v", P.violet);
  return wrap(800, 800, d,
    `<g filter="url(#sh)"><path d="M210 400 V540 Q400 650 590 540 V400 L400 480 Z" fill="url(#v)"/><path d="M400 190 L740 340 L400 490 L60 340 Z" fill="url(#n)"/></g>` +
    `<path d="M690 365 V520" stroke="url(#a)" stroke-width="12" stroke-linecap="round"/><circle cx="690" cy="535" r="24" fill="url(#a)"/>${shine(300, 300, 90, 22, -25, 0.3)}${sparkle(610, 210, 28)}`);
}
function sprout() {
  const d = grad("t", P.teal) + grad("g", P.gold, "v") + grad("a", P.amber) + grad("l", ["#9CF0B0", "#26A56B"]);
  return wrap(800, 800, d,
    `<circle cx="560" cy="190" r="70" fill="url(#a)"/><g filter="url(#sh)"><path d="M240 520 H560 L520 700 Q400 730 280 700 Z" fill="url(#g)"/><path d="M400 520 Q390 400 400 300" stroke="#26A56B" stroke-width="22" fill="none" stroke-linecap="round"/>` +
    `<path d="M398 360 C260 370 190 300 200 190 C330 190 400 260 398 360 Z" fill="url(#t)"/><path d="M402 300 C520 300 600 240 600 140 C480 140 410 200 402 300 Z" fill="url(#l)"/></g>${shine(300, 250, 50, 16, -50, 0.4)}${sparkle(660, 330, 24)}`);
}
function battery() {
  const d = grad("c", P.coral) + grad("t", P.teal) + grad("w", P.white, "v");
  return wrap(800, 800, d,
    `<g filter="url(#sh)"><rect x="110" y="250" width="540" height="300" rx="60" fill="url(#w)" stroke="#0B172B" stroke-width="22"/><rect x="660" y="340" width="60" height="120" rx="22" fill="#0B172B"/></g>` +
    `<rect x="150" y="290" width="130" height="220" rx="28" fill="url(#c)"/><rect x="310" y="290" width="130" height="220" rx="28" fill="#0B172B" opacity=".08"/><rect x="470" y="290" width="130" height="220" rx="28" fill="#0B172B" opacity=".08"/>` +
    `<g filter="url(#sh)"><circle cx="610" cy="560" r="105" fill="url(#t)"/></g><path d="${heartPath(610, 560, 120)}" fill="#fff"/>${sparkle(180, 180, 28, "#FF8F7E")}`);
}
function clipboard() {
  const d = grad("n", P.navy) + grad("g", P.gold) + grad("t", P.teal);
  const row = (y) => `<circle cx="300" cy="${y}" r="38" fill="url(#t)"/><path d="M282 ${y} l14 14 l26 -30" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="370" y="${y - 14}" width="250" height="28" rx="14" fill="#C9D3E3"/>`;
  return wrap(800, 800, d,
    `<g filter="url(#sh)"><rect x="150" y="110" width="500" height="620" rx="50" fill="url(#n)"/></g><rect x="200" y="190" width="400" height="490" rx="24" fill="#fff"/><rect x="290" y="70" width="220" height="100" rx="40" fill="url(#g)"/>${row(300)}${row(430)}${row(560)}${sparkle(690, 160, 26)}`);
}
function puzzle() {
  const cols = [P.coral, P.teal, P.amber, P.violet];
  const d = cols.map((c, i) => grad("p" + i, c)).join("");
  const s = 250, g = 14, R = 48; // peça: lado s, bola R
  const piece = (x, y, i, knobs, notches) => {
    // knobs/notches: strings com t,r,b,l
    let body = `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="22" fill="url(#p${i})"/>`;
    const cx = { t: x + s / 2, b: x + s / 2, l: x, r: x + s };
    const cy = { t: y, b: y + s, l: y + s / 2, r: y + s / 2 };
    let out = "";
    for (const k of knobs) out += `<circle cx="${cx[k]}" cy="${cy[k]}" r="${R}" fill="url(#p${i})"/>`;
    let mask = "";
    if (notches.length) {
      mask = `<mask id="m${i}"><rect x="0" y="0" width="800" height="800" fill="#fff"/>${[...notches].map((k) => `<circle cx="${cx[k]}" cy="${cy[k]}" r="${R + 2}" fill="#000"/>`).join("")}</mask>`;
      return { defs: mask, svg: `<g mask="url(#m${i})">${body}${out}</g>` };
    }
    return { defs: "", svg: body + out };
  };
  const x0 = 150, y0 = 150, st = s + g;
  const A = piece(x0, y0, 0, "rb", "");
  const B = piece(x0 + st, y0, 1, "b", "l");
  const Cc = piece(x0, y0 + st, 2, "r", "t");
  const D = piece(x0 + st, y0 + st, 3, "", "tl");
  return wrap(800, 800, d + A.defs + B.defs + Cc.defs + D.defs, `<g filter="url(#sh)">${A.svg}${B.svg}${Cc.svg}${D.svg}</g>${shine(230, 230, 60, 20, -35, 0.45)}${sparkle(700, 140, 28)}`);
}
function chair() { // cadeira vazia sob holofote (800x900)
  const d = grad("g", P.gold) + grad("s", ["#FFFFFF", "#FFFFFF"], "v") + `<linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".30"/><stop offset="1" stop-color="#fff" stop-opacity=".04"/></linearGradient>` + glow("pool", "#FFE3B0", 0.55);
  return wrap(800, 900, d,
    `<polygon points="360,0 440,0 760,760 40,760" fill="url(#beam)"/><ellipse cx="400" cy="770" rx="330" ry="62" fill="url(#pool)"/>` +
    `<g filter="url(#sh)"><rect x="262" y="360" width="30" height="400" rx="12" fill="#A67C52"/><rect x="508" y="360" width="30" height="400" rx="12" fill="#A67C52"/><rect x="262" y="370" width="276" height="34" rx="14" fill="url(#g)"/>` +
    `<rect x="250" y="528" width="300" height="48" rx="18" fill="url(#g)"/><rect x="270" y="576" width="26" height="184" rx="12" fill="#A67C52"/><rect x="504" y="576" width="26" height="184" rx="12" fill="#A67C52"/><rect x="300" y="470" width="200" height="26" rx="12" fill="#A67C52"/></g>` +
    `${sparkle(640, 330, 24, "#fff", 0.7)}${sparkle(170, 560, 18, "#fff", 0.6)}`);
}
function cover() { // aglomerado: guarda-chuva, coração, balão de fala (1000x1000)
  const d = grad("a", P.amber) + grad("b", P.coral) + grad("h", P.gold, "v") + grad("t", P.teal) + grad("v", P.violet) + glow("gl", "#6A4DE0", 0.45) + glow("g2", "#EF4B3F", 0.35);
  const dome = `M110 380 A290 290 0 0 1 690 380 Q640 330 600 380 Q550 330 500 380 Q450 330 400 380 Q350 330 300 380 Q250 330 200 380 Q160 330 110 380 Z`;
  return wrap(1000, 1000, d,
    `<circle cx="500" cy="500" r="480" fill="url(#gl)"/><circle cx="640" cy="650" r="300" fill="url(#g2)"/>` +
    `<g transform="translate(180 20) scale(.95)"><g filter="url(#sh)"><path d="M400 380 V600 a62 62 0 0 1 -124 0" stroke="url(#h)" stroke-width="26" fill="none" stroke-linecap="round"/><path d="${dome}" fill="url(#b)"/></g><path d="M400 90 L200 380 L300 380 Z" fill="url(#a)"/><path d="M400 90 L600 380 L500 380 Z" fill="url(#a)"/><rect x="388" y="62" width="24" height="44" rx="12" fill="url(#h)"/>${shine(300, 230, 80, 26, -40, 0.4)}</g>` +
    `<g transform="translate(40 230) scale(.62)"><g filter="url(#sh)"><path d="M120 150 H560 a70 70 0 0 1 70 70 V400 a70 70 0 0 1 -70 70 H330 L210 580 V470 H190 a70 70 0 0 1 -70 -70 V220 a70 70 0 0 1 0 -70 Z" fill="url(#t)"/></g>${[0, 1, 2].map((i) => `<circle cx="${250 + i * 90}" cy="310" r="24" fill="#fff"/>`).join("")}</g>` +
    `<g filter="url(#sh)"><path d="${heartPath(640, 700, 360)}" fill="url(#b)"/></g>${shine(560, 600, 52, 24, -35, 0.5)}${sparkle(870, 330, 30)}${sparkle(120, 760, 22)}${sparkle(800, 880, 18)}`);
}
function boat() { // barco de papel ao nascer do sol (900x900)
  const d = grad("s", ["#FFD777", "#F29A2E"]) + glow("sun", "#FFC857", 0.75) + `<radialGradient id="seaFade" cx="450" cy="650" r="400" gradientUnits="userSpaceOnUse"><stop offset="0.55" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>` + `<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#24406B"/><stop offset="1" stop-color="#0B172B"/></linearGradient>` + grad("w", ["#FFFFFF", "#D8E0EC"]) + grad("w2", ["#E9EEF6", "#B9C6DA"]);
  return wrap(900, 900, d,
    `<circle cx="450" cy="470" r="400" fill="url(#sun)"/><circle cx="450" cy="470" r="170" fill="url(#s)"/>` +
    `<mask id="fadeSea"><rect width="900" height="900" fill="url(#seaFade)"/></mask><g mask="url(#fadeSea)"><rect x="0" y="520" width="900" height="380" fill="url(#sea)"/></g>` +
    `<g stroke="#5C86C4" stroke-width="6" stroke-linecap="round" opacity=".7"><path d="M120 600 h160"/><path d="M620 600 h160"/><path d="M200 680 h200"/><path d="M520 690 h210"/><path d="M330 760 h240"/></g>` +
    `<ellipse cx="450" cy="640" rx="170" ry="16" fill="#FFC857" opacity=".35"/>` +
    `<g filter="url(#sh)"><path d="M230 520 L670 520 L570 640 L330 640 Z" fill="url(#w)"/><path d="M450 520 L450 290 L330 520 Z" fill="url(#w2)"/><path d="M450 520 L450 330 L600 520 Z" fill="url(#w)"/></g>` +
    `${sparkle(160, 270, 26)}${sparkle(760, 200, 20)}`);
}

module.exports = { heart, heartCracked, umbrella, bubble, target, loop, scales, megaphone, eye, magnifier, house, cap, sprout, battery, clipboard, puzzle, chair, cover, boat };
