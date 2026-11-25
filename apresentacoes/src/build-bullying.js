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
  { t: "Gancho", min: "1:00", n: "Quantas vezes vocês já ouviram, ou até já disseram: 'é só brincadeira'? Pausa. Essa frase é a desculpa que mais protege o bullying. Olhem esta cadeira vazia sob o holofote: é assim que muitas crianças se sentem no recreio, sozinhas, mesmo cercadas de gente, e é assim que muitos profissionais se sentem sem saber o que fazer. Meu objetivo nestes quinze minutos é simples: que cada um aqui saia com uma atitude prática. Porque toda criança tem o direito de ir à escola sem medo." },
  { t: "O que é e como aparece", min: "1:15", n: "Vamos usar a palavra certa, rapidamente. Bullying não é qualquer briga. Tem três marcas, juntas: é intencional, existe a vontade de ferir; é repetido, não é um dia ruim, é rotina; e é desigual, quem agride tem mais poder, seja pela força, pela popularidade ou pelo grupo. Aparece de quatro formas: física, verbal, social, que é excluir e espalhar boato, e virtual. A virtual é a mais traiçoeira: entra em casa pelo celular, a qualquer hora. Resumindo: briga entre iguais é conflito. Bullying é violência." },
  { t: "Ninguém sai ileso", min: "1:30", n: "Aqui entra a saúde mental. O bullying adoece, e não só a vítima. Quem sofre apresenta mais ansiedade, mais tristeza e depressão, isolamento e queda na escola. Quem pratica também apresenta sofrimento psíquico e comportamentos de risco: isso não é desculpa, é alerta, essa criança também precisa de ajuda. E quem assiste também é atingido, porque aprende que aquilo é normal. Eu atendo crianças e adolescentes e preciso ser direto: não é frescura, é sofrimento real. Em casos graves existe risco de autolesão e de pensamentos suicidas. Por isso, a regra é nunca minimizar." },
  { t: "Sinais de alerta", min: "1:00", n: "Quem sofre raramente chega e conta. Então o comportamento avisa antes da palavra. Atenção para: não quer mais ir à escola; dor de cabeça ou de barriga sem causa clara; mudança de humor, de sono ou de apetite; afastamento dos amigos; notas que caem de repente; pertences 'perdidos' ou quebrados. Nenhum sinal sozinho prova nada, mas todos pedem uma conversa. Pergunte com calma: 'Como estão as coisas na escola? Alguém tem te incomodado?'. Isso vale para pais e para professores." },
  { t: "Três frentes", min: "0:45", n: "Agora vamos ao que interessa: o que fazer. Eu organizo em três frentes. Primeira, os nossos filhos: fortalecer a saúde mental e o vínculo, e agir cedo. Segunda, os nossos profissionais: professores e equipe precisam de formação, de apoio e de um protocolo claro. E terceira, o ambiente: um clima escolar de acolhimento, regras justas e atenção aos lugares de risco. Prevenir, cuidar e ajudar, nessas três frentes ao mesmo tempo." },
  { t: "Filhos: prevenir em casa", min: "1:30", n: "Prevenção começa em casa e é feita de coisas simples, todos os dias. Converse sobre o dia, não só sobre notas: criança que se sente ouvida conta mais cedo quando algo dá errado. Cuide do básico: sono, alimentação, movimento e tempo para brincar protegem a saúde mental. Ensine empatia e ensine a pedir ajuda: diga com todas as letras, 'se algo te machucar, você pode me contar, e eu não vou brigar com você'. E acompanhe o mundo digital: combine regras de tela e esteja por perto, sem espionar. O vínculo familiar é um dos maiores fatores de proteção que as pesquisas apontam." },
  { t: "Filhos: se acontecer, ajude", min: "1:15", n: "Se acontecer, o que fazer? Escute sem julgar e sem dizer 'isso passa'. Acredite: o que ela sente é real, mesmo que pareça pequeno. Registre os fatos, datas, prints, nomes, e procure a escola por escrito, com calma e firmeza. E procure um profissional de saúde mental se a tristeza, a ansiedade, o isolamento ou a recusa de ir à escola persistirem. Não esperem 'passar sozinho'. Evitem mandar revidar e evitem confrontar sozinhos a família do outro. A criança precisa sentir que está cercada de apoio: família, escola e profissional." },
  { t: "Profissionais: cuidar de quem cuida", min: "1:30", n: "Agora, a frente que quase ninguém lembra: os nossos profissionais. Professores e equipe escolar são a linha de frente. Estudos sobre a percepção docente mostram um desafio recorrente: falta de formação para reconhecer o problema e saber agir. Então, primeiro: formação continuada. Segundo: um protocolo claro, saber exatamente o que fazer e com quem falar, tira o peso da improvisação. Terceiro: espaço de escuta e apoio psicológico, com acesso a psicólogo escolar e à rede de saúde. E quarto: cuidar da própria saúde mental, porque sobrecarga e pressão adoecem. Professor acolhido acolhe melhor." },
  { t: "Escola: agir na hora", min: "1:15", n: "Quando acontece, a escola precisa agir na hora e com método. Interromper a situação já é uma mensagem; o silêncio também ensina. Proteger quem sofre sem expor, e nunca punir quem teve coragem de contar. Responsabilizar quem agride com orientação e consequência clara, sem humilhação. E envolver as famílias e o apoio psicológico, porque bullying não se resolve só com punição. E é dever legal: a Lei 13.185, de 2015, obriga a escola a ter medidas de prevenção e combate, e a Lei 14.811, de 2024, passou a tratar bullying e cyberbullying como crime. [Conferir o texto das leis antes da palestra.]" },
  { t: "Ambiente: clima que protege", min: "1:30", n: "Terceira frente: o ambiente. Um clima escolar que protege tem quatro características. Acolhimento e pertencimento: todo aluno precisa se sentir parte. Regras claras, justas e iguais para todos. Atenção aos espaços de risco: recreio, banheiros, corredores, transporte e os grupos de mensagem. E programas de convivência e de habilidades sociais, trabalhados o ano inteiro, não só quando acontece. A pesquisa brasileira sobre psicologia escolar mostra que intervenções em habilidades sociais ajudam. Prevenção contínua reduz danos e permite identificar cedo. Pensem numa muda de planta: ela cresce onde há cuidado, luz e água. A escola também." },
  { t: "Todos nós", min: "1:00", n: "O ambiente também somos nós, e o ambiente também é digital. Quem assiste também decide. Não ria: o riso da plateia alimenta a agressão. Não compartilhe, foto, vídeo e print espalham a dor, mas guarde as provas para denunciar. Apoie quem sofre: sentar junto e chamar para conversar já muda o dia de alguém. E avise um adulto de confiança. Contar não é dedurar, é proteger. Uma atitude pequena muda o jogo." },
  { t: "Fechamento e ajuda", min: "1:00", n: "Para fechar, três verbos: escutar, acolher, agir. E três frentes: nossos filhos, nossos profissionais e o nosso ambiente. Bullying se combate com presença, não com silêncio. Se houver sofrimento intenso, procurem ajuda profissional: o CVV atende pelo 188, 24 horas, de graça; em emergência, SAMU 192; e o Disque 100 recebe denúncias de violência contra crianças e adolescentes. Meu contato está na tela, @dredsonbarroso. Muito obrigado. Fico à disposição para as perguntas." },
];


const K = require("./kit.js");

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

  const titlePh = (color) => ({ placeholder: { options: { name: "title", type: "title", x: 0.7, y: 0.5, w: 11.9, h: 0.8, fontFace: HEAD, fontSize: 34, bold: true, color, align: "left", valign: "top", margin: 0 }, text: "" } });
  pres.defineSlideMaster({ title: "CONTEUDO", slideNumber: { x: 12.0, y: 6.98, w: 0.65, h: 0.3, fontFace: BODY, fontSize: 12, color: C.text2, align: "right" }, objects: [{ image: { path: logoColor, x: 0.7, y: LY, w: LW, h: LHc } }, titlePh(C.text1)] });
  pres.defineSlideMaster({ title: "ESCURO", slideNumber: { x: 12.0, y: 6.98, w: 0.65, h: 0.3, fontFace: BODY, fontSize: 12, color: C.accent3, align: "right" }, objects: [{ rect: { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.text1 } } }, { image: { path: logoDark, x: 0.7, y: LY, w: LW, h: LHd } }, titlePh(C.background1)] });
  pres.defineSlideMaster({ title: "ESCURO_LIVRE", objects: [{ rect: { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.text1 } } }] });

  const txt = (s, text, o) => s.addText(text, Object.assign({ fontFace: BODY, margin: 0, isTextBox: true, valign: "top" }, o));
  const img = (s, data, x, y, w, h, alt) => s.addImage({ data, x, y, w, h, altText: alt, objectName: alt });
  const notes = (s, i) => s.addNotes(`(${ROTEIRO[i].min}) ${ROTEIRO[i].n}`);
  const logoD = (s, w = LW, x = 0.7, y = LY) => s.addImage({ path: logoDark, x, y, w, h: w * 545 / 1848, altText: "Logomarca Dr. Edson Barroso", objectName: "Logomarca" });
  const ill = (svg, sc = 1.5) => png(svg, sc);
  const sub = (s, t, color) => txt(s, t, { x: 0.7, y: 1.3, w: 11.9, h: 0.5, fontSize: 20, color: color || C.text2, objectName: "Mensagem" });

  // ================= 1. Capa =================
  pres.addSection({ title: "Abertura" });
  {
    const s = pres.addSlide({ masterName: "ESCURO_LIVRE", sectionTitle: "Abertura" });
    img(s, await ill(K.cover()), 6.55, 0.35, 6.4, 6.4, "Ilustração: guarda-chuva, coração e balão de conversa");
    txt(s, "Bullying e saúde\nmental na escola", { x: 0.8, y: 1.5, w: 6.4, h: 2.2, fontFace: HEAD, fontSize: 50, bold: true, color: C.background1, objectName: "Título" });
    txt(s, "Como prevenir, cuidar e ajudar: nossos filhos, nossos profissionais e o ambiente", { x: 0.8, y: 4.0, w: 5.6, h: 1.5, fontSize: 22, color: C.accent2, objectName: "Subtítulo" });
    logoD(s, 2.2, 0.8, 6.55);
    txt(s, "@dredsonbarroso", { x: 3.3, y: 6.83, w: 4, h: 0.4, fontSize: 18, color: C.accent3, objectName: "Instagram" });
    notes(s, 0);
  }

  // ================= 2. Gancho =================
  {
    const s = pres.addSlide({ masterName: "ESCURO_LIVRE", sectionTitle: "Abertura" });
    img(s, await ill(K.chair()), 6.55, 0, 6.667, 7.5, "Ilustração: cadeira vazia sob um holofote");
    txt(s, "“É só\nbrincadeira.”", { x: 0.8, y: 0.9, w: 5.8, h: 2.1, fontFace: HEAD, fontSize: 50, italic: true, color: C.accent2, objectName: "Frase" });
    txt(s, "Quantas vezes você já ouviu isso?", { x: 0.8, y: 3.3, w: 5.6, h: 0.5, fontSize: 24, color: C.background1, objectName: "Pergunta" });
    txt(s, "Toda criança tem o direito de ir à escola sem medo.", { x: 0.8, y: 4.1, w: 5.4, h: 1.6, fontFace: HEAD, fontSize: 28, bold: true, color: C.background1, objectName: "Mensagem central" });
    logoD(s);
    notes(s, 1);
  }

  // ================= 3. O que é e como aparece =================
  pres.addSection({ title: "Entender" });
  {
    const s = pres.addSlide({ masterName: "CONTEUDO", sectionTitle: "Entender" });
    s.addText("Bullying tem três marcas, e todas juntas", { placeholder: "title" });
    sub(s, "Briga entre iguais é conflito. Bullying é violência.");
    const cols = [[K.target(), "Intencional", "Há a intenção de ferir, humilhar ou excluir."], [K.loop(), "Repetido", "Não é um dia ruim: é uma rotina que se repete."], [K.scales(), "Desigual", "Quem agride tem mais poder: força, popularidade ou grupo."]];
    for (let i = 0; i < 3; i++) {
      const x = 0.7 + i * 4.15;
      img(s, await ill(cols[i][0], 1), x, 2.0, 2.0, 2.0, "Ilustração: " + cols[i][1]);
      txt(s, cols[i][1], { x, y: 4.15, w: 3.8, h: 0.6, fontFace: HEAD, fontSize: 30, bold: true, color: C.text1, objectName: "Marca " + cols[i][1] });
      txt(s, cols[i][2], { x, y: 4.8, w: 3.6, h: 1.0, fontSize: 18, color: C.text2, objectName: "Definição " + cols[i][1] });
    }
    txt(s, "Pode ser física, verbal, social ou virtual.", { x: 0.7, y: 6.0, w: 9, h: 0.4, fontSize: 18, bold: true, color: C.accent1, objectName: "Formas" });
    notes(s, 2);
  }

  // ================= 4. Ninguém sai ileso =================
  pres.addSection({ title: "Saúde mental" });
  {
    const s = pres.addSlide({ masterName: "ESCURO", sectionTitle: "Saúde mental" });
    s.addText("Ninguém sai ileso: o bullying adoece", { placeholder: "title" });
    const cols = [
      [K.heartCracked("#0B172B"), "Quem sofre", ["Ansiedade", "Tristeza e depressão", "Isolamento", "Queda na escola"]],
      [K.megaphone(), "Quem pratica", ["Sofrimento psíquico", "Comportamentos de risco", "Também precisa de ajuda"]],
      [K.eye(), "Quem assiste", ["Também é atingido", "Aprende que isso é normal"]],
    ];
    for (let i = 0; i < 3; i++) {
      const x = 0.7 + i * 4.15;
      img(s, await ill(cols[i][0], 1), x, 1.4, 1.8, 1.8, "Ilustração: " + cols[i][1]);
      txt(s, cols[i][1], { x, y: 3.3, w: 3.7, h: 0.5, fontFace: HEAD, fontSize: 26, bold: true, color: C.accent3, objectName: "Papel " + cols[i][1] });
      txt(s, cols[i][2].map((t, k) => ({ text: t, options: { bullet: true, breakLine: k < cols[i][2].length - 1, paraSpaceAfter: 4 } })), { x, y: 3.9, w: 3.7, h: 1.4, fontSize: 18, color: C.background1, objectName: "Lista " + cols[i][1] });
    }
    txt(s, "Não é frescura. É sofrimento real.", { x: 0.7, y: 5.65, w: 11.9, h: 0.5, fontFace: HEAD, fontSize: 26, italic: true, color: C.accent2, objectName: "Frase de impacto" });
    txt(s, "Em casos graves, há risco de autolesão e de pensamentos suicidas. Nunca minimize.", { x: 0.7, y: 6.2, w: 11.9, h: 0.4, fontSize: 16, color: C.background1, objectName: "Alerta" });
    notes(s, 3);
  }

  // ================= 5. Sinais de alerta =================
  {
    const s = pres.addSlide({ masterName: "CONTEUDO", sectionTitle: "Saúde mental" });
    s.addText("O comportamento avisa antes da criança contar", { placeholder: "title" });
    const items = ["Não quer mais ir à escola", "Dor de cabeça ou de barriga sem causa", "Muda de humor, de sono ou de apetite", "Afasta-se dos amigos", "As notas caem de repente", "Pertences “perdidos” ou quebrados"];
    items.forEach((t, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.7 + col * 3.9, y = 1.75 + row * 1.15;
      txt(s, String(i + 1), { x, y, w: 0.6, h: 0.8, fontFace: HEAD, fontSize: 34, bold: true, color: C.accent1, valign: "middle", objectName: "Número " + (i + 1) });
      txt(s, t, { x: x + 0.7, y, w: 2.95, h: 0.8, fontSize: 18, color: C.text1, valign: "middle", objectName: "Sinal " + (i + 1) });
    });
    txt(s, "Pais e professores, perguntem com calma: “Como estão as coisas na escola? Alguém tem te incomodado?”", { x: 0.7, y: 5.35, w: 7.4, h: 1.0, fontSize: 20, italic: true, color: C.text1, objectName: "Pergunta modelo" });
    img(s, await ill(K.magnifier()), 8.3, 1.55, 4.5, 4.5, "Ilustração: lupa");
    notes(s, 4);
  }

  // ================= 6. Três frentes =================
  pres.addSection({ title: "O que fazer" });
  {
    const s = pres.addSlide({ masterName: "CONTEUDO", sectionTitle: "O que fazer" });
    s.addText("Três frentes: filhos, profissionais e ambiente", { placeholder: "title" });
    sub(s, "Prevenir, cuidar e ajudar, ao mesmo tempo.");
    const cols = [[K.house(), "Nossos filhos", "Fortalecer a saúde mental e o vínculo, e agir cedo."], [K.cap(), "Nossos profissionais", "Formar, apoiar e dar um protocolo claro a quem educa."], [K.sprout(), "O ambiente", "Acolhimento, regras justas e atenção aos espaços de risco."]];
    for (let i = 0; i < 3; i++) {
      const x = 0.7 + i * 4.15;
      img(s, await ill(cols[i][0], 1), x, 2.0, 2.0, 2.0, "Ilustração: " + cols[i][1]);
      txt(s, cols[i][1], { x, y: 4.2, w: 3.9, h: 0.55, fontFace: HEAD, fontSize: 26, bold: true, color: C.text1, objectName: "Frente " + cols[i][1] });
      txt(s, cols[i][2], { x, y: 4.85, w: 3.6, h: 1.3, fontSize: 18, color: C.text2, objectName: "Descrição " + cols[i][1] });
    }
    notes(s, 5);
  }

  // ---------- slides de ação: texto à esquerda e objeto à direita ----------
  const acao = async (title, message, svg, rows, idx, alt) => {
    const s = pres.addSlide({ masterName: "CONTEUDO", sectionTitle: "O que fazer" });
    s.addText(title, { placeholder: "title" });
    sub(s, message);
    rows.forEach((r, i) => {
      const y = 2.15 + i * 1.08;
      txt(s, r[0], { x: 0.7, y, w: 6.8, h: 0.45, fontFace: HEAD, fontSize: 24, bold: true, color: C.text1, objectName: "Ação " + (i + 1) });
      txt(s, r[1], { x: 0.7, y: y + 0.47, w: 6.8, h: 0.5, fontSize: 18, color: C.text2, objectName: "Explicação " + (i + 1) });
    });
    img(s, await ill(svg), 7.85, 1.65, 4.8, 4.8, alt);
    notes(s, idx);
  };

  await acao("Nossos filhos: prevenir começa em casa", "Criança ouvida em casa conta mais cedo quando algo dá errado.", K.bubble(), [
    ["Converse todos os dias", "Pergunte sobre o dia, não só sobre as notas."],
    ["Cuide do básico", "Sono, alimentação, movimento e tempo para brincar."],
    ["Ensine empatia e a pedir ajuda", "“Se algo te machucar, me conte. Eu não vou brigar.”"],
    ["Acompanhe o mundo digital", "Combine regras de tela e esteja por perto, sem espionar."],
  ], 6, "Ilustração: balões de conversa");

  await acao("Nossos filhos: se acontecer, ajude assim", "A criança precisa sentir que está cercada de apoio: família, escola e profissional.", K.umbrella(), [
    ["Escute sem julgar", "Deixe falar até o fim. Evite “isso passa”."],
    ["Acredite e acolha", "O que ela sente é real, mesmo que pareça pequeno."],
    ["Registre e procure a escola", "Datas, prints e nomes, por escrito e com firmeza."],
    ["Procure um profissional de saúde mental", "Se tristeza, ansiedade ou recusa escolar persistirem."],
  ], 7, "Ilustração: guarda-chuva de proteção");

  await acao("Profissionais: quem cuida precisa de cuidado", "Professor acolhido acolhe melhor.", K.battery(), [
    ["Formação continuada", "Professores relatam dificuldade para reconhecer e agir."],
    ["Protocolo claro", "Saber o que fazer e com quem falar tira o peso da improvisação."],
    ["Escuta e apoio psicológico", "Psicólogo escolar e acesso à rede de saúde."],
    ["Cuidar da própria saúde mental", "Sobrecarga e pressão adoecem quem educa."],
  ], 8, "Ilustração: bateria baixa recarregada com cuidado");

  await acao("Na escola: agir na hora e com método", "É dever da escola (Lei 13.185/2015) e bullying é crime (Lei 14.811/2024).", K.clipboard(), [
    ["Interrompa a situação", "O silêncio também ensina."],
    ["Proteja sem expor", "Quem contou não pode ser punido por isso."],
    ["Responsabilize com orientação", "Consequência clara, sem humilhação."],
    ["Envolva famílias e apoio psicológico", "Bullying não se resolve só com punição."],
  ], 9, "Ilustração: lista de verificação");

  await acao("O ambiente: um clima escolar que protege", "Prevenção contínua reduz danos e identifica o problema cedo.", K.heart(), [
    ["Acolhimento e pertencimento", "Todo aluno precisa se sentir parte do grupo."],
    ["Regras claras, justas e iguais", "Valem para todos, inclusive para os mais populares."],
    ["Atenção aos espaços de risco", "Recreio, banheiros, transporte e grupos de mensagem."],
    ["Convivência e habilidades sociais", "Trabalhadas o ano todo, não só quando acontece."],
  ], 10, "Ilustração: coração");

  await acao("Todos nós fazemos o ambiente", "Inclusive o digital: o que fazemos online também conta.", K.puzzle(), [
    ["Não ria", "O riso da plateia alimenta a agressão."],
    ["Não compartilhe, guarde as provas", "Print e link ajudam a denunciar; repassar espalha a dor."],
    ["Apoie quem sofre", "Sentar junto e chamar para conversar já muda o dia."],
    ["Avise um adulto de confiança", "Contar não é dedurar: é proteger."],
  ], 11, "Ilustração: peças de quebra-cabeça se encaixando");

  // ================= 13. Fechamento =================
  pres.addSection({ title: "Encerramento" });
  {
    const s = pres.addSlide({ masterName: "ESCURO_LIVRE", sectionTitle: "Encerramento" });
    img(s, await ill(K.boat()), 7.0, 0.45, 5.9, 5.9, "Ilustração: barco de papel ao nascer do sol");
    txt(s, "Escutar. Acolher.\nAgir.", { x: 0.8, y: 0.7, w: 6.3, h: 1.7, fontFace: HEAD, fontSize: 46, bold: true, color: C.background1, objectName: "Título" });
    txt(s, "Bullying se combate com presença, não com silêncio.", { x: 0.8, y: 2.5, w: 6.0, h: 0.9, fontSize: 24, color: C.accent2, objectName: "Frase final" });
    txt(s, "Precisa de ajuda agora?", { x: 0.8, y: 3.85, w: 6.2, h: 0.5, fontFace: HEAD, fontSize: 22, bold: true, color: C.accent3, objectName: "Título ajuda" });
    txt(s, [
      { text: "CVV 188 · 24 horas, gratuito", options: { breakLine: true } },
      { text: "SAMU 192 · emergência", options: { breakLine: true } },
      { text: "Disque 100 · denúncia de violência contra crianças e adolescentes" },
    ], { x: 0.8, y: 4.45, w: 6.2, h: 1.5, fontSize: 18, color: C.background1, paraSpaceAfter: 6, objectName: "Canais de ajuda" });
    logoD(s);
    txt(s, "@dredsonbarroso", { x: 2.8, y: 6.93, w: 4, h: 0.4, fontSize: 18, color: C.background1, objectName: "Instagram" });
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
