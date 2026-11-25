const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { applyTheme } = require("/root/.claude/skills/synced/6d148028-ded4-4fc1-b0e8-065f6578a2dc_8cf01336-666b-4cae-9f94-ab528af6b8e7/pptx/scripts/apply_theme.js");

const OUT = process.argv[2];
const ROTEIRO_MD = process.argv[3];
const A = path.join(__dirname, "assets");

// ---------- paleta extraída da logomarca ----------
const NAVY = "#0B172B", NAVY2 = "#16294A", NAVY3 = "#24406B", NAVY4 = "#2D4C7C", NAVY5 = "#33548A";
const SLATE = "#3C4A60", GOLD = "#A67C52", GOLDM = "#C4A07A", GOLDL = "#E3CFB3", PAPER = "#F4EDE3", WHITE = "#FFFFFF";

const THEME = {
  name: "Dr Edson Barroso",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "0B172B", lt1: "FFFFFF", dk2: "3C4A60", lt2: "F4EDE3",
    accent1: "A67C52", accent2: "E3CFB3", accent3: "C4A07A",
    accent4: "24406B", accent5: "16294A", accent6: "7C8CA3",
    hlink: "A67C52", folHlink: "3C4A60",
  },
};

// ---------- ilustrações (SVG -> PNG) ----------
const svg = (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${inner}</svg>`;

function fig(cx, base, h, fill, o = {}) {
  const w = h * 0.52, r = h * 0.15;
  const headCy = base - h + r + (o.down || 0);
  const bodyTop = base - h * 0.62, rr = w * 0.38;
  const x0 = cx - w / 2, x1 = cx + w / 2;
  let s = `<circle cx="${cx}" cy="${headCy}" r="${r}" fill="${o.head || fill}"/>`;
  s += `<path d="M${x0} ${base} V${bodyTop + rr} Q${x0} ${bodyTop} ${x0 + rr} ${bodyTop} H${x1 - rr} Q${x1} ${bodyTop} ${x1} ${bodyTop + rr} V${base} Z" fill="${fill}"/>`;
  if (o.raise) {
    const sx = cx + w * 0.30, sy = bodyTop + h * 0.07;
    const ex = sx + w * 0.07, ey = bodyTop - h * 0.20;
    s += `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${o.raise}" stroke-width="${h * 0.095}" stroke-linecap="round"/>`;
    s += `<circle cx="${ex}" cy="${ey - h * 0.03}" r="${h * 0.062}" fill="${o.raise}"/>`;
  }
  return s;
}
const heart = (cx, cy, s, fill) =>
  `<path d="M ${cx} ${cy + s * 0.9} C ${cx - s * 1.6} ${cy - s * 0.2}, ${cx - s * 0.8} ${cy - s * 1.3}, ${cx} ${cy - s * 0.45} C ${cx + s * 0.8} ${cy - s * 1.3}, ${cx + s * 1.6} ${cy - s * 0.2}, ${cx} ${cy + s * 0.9} Z" fill="${fill}"/>`;

function ilGrupo() {
  const W = 1600, H = 520, base = 500;
  let s = `<line x1="0" y1="${base}" x2="${W}" y2="${base}" stroke="${NAVY3}" stroke-width="4"/>`;
  const cols = [NAVY2, NAVY3, NAVY4, NAVY5];
  const hs = [300, 340, 310, 350, 320, 345, 305];
  for (let i = 0; i < 7; i++) s += fig(150 + i * 118, base, hs[i], cols[i % 4]);
  s += `<circle cx="1330" cy="360" r="175" fill="${GOLD}" opacity="0.14"/>`;
  s += fig(1330, base, 300, GOLDL, { down: 12 });
  s += `<line x1="1085" y1="${base - 6}" x2="1190" y2="${base - 6}" stroke="${GOLDM}" stroke-width="6" stroke-dasharray="2 16" stroke-linecap="round"/>`;
  return svg(W, H, s);
}
function ilCelular() {
  let s = "";
  s += `<rect x="140" y="30" width="320" height="700" rx="52" fill="${NAVY}"/>`;
  s += `<rect x="158" y="60" width="284" height="640" rx="36" fill="${PAPER}"/>`;
  s += `<rect x="262" y="40" width="76" height="10" rx="5" fill="${NAVY3}"/>`;
  const B = (x, y, w, c) => `<rect x="${x}" y="${y}" width="${w}" height="58" rx="29" fill="${c}"/>`;
  s += B(176, 110, 190, "#D9C3A2") + B(176, 186, 140, GOLDM) + B(246, 270, 180, NAVY3) + B(176, 354, 210, "#D9C3A2") + B(176, 432, 120, GOLD) + B(300, 516, 126, NAVY3);
  s += [0, 1, 2].map((i) => `<circle cx="${230 + i * 26}" cy="139" r="7" fill="${NAVY}" opacity=".55"/>`).join("");
  s += `<rect x="20" y="150" width="150" height="70" rx="35" fill="${GOLD}"/><polygon points="120,218 150,218 150,252" fill="${GOLD}"/>`;
  s += `<rect x="430" y="330" width="150" height="70" rx="35" fill="${GOLDM}"/><polygon points="460,398 490,398 450,432" fill="${GOLDM}"/>`;
  s += `<rect x="30" y="560" width="130" height="64" rx="32" fill="${SLATE}"/><polygon points="120,622 150,622 150,652" fill="${SLATE}"/>`;
  s += `<circle cx="470" cy="62" r="34" fill="${GOLD}"/><rect x="465" y="44" width="10" height="24" rx="5" fill="#fff"/><circle cx="470" cy="80" r="6" fill="#fff"/>`;
  return svg(600, 760, s);
}
function ilTriangulo() {
  const W = 900, H = 700;
  let s = "";
  const L = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${GOLDM}" stroke-width="6" stroke-dasharray="2 16" stroke-linecap="round"/>`;
  s += L(450, 170, 200, 520) + L(450, 170, 700, 520) + L(200, 520, 700, 520);
  const node = (cx, cy, bg, fg, o) => `<circle cx="${cx}" cy="${cy}" r="120" fill="${bg}"/>` + fig(cx, cy + 85, 150, fg, o || {});
  s += node(450, 170, GOLDL, NAVY);
  s += node(200, 520, GOLD, WHITE, { down: 10 });
  s += node(700, 520, NAVY, GOLDL);
  return svg(W, H, s);
}
function ilNuvem() {
  let s = `<g fill="#24406B"><circle cx="230" cy="210" r="105"/><circle cx="370" cy="150" r="130"/><circle cx="520" cy="205" r="110"/><rect x="150" y="205" width="470" height="110" rx="55"/></g>`;
  s += `<g fill="#2D4C7C" opacity=".7"><circle cx="410" cy="170" r="88"/></g>`;
  [190, 250, 310, 370, 430, 490, 550].forEach((x, i) => {
    s += `<line x1="${x}" y1="${350 + (i % 2) * 30}" x2="${x - 22}" y2="${415 + (i % 2) * 30}" stroke="${GOLDM}" stroke-width="9" stroke-linecap="round"/>`;
  });
  s += fig(370, 610, 150, GOLDL, { down: 10 });
  return svg(700, 620, s);
}
function ilMochila() {
  let s = `<path d="M200 135 Q250 30 300 135" stroke="${NAVY}" stroke-width="22" fill="none" stroke-linecap="round"/>`;
  s += `<rect x="68" y="205" width="38" height="220" rx="19" fill="${NAVY3}"/><rect x="394" y="205" width="38" height="220" rx="19" fill="${NAVY3}"/>`;
  s += `<rect x="100" y="110" width="300" height="420" rx="110" fill="${NAVY}"/>`;
  s += `<rect x="100" y="110" width="300" height="160" rx="110" fill="${NAVY2}"/>`;
  s += `<rect x="145" y="340" width="210" height="150" rx="48" fill="${GOLD}"/>`;
  s += `<line x1="165" y1="374" x2="335" y2="374" stroke="${GOLDL}" stroke-width="7" stroke-linecap="round"/>`;
  s += `<circle cx="410" cy="110" r="42" fill="${GOLD}"/><rect x="404" y="88" width="12" height="28" rx="6" fill="#fff"/><circle cx="410" cy="132" r="7" fill="#fff"/>`;
  return svg(500, 560, s);
}
function ilAneis() {
  let s = "";
  const C = (r, c) => `<circle cx="400" cy="400" r="${r}" fill="${c}" stroke="#fff" stroke-width="8"/>`;
  s += C(380, GOLDL) + C(290, GOLDM) + C(200, GOLD) + C(118, NAVY);
  s += fig(400, 470, 150, WHITE);
  return svg(800, 800, s);
}
function ilPais() {
  let s = `<circle cx="450" cy="330" r="250" fill="${PAPER}"/>`;
  s += fig(340, 540, 430, NAVY);
  s += fig(570, 540, 270, GOLD);
  s += heart(215, 190, 30, GOLD);
  s += `<rect x="520" y="85" width="230" height="110" rx="45" fill="${GOLDL}"/><polygon points="570,190 612,190 586,232" fill="${GOLDL}"/>`;
  s += [0, 1, 2].map((i) => `<circle cx="${580 + i * 55}" cy="140" r="10" fill="${NAVY}"/>`).join("");
  s += `<line x1="60" y1="540" x2="840" y2="540" stroke="${GOLDL}" stroke-width="5"/>`;
  return svg(900, 600, s);
}
function ilEscola() {
  let s = `<circle cx="450" cy="330" r="250" fill="${PAPER}"/>`;
  s += `<line x1="440" y1="25" x2="440" y2="125" stroke="${NAVY}" stroke-width="6"/><rect x="440" y="28" width="70" height="40" fill="${GOLD}"/>`;
  s += `<polygon points="150,250 440,115 730,250" fill="${GOLD}"/>`;
  s += `<rect x="180" y="250" width="520" height="290" fill="${NAVY}"/>`;
  [215, 300, 540, 625].forEach((x) => (s += `<rect x="${x}" y="320" width="70" height="95" rx="6" fill="${GOLDL}"/>`));
  s += `<rect x="400" y="380" width="80" height="160" rx="10" fill="${GOLDL}"/>`;
  s += `<rect x="350" y="540" width="180" height="22" fill="${NAVY3}"/>`;
  s += fig(800, 562, 250, GOLD);
  s += `<line x1="40" y1="562" x2="860" y2="562" stroke="${GOLDL}" stroke-width="5"/>`;
  return svg(900, 600, s);
}
function ilTodos() {
  const W = 1000, H = 520, base = 500;
  let s = `<line x1="0" y1="${base}" x2="${W}" y2="${base}" stroke="${GOLDL}" stroke-width="5"/>`;
  const xs = [110, 260, 410, 560, 710, 860], hs = [300, 340, 310, 350, 320, 335];
  const cols = [NAVY, NAVY3, NAVY, NAVY3, NAVY, NAVY3];
  const raise = [false, true, false, true, true, false];
  for (let i = 0; i < 6; i++) s += fig(xs[i], base, hs[i], cols[i], raise[i] ? { raise: GOLD } : {});
  return svg(W, H, s);
}

async function png(svgStr, scale = 2) {
  const buf = await sharp(Buffer.from(svgStr), { density: 72 * scale }).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}


// ---------- roteiro ----------
const ROTEIRO = [
  { t: "Capa", min: "0:30", n: "Boa noite a todos, e obrigado pela presença. Eu sou o Dr. Edson Barroso, trabalho com saúde mental de adultos e de crianças. Hoje a nossa conversa não é só sobre o problema. É sobre o que podemos fazer: prevenir, cuidar e ajudar. Com os nossos filhos, com os nossos profissionais e com o ambiente em que todos vivem e convivem." },
  { t: "Gancho", min: "1:00", n: "Quantas vezes vocês já ouviram, ou até já disseram: 'é só brincadeira'? Pausa. Essa frase é a desculpa que mais protege o bullying. Olhem esta cadeira vazia sob a luz, e a mochila encostada na parede: é assim que muitas crianças se sentem no recreio, sozinhas, mesmo cercadas de gente, e é assim que muitos profissionais se sentem sem saber o que fazer. Meu objetivo nestes quinze minutos é simples: que cada um aqui saia com uma atitude prática. Porque toda criança tem o direito de ir à escola sem medo." },
  { t: "O que é e como aparece", min: "1:15", n: "Vamos usar a palavra certa, rapidamente. Bullying não é qualquer briga. Tem três marcas, juntas: é intencional, existe a vontade de ferir; é repetido, não é um dia ruim, é rotina; e é desigual, quem agride tem mais poder, seja pela força, pela popularidade ou pelo grupo. Aparece de quatro formas: física, verbal, social, que é excluir e espalhar boato, e virtual. A virtual é a mais traiçoeira: entra em casa pelo celular, a qualquer hora. Resumindo: briga entre iguais é conflito. Bullying é violência." },
  { t: "Ninguém sai ileso", min: "1:30", n: "Aqui entra a saúde mental. O bullying adoece, e não só a vítima. Quem sofre apresenta mais ansiedade, mais tristeza e depressão, isolamento e queda na escola. Quem pratica também apresenta sofrimento psíquico e comportamentos de risco: isso não é desculpa, é alerta, essa criança também precisa de ajuda. E quem assiste também é atingido, porque aprende que aquilo é normal. Eu atendo crianças e adolescentes e preciso ser direto: não é frescura, é sofrimento real. Em casos graves existe risco de autolesão e de pensamentos suicidas. Por isso, a regra é nunca minimizar." },
  { t: "Sinais de alerta", min: "1:00", n: "Quem sofre raramente chega e conta. Então o comportamento avisa antes da palavra. Atenção para: não quer mais ir à escola; dor de cabeça ou de barriga sem causa clara; mudança de humor, de sono ou de apetite; afastamento dos amigos; notas que caem de repente; pertences 'perdidos' ou quebrados. Nenhum sinal sozinho prova nada, mas todos pedem uma conversa. Pergunte com calma: 'Como estão as coisas na escola? Alguém tem te incomodado?'. Isso vale para pais e para professores." },
  { t: "Três frentes", min: "0:45", n: "Agora vamos ao que interessa: o que fazer. Eu organizo em três frentes. Primeira, os nossos filhos: fortalecer a saúde mental e o vínculo, e agir cedo. Segunda, os nossos profissionais: professores e equipe precisam de formação, de apoio e de um protocolo claro. E terceira, o ambiente: um clima escolar de acolhimento, regras justas e atenção aos lugares de risco. Prevenir, cuidar e ajudar, nessas três frentes ao mesmo tempo." },
  { t: "Filhos: prevenir em casa", min: "1:30", n: "Prevenção começa em casa e é feita de coisas simples, todos os dias. Converse sobre o dia, não só sobre notas: criança que se sente ouvida conta mais cedo quando algo dá errado. Cuide do básico: sono, alimentação, movimento e tempo para brincar protegem a saúde mental. Ensine empatia e ensine a pedir ajuda: diga com todas as letras, 'se algo te machucar, você pode me contar, e eu não vou brigar com você'. E acompanhe o mundo digital: combine regras de tela e esteja por perto, sem espionar. O vínculo familiar é um dos maiores fatores de proteção que as pesquisas apontam." },
  { t: "Filhos: se acontecer, ajude", min: "1:15", n: "Se acontecer, o que fazer? Escute sem julgar e sem dizer 'isso passa'. Acredite: o que ela sente é real, mesmo que pareça pequeno. Registre os fatos, datas, prints, nomes, e procure a escola por escrito, com calma e firmeza. E procure um profissional de saúde mental se a tristeza, a ansiedade, o isolamento ou a recusa de ir à escola persistirem. Não esperem 'passar sozinho'. Evitem mandar revidar e evitem confrontar sozinhos a família do outro. A criança precisa sentir que está cercada de apoio: família, escola e profissional." },
  { t: "Profissionais: cuidar de quem cuida", min: "1:30", n: "Agora, a frente que quase ninguém lembra: os nossos profissionais. Professores e equipe escolar são a linha de frente. Estudos sobre a percepção docente mostram um desafio recorrente: falta de formação para reconhecer o problema e saber agir. Então, primeiro: formação continuada. Segundo: um protocolo claro, saber exatamente o que fazer e com quem falar, tira o peso da improvisação. Terceiro: espaço de escuta e apoio psicológico, com acesso a psicólogo escolar e à rede de saúde. E quarto: cuidar da própria saúde mental, porque sobrecarga e pressão adoecem. Professor acolhido acolhe melhor." },
  { t: "Escola: agir na hora", min: "1:15", n: "Quando acontece, a escola precisa agir na hora e com método. Interromper a situação já é uma mensagem; o silêncio também ensina. Proteger quem sofre sem expor, e nunca punir quem teve coragem de contar. Responsabilizar quem agride com orientação e consequência clara, sem humilhação. E envolver as famílias e o apoio psicológico, porque bullying não se resolve só com punição. E é dever legal: a Lei 13.185, de 2015, obriga a escola a ter medidas de prevenção e combate, e a Lei 14.811, de 2024, passou a tratar bullying e cyberbullying como crime. [Conferir o texto das leis antes da palestra.]" },
  { t: "Ambiente: clima que protege", min: "1:30", n: "Terceira frente: o ambiente. Um clima escolar que protege tem quatro características. Acolhimento e pertencimento: todo aluno precisa se sentir parte. Regras claras, justas e iguais para todos. Atenção aos espaços de risco: recreio, banheiros, corredores, transporte e os grupos de mensagem. E programas de convivência e de habilidades sociais, trabalhados o ano inteiro, não só quando acontece. A pesquisa brasileira sobre psicologia escolar mostra que intervenções em habilidades sociais ajudam. Prevenção contínua reduz danos e permite identificar cedo. Vejam esta roda de cadeiras: um espaço para conversar, com cores, plantas e luz. É assim que um ambiente acolhe." },
  { t: "Todos nós", min: "1:00", n: "O ambiente também somos nós, e o ambiente também é digital. Quem assiste também decide. Não ria: o riso da plateia alimenta a agressão. Não compartilhe, foto, vídeo e print espalham a dor, mas guarde as provas para denunciar. Apoie quem sofre: sentar junto e chamar para conversar já muda o dia de alguém. E avise um adulto de confiança. Contar não é dedurar, é proteger. Uma atitude pequena muda o jogo." },
  { t: "Fechamento e ajuda", min: "1:00", n: "Para fechar, três verbos: escutar, acolher, agir. E três frentes: nossos filhos, nossos profissionais e o nosso ambiente. Bullying se combate com presença, não com silêncio. Se houver sofrimento intenso, procurem ajuda profissional: o CVV atende pelo 188, 24 horas, de graça; em emergência, SAMU 192; e o Disque 100 recebe denúncias de violência contra crianças e adolescentes. Meu contato está na tela, @dredsonbarroso. Muito obrigado. Fico à disposição para as perguntas." },
];


// ---------- imagens de referência do usuário (cenas escolares 3D, sem pessoas) ----------
const IMG = path.join(__dirname, "..", "imagens");
const SRC = { classe: IMG + "/sala-cadeira-isolada-mochila.webp", mesa: IMG + "/mesa-cadernos-abertos.webp", lista: IMG + "/mural-lista-coracao.webp", corredor: IMG + "/corredor-luz-dourada-vertical.webp", roda: IMG + "/roda-de-cadeiras-coloridas.webp" };
const svgWrapH = (W, H, defs, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs>${defs}</defs>${body}</svg>`;
const scrimLeftH = (a0, endAt) => (W, H) => svgWrapH(W, H, `<linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0B172B" stop-opacity="${a0}"/><stop offset="${endAt * 0.65}" stop-color="#0B172B" stop-opacity="${a0 * 0.92}"/><stop offset="${endAt}" stop-color="#0B172B" stop-opacity="0"/><stop offset="1" stop-color="#0B172B" stop-opacity="0"/></linearGradient>`, `<rect width="${W}" height="${H}" fill="url(#g)"/>`);
async function crop(key, c, wIn, hIn, o = {}) {
  const dpi = o.dpi || 150;
  const W = Math.round(wIn * dpi), H = Math.round(hIn * dpi);
  let buf = await sharp(SRC[key]).extract({ left: c[0], top: c[1], width: c[2], height: c[3] }).resize(W, H, { kernel: "lanczos3" }).sharpen({ sigma: 0.7 }).modulate({ saturation: o.sat || 1.04 }).toBuffer();
  if (o.scrim) buf = await sharp(buf).composite([{ input: Buffer.from(o.scrim(W, H)), top: 0, left: 0 }]).toBuffer();
  const out = await sharp(buf).jpeg({ quality: 90 }).toBuffer();
  return "image/jpeg;base64," + out.toString("base64");
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.title = "Bullying e saúde mental na escola";
  pres.author = "Dr. Edson Barroso";
  pres.company = "Dr. Edson Barroso - Saúde Mental Adulto e Infantil";
  pres.subject = "Palestra de 15 minutos para pais, professores e comunidade";
  const C = pres.SchemeColor;
  const HEAD = THEME.headFontFace, BODY = THEME.bodyFontFace;
  const logoColor = path.join(A, "logo_color_h.png"), logoDark = path.join(A, "logo_dark_h.png");
  const LW = 1.7, LHc = LW * 541 / 1848, LHd = LW * 545 / 1848, LY = 6.78;
  const PX = 6.2, PW = 13.333 - 6.2; // painel da foto (direita)
  const AR = PW / 7.5;

  const titlePh = (w, size, color) => ({ placeholder: { options: { name: "title", type: "title", x: 0.7, y: 0.6, w, h: 1.3, fontFace: HEAD, fontSize: size, bold: true, color, align: "left", valign: "top", margin: 0 }, text: "" } });
  pres.defineSlideMaster({ title: "PAINEL_CLARO", objects: [{ image: { path: logoColor, x: 0.7, y: LY, w: LW, h: LHc } }, titlePh(5.2, 28, C.text1)] });
  pres.defineSlideMaster({ title: "PAINEL_ESCURO", objects: [{ rect: { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.text1 } } }, { image: { path: logoDark, x: 0.7, y: LY, w: LW, h: LHd } }, titlePh(5.2, 28, C.background1)] });
  pres.defineSlideMaster({ title: "LARGO", objects: [{ image: { path: logoColor, x: 0.7, y: LY, w: LW, h: LHc } }, titlePh(11.9, 34, C.text1)] });
  pres.defineSlideMaster({ title: "ESCURO_LIVRE", objects: [{ rect: { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.text1 } } }] });

  const txt = (s, text, o) => s.addText(text, Object.assign({ fontFace: BODY, margin: 0, isTextBox: true, valign: "top" }, o));
  const img = (s, data, x, y, w, h, alt) => s.addImage({ data, x, y, w, h, altText: alt, objectName: alt });
  const notes = (s, i) => s.addNotes(`(${ROTEIRO[i].min}) ${ROTEIRO[i].n}`);
  const logoD = (s, w = LW, x = 0.7, y = LY) => s.addImage({ path: logoDark, x, y, w, h: w * 545 / 1848, altText: "Logomarca Dr. Edson Barroso", objectName: "Logomarca" });
  const photoR = async (s, key, c, alt) => img(s, await crop(key, c, PW, 7.5), PX, 0, PW, 7.5, alt);
  const msg = (s, t, dark) => txt(s, t, { x: 0.7, y: 1.95, w: 5.2, h: 0.8, fontSize: 17, color: dark ? C.accent2 : C.text2, objectName: "Mensagem" });
  const list = (s, rows, y0, step, dark) => rows.forEach((r, i) => {
    const y = y0 + i * step;
    txt(s, r[0], { x: 0.7, y, w: 5.2, h: 0.4, fontFace: HEAD, fontSize: 20, bold: true, color: dark ? C.accent3 : C.text1, objectName: "Item " + (i + 1) });
    txt(s, r[1], { x: 0.7, y: y + 0.4, w: 5.2, h: 0.5, fontSize: 15, color: dark ? C.background1 : C.text2, objectName: "Detalhe " + (i + 1) });
  });

  // ================= 1. Capa =================
  pres.addSection({ title: "Abertura" });
  {
    const s = pres.addSlide({ masterName: "PAINEL_ESCURO", sectionTitle: "Abertura" });
    await photoR(s, "roda", [0, 112, 925, 972], "Imagem: sala com porta aberta para o jardim e cadeiras coloridas");
    txt(s, "Bullying e\nsaúde mental\nna escola", { x: 0.7, y: 1.0, w: 5.3, h: 2.2, fontFace: HEAD, fontSize: 40, bold: true, color: C.background1, objectName: "Título" });
    txt(s, "Como prevenir, cuidar e ajudar: nossos filhos, nossos profissionais e o ambiente", { x: 0.7, y: 3.55, w: 5.0, h: 1.6, fontSize: 20, color: C.accent2, objectName: "Subtítulo" });
    txt(s, "@dredsonbarroso", { x: 3.0, y: 6.92, w: 3, h: 0.35, fontSize: 16, color: C.accent3, objectName: "Instagram" });
    notes(s, 0);
  }

  // ================= 2. Gancho =================
  {
    const s = pres.addSlide({ masterName: "ESCURO_LIVRE", sectionTitle: "Abertura" });
    img(s, await crop("classe", [250, 240, 1198, 674], 13.333, 7.5, { dpi: 140, scrim: scrimLeftH(0.96, 0.66) }), 0, 0, 13.333, 7.5, "Imagem: sala de aula com uma cadeira isolada e uma mochila encostada");
    txt(s, "“É só\nbrincadeira.”", { x: 0.8, y: 0.9, w: 5.6, h: 2.1, fontFace: HEAD, fontSize: 50, italic: true, color: C.accent2, objectName: "Frase" });
    txt(s, "Quantas vezes você já ouviu isso?", { x: 0.8, y: 3.3, w: 5.4, h: 0.5, fontSize: 24, color: C.background1, objectName: "Pergunta" });
    txt(s, "Toda criança tem o direito de ir à escola sem medo.", { x: 0.8, y: 4.1, w: 5.2, h: 1.6, fontFace: HEAD, fontSize: 28, bold: true, color: C.background1, objectName: "Mensagem central" });
    logoD(s);
    notes(s, 1);
  }

  // ================= 3. As três marcas =================
  pres.addSection({ title: "Entender" });
  {
    const s = pres.addSlide({ masterName: "PAINEL_CLARO", sectionTitle: "Entender" });
    s.addText("Bullying tem três marcas, e todas juntas", { placeholder: "title" });
    await photoR(s, "lista", [0, 0, 700, 736], "Imagem: mural de recados coloridos");
    msg(s, "Briga entre iguais é conflito. Bullying é violência.");
    list(s, [["Intencional", "Há a intenção de ferir, humilhar ou excluir."], ["Repetido", "Não é um dia ruim: é uma rotina que se repete."], ["Desigual", "Quem agride tem mais poder: força, popularidade ou grupo."]], 2.95, 1.1);
    txt(s, "Pode ser física, verbal, social ou virtual.", { x: 0.7, y: 6.3, w: 5.2, h: 0.35, fontSize: 15, bold: true, color: C.accent1, objectName: "Formas" });
    notes(s, 2);
  }

  // ================= 4. Ninguém sai ileso =================
  pres.addSection({ title: "Saúde mental" });
  {
    const s = pres.addSlide({ masterName: "PAINEL_ESCURO", sectionTitle: "Saúde mental" });
    s.addText("Ninguém sai ileso: o bullying adoece", { placeholder: "title" });
    await photoR(s, "classe", [600, 230, 813, 856], "Imagem: cadeira isolada sob a luz e mochila encostada na parede");
    list(s, [["Quem sofre", "Ansiedade, tristeza e depressão, isolamento, queda na escola."], ["Quem pratica", "Sofrimento psíquico e comportamentos de risco. Também precisa de ajuda."], ["Quem assiste", "Também é atingido e aprende que isso é normal."]], 2.0, 1.1, true);
    txt(s, "Não é frescura. É sofrimento real.", { x: 0.7, y: 5.4, w: 5.3, h: 0.45, fontFace: HEAD, fontSize: 22, italic: true, color: C.accent2, objectName: "Frase de impacto" });
    txt(s, "Em casos graves, há risco de autolesão e de pensamentos suicidas. Nunca minimize.", { x: 0.7, y: 5.9, w: 5.2, h: 0.7, fontSize: 14, color: C.background1, objectName: "Alerta" });
    notes(s, 3);
  }

  // ================= 5. Sinais de alerta =================
  {
    const s = pres.addSlide({ masterName: "PAINEL_CLARO", sectionTitle: "Saúde mental" });
    s.addText("O comportamento avisa antes da criança contar", { placeholder: "title" });
    await photoR(s, "mesa", [0, 112, 925, 972], "Imagem: sala com porta aberta e armários amarelos ao fundo");
    txt(s, "Pais e professores, perguntem com calma: “Como estão as coisas na escola? Alguém tem te incomodado?”", { x: 0.7, y: 1.85, w: 5.2, h: 1.0, fontSize: 16, italic: true, color: C.text2, objectName: "Pergunta modelo" });
    ["Não quer mais ir à escola", "Dor de cabeça ou de barriga sem causa", "Muda de humor, de sono ou de apetite", "Afasta-se dos amigos", "As notas caem de repente", "Pertences “perdidos” ou quebrados"].forEach((t, i) => {
      const y = 3.05 + i * 0.6;
      txt(s, String(i + 1), { x: 0.7, y, w: 0.5, h: 0.5, fontFace: HEAD, fontSize: 24, bold: true, color: C.accent1, valign: "middle", objectName: "Número " + (i + 1) });
      txt(s, t, { x: 1.25, y, w: 4.65, h: 0.5, fontSize: 17, color: C.text1, valign: "middle", objectName: "Sinal " + (i + 1) });
    });
    notes(s, 4);
  }

  // ================= 6. Três frentes =================
  pres.addSection({ title: "O que fazer" });
  {
    const s = pres.addSlide({ masterName: "LARGO", sectionTitle: "O que fazer" });
    s.addText("Três frentes: filhos, profissionais e ambiente", { placeholder: "title" });
    txt(s, "Prevenir, cuidar e ajudar, ao mesmo tempo.", { x: 0.7, y: 1.3, w: 11.9, h: 0.5, fontSize: 20, color: C.text2, objectName: "Mensagem" });
    const cols = [["mesa", [0, 230, 940, 723], "Nossos filhos", "Fortalecer a saúde mental e o vínculo, e agir cedo."], ["classe", [0, 200, 900, 692], "Nossos profissionais", "Formar, apoiar e dar um protocolo claro a quem educa."], ["roda", [0, 200, 925, 711], "O ambiente", "Acolhimento, regras justas e atenção aos espaços de risco."]];
    for (let i = 0; i < 3; i++) {
      const x = 0.7 + i * 4.15;
      img(s, await crop(cols[i][0], cols[i][1], 3.9, 3.0), x, 1.95, 3.9, 3.0, "Imagem: " + cols[i][2]);
      txt(s, cols[i][2], { x, y: 5.12, w: 3.9, h: 0.5, fontFace: HEAD, fontSize: 24, bold: true, color: C.text1, objectName: "Frente " + cols[i][2] });
      txt(s, cols[i][3], { x, y: 5.68, w: 3.8, h: 0.9, fontSize: 16, color: C.text2, objectName: "Descrição " + cols[i][2] });
    }
    notes(s, 5);
  }

  // ---------- slides de ação: painel de texto + imagem grande ----------
  const acao = async (title, message, key, c, rows, idx, alt) => {
    const s = pres.addSlide({ masterName: "PAINEL_CLARO", sectionTitle: "O que fazer" });
    s.addText(title, { placeholder: "title" });
    await photoR(s, key, c, alt);
    msg(s, message);
    list(s, rows, 2.95, 0.93);
    notes(s, idx);
  };
  await acao("Nossos filhos: prevenir começa em casa", "Criança ouvida em casa conta mais cedo quando algo dá errado.", "mesa", [330, 340, 709, 746], [
    ["Converse todos os dias", "Pergunte sobre o dia, não só sobre as notas."],
    ["Cuide do básico", "Sono, alimentação, movimento e tempo para brincar."],
    ["Ensine a pedir ajuda", "“Se algo te machucar, me conte. Eu não vou brigar.”"],
    ["Acompanhe o mundo digital", "Regras de tela e presença, sem espionar."],
  ], 6, "Imagem: mesa com dois cadernos abertos e um lápis");

  await acao("Nossos filhos: se acontecer, ajude assim", "A criança precisa sentir que está cercada de apoio: família, escola e profissional.", "mesa", [700, 230, 748, 787], [
    ["Escute sem julgar", "Deixe falar até o fim. Evite “isso passa”."],
    ["Acredite e acolha", "O que ela sente é real, mesmo que pareça pequeno."],
    ["Registre e procure a escola", "Datas, prints e nomes, por escrito e com firmeza."],
    ["Procure ajuda profissional", "Se tristeza, ansiedade ou recusa escolar persistirem."],
  ], 7, "Imagem: cantinho aconchegante com almofadas e livros");

  await acao("Profissionais: quem cuida precisa de cuidado", "Professor acolhido acolhe melhor.", "classe", [0, 139, 900, 947], [
    ["Formação continuada", "Professores relatam dificuldade para reconhecer e agir."],
    ["Protocolo claro", "Saber o que fazer e com quem falar tira o peso."],
    ["Escuta e apoio psicológico", "Psicólogo escolar e acesso à rede de saúde."],
    ["Cuidar da própria saúde mental", "Sobrecarga e pressão adoecem quem educa."],
  ], 8, "Imagem: sala de aula iluminada com plantas e estante");

  await acao("Na escola: agir na hora e com método", "É dever da escola (Lei 13.185/2015) e bullying é crime (Lei 14.811/2024).", "lista", [170, 190, 851, 895], [
    ["Interrompa a situação", "O silêncio também ensina."],
    ["Proteja sem expor", "Quem contou não pode ser punido por isso."],
    ["Responsabilize com orientação", "Consequência clara, sem humilhação."],
    ["Envolva famílias e psicólogo", "Bullying não se resolve só com punição."],
  ], 9, "Imagem: lista de verificação com um coração e uma porta aberta");

  await acao("O ambiente: um clima escolar que protege", "Prevenção contínua reduz danos e identifica o problema cedo.", "roda", [700, 230, 748, 787], [
    ["Acolhimento e pertencimento", "Todo aluno precisa se sentir parte do grupo."],
    ["Regras claras, justas e iguais", "Valem para todos, inclusive para os mais populares."],
    ["Atenção aos espaços de risco", "Recreio, banheiros, transporte e grupos de mensagem."],
    ["Convivência e habilidades sociais", "Trabalhadas o ano todo, não só quando acontece."],
  ], 10, "Imagem: cadeiras coloridas com cadernos e estante");

  await acao("Todos nós fazemos o ambiente", "Inclusive o digital: o que fazemos online também conta.", "roda", [330, 250, 794, 835], [
    ["Não ria", "O riso da plateia alimenta a agressão."],
    ["Não compartilhe, guarde as provas", "Print e link ajudam a denunciar; repassar espalha a dor."],
    ["Apoie quem sofre", "Sentar junto e chamar para conversar já muda o dia."],
    ["Avise um adulto de confiança", "Contar não é dedurar: é proteger."],
  ], 11, "Imagem: roda de cadeiras coloridas ao redor de uma planta");

  // ================= 13. Fechamento =================
  pres.addSection({ title: "Encerramento" });
  {
    const s = pres.addSlide({ masterName: "PAINEL_ESCURO", sectionTitle: "Encerramento" });
    await photoR(s, "corredor", [0, 250, 1086, 1142], "Imagem: corredor da escola com luz dourada e uma mochila no banco");
    txt(s, "Escutar.\nAcolher.\nAgir.", { x: 0.7, y: 0.7, w: 5.3, h: 2.0, fontFace: HEAD, fontSize: 40, bold: true, color: C.background1, objectName: "Título" });
    txt(s, "Bullying se combate com presença, não com silêncio.", { x: 0.7, y: 2.9, w: 5.0, h: 0.9, fontSize: 20, color: C.accent2, objectName: "Frase final" });
    txt(s, "Precisa de ajuda agora?", { x: 0.7, y: 4.05, w: 5.2, h: 0.4, fontFace: HEAD, fontSize: 20, bold: true, color: C.accent3, objectName: "Título ajuda" });
    txt(s, [
      { text: "CVV 188 · 24 horas, gratuito", options: { breakLine: true } },
      { text: "SAMU 192 · emergência", options: { breakLine: true } },
      { text: "Disque 100 · denúncia de violência contra crianças e adolescentes" },
    ], { x: 0.7, y: 4.55, w: 5.2, h: 1.6, fontSize: 16, color: C.background1, paraSpaceAfter: 5, objectName: "Canais de ajuda" });
    txt(s, "@dredsonbarroso", { x: 3.0, y: 6.92, w: 3, h: 0.35, fontSize: 16, color: C.accent3, objectName: "Instagram" });
    notes(s, 12);
  }

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);

  let md = "# Roteiro de fala: Bullying e saúde mental na escola\n\n**Dr. Edson Barroso** · Saúde mental adulto e infantil · @dredsonbarroso\n\n";
  md += "Duração total: 15 minutos (13 slides). O roteiro também está nas notas do apresentador do arquivo `.pptx`.\n\n";
  md += "| # | Slide | Tempo |\n|---|---|---|\n";
  ROTEIRO.forEach((r, i) => (md += `| ${i + 1} | ${r.t} | ${r.min} |\n`));
  md += "\n---\n\n";
  ROTEIRO.forEach((r, i) => (md += `## ${i + 1}. ${r.t} (${r.min})\n\n${r.n}\n\n`));
  fs.writeFileSync(ROTEIRO_MD, md);
  const secs = ROTEIRO.reduce((a, r) => { const [m, s2] = r.min.split(":").map(Number); return a + m * 60 + s2; }, 0);
  console.log("OK", OUT, "tempo total", Math.floor(secs / 60) + ":" + String(secs % 60).padStart(2, "0"));
})().catch((e) => { console.error(e); process.exit(1); });
