# Projeto: Apresentações

Este repositório é um projeto para **criar apresentações** (slides), principalmente para uso em escola.

## Regras do projeto

- Idioma padrão: **português do Brasil**, a menos que o usuário peça outro.
- Sempre que for criar ou revisar slides, decks ou apresentações, use a skill **`slide-design`**
  (`.claude/skills/slide-design/SKILL.md`): um ponto por slide, pouco texto, mais imagem,
  poucas cores e fontes, e o checklist de 6 perguntas antes de entregar cada slide.
- Antes de montar o deck, confirme: tema, turma/faixa etária, duração e formato
  (PowerPoint, HTML ou PDF).
- Para público escolar: linguagem simples, frases curtas, texto grande e legível de longe.
- Salve as apresentações geradas em `apresentacoes/` (um arquivo ou pasta por tema).

## Skills instaladas

| Skill | Origem | Uso |
|---|---|---|
| `slide-design` | https://github.com/hunkim/slide-skill | Regras de design de slides legíveis |

Para atualizar a skill, baixe a versão nova do repositório de origem e substitua a pasta
`.claude/skills/slide-design/` (sem copiar o `.git`).

## Identidade visual (Dr. Edson Barroso · Saúde Mental Adulto e Infantil)

- Use **sempre a logomarca** em apresentações. Arquivos em `apresentacoes/logo/`:
  - `logo-horizontal-colorida.png` e `logo-vertical-colorida.png`: para fundo claro.
  - `logo-horizontal-fundo-escuro.png` e `logo-vertical-fundo-escuro.png`: para fundo escuro (monograma dourado + texto branco).
  - `logo-horizontal-branca.png`: versão toda branca.
- Paleta da marca: azul-marinho `#0B172B`, dourado `#A67C52`, dourado médio `#C4A07A`, champagne `#E3CFB3`, fundo suave `#F4EDE3`.
- Estilo: **limpo, moderno e vivo**. Só dois fundos: branco ou azul-marinho. Um título, uma linha de mensagem, no máximo 4 itens e **uma imagem grande por slide**. Sem caixas, linhas divisórias, faixas ou fundos bege (o usuário achou "sujo" e cansativo). Títulos em serifa (Cambria), texto em Calibri; logo **pequena no canto inferior esquerdo**.
- Imagens: **sem pessoas** (nem fotos reais, nem figuras desenhadas). Usar objetos e metáforas em estilo 3D suave, vivos, no padrão de `apresentacoes/src/kit.js` (coração, guarda-chuva, balões de conversa, lupa, bateria, quebra-cabeça, barco de papel etc.).
- Instagram: `@dredsonbarroso`.
- Não usar o Gamma (o usuário não quer) nem ícones genéricos em círculos como visual principal.
